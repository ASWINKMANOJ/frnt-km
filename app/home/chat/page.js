"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar";
import { useEffect, useState } from "react";

export default function ChatPage() {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <SidebarProvider>
            <AppSidebar isLoading={isLoading} />
            <SidebarTrigger />
            <div className="h-screen w-full flex"></div>
        </SidebarProvider>
    );
}
