import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    LogOut,
    Plus,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "./ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { useState } from "react";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

// Dummy data for chats and files
const initialChats = [
    { id: "c1", title: "Quarterly Report Summary", updatedAt: "10:12 AM" },
    { id: "c2", title: "Onboarding Checklist", updatedAt: "Yesterday" },
    { id: "c3", title: "Risk Register Review", updatedAt: "Mon" },
    { id: "c4", title: "Product Roadmap Q4", updatedAt: "Sep 12" },
];

const initialFiles = [
    { id: "f1", name: "Q3_Report.pdf", checked: true },
    { id: "f2", name: "Onboarding_Guide.docx", checked: false },
    { id: "f3", name: "Risk_Register.xlsx", checked: true },
    { id: "f4", name: "Roadmap_Q4.pptx", checked: false },
];

export function AppSidebar({ isLoading }) {
    const { isMobile } = useSidebar();
    const [chats, setChats] = useState(initialChats);
    const [activeChatId, setActiveChatId] = useState(
        initialChats[0]?.id || null
    );
    const [files, setFiles] = useState(initialFiles);

    function handleNewChat() {
        const timestamp = new Date();
        const newChat = {
            id: `c_${timestamp.getTime()}`,
            title: "New Chat",
            updatedAt: "Just now",
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newChat.id);
    }

    function toggleFile(fileId) {
        setFiles((prev) =>
            prev.map((f) =>
                f.id === fileId ? { ...f, checked: !f.checked } : f
            )
        );
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Chat</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {isLoading ? (
                            <SidebarMenu>
                                {Array.from({ length: 6 }, (_, index) => (
                                    <SidebarMenuItem key={index}>
                                        <Skeleton className="h-[24px] mt-2 w-full rounded-full bg-gray-300 dark:bg-gray-600" />
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        ) : (
                            <>
                                <div className="px-2 pb-2">
                                    <Button
                                        size="sm"
                                        className="w-full"
                                        onClick={handleNewChat}
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> New
                                        Chat
                                    </Button>
                                </div>
                                <SidebarMenu>
                                    {chats.map((chat) => (
                                        <SidebarMenuItem key={chat.id}>
                                            <SidebarMenuButton asChild>
                                                <button
                                                    type="button"
                                                    className={`w-full text-left ${
                                                        chat.id === activeChatId
                                                            ? "bg-accent"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveChatId(chat.id)
                                                    }
                                                >
                                                    <span className="truncate">
                                                        {chat.title}
                                                    </span>
                                                    <span className="ml-auto text-xs text-muted-foreground">
                                                        {chat.updatedAt}
                                                    </span>
                                                </button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Files</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {isLoading ? (
                            <SidebarMenu>
                                {Array.from({ length: 6 }, (_, index) => (
                                    <SidebarMenuItem key={index}>
                                        <Skeleton className="h-[24px] mt-2 w-full rounded-full bg-gray-300 dark:bg-gray-600" />
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        ) : (
                            <SidebarMenu>
                                {files.map((file) => (
                                    <SidebarMenuItem key={file.id}>
                                        <div className="flex items-center gap-3 px-2 py-1.5">
                                            <input
                                                id={`file-${file.id}`}
                                                type="checkbox"
                                                className="h-4 w-4 accent-primary"
                                                checked={file.checked}
                                                onChange={() =>
                                                    toggleFile(file.id)
                                                }
                                            />
                                            <label
                                                htmlFor={`file-${file.id}`}
                                                className="flex-1 truncate text-sm cursor-pointer"
                                            >
                                                {file.name}
                                            </label>
                                        </div>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarFooter>
                        <div className="py-2 w-full px-2 flex items-center justify-between">
                            <Avatar>
                                <AvatarImage src="#" alt="profile" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <LogoutButton variant="outline">
                                    Log Out
                                </LogoutButton>
                            </div>
                        </div>
                    </SidebarFooter>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
