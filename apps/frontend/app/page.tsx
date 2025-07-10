import React from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Shield, Clock, BarChart3, ArrowRight, CheckCircle, Zap, Globe, Users, TrendingUp, Star, ChevronDown, Activity, Bell, Eye, Smartphone, Mail, Slack } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-purple-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 text-center relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/80 backdrop-blur-xl border border-border/40 shadow-lg ring-1 ring-white/10">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
              </div>
              <span className="text-sm font-medium text-foreground">Live Monitoring Active</span>
            </div>
            <div className="w-px h-4 bg-border/60"></div>
            <span className="text-xs text-muted-foreground font-medium">99.9% Uptime</span>
          </div>
          
          {/* Main Headline */}
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Website Uptime
              </span>
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Monitoring
              </span>
              <span className="block text-2xl md:text-4xl font-normal text-muted-foreground mt-6">
                that actually works
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Monitor your websites with <span className="text-foreground font-medium">real-time alerts</span>, 
              beautiful dashboards, and <span className="text-foreground font-medium">detailed analytics</span>. 
              Get notified instantly when something goes wrong.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="relative group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 text-lg px-10 py-7 rounded-2xl border border-white/20 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <Zap className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10 font-semibold">Start Monitoring Free</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-border/40 hover:border-border/60 bg-background/80 backdrop-blur-xl hover:bg-background/90 text-lg px-10 py-7 rounded-2xl transition-all duration-300 hover:shadow-lg"
            >
              <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              View Live Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-12 pt-12 opacity-70">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5 on reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span className="font-medium">50,000+ websites monitored</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Enterprise security</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-border/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-muted-foreground rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Dashboard mockup container */}
            <div className="relative bg-background/60 backdrop-blur-2xl border border-border/40 rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
              
              {/* Mock dashboard content */}
              <div className="relative space-y-6">
                {/* Mock header */}
                <div className="flex items-center justify-between pb-6 border-b border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                    <span className="font-semibold text-lg">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">All systems operational</span>
                  </div>
                </div>
                
                {/* Mock stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Sites", value: "12", color: "blue" },
                    { label: "Operational", value: "12", color: "green" },
                    { label: "Avg Uptime", value: "99.9%", color: "purple" },
                    { label: "Avg Latency", value: "245ms", color: "orange" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-background/40 backdrop-blur-sm border border-border/30 rounded-xl p-4">
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-xl font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Mock website cards */}
                <div className="space-y-3">
                  {["example.com", "mywebsite.io", "app.startup.com"].map((site, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-background/40 backdrop-blur-sm border border-border/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{site}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, j) => (
                          <div key={j} className="w-6 h-2 bg-green-500 rounded-full opacity-80"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Everything you need
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
              Comprehensive monitoring tools designed for modern teams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "Real-time Monitoring",
                description: "Check your websites every minute from multiple global locations with instant notifications.",
                color: "blue",
                features: ["1-minute intervals", "Global checkpoints", "Instant alerts"]
              },
              {
                icon: BarChart3,
                title: "Beautiful Analytics",
                description: "Visualize your uptime data with intuitive charts and comprehensive historical reports.",
                color: "purple",
                features: ["Visual dashboards", "Historical data", "Custom reports"]
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Get notified via email, SMS, Slack, or webhooks the moment something goes wrong.",
                color: "green",
                features: ["Multi-channel alerts", "Smart routing", "Escalation policies"]
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border/40 hover:border-border/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                  feature.color === 'blue' ? 'from-blue-500/10 to-blue-600/5' :
                  feature.color === 'purple' ? 'from-purple-500/10 to-purple-600/5' :
                  'from-green-500/10 to-green-600/5'
                } rounded-3xl`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    feature.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    feature.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    'bg-gradient-to-br from-green-500 to-green-600'
                  }`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.features.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 ${
                          feature.color === 'blue' ? 'text-blue-500' :
                          feature.color === 'purple' ? 'text-purple-500' :
                          'text-green-500'
                        }`} />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Integrates with your tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 font-light">
            Connect with the services you already use
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              { name: "Email", icon: Mail },
              { name: "SMS", icon: Smartphone },
              { name: "Slack", icon: Slack },
              { name: "Webhooks", icon: Activity },
              { name: "Teams", icon: Users },
              { name: "Discord", icon: Globe }
            ].map((integration, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-border/40 hover:border-border/60 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <integration.icon className="w-6 h-6 text-foreground/70" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-16 rounded-3xl bg-background/60 backdrop-blur-2xl border border-border/40 shadow-2xl ring-1 ring-white/10 overflow-hidden">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 rounded-3xl"></div>
            
            <div className="relative space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Start monitoring
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    in 30 seconds
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                  Join thousands of businesses keeping their websites online 24/7
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="relative group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 text-lg px-10 py-7 rounded-2xl border border-white/20 overflow-hidden"
                  asChild
                >
                  <Link href="/dashboard">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <Zap className="w-5 h-5 mr-3 relative z-10" />
                    <span className="relative z-10 font-semibold">Get Started Free</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 border-border/40 hover:border-border/60 bg-background/80 backdrop-blur-xl hover:bg-background/90 text-lg px-10 py-7 rounded-2xl transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Contact Sales
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                No credit card required • Free 14-day trial • Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page