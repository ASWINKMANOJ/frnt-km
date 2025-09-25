"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { getStoredUser, getStoredToken, clearAuthData } from "./auth";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored authentication data on mount
        const storedUser = getStoredUser();
        const storedToken = getStoredToken();

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }

        setIsLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        clearAuthData();
    };

    const value = {
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user && !!token,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
