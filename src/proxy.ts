import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "./i18n/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matches = (locale: string) =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);

  if (matches(DEFAULT_LOCALE)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url);
  }

  if (LOCALES.some((locale) => locale !== DEFAULT_LOCALE && matches(locale))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
