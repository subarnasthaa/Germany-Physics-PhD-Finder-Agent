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
  title: "Australia Physics PhD Finder - For Nepali Students",
  description: "Comprehensive guide for Nepali MSc Physics students from Tribhuvan University to find PhD programs in Australia. Explore Group of Eight universities, CSIRO, ANSTO, Australia Awards, RTP funding, and get AI-powered assistance.",
  keywords: ["Australia", "PhD", "Physics", "Australia Awards", "RTP", "CSIRO", "ANSTO", "Nepal", "Tribhuvan University", "Go8", "Australian universities", "study in Australia", "IELTS"],
  authors: [{ name: "Australia Physics PhD Finder" }],
  openGraph: {
    title: "Australia Physics PhD Finder",
    description: "Find your Physics PhD in Australia - Guide for Nepali Physics students with Australia Awards, RTP, CSIRO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Australia Physics PhD Finder",
    description: "Find your Physics PhD in Australia - Guide for Nepali Physics students with Australia Awards, RTP, CSIRO",
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
