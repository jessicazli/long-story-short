import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Long Story Short",
  description: "Turn your next read into a listen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-lg font-semibold text-gray-900 transition sm:text-xl z-50"
        >
          <Image src="/mic.png" alt="mic" width={32} height={32} />
          <span>Long Story Short</span>
        </Link>
        {children}
      </body>
    </html>
  );
}
