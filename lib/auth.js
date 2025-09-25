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

/**
 * Authenticate user with backend API
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function authenticateUser(email, password) {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "Authentication failed",
            };
        }

        return {
            success: true,
            user: data.user,
            token: data.token,
        };
    } catch (error) {
        return {
            success: false,
            error: "Network error. Please try again.",
        };
    }
}

/**
 * Store authentication data in localStorage
 * @param {object} user - User data
 * @param {string} token - Authentication token
 */
export function storeAuthData(user, token) {
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }
}

/**
 * Clear authentication data from localStorage
 */
export function clearAuthData() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}

/**
 * Get stored user data from localStorage
 * @returns {object|null} - User data or null
 */
export function getStoredUser() {
    if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    }
    return null;
}

/**
 * Get stored token from localStorage
 * @returns {string|null} - Token or null
 */
export function getStoredToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}
