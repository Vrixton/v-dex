import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono } from "next/font/google";

import { DeviceProvider } from "@/components/device/device-context";
import { DeviceShell } from "@/components/device/device-shell";
import { ToastProvider } from "@/components/toast/toast-context";

import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
});

const TITLE = "Victor Villavicencio — Senior Frontend Developer | Portfolio";
const DESCRIPTION =
  "Frontend developer with 10+ years in Angular and React. Portfolio built as a handheld device.";

export const metadata: Metadata = {
  metadataBase: new URL("https://v-dex.vercel.app"),
  title: {
    default: TITLE,
    template: "%s — V-DEX",
  },
  description: DESCRIPTION,
  keywords: [
    "frontend developer",
    "senior frontend developer",
    "Angular",
    "React",
    "TypeScript",
    "Next.js",
    "web performance",
    "accessibility",
    "Bogotá",
    "remote",
  ],
  authors: [{ name: "Victor Villavicencio", url: "https://v-dex.vercel.app" }],
  creator: "Victor Villavicencio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://v-dex.vercel.app",
    siteName: "V-DEX",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "V-DEX — Victor Villavicencio, Senior Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  // Colorea la interfaz del navegador móvil con el rojo del bisel
  themeColor: "#dc0a2d",
  // Permite dibujar bajo el notch; los biseles compensan con safe-area-inset
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={shareTechMono.variable}>
      <body>
        <ToastProvider>
          <DeviceProvider>
            <DeviceShell>{children}</DeviceShell>
          </DeviceProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
