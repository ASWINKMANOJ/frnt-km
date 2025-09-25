"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";

export function LoginForm({ className, ...props }) {
    const [state, action, pending] = useActionState(login, undefined);
    const router = useRouter();

    // Handle successful login redirect
    useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <div className="flex flex-col gap-6">
                            {state?.message && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                                    {state.message}
                                </div>
                            )}
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                {state?.errors?.email && (
                                    <p className="text-red-600 text-sm">
                                        {state.errors.email[0]}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                                {state?.errors?.password && (
                                    <p className="text-red-600 text-sm">
                                        {state.errors.password[0]}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={pending}
                                >
                                    {pending ? "Signing in..." : "Sign in"}
                                </Button>
                                <div className="text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link
                                        href={"/auth/signup"}
                                        className="underline underline-offset-4"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                                <div className="text-center text-sm">
                                    <Link
                                        href={"/auth/forgot"}
                                        className="underline underline-offset-4"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
