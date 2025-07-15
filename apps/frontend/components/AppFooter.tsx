
'use client';
import React from 'react';
import Link from 'next/link';
import { Monitor, BarChart3, Shield, Mail, Twitter, Linkedin, Github } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="relative bg-background/80 backdrop-blur-2xl border-t border-border/40 shadow-2xl shadow-black/20 dark:shadow-black/40 supports-[backdrop-filter]:bg-background/60 overflow-hidden group mt-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/4 to-pink-500/8 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
      
      <div className="relative container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4 items-start">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group/logo">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-60 group-hover/logo:opacity-80 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg ring-2 ring-white/30">
                  <Monitor className="w-5 h-5" />
                </div>
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-foreground via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Uptime Monitor
              </h1>
            </Link>
            <p className="text-sm text-muted-foreground font-light max-w-xs">
              Reliable website monitoring from around the globe. Get instant alerts and detailed analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">System Status</Link></li>
              <li><Link href="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API Reference</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Uptime Monitor. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
