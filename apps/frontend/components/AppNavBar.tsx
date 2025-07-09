'use client';
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import { Activity, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AppNavBar = () => {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 w-auto">
      <nav className="bg-background/70 backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 supports-[backdrop-filter]:bg-background/50">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-2xl" />
        
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg ring-1 ring-white/20">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Uptime Monitor
                </h1>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-green-500 animate-pulse drop-shadow-sm" />
                  <span className="text-xs text-muted-foreground font-medium">Live</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <div className="h-6 w-px bg-border/60" />
              
              <div className="flex items-center gap-2">
                <SignedOut>
                  <Button variant="ghost" size="sm" className="backdrop-blur-sm bg-background/20 hover:bg-background/40 border border-border/30" asChild>
                    <SignInButton mode="modal" >
                      <span className="font-medium">Sign In</span>
                    </SignInButton>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm border border-white/20" asChild>
                    <SignUpButton mode="modal">
                      <span className="font-medium">Get Started</span>
                    </SignUpButton>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground backdrop-blur-sm bg-background/20 hover:bg-background/40 border border-border/30">
                      Dashboard
                    </Button>
                    <div className="ring-2 ring-blue-500/30 rounded-full backdrop-blur-sm">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 ring-0"
                          }
                        }}
                      />
                    </div>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppNavBar