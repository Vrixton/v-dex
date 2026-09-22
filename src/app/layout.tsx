import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  title: "V-DEX | Victor Villavicencio",
  description: "Portfolio of Victor Villavicencio, Senior Frontend Developer & Tech Lead.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={shareTechMono.variable}>
      <body>{children}</body>
    </html>
  );
}
