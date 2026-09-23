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

export const metadata: Metadata = {
  title: "V-DEX | Victor Villavicencio",
  description: "Portfolio of Victor Villavicencio, Senior Frontend Developer & Tech Lead.",
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
