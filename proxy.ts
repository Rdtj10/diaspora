import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

/**
 * Next.js 16 Proxy Function
 * Migrated from 'middleware' to 'proxy' named export as per the new convention.
 */
export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Define protected routes
  const isDashboardRoute = path.startsWith("/dashboard");

  if (isDashboardRoute) {
    const cookie = req.cookies.get("session")?.value;

    if (!cookie) {
      console.warn(`[PROXY] No session cookie found for ${path}. Redirecting to /login`);
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    try {
      const { payload } = await jwtVerify(cookie, key, {
        algorithms: ["HS256"],
      });

      console.log(`[PROXY] Decoded Role for ${path}: ${payload.role}`);

      if (payload.role !== "ADMIN") {
        console.warn(`[PROXY] Access Denied: User role is ${payload.role}. Target is ${path}. Redirecting to /`);
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    } catch (err) {
      console.error(`[PROXY] JWT Verification failed:`, err);
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
