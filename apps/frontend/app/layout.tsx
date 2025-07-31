import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import AppNavBar from "@/components/AppNavBar";
import AppFooter from "@/components/AppFooter";
import { SolanaWalletProvider } from "@/components/SolanaWalletProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heimdall",
  description: "Web3 Uptime monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="uptime-theme"
          >
            <SolanaWalletProvider>
              <AppNavBar />
              <main className="pt-24">
                {children}
              </main>
              <Toaster richColors closeButton expand={false}/>
              <AppFooter />
            </SolanaWalletProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
