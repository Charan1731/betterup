
"use client";

import AppNavBar from "@/components/AppNavBar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useValidator } from "@/hooks/useValidator";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
    { ssr: false }
);

export default function ValidatorDashboard() {
  const { publicKey } = useWallet();
  const { validator, refreshValidator } = useValidator(publicKey?.toBase58() || "");

  useEffect(() => {
    if (publicKey) {
      refreshValidator();
    }
  }, [publicKey, refreshValidator]);

  return (
    <div>
      <AppNavBar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Validator Dashboard</h1>
          <WalletMultiButton />
        </div>

        {publicKey ? (
          validator ? (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Validator Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Public Key:</p>
                      <p className="text-sm text-gray-500 truncate">{validator.publicKey}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status:</p>
                      <p className="text-sm">Active</p>
                    </div>
                    <div>
                      <p className="font-semibold">Location:</p>
                      <p className="text-sm">{validator.location}</p>
                    </div>
                    <div>
                      <p className="font-semibold">IP Address:</p>
                      <p className="text-sm">{validator.ip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Validation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Website</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Latency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {validator.ticks.map((tick) => (
                        <TableRow key={tick.id}>
                          <TableCell>{tick.website.url}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                tick.status === "Good"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                              {tick.status}
                            </span>
                          </TableCell>
                          <TableCell>{tick.latency}ms</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          ) : (
            <p>Loading validator data...</p>
          )
        ) : (
          <p>Please connect your wallet to view your validator dashboard.</p>
        )}
      </div>
    </div>
  );
}
