import { NextResponse } from "next/server";

/**
 * Sample API route for user authentication
 * Replace this with your actual backend authentication logic
 */
export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // TODO: Replace this with your actual authentication logic
        // This is just a sample implementation
        const mockUsers = [
            {
                id: 1,
                email: "admin@example.com",
                password: "admin123", // In real app, this would be hashed
                role: "admin",
                name: "Admin User",
            },
            {
                id: 2,
                email: "user@example.com",
                password: "user123", // In real app, this would be hashed
                role: "user",
                name: "Regular User",
            },
            {
                id: 3,
                email: "moderator@example.com",
                password: "mod123", // In real app, this would be hashed
                role: "moderator",
                name: "Moderator User",
            },
        ];

        // Find user by email
        const user = mockUsers.find((u) => u.email === email);

        if (!user || user.password !== password) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate a mock token (in real app, use JWT or similar)
        const token = `mock_token_${user.id}_${Date.now()}`;

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword,
            token: token,
        });
    } catch (error) {
        console.error("Authentication error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
