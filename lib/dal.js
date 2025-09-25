import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect("/auth/login");
    }

    return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
        // Mock user data - replace with actual database query
        const mockUsers = [
            {
                id: "1",
                name: "Admin User",
                email: "admin@example.com",
                role: "admin",
            },
            {
                id: "2",
                name: "Regular User",
                email: "user@example.com",
                role: "user",
            },
            {
                id: "3",
                name: "Moderator User",
                email: "moderator@example.com",
                    role: "moderator",
            },
        ];

        const user = mockUsers.find((u) => u.id === session.userId);

        if (!user) {
            return null;
        }

        // Return only necessary data (DTO pattern)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    } catch (error) {
        console.log("Failed to fetch user");
        return null;
    }
});

export const getRouteByRole = (role) => {
    const ROLE_ROUTES = {
        admin: "/dashboard",
        user: "/home/chat",
        moderator: "/dashboard",
        guest: "/home/chat",
    };

    const DEFAULT_ROUTE = "/home/chat";

    if (!role) return DEFAULT_ROUTE;
    const normalizedRole = role.toLowerCase();
    return ROLE_ROUTES[normalizedRole] || DEFAULT_ROUTE;
};
