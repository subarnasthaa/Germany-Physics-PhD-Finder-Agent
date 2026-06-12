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
  title: "New Zealand Physics PhD Finder - For Nepali Students",
  description: "Comprehensive guide for Nepali MSc Physics students from Tribhuvan University to find PhD programs in New Zealand. Explore all 8 NZ universities, MacDiarmid Institute, GNS Science, Manaaki NZ Scholarship, doctoral funding, and get AI-powered assistance.",
  keywords: ["New Zealand", "PhD", "Physics", "Manaaki NZ", "MacDiarmid Institute", "GNS Science", "NZ universities", "Nepal", "Tribhuvan University", "study in New Zealand", "IELTS", "doctoral scholarship"],
  authors: [{ name: "New Zealand Physics PhD Finder" }],
  openGraph: {
    title: "New Zealand Physics PhD Finder",
    description: "Find your Physics PhD in New Zealand - Guide for Nepali Physics students with Manaaki NZ, MacDiarmid, GNS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Zealand Physics PhD Finder",
    description: "Find your Physics PhD in New Zealand - Guide for Nepali Physics students with Manaaki NZ, MacDiarmid, GNS",
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
