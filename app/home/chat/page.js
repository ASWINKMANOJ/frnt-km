"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <SidebarProvider>
            <AppSidebar isLoading={isLoading} />
            <SidebarTrigger />
            <div className="h-screen w-full flex flex-col items-center justify-between">
                <div className="h-full w-full flex items-center justify-center overflow-y-scroll"></div>
                <form
                    action={() => console.log("form submitted")}
                    className="h-16 w-full flex items-center justify-center px-4 md:px-12 mb-4"
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
        </SidebarProvider>
    );
}
