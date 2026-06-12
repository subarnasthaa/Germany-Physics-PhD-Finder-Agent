import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Germany Physics PhD Finder - For Nepali Students",
  description: "Comprehensive guide for Nepali MSc Physics students from Tribhuvan University to find PhD programs in Germany. Explore TU9 universities, Max Planck Institutes, Helmholtz Centres, DAAD scholarships, TV-L E13 positions, and get AI-powered assistance.",
  keywords: ["Germany", "PhD", "Physics", "DAAD", "Max Planck", "Helmholtz", "TU9", "German universities", "Nepal", "Tribhuvan University", "study in Germany", "IELTS", "doctoral scholarship", "TV-L E13"],
  authors: [{ name: "Germany Physics PhD Finder" }],
  openGraph: {
    title: "Germany Physics PhD Finder",
    description: "Find your Physics PhD in Germany - Guide for Nepali Physics students with DAAD, Max Planck, Helmholtz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Germany Physics PhD Finder",
    description: "Find your Physics PhD in Germany - Guide for Nepali Physics students with DAAD, Max Planck, Helmholtz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
