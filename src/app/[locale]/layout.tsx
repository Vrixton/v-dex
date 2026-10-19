import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BootProvider } from "@/components/device/boot-context";
import { DeviceProvider } from "@/components/device/device-context";
import { DeviceShell } from "@/components/device/device-shell";
import { PetLayer } from "@/components/device/pet-layer";
import { ToastProvider } from "@/components/toast/toast-context";
import { LOCALES, type Locale } from "@/i18n/locale";
import { LocaleNotice } from "@/i18n/locale-notice";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getMessages } from "@/i18n/messages";
import { routeLocale, type LocaleRouteProps } from "@/i18n/route-locale";
import Script from "next/script";
import "@vrixton/pixel-pet/styles.css";
import "../globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
});

const SITE = "https://v-dex.vercel.app";

const TECH_KEYWORDS = ["Angular", "React", "TypeScript", "Next.js", "Bogotá"];

const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_LA" };

const HOME: Record<Locale, string> = { en: "/", es: "/es" };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await routeLocale(params);
  const m = getMessages(locale).meta;

  return {
    metadataBase: new URL(SITE),
    title: {
      default: m.title,
      template: "%s — V-DEX",
    },
    description: m.description,
    keywords: [...m.keywords, ...TECH_KEYWORDS],
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
      title: m.title,
      description: m.description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: m.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
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
}: Readonly<LocaleRouteProps & { children: React.ReactNode }>) {
  const locale = await routeLocale(params);

  return (
    <html lang={locale} className={shareTechMono.variable} suppressHydrationWarning>
      <body>
        <Script id="vdex-boot" strategy="beforeInteractive">
          {`try{if(!/(^|;\\s*)vdex-pet=/.test(document.cookie))document.documentElement.dataset.boot="pending"}catch{}`}
        </Script>
        <LocaleProvider locale={locale} messages={getMessages(locale)}>
          <ToastProvider>
            <LocaleNotice />
            <BootProvider>
              <DeviceProvider>
                <DeviceShell>{children}</DeviceShell>
                {/* <PetLayer messages={getMessages(locale).device.pet} /> */}
              </DeviceProvider>
            </BootProvider>
          </ToastProvider>
        </LocaleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
