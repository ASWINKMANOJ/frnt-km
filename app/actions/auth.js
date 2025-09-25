"use server";

import { SignupFormSchema, LoginFormSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { getRouteByRole } from "@/lib/dal";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

// Mock database - replace with actual database
const mockUsers = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password:
            "$2b$10$l6XRtDar/IkT40iHznOmBeCQedpv2ycDGh8suuHJgNosJTy4N1tY.", // admin123
        role: "admin",
    },
    {
        id: "2",
        name: "Regular User",
        email: "user@example.com",
        password:
            "$2b$10$POKrgTizZz.rKDr/4Ezm6OZWFbp88hHQ4DI3eOq6Wn/Rg/N632kIy", // user123
        role: "user",
    },
    {
        id: "3",
        name: "Moderator User",
        email: "moderator@example.com",
        password:
            "$2b$10$gaW7IJ.a0mIx6JFQzgx20.8KyaoaFObaiZ4TRH1wGn4imaxyHdkXG", // mod123
        role: "moderator",
    },
];

export async function signup(state, formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    // Check if user already exists
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
        return {
            message: "User with this email already exists.",
        };
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (in real app, insert into database)
        const newUser = {
            id: (mockUsers.length + 1).toString(),
            name,
            email,
            password: hashedPassword,
            role: "user", // Default role for signup
        };

        // Add to mock database
        mockUsers.push(newUser);

        // Create user session
        await createSession(newUser.id);

        // Return success with redirect route
        const redirectRoute = getRouteByRole(newUser.role);
        return {
            success: true,
            redirectTo: redirectRoute,
        };
    } catch (error) {
        return {
            message: "An error occurred while creating your account.",
        };
    }
}

export async function login(state, formData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        // Find user by email
        const user = mockUsers.find((u) => u.email === email);

        if (!user) {
            return {
                message: "Invalid email or password.",
            };
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                message: "Invalid email or password.",
            };
        }

        // Create user session
        await createSession(user.id);

        // Return success with redirect route
        const redirectRoute = getRouteByRole(user.role);
        return {
            success: true,
            redirectTo: redirectRoute,
        };
    } catch (error) {
        return {
            message: "An error occurred during login.",
        };
    }
}

export async function logout() {
    await deleteSession();
    return {
        success: true,
        redirectTo: "/auth/login",
    };
}
