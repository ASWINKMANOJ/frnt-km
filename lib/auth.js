/**
 * Authentication utilities for role-based redirection
 */

// Define role-based route mappings
export const ROLE_ROUTES = {
    admin: "/dashboard",
    user: "/home/chat",
    moderator: "/dashboard",
    guest: "/home/chat",
};

// Default route for unknown roles
export const DEFAULT_ROUTE = "/home/chat";

/**
 * Get the appropriate route based on user role
 * @param {string} role - User role from backend
 * @returns {string} - Route path to redirect to
 */
export function getRouteByRole(role) {
    if (!role) return DEFAULT_ROUTE;

    const normalizedRole = role.toLowerCase();
    return ROLE_ROUTES[normalizedRole] || DEFAULT_ROUTE;
}

// Legacy functions - kept for backward compatibility
// These are now handled by the new session-based authentication system

/**
 * @deprecated Use Server Actions instead
 */
export function storeAuthData(user, token) {
    console.warn(
        "storeAuthData is deprecated. Use the new session-based authentication system."
    );
}

/**
 * @deprecated Use Server Actions instead
 */
export function clearAuthData() {
    console.warn(
        "clearAuthData is deprecated. Use the new session-based authentication system."
    );
}

/**
 * @deprecated Use Server Actions instead
 */
export function getStoredUser() {
    console.warn(
        "getStoredUser is deprecated. Use the new session-based authentication system."
    );
    return null;
}

/**
 * @deprecated Use Server Actions instead
 */
export function getStoredToken() {
    console.warn(
        "getStoredToken is deprecated. Use the new session-based authentication system."
    );
    return null;
}
