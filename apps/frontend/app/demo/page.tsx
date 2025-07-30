"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { trendingWebsites } from "@/utils/Data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
  Activity, 
  Globe, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  RefreshCw,
  Timer,
  MapPin,
  Signal,
  Gauge
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface Site {
  name: string;
  url: string;
  category?: string;
  latency?: number;
}

const categories = [
  "All",
  "Search Engine",
  "Social Media",
  "E-commerce",
  "News",
  "Banking",
  "Entertainment",
  "Utility",
];

const categorizedWebsites = trendingWebsites.map((site: Site) => ({
  ...site,
  category:
    site.name.includes("Google") || site.name.includes("Bing")
      ? "Search Engine"
      : site.name.includes("Facebook") ||
          site.name.includes("Instagram") ||
          site.name.includes("X") ||
          site.name.includes("Reddit") ||
          site.name.includes("LinkedIn")
        ? "Social Media"
        : site.name.includes("Flipkart") ||
            site.name.includes("Amazon") ||
            site.name.includes("Myntra") ||
            site.name.includes("Paytm")
          ? "E-commerce"
          : site.name.includes("Times") ||
              site.name.includes("News") ||
              site.name.includes("Express") ||
              site.name.includes("Hindustan")
            ? "News"
            : site.name.includes("SBI") || site.name.includes("HDFC")
              ? "Banking"
              : site.name.includes("Netflix") ||
                  site.name.includes("Hotstar") ||
                  site.name.includes("BookMyShow")
                ? "Entertainment"
                : "Utility",
}));

const Page = () => {
  const [websitesLatency, setWebsitesLatency] = useState<Site[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [chartType, setChartType] = useState<'bar' | 'doughnut' | 'line'>('bar');

  async function fetchLatency() {
    setLoading(true);
    const results = await Promise.all(
      categorizedWebsites.map(async (site) => {
        const start = performance.now();
        try {
          await fetch(site.url, { mode: "no-cors" });
        } catch (error) {
          console.error(`Error fetching ${site.url}:`, error);
        }
        const latency = performance.now() - start;
        return { ...site, latency: Math.round(latency) };
      })
    );
    setWebsitesLatency(results);
    setLoading(false);
    toast.success("Latency data fetched successfully");
  }

  useEffect(() => {
    fetchLatency();
  }, []);

  const filteredWebsites =
    selectedCategory === "All"
      ? websitesLatency
      : websitesLatency.filter((site) => site.category === selectedCategory);

  const averageLatency =
    filteredWebsites.length > 0
      ? (
          filteredWebsites.reduce((acc, site) => acc + (site.latency || 0), 0) /
          filteredWebsites.length
        ).toFixed(2)
      : 0;

  // Chart data and configurations

  const categoryData = categories.filter(cat => cat !== 'All').map(category => {
    const sitesInCategory = websitesLatency.filter(site => site.category === category);
    const avgLatency = sitesInCategory.length > 0 
      ? sitesInCategory.reduce((acc, site) => acc + (site.latency || 0), 0) / sitesInCategory.length 
      : 0;
    return {
      category,
      count: sitesInCategory.length,
      avgLatency: Math.round(avgLatency)
    };
  });

  const chartColors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(147, 51, 234, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(6, 182, 212, 0.8)',
  ];

  const barChartData = {
    labels: filteredWebsites.slice(0, 10).map(site => site.name),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: filteredWebsites.slice(0, 10).map(site => site.latency || 0),
        backgroundColor: chartColors[0],
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const doughnutChartData = {
    labels: categoryData.map(cat => cat.category),
    datasets: [
      {
        label: 'Sites per Category',
        data: categoryData.map(cat => cat.count),
        backgroundColor: chartColors,
        borderColor: chartColors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const lineChartData = {
    labels: categoryData.map(cat => cat.category),
    datasets: [
      {
        label: 'Average Latency (ms)',
        data: categoryData.map(cat => cat.avgLatency),
        borderColor: 'rgba(147, 51, 234, 1)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(var(--foreground))',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: chartType !== 'doughnut' ? {
      x: {
        grid: {
          color: 'hsl(var(--border))',
          lineWidth: 0.5,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'hsl(var(--border))',
          lineWidth: 0.5,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11,
          },
        },
      },
    } : {},
  };

  const getLatencyStatus = (latency: number) => {
    if (latency < 200) return { status: 'Excellent', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (latency < 500) return { status: 'Good', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (latency < 1000) return { status: 'Average', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    if (latency < 2000) return { status: 'Slow', color: 'text-orange-500', bg: 'bg-orange-500/10' };
    return { status: 'Poor', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const statsData = [
    {
      label: "Total Sites",
      value: websitesLatency.length,
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
    },
    {
      label: "Avg Response",
      value: `${averageLatency}ms`,
      icon: Timer,
      color: "from-purple-500 to-purple-600",
      change: "-5%",
    },
    {
      label: "Fastest Site",
      value: websitesLatency.length > 0 ? `${Math.min(...websitesLatency.map(s => s.latency || 0))}ms` : "0ms",
      icon: Zap,
      color: "from-green-500 to-green-600",
      change: "-8ms",
    },
    {
      label: "Categories",
      value: categories.length - 1,
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      change: "stable",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden -mt-20">
      {/* Enhanced background with theme-aware gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-background to-purple-500/[0.02] dark:from-blue-500/[0.08] dark:to-purple-500/[0.08]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-400/30 dark:to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-600/10 dark:from-purple-400/30 dark:to-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-pink-600/10 dark:from-pink-400/30 dark:to-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/90 dark:bg-background/70 backdrop-blur-xl border border-border/60 dark:border-border/40 shadow-lg ring-1 ring-white/20 dark:ring-white/10">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                </div>
                <span className="text-sm font-medium">Real-time Monitoring Demo</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Website Performance
              </span>
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Analytics Dashboard
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Explore real-time latency data from popular Indian websites with beautiful charts and insights
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <Card key={i} className="group relative p-6 bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/40 dark:border-border/30 hover:border-border/60 dark:hover:border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.color} opacity-5 rounded-lg`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-background/50">
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/40 dark:border-border/30 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-60 bg-background/80 border-border/60">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {category}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 p-1 bg-background/50 rounded-lg border border-border/30">
                <Button
                  variant={chartType === 'bar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className="px-3"
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'doughnut' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('doughnut')}
                  className="px-3"
                >
                  <PieChart className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'line' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className="px-3"
                >
                  <TrendingUp className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={fetchLatency}
              disabled={loading}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
              {loading ? "Fetching..." : "Refresh Data"}
            </Button>
          </div>

          {/* Chart Section */}
          <Card className="p-8 bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/40 dark:border-border/30 shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Performance Analytics</h3>
                  <p className="text-muted-foreground">
                    {chartType === 'bar' && 'Top 10 websites by response time'}
                    {chartType === 'doughnut' && 'Distribution of websites by category'}
                    {chartType === 'line' && 'Average latency trends across categories'}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-border/30">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Live Data</span>
                </div>
              </div>

              <div className="h-96 relative">
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="space-y-4 text-center">
                      <div className="w-12 h-12 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-muted-foreground">Loading chart data...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {chartType === 'bar' && <Bar data={barChartData} options={chartOptions} />}
                    {chartType === 'doughnut' && <Doughnut data={doughnutChartData} options={chartOptions} />}
                    {chartType === 'line' && <Line data={lineChartData} options={chartOptions} />}
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Website Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Website Status</h3>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/30">
                <Signal className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {filteredWebsites.length} sites monitored
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading && [...Array(8)].map((_, i) => (
                <Card key={i} className="p-4 bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/40 dark:border-border/30">
                  <Skeleton className="h-20 w-full" />
                </Card>
              ))}
              
              {filteredWebsites.map((site, i) => {
                const status = getLatencyStatus(site.latency || 0);
                return (
                  <Card
                    key={site.url}
                    className="group p-4 bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/40 dark:border-border/30 hover:border-border/60 dark:hover:border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {site.name}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {site.category}
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                          {status.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-4 h-4 text-muted-foreground" />
                          <span className="text-lg font-bold">{site.latency}ms</span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      
                      <div className="w-full bg-border/30 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${status.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${Math.min((site.latency || 0) / 20, 100)}%`,
                            animationDelay: `${i * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;