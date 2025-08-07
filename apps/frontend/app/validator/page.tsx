
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useValidator } from "@/hooks/useValidator";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { 
  Activity, 
  Clock, 
  Globe, 
  MapPin, 
  RefreshCw, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  WifiOff,
  Timer,
  Gauge
} from 'lucide-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

const WalletMultiButton = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
    { ssr: false }
);

export default function ValidatorDashboard() {
  const { publicKey } = useWallet();
  const { validator, loading, error, refreshValidator } = useValidator(publicKey?.toBase58() || "");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (publicKey) {
      refreshValidator();
    }
  }, [publicKey, refreshValidator]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshValidator();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'good':
      case 'online':
      case 'operational':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning':
      case 'slow':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'error':
      case 'down':

      case 'offline':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-red-500 bg-red-500/10 border-red-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'good':
      case 'online':
      case 'operational':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'slow':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
      case 'down':
      case 'offline':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const calculateAverageLatency = () => {
    if (!validator?.ticks || validator.ticks.length === 0) return 0;
    const sum = validator.ticks.reduce((acc, tick) => acc + tick.latency, 0);
    return Math.round(sum / validator.ticks.length);
  };

  const calculateUptime = () => {
    if (!validator?.ticks || validator.ticks.length === 0) return 100;
    const goodTicks = validator.ticks.filter(tick => tick.status.toLowerCase() === 'good').length;
    return Math.round((goodTicks / validator.ticks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden -mt-16">
      {/* Enhanced background effects matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-background to-purple-500/[0.02] dark:from-blue-500/[0.08] dark:to-purple-500/[0.08]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-400/30 dark:to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-600/10 dark:from-purple-400/30 dark:to-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-pink-600/10 dark:from-pink-400/30 dark:to-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob animation-delay-4000"></div>

      <div className="relative">
        <div className="container mx-auto px-6 py-8 pt-32">
          {/* Enhanced header section */}
          <div className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 rounded-3xl p-8 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500 mb-8">
            {/* Glass effect overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] dark:via-white/[0.05] dark:to-white/[0.02] rounded-3xl"></div>
            
            <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-6">
                {/* Enhanced validator icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300">
                    <Zap className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Validator Dashboard
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                      <span>Active Monitoring</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                                 <Button 
                   onClick={handleRefresh}
                   disabled={isRefreshing}
                   variant="outline"
                   size="sm"
                   className="group border-2 border-border/40 hover:border-border/80 dark:hover:border-border/60 bg-background/90 dark:bg-background/70 backdrop-blur-xl hover:bg-background/95 dark:hover:bg-background/80 transition-all duration-300 hover:scale-105"
                 >
                   <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} />
                   Refresh
                 </Button>
                <div className="relative grid grid-cols-2 gap-2">
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
              </div>
            </div>
          </div>

          {publicKey ? (
            error ? (
              // Enhanced error state
              <div className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-red-500/40 dark:border-red-500/40 rounded-3xl p-16 shadow-2xl ring-1 ring-red-500/20 dark:ring-red-500/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] via-transparent to-red-500/[0.03] dark:from-red-400/[0.08] dark:to-red-400/[0.08] rounded-3xl"></div>
                <div className="relative text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">Error Loading Validator</h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button 
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      variant="outline"
                      className="border-red-500/40 hover:border-red-500/60 text-red-600 dark:text-red-400 hover:bg-red-500/10"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
                         ) : loading || !validator ? (
               // Enhanced loading state
               <div className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 rounded-3xl p-16 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
                 <div className="relative text-center space-y-6">
                   <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                     <Activity className="w-8 h-8 text-white animate-spin" />
                   </div>
                   <div>
                     <h3 className="text-xl font-semibold mb-2">Loading validator data...</h3>
                     <p className="text-muted-foreground">Please wait while we fetch your validator information</p>
                   </div>
                 </div>
               </div>
             ) : validator ? (
               <div className="space-y-8">
                {/* Enhanced validator details card */}
                <Card className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500 rounded-3xl">
                  {/* Glass effect overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] dark:via-white/[0.05] dark:to-white/[0.02] rounded-3xl"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      Validator Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Public Key */}
                      <div className="group p-6 rounded-2xl bg-background/60 dark:bg-background/40 backdrop-blur-sm border border-border/40 dark:border-border/30 hover:border-border/60 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-muted-foreground">Public Key</p>
                          <Globe className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-sm font-mono bg-muted/50 p-2 rounded-lg truncate">{validator.publicKey}</p>
                        <div className="h-1 w-full rounded-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                      </div>

                      {/* Status */}
                      <div className="group p-6 rounded-2xl bg-background/60 dark:bg-background/40 backdrop-blur-sm border border-border/40 dark:border-border/30 hover:border-border/60 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-muted-foreground">Status</p>
                          <Activity className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
                            Active
                          </span>
                        </div>
                        <div className="h-1 w-full rounded-full mt-3 bg-gradient-to-r from-green-500 to-green-600 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                      </div>

                      {/* Location */}
                      <div className="group p-6 rounded-2xl bg-background/60 dark:bg-background/40 backdrop-blur-sm border border-border/40 dark:border-border/30 hover:border-border/60 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-muted-foreground">Location</p>
                          <MapPin className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-lg font-semibold">{validator.location}</p>
                        <div className="h-1 w-full rounded-full mt-3 bg-gradient-to-r from-purple-500 to-purple-600 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                      </div>

                      {/* IP Address */}
                      <div className="group p-6 rounded-2xl bg-background/60 dark:bg-background/40 backdrop-blur-sm border border-border/40 dark:border-border/30 hover:border-border/60 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-muted-foreground">IP Address</p>
                          <Globe className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-lg font-semibold font-mono">{validator.ip}</p>
                        <div className="h-1 w-full rounded-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced metrics cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Uptime Card */}
                  <Card className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500 rounded-3xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] via-transparent to-green-500/[0.03] dark:from-green-400/[0.08] dark:to-green-400/[0.08] rounded-3xl"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-green-500">{calculateUptime()}%</div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Uptime</h3>
                      <p className="text-sm text-muted-foreground">Last 20 checks</p>
                    </CardContent>
                  </Card>

                  {/* Average Latency Card */}
                  <Card className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500 rounded-3xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-blue-500/[0.03] dark:from-blue-400/[0.08] dark:to-blue-400/[0.08] rounded-3xl"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Gauge className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-blue-500">{calculateAverageLatency()}ms</div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Avg Latency</h3>
                      <p className="text-sm text-muted-foreground">Response time</p>
                    </CardContent>
                  </Card>

                  {/* Pending Sol Card */}
                  <Card className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500 rounded-3xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-purple-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
                    <CardContent className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-purple-500">{(validator.pendingSol / LAMPORTS_PER_SOL)}</div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Pending SOL</h3>
                      <p className="text-sm text-muted-foreground">Rewards pending</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced validation history */}
                <Card className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500 rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] dark:via-white/[0.05] dark:to-white/[0.02] rounded-3xl"></div>
                  
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Timer className="w-4 h-4 text-white" />
                      </div>
                      Validation History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border/30 hover:bg-muted/30">
                            <TableHead className="font-semibold">Website</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Latency</TableHead>
                            <TableHead className="font-semibold">Checked</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {validator.ticks.filter((_,i) => i%2 === 0).map((tick) => (
                            <TableRow key={tick.id} className="border-border/30 hover:bg-muted/30 group/row transition-all duration-200">
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  <Globe className="w-4 h-4 text-muted-foreground group-hover/row:text-blue-500 transition-colors" />
                                  <span className="group-hover/row:text-foreground transition-colors">{tick.website.url}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(tick.status)} group-hover/row:scale-105 transition-transform`}>
                                  {getStatusIcon(tick.status)}
                                  {tick.status}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Timer className="w-3 h-3 text-muted-foreground" />
                                  <span className="font-mono">{tick.latency}ms</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {new Date(tick.createdAt).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                             </div>
             ) : (
               // Fallback state
               <div className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 rounded-3xl p-16 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
                 <div className="relative text-center space-y-6">
                   <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center">
                     <WifiOff className="w-8 h-8 text-white" />
                   </div>
                   <div>
                     <h3 className="text-xl font-semibold mb-2">No Validator Data</h3>
                     <p className="text-muted-foreground">Unable to load validator information at this time.</p>
                   </div>
                 </div>
               </div>
             )
          ) : (
            <div className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 rounded-3xl p-16 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
              <div className="relative text-center space-y-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                    Please connect your Solana wallet to view your validator dashboard and monitoring data.
                  </p>
                </div>
                <div className="pt-4">
                  <WalletMultiButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
