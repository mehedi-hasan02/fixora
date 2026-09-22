import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import NextAuthProvider from "../provider/NextAuthProvider";
import HotTosterProdiver from "../provider/HotTosterProvider";
import Navbar from "../components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fixora — Home Repair Service Platform",
  description:
    "Book trusted home repair services for plumbing, electrical, AC, fan, painting, and appliance problems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <NextAuthProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <MotionConfig reducedMotion="user">
            <Navbar />
            <main className="flex-1">
              {children}
              <HotTosterProdiver />
            </main>
          </MotionConfig>
        </body>
      </html>
    </NextAuthProvider>
  );
}
