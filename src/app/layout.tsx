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
  title: "Japan Physics PhD Finder - For Nepali Students",
  description: "Comprehensive guide for Nepali MSc Physics students from Tribhuvan University to find PhD programs in Japan. Explore universities, RIKEN, KEK, NIMS, MEXT scholarships, and get AI-powered assistance.",
  keywords: ["Japan", "PhD", "Physics", "MEXT", "RIKEN", "KEK", "Nepal", "Tribhuvan University", "JSPS", "Japanese universities", "study in Japan"],
  authors: [{ name: "Japan Physics PhD Finder" }],
  openGraph: {
    title: "Japan Physics PhD Finder",
    description: "Find your PhD program in Japan - Guide for Nepali Physics students",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Physics PhD Finder",
    description: "Find your PhD program in Japan - Guide for Nepali Physics students",
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
  );
}
