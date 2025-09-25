"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/useAuth";

export default function ChatPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();

    // Debug logging
    useEffect(() => {
        console.log("Chat Page - Auth State:", {
            user,
            isAuthenticated,
            authLoading,
        });
    }, [user, isAuthenticated, authLoading]);
    // Show loading state while auth is loading
    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p>Loading authentication...</p>
                </div>
            </div>
        );
    }

    // Show auth debug info
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Authentication Error
                    </h1>
                    <p>User: {JSON.stringify(user)}</p>
                    <p>Authenticated: {String(isAuthenticated)}</p>
                    <p>Loading: {String(authLoading)}</p>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar isLoading={isLoading} />
            <SidebarTrigger />
            <div className="h-screen w-full flex flex-col items-center justify-between min-h-0 overflow-hidden">
                {/*Scrollable div with all the chat history just dummy for now*/}
                <ScrollArea className="flex-1 w-full overflow-y-auto px-4 md:px-12 pt-24 pb-4">
                    <div className="mx-auto w-full max-w-3xl space-y-4">
                        {/* Incoming message */}
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Hey! This is a sample conversation.
                        </div>
                        {/* Outgoing message */}
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Looks great. Go ahead and ask me anything.
                        </div>
                        {/* More dummy messages */}
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Can you summarize the latest report?
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Sure. Upload it here and I'll analyze it for you.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Uploading now...
                        </div>
                        {/* Extra messages for scroll testing */}
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            File received. Starting analysis...
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Thanks! Let me know the key risks.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Identified three main risks: budget, timeline, and
                            vendor dependency.
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Please outline mitigation steps for each.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Budget: reforecast monthly. Timeline: add a 2-week
                            buffer. Vendor: dual-source critical components.
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Create a short summary I can send to the team.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Drafted summary with bullet points and recommended
                            next steps.
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Add a section on assumptions and constraints.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Added assumptions and constraints. Do you want a
                            timeline chart?
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Yes, a simple milestone view is fine.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Inserted milestone view with dates and owners.
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Great. Export as PDF.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Exported. Anything else you'd like to adjust?
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            No, send it to stakeholders.
                        </div>
                        <div className="w-fit max-w-[85%] rounded-lg bg-muted p-3 text-sm">
                            Sent. Awaiting feedback. I'll notify you when
                            responses arrive.
                        </div>
                        <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                            Perfect, thanks!
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full px-4 md:px-12 py-4">
                    <form
                        action={() => console.log("form submitted")}
                        className="h-16 w-full flex items-center justify-center"
                    >
                        <div className="h-full w-full flex items-center justify-center">
                            <Input
                                type="text"
                                placeholder="Ask Question Here..."
                                className="h-full w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </SidebarProvider>
    );
}
