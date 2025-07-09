'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Monitor, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  BarChart3, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Activity,
  X,
  Save
} from 'lucide-react'

// Mock data for demonstration
const mockWebsites = [
  {
    id: 1,
    name: "My E-commerce Store",
    url: "https://shop.example.com",
    status: "online",
    uptime: 99.98,
    responseTime: 245,
    lastChecked: "2 minutes ago",
    uptimeTicks: [true, true, true, true, true, true, true, false, true, true], // last 30 minutes (each tick = 3 minutes)
  },
  {
    id: 2,
    name: "Company Blog",
    url: "https://blog.company.com",
    status: "online",
    uptime: 100,
    responseTime: 180,
    lastChecked: "1 minute ago",
    uptimeTicks: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: 3,
    name: "API Gateway",
    url: "https://api.example.com",
    status: "offline",
    uptime: 98.5,
    responseTime: 0,
    lastChecked: "30 seconds ago",
    uptimeTicks: [true, true, false, false, true, true, true, true, false, false],
  },
  {
    id: 4,
    name: "Marketing Landing",
    url: "https://landing.marketing.com",
    status: "online",
    uptime: 99.95,
    responseTime: 320,
    lastChecked: "1 minute ago",
    uptimeTicks: [true, true, true, true, true, true, true, true, false, true],
  },
]

const StatusCircle = ({ status }: { status: string }) => {
  const isOnline = status === 'online'
  return (
    <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} shadow-lg ${isOnline ? 'shadow-green-500/30' : 'shadow-red-500/30'} animate-pulse`}>
      <div className={`w-full h-full rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} opacity-60 animate-ping`}></div>
    </div>
  )
}

const UptimeTicks = ({ ticks }: { ticks: boolean[] }) => {
  return (
    <div className="flex gap-1">
      {ticks.map((isUp, index) => (
        <div
          key={index}
          className={`w-6 h-8 rounded-sm ${
            isUp 
              ? 'bg-gradient-to-t from-green-500 to-green-400 shadow-sm shadow-green-500/30' 
              : 'bg-gradient-to-t from-red-500 to-red-400 shadow-sm shadow-red-500/30'
          } transition-all duration-200 hover:scale-110`}
          title={`${index * 3}-${(index + 1) * 3} minutes ago: ${isUp ? 'Online' : 'Offline'}`}
        />
      ))}
    </div>
  )
}

const AddWebsiteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    interval: '60', // seconds
    timeout: '30', // seconds
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Website name is required'
    }

    if (!formData.url.trim()) {
      newErrors.url = 'Website URL is required'
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = 'Please enter a valid URL'
      }
    }

    if (!formData.interval || parseInt(formData.interval) < 30) {
      newErrors.interval = 'Interval must be at least 30 seconds'
    }

    if (!formData.timeout || parseInt(formData.timeout) < 5) {
      newErrors.timeout = 'Timeout must be at least 5 seconds'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Adding website:', formData)
    
    // Reset form and close modal
    setFormData({ name: '', url: '', interval: '60', timeout: '30' })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-background/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-border/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Add New Website
                </h2>
                <p className="text-muted-foreground">Start monitoring a new website for uptime and performance</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Website Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Website Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., My E-commerce Store"
                className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${
                  errors.name ? 'border-red-500' : 'border-border/50'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-sm text-foreground placeholder:text-muted-foreground`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Website URL */}
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-foreground">
                Website URL *
              </label>
              <input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
                className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${
                  errors.url ? 'border-red-500' : 'border-border/50'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-sm text-foreground placeholder:text-muted-foreground`}
              />
              {errors.url && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.url}
                </p>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check Interval */}
              <div className="space-y-2">
                <label htmlFor="interval" className="text-sm font-medium text-foreground">
                  Check Interval (seconds)
                </label>
                <select
                  id="interval"
                  value={formData.interval}
                  onChange={(e) => handleInputChange('interval', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${
                    errors.interval ? 'border-red-500' : 'border-border/50'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-sm text-foreground`}
                >
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="300">5 minutes</option>
                  <option value="600">10 minutes</option>
                  <option value="1800">30 minutes</option>
                </select>
                {errors.interval && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.interval}
                  </p>
                )}
              </div>

              {/* Timeout */}
              <div className="space-y-2">
                <label htmlFor="timeout" className="text-sm font-medium text-foreground">
                  Timeout (seconds)
                </label>
                <select
                  id="timeout"
                  value={formData.timeout}
                  onChange={(e) => handleInputChange('timeout', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${
                    errors.timeout ? 'border-red-500' : 'border-border/50'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-sm text-foreground`}
                >
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                </select>
                {errors.timeout && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.timeout}
                  </p>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Activity className="w-3 h-3 text-blue-500" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Monitoring will start immediately</p>
                  <p>We'll check your website's availability and response time at the specified interval. You'll receive instant alerts if any issues are detected.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 border-2 hover:bg-muted/50 backdrop-blur-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Adding Website...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add Website
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const WebsiteCard = ({ website }: { website: typeof mockWebsites[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isOnline = website.status === 'online'

  return (
    <div className="group p-6 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 backdrop-blur-sm">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Header */}
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${isOnline ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <StatusCircle status={website.status} />
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
                {website.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>{website.url}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right space-y-1">
              <div className={`text-lg font-bold transition-colors duration-300 ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                {website.uptime}% uptime
              </div>
              <div className="text-sm text-muted-foreground">
                Last checked {website.lastChecked}
              </div>
            </div>
            
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 group-hover:bg-blue-500/10 transition-all duration-300">
              <div className={`transform transition-transform duration-500 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Content */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className={`transform transition-all duration-500 ease-out ${isExpanded ? 'translate-y-0' : '-translate-y-4'}`}>
            <div className="pt-6 border-t border-border/30 space-y-6">
              {/* Stats Row */}
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-600 ease-out ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`} style={{ transitionDelay: isExpanded ? '200ms' : '0ms' }}>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                      <div className="text-lg font-bold text-green-500">{website.uptime}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                      <div className="text-lg font-bold text-blue-500">
                        {isOnline ? `${website.responseTime}ms` : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-2xl bg-gradient-to-br transition-all duration-300 hover:scale-105 ${isOnline ? 'from-green-500/10 to-green-600/5 border-green-500/20' : 'from-red-500/10 to-red-600/5 border-red-500/20'} border`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${isOnline ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center`}>
                      {isOnline ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className={`text-lg font-bold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uptime Visualization */}
              <div className={`space-y-4 transition-all duration-600 ease-out ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`} style={{ transitionDelay: isExpanded ? '400ms' : '0ms' }}>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Last 30 Minutes</h4>
                  <div className="text-sm text-muted-foreground">Each bar = 3 minutes</div>
                </div>
                
                <div className="p-4 rounded-2xl bg-muted/20 border border-border/30 transition-all duration-300 hover:bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">30 min ago</span>
                    <span className="text-sm text-muted-foreground">Now</span>
                  </div>
                  <div className={`transition-all duration-500 ease-out ${isExpanded ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'}`} style={{ transitionDelay: isExpanded ? '600ms' : '0ms' }}>
                    <UptimeTicks ticks={website.uptimeTicks} />
                  </div>
                  <div className={`flex items-center gap-6 mt-4 text-sm transition-all duration-500 ease-out ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-1'}`} style={{ transitionDelay: isExpanded ? '700ms' : '0ms' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span className="text-muted-foreground">Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-red-500"></div>
                      <span className="text-muted-foreground">Offline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const totalWebsites = mockWebsites.length
  const onlineWebsites = mockWebsites.filter(w => w.status === 'online').length
  const avgUptime = mockWebsites.reduce((acc, w) => acc + w.uptime, 0) / totalWebsites
  const avgResponseTime = mockWebsites
    .filter(w => w.status === 'online')
    .reduce((acc, w) => acc + w.responseTime, 0) / onlineWebsites

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Monitor your websites in real-time
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">{totalWebsites}</div>
                <div className="text-sm text-muted-foreground">Total Websites</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">{onlineWebsites}</div>
                <div className="text-sm text-muted-foreground">Online</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">{avgUptime.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Avg Uptime</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">{Math.round(avgResponseTime)}ms</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Website Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Your Websites
          </h2>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            Add Website
          </Button>
        </div>

        {/* Website List */}
        <div className="space-y-6">
          {mockWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>

        {/* Empty State (if no websites) */}
        {mockWebsites.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center mx-auto mb-6">
              <Monitor className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No websites yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start monitoring your websites by adding your first one. We'll keep track of its uptime and performance.
            </p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Add Your First Website
            </Button>
          </div>
        )}
      </div>

      {/* Add Website Modal */}
      <AddWebsiteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default Dashboard