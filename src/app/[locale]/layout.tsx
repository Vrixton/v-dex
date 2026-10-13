import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { DeviceProvider } from "@/components/device/device-context";
import { DeviceShell } from "@/components/device/device-shell";
import { ToastProvider } from "@/components/toast/toast-context";
import { DEFAULT_LOCALE, isLocale, LOCALES, type I18nText, type Locale } from "@/i18n/locale";
import { LocaleNotice } from "@/i18n/locale-notice";
import { LocaleProvider } from "@/i18n/locale-provider";

import "../globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
});

const SITE = "https://v-dex.vercel.app";

const TITLE: I18nText = {
  en: "Victor Villavicencio — Senior Frontend Developer | Portfolio",
  es: "Victor Villavicencio — Desarrollador Frontend Senior | Portafolio",
};

const DESCRIPTION: I18nText = {
  en: "Frontend developer with 10+ years in Angular and React. Portfolio built as a handheld device.",
  es: "Desarrollador frontend con más de 10 años en Angular y React. Un portafolio construido como un aparato de bolsillo.",
};

const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_LA" };

const HOME: Record<Locale, string> = { en: "/", es: "/es" };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  return {
    metadataBase: new URL(SITE),
    title: {
      default: TITLE[locale],
      template: "%s — V-DEX",
    },
    description: DESCRIPTION[locale],
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
    authors: [{ name: "Victor Villavicencio", url: SITE }],
    creator: "Victor Villavicencio",
    alternates: {
      canonical: HOME[locale],
      languages: {
        en: HOME.en,
        es: HOME.es,
        "x-default": HOME.en,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: HOME[locale],
      siteName: "V-DEX",
      title: TITLE[locale],
      description: DESCRIPTION[locale],
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
      title: TITLE[locale],
      description: DESCRIPTION[locale],
      images: ["/opengraph-image.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#dc0a2d",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={shareTechMono.variable}>
      <body>
        <LocaleProvider locale={locale}>
          <ToastProvider>
            <LocaleNotice />
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
