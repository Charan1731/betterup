"use client";
import React, { useState, useMemo } from 'react';
import { ChevronDown, Globe, Plus, Monitor, Activity, Clock, TrendingUp, AlertCircle, CheckCircle2, Zap, Trash2 } from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsite';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LinkPreview } from '@/components/ui/link-preview';

type UptimeStatus = "good" | "bad" | "unknown";

const API_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

function StatusCircle({ status, size = "md" }: { status: UptimeStatus; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-6 h-6"
  };

  const statusConfig = {
    good: {
      bg: "bg-green-500",
      glow: "shadow-green-500/30",
      ring: "ring-green-500/20"
    },
    bad: {
      bg: "bg-red-500", 
      glow: "shadow-red-500/30",
      ring: "ring-red-500/20"
    },
    unknown: {
      bg: "bg-gray-500",
      glow: "shadow-gray-500/30", 
      ring: "ring-gray-500/20"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`${sizeClasses[size]} ${config.bg} rounded-full ${config.glow} shadow-lg ring-2 ${config.ring} animate-pulse`} />
  );
}

function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
  return (
    <div className="flex gap-1.5 mt-4">
      {ticks.map((tick, index) => {
        const statusConfig = {
          good: "bg-gradient-to-t from-green-400 to-green-500 shadow-green-500/30",
          bad: "bg-gradient-to-t from-red-400 to-red-500 shadow-red-500/30", 
          unknown: "bg-gradient-to-t from-gray-400 to-gray-500 shadow-gray-500/30"
        };

        return (
          <div
            key={index}
            className={`w-8 h-3 rounded-full ${statusConfig[tick]} shadow-lg ring-1 ring-white/20 transition-all duration-200 hover:scale-110`}
            title={`${index * 3}-${(index + 1) * 3} minutes ago: ${tick}`}
          />
        );
      })}
    </div>
  );
}

function CreateWebsiteModal({ isOpen, onClose }: { isOpen: boolean; onClose: (url: string | null) => void }) {
  const [url, setUrl] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 ">
      <div className="bg-background/95 backdrop-blur-xl border border-border/30 rounded-2xl p-8 w-full max-w-md shadow-2xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Add Website</h2>
              <p className="text-sm text-muted-foreground">Monitor a new website&apos;s uptime</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Website URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <Button
              variant="ghost"
              onClick={() => onClose(null)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onClose(url)}
              className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Add Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({ isOpen, onClose, websiteUrl }: { isOpen: boolean; onClose: (confirmed: boolean) => void; websiteUrl: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 ">
      <div className="bg-background/95 backdrop-blur-xl border border-border/30 rounded-2xl p-8 w-full max-w-md shadow-2xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Delete Website</h2>
              <p className="text-sm text-muted-foreground">This action cannot be undone</p>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-foreground mb-2">Are you sure you want to delete monitoring for:</p>
            <div className="p-3 bg-background/50 border border-border rounded-xl">
              <span className="font-medium text-foreground">{websiteUrl.replace(/^https?:\/\//, '')}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3">All monitoring data and history for this website will be permanently deleted.</p>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => onClose(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onClose(true)}
              className="px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
  avgLatency: number;
}

function WebsiteCard({ website, onDelete }: { website: ProcessedWebsite; onDelete: (websiteId: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusConfig = {
    good: {
      text: "Operational",
      icon: CheckCircle2,
      gradient: "from-green-500/10 to-emerald-500/5",
      border: "border-green-500/20"
    },
    bad: {
      text: "Down", 
      icon: AlertCircle,
      gradient: "from-red-500/10 to-rose-500/5",
      border: "border-red-500/20"
    },
    unknown: {
      text: "Unknown",
      icon: Activity, 
      gradient: "from-gray-500/10 to-slate-500/5",
      border: "border-gray-500/20"
    }
  };

  const config = statusConfig[website.status];
  const StatusIcon = config.icon;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = (confirmed: boolean) => {
    setShowDeleteConfirm(false);
    if (confirmed) {
      onDelete(website.id);
    }
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={`relative bg-background/60 backdrop-blur-xl border border-border/30 rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/5 hover:shadow-2xl transition-all duration-300 ${config.border}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} pointer-events-none rounded-2xl`} />
        
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            className="group h-8 w-8 p-0 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
          </Button>
        </div>
        
        <div
          className="relative p-6 cursor-pointer hover:bg-background/20 transition-all duration-200"
          onClick={handleCardClick}
        >
          <div className="flex items-center justify-between pr-12"> {/* Add right padding for delete button */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <StatusCircle status={website.status} size="lg" />
                <div className="absolute -top-1 -right-1">
                  <StatusIcon className="w-3 h-3 text-foreground/60" />
                </div>
              </div>
              
              <div className="space-y-1">
                {/* <h3 className="font-semibold text-lg text-foreground truncate max-w-xs">
                  {website.url.replace(/^https?:\/\//, '')}
                </h3> */}
                <LinkPreview url={website.url} className="text-lg font-semibold text-foreground truncate max-w-xs">
                  {website.url.replace(/^https?:\/\//, '')}
                </LinkPreview>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`font-medium ${
                    website.status === 'good' ? 'text-green-500' :
                    website.status === 'bad' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {config.text}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {website.uptimePercentage.toFixed(1)}% uptime
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{website.avgLatency.toFixed(0)}ms</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {website.lastChecked}
                </div>
              </div>
              
              <div className={`p-2 rounded-xl bg-background/50 border border-border/30 transition-all duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="relative border-t border-border/30 bg-background/20 backdrop-blur-sm">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Last 30 minutes status</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Each bar = 3 minutes
                </div>
              </div>
              
              <UptimeTicks ticks={website.uptimeTicks} />
              
              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-muted-foreground">Down</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-muted-foreground">Unknown</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated every minute
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmDeleteModal 
        isOpen={showDeleteConfirm}
        onClose={handleDeleteConfirm}
        websiteUrl={website.url}
      />
    </>
  );
}

function StatsOverview({ websites }: { websites: ProcessedWebsite[] }) {
  const stats = useMemo(() => {
    const total = websites.length;
    const operational = websites.filter(w => w.status === 'good').length;
    const down = websites.filter(w => w.status === 'bad').length;
    const avgUptime = total > 0 ? websites.reduce((acc, w) => acc + w.uptimePercentage, 0) / total : 100;
    const avgLatency = total > 0 ? websites.reduce((acc, w) => acc + w.avgLatency, 0) / total : 0;
    
    return { total, operational, down, avgUptime, avgLatency };
  }, [websites]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-background/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Sites</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-background/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Operational</p>
            <p className="text-2xl font-bold text-green-500">{stats.operational}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-background/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg Uptime</p>
            <p className="text-2xl font-bold text-foreground">{stats.avgUptime.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-background/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg Latency</p>
            <p className="text-2xl font-bold text-foreground">{stats.avgLatency.toFixed(0)}ms</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { websites, refreshWebsites } = useWebsites();
  const { getToken } = useAuth();

  const processedWebsites = useMemo(() => {
    return websites.map(website => {
      // Sort ticks by creation time
      const sortedTicks = [...website.ticks].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the most recent 30 minutes of ticks
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(tick => 
        new Date(tick.createdAt) > thirtyMinutesAgo
      );

      // Aggregate ticks into 3-minute windows (10 windows total)
      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);
        
        const windowTicks = recentTicks.filter(tick => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        // Window is considered up if majority of ticks are up
        const upTicks = windowTicks.filter(tick => tick.status === 'Good').length;
        windows[9 - i] = windowTicks.length === 0 ? "unknown" : (upTicks / windowTicks.length) >= 0.5 ? "good" : "bad";
      }

      // Calculate overall status and uptime percentage
      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(tick => tick.status === 'Good').length;
      const uptimePercentage = totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      // Get the most recent status
      const currentStatus = windows[windows.length - 1];

      // Calculate average latency
      const avgLatency = totalTicks === 0 ? 0 : 
        sortedTicks.reduce((acc, tick) => acc + tick.latency, 0) / totalTicks;

      // Format the last checked time
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
        : 'Never';

      return {
        id: website.id,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
        avgLatency,
      };
    });
  }, [websites]);

  const handleAddWebsite = async (url: string | null) => {
    if (url) {
      try {
        const token = await getToken();
        await axios.post(`${API_BACKEND_URL}/api/v1/websites/website`, 
          { url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await refreshWebsites();
      } catch (error) {
        console.error('Failed to add website:', error);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteWebsite = async (websiteId: string) => {
    try {
      const token = await getToken();
      await axios.delete(`${API_BACKEND_URL}/api/v1/websites/website/${websiteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await refreshWebsites();
    } catch (error) {
      console.error('Failed to delete website:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor your website&aposs uptime and performance</p>
          </div>
          
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Website
          </Button>
        </div>

        <StatsOverview websites={processedWebsites} />

        <div className="space-y-6">
          {processedWebsites.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border/30 flex items-center justify-center">
                <Monitor className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No websites yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start monitoring your websites by adding your first URL. We&apos;ll check it every minute and show you real-time status.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Website
              </Button>
            </div>
          ) : (
            processedWebsites.map(website => (
              <WebsiteCard key={website.id} website={website} onDelete={handleDeleteWebsite} />
            ))
          )}
        </div>
      </div>

      <CreateWebsiteModal 
        isOpen={isModalOpen} 
        onClose={handleAddWebsite}
      />
    </div>
  );
}