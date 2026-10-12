import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DeviceProvider } from "@/components/device/device-context";
import { DeviceShell } from "@/components/device/device-shell";
import { ToastProvider } from "@/components/toast/toast-context";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocale } from "@/i18n/server";

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
  themeColor: "#dc0a2d",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={shareTechMono.variable}>
      <body>
        <LocaleProvider locale={locale}>
          <ToastProvider>
            <DeviceProvider>
              <DeviceShell>{children}</DeviceShell>
            </DeviceProvider>
          </ToastProvider>
        </LocaleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
