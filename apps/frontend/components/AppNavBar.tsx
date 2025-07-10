'use client';
import React from 'react'
import Link from 'next/link'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import { Activity, Monitor, Zap, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AppNavBar = () => {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 w-auto">
      <nav className="relative bg-background/80 backdrop-blur-2xl border border-border/40 rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/40 supports-[backdrop-filter]:bg-background/60 overflow-hidden group">
        {/* Enhanced glass effect overlay with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/4 to-pink-500/8 pointer-events-none rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none rounded-3xl" />
        
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        <div className="relative container mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo/Brand Section */}
            <Link href="/" className="flex items-center gap-4 hover:scale-105 transition-all duration-300 group/logo">
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover/logo:opacity-80 transition-opacity duration-300"></div>
                
                {/* Main logo container */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl ring-2 ring-white/30 group-hover/logo:ring-white/50 transition-all duration-300">
                  <Monitor className="w-6 h-6 group-hover/logo:rotate-12 transition-transform duration-300" />
                  
                  {/* Pulse indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent group-hover/logo:from-blue-600 group-hover/logo:to-purple-600 transition-all duration-300">
                    Uptime Monitor
                  </h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <Activity className="w-3.5 h-3.5 text-green-500 animate-pulse" />
                        <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-green-500 font-semibold">Live</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground/40 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-medium">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Enhanced Action Section */}
            <div className="flex items-center gap-4">
              {/* Theme toggle with enhanced styling */}
              <div className="relative">
                <ThemeToggle />
              </div>
              
              {/* Enhanced divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent"></div>
              
              {/* Authentication buttons */}
              <div className="flex items-center gap-3">
                <SignedOut>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative backdrop-blur-sm bg-background/30 hover:bg-background/50 border border-border/40 hover:border-border/60 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group/signin" 
                    asChild
                  >
                    <SignInButton mode="modal">
                      <span className="font-medium relative z-10">Sign In</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover/signin:opacity-100 transition-opacity duration-300"></div>
                    </SignInButton>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 rounded-xl px-6 hover:scale-105 group/signup overflow-hidden" 
                    asChild
                  >
                    <SignUpButton mode="modal">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/signup:translate-x-full transition-transform duration-700"></div>
                      
                      <Zap className="w-4 h-4 mr-2 relative z-10" />
                      <span className="font-semibold relative z-10">Get Started</span>
                    </SignUpButton>
                  </Button>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="relative text-muted-foreground hover:text-foreground backdrop-blur-sm bg-background/30 hover:bg-background/50 border border-border/40 hover:border-border/60 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group/dashboard" 
                      asChild
                    >
                      <Link href="/dashboard">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover/dashboard:opacity-100 transition-opacity duration-300"></div>
                        <BarChart3 className="w-4 h-4 mr-2 relative z-10" />
                        <span className="font-medium relative z-10">Dashboard</span>
                      </Link>
                    </Button>
                    
                    {/* Enhanced user button with glow effect */}
                    <div className="relative group/user">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg opacity-0 group-hover/user:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative ring-2 ring-gradient-to-r ring-blue-500/40 hover:ring-blue-500/60 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-9 h-9 ring-0 hover:shadow-xl transition-all duration-300"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
      </nav>
    </div>
  )
}

export default AppNavBar