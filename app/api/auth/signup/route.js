import { NextResponse } from "next/server";

/**
 * Sample API route for user signup
 * In production, replace with DB create user and hashed passwords
 * Only role allowed for signup is "user"
 */
export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email and password are required" },
                { status: 400 }
            );
        }

        // Simulate unique email check
        if (
            email === "admin@example.com" ||
            email === "moderator@example.com"
        ) {
            return NextResponse.json(
                { message: "This email is reserved. Use another email." },
                { status: 409 }
            );
        }

        // Simulate created user with role "user"
        const createdUser = {
            id: Math.floor(Math.random() * 100000),
            name,
            email,
            role: "user",
        };

        // Generate a mock token
        const token = `mock_signup_token_${createdUser.id}_${Date.now()}`;

        return NextResponse.json({
            success: true,
            user: createdUser,
            token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
