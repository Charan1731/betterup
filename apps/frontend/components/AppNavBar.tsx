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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <nav className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <Monitor className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Uptime Monitor
              </h1>
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground font-medium">Live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="h-6 w-px bg-border" />
            
            <div className="flex items-center gap-2">
              <SignedOut>
                <Button variant="ghost" size="sm" asChild>
                  <SignInButton mode="modal" >
                    <span className="font-medium">Sign In</span>
                  </SignInButton>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                  <SignUpButton mode="modal">
                    <span className="font-medium">Get Started</span>
                  </SignUpButton>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Button>
                  <div className="ring-2 ring-blue-500/20 rounded-full">
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
      </nav>
    </div>
  )
}

export default AppNavBar