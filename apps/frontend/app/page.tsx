import React from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Shield, Clock, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
              <Clock className="w-4 h-4" />
              Real-time Monitoring
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              Monitor Your Websites
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                24/7 Uptime Tracking
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Keep your websites running smoothly with real-time monitoring, instant alerts, and detailed analytics. 
              Never miss downtime again.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 group">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 hover:bg-muted/50">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-blue-500/30 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-muted-foreground">
              Monitor your websites every minute with instant notifications when something goes wrong.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-purple-500/30 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">99.9% Reliability</h3>
            <p className="text-muted-foreground">
              Our monitoring infrastructure ensures reliable uptime tracking from multiple locations worldwide.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-green-500/30 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
            <p className="text-muted-foreground">
              Get comprehensive insights into your website performance with detailed reports and analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial/Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">&lt; 1s</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">10k+</div>
              <div className="text-sm text-muted-foreground">Websites</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page