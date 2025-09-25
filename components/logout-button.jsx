"use client";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

export function LogoutButton({ className, children, ...props }) {
    const [state, action, pending] = useActionState(logout, undefined);
    const router = useRouter();

    // Handle successful logout redirect
    useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);

    return (
        <form action={action}>
            <Button
                type="submit"
                variant="outline"
                className={className}
                disabled={pending}
                {...props}
            >
                {pending ? "Logging out..." : children || "Logout"}
            </Button>
        </form>
    );
}
