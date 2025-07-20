import { randomUUIDv7, type ServerWebSocket } from "bun";
import type { IncomingMessage, SignupIncomingMessage } from "common";
import { prismaClient } from "db/client";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

const availableValidators: { validatorId: string, socket: ServerWebSocket<unknown>, publicKey: string }[] = [];

const CALLBACKS : { [callbackId: string]: (data: IncomingMessage) => void } = {}
const COST_PER_VALIDATION = 100; // in lamports

async function getLocationFromIP(ip: string): Promise<string> {
    // Handle localhost/private IPs
    if (ip === '127.0.0.1' || ip === 'localhost' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
        return 'Local';
    }

    try {
        // Use ipapi.co free service for IP geolocation
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`https://ipapi.co/${ip}/json/`, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'UptimeMonitor/1.0'
            }
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Return city, region, country format if available
        if (data.city && data.region && data.country_name) {
            return `${data.city}, ${data.region}, ${data.country_name}`;
        } else if (data.region && data.country_name) {
            return `${data.region}, ${data.country_name}`;
        } else if (data.country_name) {
            return data.country_name;
        } else {
            return 'Unknown';
        }
    } catch (error) {
        console.error(`Failed to get location for IP ${ip}:`, error);
        return 'Unknown';
    }
}

Bun.serve({
    fetch(req, server) {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    port: 8081,
    websocket: {
        async message(ws: ServerWebSocket<unknown>, message: string) {
            const data: IncomingMessage = JSON.parse(message);
            
            if (data.type === 'signup') {

                const verified = await verifyMessage(
                    `Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,
                    data.data.publicKey,
                    data.data.signedMessage
                );
                if (verified) {
                    await signupHandler(ws, data.data);
                }
            } else if (data.type === 'validate') {
                const callback = CALLBACKS[data.data.callbackId];
                if (typeof callback === 'function') {
                    callback(data);
                }
                delete CALLBACKS[data.data.callbackId];
            }
        },
        async close(ws: ServerWebSocket<unknown>) {
            availableValidators.splice(availableValidators.findIndex(v => v.socket === ws), 1);
        }
    },
});

async function signupHandler(ws: ServerWebSocket<unknown>, { ip, publicKey, signedMessage, callbackId }: SignupIncomingMessage) {
    const validatorDb = await prismaClient.validator.findFirst({
        where: {
            publicKey,
        },
    });

    if (validatorDb) {
        // Update location if it's currently unknown or empty
        if (validatorDb.location === 'unknown' || validatorDb.location === '' || !validatorDb.location) {
            const location = await getLocationFromIP(ip);
            await prismaClient.validator.update({
                where: { id: validatorDb.id },
                data: { location, ip }
            });
        }

        ws.send(JSON.stringify({
            type: 'signup',
            data: {
                validatorId: validatorDb.id,
                callbackId,
            },
        }));

        availableValidators.push({
            validatorId: validatorDb.id,
            socket: ws,
            publicKey: validatorDb.publicKey,
        });
        return;
    }
    
    // Get location from IP address
    const location = await getLocationFromIP(ip);
    const validator = await prismaClient.validator.create({
        data: {
            ip,
            publicKey,
            location,
        },
    });

    ws.send(JSON.stringify({
        type: 'signup',
        data: {
            validatorId: validator.id,
            callbackId,
        },
    }));

    availableValidators.push({
        validatorId: validator.id,
        socket: ws,
        publicKey: validator.publicKey,
    });
}

async function verifyMessage(message: string, publicKey: string, signature: string) {
    const messageBytes = nacl_util.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
        messageBytes,
        new Uint8Array(JSON.parse(signature)),
        new PublicKey(publicKey).toBytes(),
    );

    return result;
}

setInterval(async () => {
    const websitesToMonitor = await prismaClient.website.findMany({
        where: {
            disabled: false,
        },
    });

    for (const website of websitesToMonitor) {
        availableValidators.forEach(validator => {
            const callbackId = randomUUIDv7();
            console.log(`Sending validate to ${validator.validatorId} ${website.url}`);
            validator.socket.send(JSON.stringify({
                type: 'validate',
                data: {
                    url: website.url,
                    callbackId,
                    websiteId: website.id
                },
            }));

            CALLBACKS[callbackId] = async (data: IncomingMessage) => {
                if (data.type === 'validate') {
                    const { validatorId, status, latency, signedMessage } = data.data;
                    const verified = await verifyMessage(
                        `Replying to ${callbackId}`,
                        validator.publicKey,
                        signedMessage
                    );
                    if (!verified) {
                        return;
                    }

                    await prismaClient.$transaction(async (tx) => {
                        await tx.websiteTick.create({
                            data: {
                                websiteId: website.id,
                                validatorId,
                                status,
                                latency,
                                createdAt: new Date(),
                            },
                        });

                        await tx.validator.update({
                            where: { id: validatorId },
                            data: {
                                pendingSol: { increment: COST_PER_VALIDATION },
                            },
                        });
                    });
                }
            };
        });
    }
}, 60 * 1000);