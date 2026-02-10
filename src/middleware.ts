import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const publicPages = ["/login"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check if the page is public
  const pathnameWithoutLocale = pathname.replace(/^\/(uz|ru)/, "") || "/";
  const isPublicPage = publicPages.includes(pathnameWithoutLocale);

  // Apply intl middleware first
  const intlResponse = intlMiddleware(req);

  if (isPublicPage) {
    return intlResponse;
  }

  // Check authentication for protected pages
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const locale = pathname.match(/^\/(uz|ru)/)?.[1] || routing.defaultLocale;
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!_next|api/auth|favicon.ico|.*\\.).*)"],
};
