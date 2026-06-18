import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RadialCursor from "@/components/ui/RadialCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nagalla Satish | Embedded Systems, AI & Web3 Engineer",
  description: "Personal engineering portfolio of Nagalla Satish. Specializing in bare-metal firmware design, machine learning workflows, and decentralized smart contracts.",
  keywords: ["Nagalla Satish", "Embedded Systems", "AI Engineer", "Web3 Developer", "ECE NIT Agartala", "Solidity Smart Contracts", "Firmware Engineer"],
  authors: [{ name: "Nagalla Satish" }],
  creator: "Nagalla Satish",
  metadataBase: new URL("https://satish-nagalla.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://satish-nagalla.vercel.app",
    title: "Nagalla Satish | Embedded Systems, AI & Web3 Engineer",
    description: "Personal engineering portfolio of Nagalla Satish. Specializing in bare-metal firmware design, machine learning workflows, and decentralized smart contracts.",
    siteName: "Nagalla Satish Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagalla Satish | Embedded Systems, AI & Web3 Engineer",
    description: "Personal engineering portfolio of Nagalla Satish. Specializing in bare-metal firmware design, machine learning workflows, and decentralized smart contracts.",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col relative z-10 selection:bg-[#00698c]/30 selection:text-white">
        <RadialCursor />
        {children}
      </body>
    </html>
  );
}

