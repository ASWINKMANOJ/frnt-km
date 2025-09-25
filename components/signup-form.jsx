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
import { signup } from "@/app/actions/auth";

export function SignupForm({ className, ...props }) {
    const [state, action, pending] = useActionState(signup, undefined);
    const router = useRouter();

    // Handle successful signup redirect
    useEffect(() => {
        if (state?.success && state?.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create a new account
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    required
                                />
                                {state?.errors?.name && (
                                    <p className="text-red-600 text-sm">
                                        {state.errors.name[0]}
                                    </p>
                                )}
                            </div>
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
                                    <div className="text-red-600 text-sm">
                                        <p>Password must:</p>
                                        <ul className="list-disc list-inside">
                                            {state.errors.password.map(
                                                (error) => (
                                                    <li key={error}>
                                                        - {error}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={pending}
                                >
                                    {pending
                                        ? "Creating account..."
                                        : "Create account"}
                                </Button>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        href={"/auth/login"}
                                        className="underline underline-offset-4"
                                    >
                                        Log in
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
