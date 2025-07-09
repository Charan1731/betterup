import React from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Shield, Clock, BarChart3, ArrowRight, CheckCircle, Zap, Globe, Users, TrendingUp, Star, ChevronDown } from 'lucide-react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              Real-time Monitoring
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Monitor Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 bg-clip-text text-transparent animate-gradient-x">
                Websites 24/7
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Never miss downtime again with our powerful monitoring platform. 
              <span className="text-foreground font-semibold">Real-time alerts</span>, 
              <span className="text-foreground font-semibold"> detailed analytics</span>, and 
              <span className="text-foreground font-semibold"> global monitoring</span> 
              from multiple locations worldwide.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group text-lg px-8 py-6 rounded-xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 hover:bg-muted/50 backdrop-blur-sm text-lg px-8 py-6 rounded-xl group">
              <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View Live Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-60">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">50,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to keep your websites running smoothly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors">Real-time Monitoring</h3>
            <p className="text-muted-foreground leading-relaxed">
              Monitor your websites every minute with instant notifications when something goes wrong. Get detailed insights into performance metrics.
            </p>
            <div className="mt-6 flex items-center gap-2 text-blue-500 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">1-minute intervals</span>
            </div>
          </div>

          <div className="group p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-500 transition-colors">99.9% Reliability</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our monitoring infrastructure ensures reliable uptime tracking from multiple locations worldwide with enterprise-grade reliability.
            </p>
            <div className="mt-6 flex items-center gap-2 text-purple-500 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Global network</span>
            </div>
          </div>

          <div className="group p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-green-500 transition-colors">Detailed Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get comprehensive insights into your website performance with detailed reports, trends, and historical data analysis.
            </p>
            <div className="mt-6 flex items-center gap-2 text-green-500 font-medium">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Custom reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Trusted Worldwide
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-muted-foreground font-medium">Uptime Guarantee</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">&lt; 500ms</div>
              <div className="text-muted-foreground font-medium">Response Time</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-muted-foreground font-medium">Monitoring</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">50k+</div>
              <div className="text-muted-foreground font-medium">Websites</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-border/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Get Started Today
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Ready to Monitor
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Your Websites?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of businesses already using our platform to ensure their websites stay online 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group text-lg px-8 py-6 rounded-xl">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-2 hover:bg-muted/50 backdrop-blur-sm text-lg px-8 py-6 rounded-xl">
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page