import { NextResponse } from "next/server";
import { getUser } from "@/lib/dal";

export async function GET() {
    try {
        const user = await getUser();

        if (!user) {
            return new Response(null, { status: 401 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Failed to get user:", error);
        return new Response(null, { status: 500 });
    }
}
