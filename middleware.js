import { NextResponse } from "next/server";

/**
 * Middleware for handling authentication and role-based access control
 */
export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Get token from cookies or headers
    const token =
        request.cookies.get("token")?.value ||
        request.headers.get("authorization")?.replace("Bearer ", "");

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/auth/login", "/auth/signup", "/auth/forgot"];

    // Check if current route is public
    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // If it's a public route, allow access
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If no token and trying to access protected route, redirect to login
    if (!token) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // TODO: Verify token with your backend
    // For now, we'll allow access if token exists
    // In production, you should verify the token and extract user role

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
