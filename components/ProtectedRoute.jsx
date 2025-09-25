"use client";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * ProtectedRoute component for role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string|string[]} props.allowedRoles - Roles that can access this route
 * @param {string} props.fallbackRoute - Route to redirect to if access denied
 */
export function ProtectedRoute({
    children,
    allowedRoles = [],
    fallbackRoute = "/auth/login",
}) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return; // Wait for auth state to load

        // If not authenticated, redirect to login
        if (!isAuthenticated) {
            router.push(fallbackRoute);
            return;
        }

        // If no roles specified, allow all authenticated users
        if (allowedRoles.length === 0) {
            return;
        }

        // Check if user's role is allowed
        const userRole = user?.role?.toLowerCase();
        const isRoleAllowed = allowedRoles.some(
            (role) => role.toLowerCase() === userRole
        );

        if (!isRoleAllowed) {
            // Redirect to appropriate route based on user role
            const redirectRoute = getRouteByRole(user?.role) || "/home";
            router.push(redirectRoute);
        }
    }, [user, isAuthenticated, isLoading, allowedRoles, fallbackRoute, router]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Don't render children if not authenticated or role not allowed
    if (!isAuthenticated) {
        return null;
    }

    if (allowedRoles.length > 0) {
        const userRole = user?.role?.toLowerCase();
        const isRoleAllowed = allowedRoles.some(
            (role) => role.toLowerCase() === userRole
        );

        if (!isRoleAllowed) {
            return null;
        }
    }

    return children;
}

// Helper function to get route by role (imported from auth.js)
function getRouteByRole(role) {
    const ROLE_ROUTES = {
        admin: "/dashboard",
        user: "/home",
        moderator: "/dashboard",
        guest: "/home",
    };

    if (!role) return "/home";

    const normalizedRole = role.toLowerCase();
    return ROLE_ROUTES[normalizedRole] || "/home";
}
