import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// Specify protected and public routes
const protectedRoutes = ["/dashboard", "/home"];
const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot", "/"];

export default async function middleware(req) {
    // Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) =>
        path.startsWith(route)
    );
    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    // Decrypt the session from the cookie
    const cookie = req.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    // Redirect to /auth/login if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    // Redirect to /home if the user is authenticated and on public auth routes
    if (
        isPublicRoute &&
        session?.userId &&
        (path.startsWith("/auth/login") || path.startsWith("/auth/signup"))
    ) {
        return NextResponse.redirect(new URL("/home/chat", req.nextUrl));
    }

    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
