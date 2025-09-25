"use client";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton({ className, variant = "outline" }) {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    return (
        <Button onClick={handleLogout} variant={variant} className={className}>
            Logout
        </Button>
    );
}
