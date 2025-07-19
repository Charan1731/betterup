import { Keypair } from "@solana/web3.js";

// Generate a new keypair
const keypair = Keypair.generate();

// Convert the secret key to JSON format
const privateKeyJson = JSON.stringify(Array.from(keypair.secretKey));

console.log("Generated new Solana keypair:");
console.log("Public Key:", keypair.publicKey.toString());
console.log("Private Key (JSON):", privateKeyJson);
console.log("\nTo set the environment variable, run:");
console.log(`export PRIVATE_KEY='${privateKeyJson}'`); 