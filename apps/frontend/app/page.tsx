"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Shield, BarChart3, ArrowRight, CheckCircle, Zap, Globe, Users, TrendingUp, Star, Activity, Bell, Eye, Smartphone, Mail, Slack, Gauge, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

const Page = () => {

  const router = useRouter();
  const {getToken} = useAuth();
  const handleSignIn = async () => {
    const token = await getToken();
    if (token) {
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden -mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-background to-purple-500/[0.02] dark:from-blue-500/[0.08] dark:to-purple-500/[0.08]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-400/30 dark:to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-600/10 dark:from-purple-400/30 dark:to-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-pink-600/10 dark:from-pink-400/30 dark:to-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-60 animate-blob animation-delay-4000"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/[0.01] to-transparent dark:via-blue-400/[0.03] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/[0.01] to-transparent dark:via-purple-400/[0.03] animate-pulse-slow animation-delay-3000"></div>
      <section className="container mx-auto px-6 py-32 text-center relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/90 dark:bg-background/70 backdrop-blur-xl border border-border/60 dark:border-border/40 shadow-2xl dark:shadow-2xl ring-1 ring-white/20 dark:ring-white/10 hover:scale-105 transition-all duration-500 group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-25 animate-pulse scale-150"></div>
              </div>
              <span className="text-sm font-medium text-foreground">Live Monitoring Active</span>
            </div>
            <div className="w-px h-4 bg-gradient-to-b from-transparent via-border/60 to-transparent"></div>
            <span className="text-xs text-muted-foreground font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">99.9% Uptime</span>
          </div>
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Website Uptime
              </span>
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-2xl">
                Monitoring
              </span>
              <span className="block text-2xl md:text-4xl font-normal text-muted-foreground mt-6 opacity-90">
                that{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">actually works</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg rounded-lg transform rotate-1"></div>
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Monitor your websites with{' '}
              <span className="relative text-foreground font-medium">
                real-time alerts
              </span>, 
              beautiful dashboards, and{' '}
              <span className="relative text-foreground font-medium">
                detailed analytics
              </span>. 
              Get notified instantly when something goes wrong.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="relative group cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/40 transition-all duration-500 text-lg px-10 py-7 rounded-2xl border border-white/20 overflow-hidden hover:scale-105"
              onClick={() => handleSignIn()}
            >
              {/* Enhanced animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <Zap className="w-5 h-5 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 font-semibold">Start Monitoring Free</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-border/40 hover:border-border/80 dark:hover:border-border/60 bg-background/90 dark:bg-background/70 backdrop-blur-xl hover:bg-background/95 dark:hover:bg-background/80 text-lg px-10 py-7 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              View Live Demo
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 pt-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3 text-sm group">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-200" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              <span className="font-medium">4.9/5 on reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm group">
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">50,000+ websites monitored</span>
            </div>
            <div className="flex items-center gap-2 text-sm group">
              <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Enterprise security</span>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce group cursor-pointer">
          <div className="w-6 h-10 border border-border/60 dark:border-border/40 rounded-full flex justify-center p-1 bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full animate-pulse group-hover:scale-110 transition-transform"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Dashboard Preview Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Enhanced dashboard mockup container with improved glass effect */}
            <div className="relative bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 rounded-3xl p-8 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-500">
              {/* Enhanced gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] dark:from-blue-400/[0.08] dark:to-purple-400/[0.08] rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] dark:via-white/[0.05] dark:to-white/[0.02] rounded-3xl"></div>
              
              {/* Mock dashboard content with enhanced styling */}
              <div className="relative space-y-6">
                {/* Enhanced mock header */}
                <div className="flex items-center justify-between pb-6 border-b border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-lg">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">All systems operational</span>
                  </div>
                </div>
                
                {/* Enhanced mock stats with hover effects */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Sites", value: "12", color: "blue", icon: Globe },
                    { label: "Operational", value: "12", color: "green", icon: CheckCircle },
                    { label: "Avg Uptime", value: "99.9%", color: "purple", icon: TrendingUp },
                    { label: "Avg Latency", value: "245ms", color: "orange", icon: Gauge }
                  ].map((stat, i) => (
                    <div key={i} className="bg-background/60 dark:bg-background/40 backdrop-blur-sm border border-border/40 dark:border-border/30 rounded-xl p-4 hover:scale-105 transition-all duration-300 group/stat">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                        <stat.icon className="w-4 h-4 text-muted-foreground group-hover/stat:scale-110 transition-transform" />
                      </div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className={`h-1 w-full rounded-full mt-2 bg-gradient-to-r ${
                        stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                        stat.color === 'green' ? 'from-green-500 to-green-600' :
                        stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                        'from-orange-500 to-orange-600'
                      } opacity-30 group-hover/stat:opacity-60 transition-opacity`}></div>
                    </div>
                  ))}
                </div>
                
                {/* Enhanced mock website cards */}
                <div className="space-y-3">
                  {[
                    { name: "example.com", status: "good", location: "Global" },
                    { name: "mywebsite.io", status: "good", location: "US East" },
                    { name: "app.startup.com", status: "good", location: "EU West" }
                  ].map((site, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-background/60 dark:bg-background/40 backdrop-blur-sm border border-border/40 dark:border-border/30 rounded-xl hover:scale-[1.02] transition-all duration-300 group/site">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full relative">
                          <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                        </div>
                        <div>
                          <span className="font-medium">{site.name}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {site.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, j) => (
                          <div 
                            key={j} 
                            className="w-6 h-2 bg-green-500 rounded-full opacity-80 group-hover/site:opacity-100 transition-all duration-300 hover:scale-110" 
                            style={{ animationDelay: `${j * 50}ms` }}
                          ></div>
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
                  {/* Enhanced icon container with glow effect */}
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 bg-gradient-to-br ${
                    feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"></div>
                    <feature.icon className="w-8 h-8 text-white relative z-10 group-hover:rotate-6 transition-transform duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-green-500 to-green-600'
                    } blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-150`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-foreground transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 font-light group-hover:text-foreground/80 transition-colors">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    {feature.features.map((item, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/70 transition-all duration-300" style={{ animationDelay: `${j * 100}ms` }}>
                        <div className="relative">
                          <CheckCircle className={`w-4 h-4 ${
                            feature.color === 'blue' ? 'text-blue-500' :
                            feature.color === 'purple' ? 'text-purple-500' :
                            'text-green-500'
                          } group-hover:scale-110 transition-transform duration-300`} />
                          <div className={`absolute inset-0 w-4 h-4 ${
                            feature.color === 'blue' ? 'bg-blue-500' :
                            feature.color === 'purple' ? 'bg-purple-500' :
                            'bg-green-500'
                          } blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full`}></div>
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background/90 dark:bg-background/70 backdrop-blur-xl border border-border/60 dark:border-border/40 shadow-lg ring-1 ring-white/20 dark:ring-white/10 mb-8 hover:scale-105 transition-all duration-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">Simple, transparent pricing</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Choose your plan
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
              Start free and scale as you grow. All plans include our core monitoring features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                description: "Perfect for personal projects and small websites",
                popular: false,
                color: "blue",
                features: [
                  "Up to 5 websites",
                  "5-minute monitoring intervals",
                  "Email notifications",
                  "Basic uptime reporting",
                  "24/7 monitoring",
                  "SSL certificate monitoring",
                  "1 month data retention"
                ],
                limitations: ["Limited to 5 websites", "5-minute intervals only", "Basic support"],
                cta: "Get Started Free",
                ctaVariant: "outline" as const
              },
              {
                name: "Professional",
                price: "$29",
                period: "per month",
                description: "Ideal for growing businesses and development teams",
                popular: true,
                color: "purple",
                features: [
                  "Up to 50 websites",
                  "1-minute monitoring intervals",
                  "Multi-channel notifications",
                  "Advanced analytics & reports",
                  "Status pages",
                  "API access",
                  "Custom alert escalation",
                  "12 months data retention",
                  "Priority support"
                ],
                limitations: [],
                cta: "Start Pro Trial",
                ctaVariant: "default" as const
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "per month",
                description: "Advanced monitoring for large organizations",
                popular: false,
                color: "gradient",
                features: [
                  "Unlimited websites",
                  "30-second monitoring intervals",
                  "Custom integrations",
                  "White-label solutions",
                  "Advanced user management",
                  "SLA guarantees",
                  "Dedicated success manager",
                  "Unlimited data retention",
                  "24/7 phone support"
                ],
                limitations: [],
                cta: "Contact Sales",
                ctaVariant: "outline" as const
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`group relative rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'scale-105 z-10' 
                    : 'hover:scale-105'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  </div>
                )}

                {/* Card container */}
                <div className={`relative p-8 h-full rounded-3xl backdrop-blur-xl border shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  plan.popular
                    ? 'bg-background/80 dark:bg-background/60 border-purple-500/30 hover:border-purple-500/50 shadow-purple-500/20 hover:shadow-purple-500/30'
                    : 'bg-background/60 dark:bg-background/40 border-border/40 dark:border-border/30 hover:border-border/60 dark:hover:border-border/50'
                }`}>
                  
                  {/* Background gradient effects */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${
                    plan.color === 'blue' ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5' :
                    plan.color === 'purple' ? 'bg-gradient-to-br from-purple-500/10 to-purple-600/5' :
                    'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10'
                  }`}></div>

                  {/* Enhanced glow for popular plan */}
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-pink-500/20 rounded-3xl"></div>
                  )}

                  <div className="relative">
                    {/* Plan header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className={`text-5xl font-bold ${
                          plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent' : ''
                        }`}>
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground text-lg">/{plan.period}</span>
                      </div>
                      {plan.name === "Professional" && (
                        <div className="text-sm text-muted-foreground">
                          <span className="line-through opacity-60">$39/month</span>
                          <span className="ml-2 text-green-600 dark:text-green-400 font-medium">Save 26%</span>
                        </div>
                      )}
                    </div>

                    {/* Features list */}
                    <div className="mb-8 space-y-4">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3 text-sm group/feature">
                          <div className="relative mt-0.5">
                            <CheckCircle className={`w-4 h-4 ${
                              plan.color === 'blue' ? 'text-blue-500' :
                              plan.color === 'purple' ? 'text-purple-500' :
                              'text-gradient-to-r from-purple-500 to-pink-500'
                            } group-hover/feature:scale-110 transition-transform duration-300`} />
                            <div className={`absolute inset-0 w-4 h-4 ${
                              plan.color === 'blue' ? 'bg-blue-500' :
                              plan.color === 'purple' ? 'bg-purple-500' :
                              'bg-purple-500'
                            } blur-sm opacity-0 group-hover/feature:opacity-40 transition-opacity duration-300 rounded-full`}></div>
                          </div>
                          <span className="text-foreground/90 group-hover/feature:text-foreground transition-colors duration-300 group-hover/feature:translate-x-1">
                            {feature}
                          </span>
                        </div>
                      ))}
                      
                      {/* Limitations for free plan */}
                      {plan.limitations.length > 0 && (
                        <div className="pt-4 border-t border-border/30">
                          <div className="text-xs text-muted-foreground mb-2 font-medium">Limitations:</div>
                          {plan.limitations.map((limitation, j) => (
                            <div key={j} className="flex items-start gap-3 text-xs text-muted-foreground">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 opacity-60"></div>
                              <span>{limitation}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full relative group/btn transition-all duration-500 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 hover:from-purple-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-400/40 border border-white/20' 
                          : ''
                      } ${
                        plan.ctaVariant === 'outline' 
                          ? 'hover:scale-105' 
                          : 'hover:scale-105'
                      }`}
                      variant={plan.popular ? undefined : plan.ctaVariant}
                      size="lg"
                    >
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-md"></div>
                      )}
                      <span className="relative z-10 font-semibold">{plan.cta}</span>
                      {plan.name !== "Enterprise" && (
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                      )}
                    </Button>

                    {/* Additional info for enterprise */}
                    {plan.name === "Enterprise" && (
                      <div className="text-center mt-4 text-xs text-muted-foreground">
                        Custom pricing available for larger teams
                      </div>
                    )}
                  </div>

                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] dark:via-white/[0.05] dark:to-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional pricing info */}
          <div className="text-center mt-16 space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 group">
                <CheckCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                <span>14-day free trial on all paid plans</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Shield className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Clock className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                <span>Cancel anytime</span>
              </div>
            </div>
            
            <div className="text-muted-foreground text-sm">
              Need custom features or enterprise-grade SLAs?{' '}
              <Button variant="link" className="p-0 h-auto text-sm underline-offset-4 hover:text-foreground transition-colors">
                Contact our sales team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Integrations Section */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Integrates with your tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 font-light opacity-90">
            Connect with the services you already use and love
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              { name: "Email", icon: Mail, color: "from-blue-500 to-blue-600" },
              { name: "SMS", icon: Smartphone, color: "from-green-500 to-green-600" },
              { name: "Slack", icon: Slack, color: "from-purple-500 to-purple-600" },
              { name: "Webhooks", icon: Activity, color: "from-orange-500 to-orange-600" },
              { name: "Teams", icon: Users, color: "from-indigo-500 to-indigo-600" },
              { name: "Discord", icon: Globe, color: "from-violet-500 to-violet-600" }
            ].map((integration, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/50 dark:border-border/30 hover:border-border/80 dark:hover:border-border/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl"></div>
                  <integration.icon className="w-6 h-6 text-white relative z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150`}></div>
                </div>
                <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">{integration.name}</div>
                
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-16 rounded-3xl bg-background/70 dark:bg-background/50 backdrop-blur-2xl border border-border/60 dark:border-border/40 shadow-2xl ring-1 ring-white/20 dark:ring-white/10 overflow-hidden group hover:shadow-3xl transition-all duration-700">
            {/* Enhanced background effects with improved dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-purple-500/[0.03] to-pink-500/[0.06] dark:from-blue-400/[0.12] dark:via-purple-400/[0.06] dark:to-pink-400/[0.12] rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-transparent to-white/[0.03] dark:from-white/[0.06] dark:to-white/[0.06] rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/[0.01] to-transparent dark:via-blue-400/[0.03] rounded-3xl animate-pulse-slow"></div>
            
            <div className="relative space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    Start monitoring
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                    in 30 seconds
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light opacity-90">
                  Join thousands of businesses keeping their websites online 24/7 with our reliable monitoring
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="relative group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-blue-500/40 dark:hover:shadow-blue-400/50 transition-all duration-500 text-lg px-10 py-7 rounded-2xl border border-white/20 overflow-hidden hover:scale-105"
                  asChild
                >
                  <Link href="/dashboard">
                    {/* Enhanced animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <Zap className="w-5 h-5 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10 font-semibold">Get Started Free</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 border-border/50 dark:border-border/30 hover:border-border/80 dark:hover:border-border/60 bg-background/90 dark:bg-background/70 backdrop-blur-xl hover:bg-background/95 dark:hover:bg-background/80 text-lg px-10 py-7 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Contact Sales
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground opacity-80 hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No credit card required
                </span>
                <span className="mx-2 opacity-50">•</span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Free 14-day trial
                </span>
                <span className="mx-2 opacity-50">•</span>
                <span className="inline-flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  Cancel anytime
                </span>
              </div>
            </div>
            
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] dark:via-white/[0.05] dark:to-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page