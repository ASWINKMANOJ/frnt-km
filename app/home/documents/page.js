"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocumentsPage() {
    const fileInputRef = useRef(null);
    const [documents, setDocuments] = useState([
        { id: 1, name: "Report_Q1.pdf", expiresAt: "2025-10-15" },
        { id: 2, name: "Project_Plan.pdf", expiresAt: "2025-11-01" },
        { id: 3, name: "Invoice_2025.pdf", expiresAt: "2025-09-30" },
        { id: 4, name: "Meeting_Notes.pdf", expiresAt: "2026-01-05" },
        { id: 5, name: "Resume.pdf", expiresAt: "2026-06-01" },
        { id: 6, name: "Budget_2025.pdf", expiresAt: "2025-12-31" },
        { id: 7, name: "Presentation_Deck.pdf", expiresAt: "2025-10-01" },
        { id: 8, name: "Research_Paper.pdf", expiresAt: "2025-12-15" },
        { id: 9, name: "Contract_Agreement.pdf", expiresAt: "2025-09-28" },
        { id: 10, name: "User_Manual.pdf", expiresAt: "2026-03-12" },
    ]);

    const daysUntil = (dateStr) => {
        const today = new Date();
        const target = new Date(dateStr + "T00:00:00");
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.ceil((target.getTime() - today.getTime()) / oneDay);
    };

    const getExpiryStatus = (dateStr) => {
        const d = daysUntil(dateStr);
        if (Number.isNaN(d)) return { label: "No expiry", tone: "secondary" };
        if (d < 0) return { label: "Expired", tone: "destructive" };
        if (d === 0) return { label: "Expires today", tone: "destructive" };
        if (d <= 7) return { label: `Expires in ${d}d`, tone: "warning" };
        if (d <= 30) return { label: `In ${d}d`, tone: "default" };
        return { label: `In ${d}d`, tone: "secondary" };
    };

    const upcomingExpirations = useMemo(() => {
        return documents
            .map((doc) => ({ ...doc, days: daysUntil(doc.expiresAt) }))
            .filter((d) => d.days <= 14)
            .sort((a, b) => a.days - b.days);
    }, [documents]);

    const handleDelete = (id) => {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
    };

    const handleAddClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const defaultExpiry = new Date();
        defaultExpiry.setMonth(defaultExpiry.getMonth() + 6);
        setDocuments((prev) => [
            ...prev,
            {
                id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
                name: file.name,
                expiresAt: defaultExpiry.toISOString().slice(0, 10),
            },
        ]);
        // reset input to allow re-upload same file
        event.target.value = "";
    };

    const handleExpiryChange = (id, value) => {
        setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, expiresAt: value } : d)));
    };

    return (
        <div className="h-screen w-full flex flex-col pt-16">
            <div className="h-full w-full flex flex-col px-6 md:px-16 py-4">
                <div className="flex-shrink-0 mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-sans font-bold">YOUR DOCUMENTS</h1>
                        <p className="text-md mt-4">
                            Upload your documents and let our AI-powered system
                            <br />
                            analyze and understand them instantly.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileSelected}
                        />
                        <Button onClick={handleAddClick}>Add Document</Button>
                    </div>
                </div>

                {upcomingExpirations.length > 0 && (
                    <Card className="mb-4">
                        <CardContent className="py-3">
                            <div className="text-sm">
                                <span className="font-semibold">Reminders:</span>{" "}
                                {upcomingExpirations.map((d, idx) => (
                                    <span key={d.id} className="mr-3">
                                        {d.name} ({d.days < 0 ? "expired" : `${d.days}d`})
                                        {idx < upcomingExpirations.length - 1 ? "," : ""}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex flex-col flex-1 gap-2 w-full z-10 overflow-y-auto px-2 border-2 rounded-3xl p-4">
                    <ScrollArea className="h-full w-full">
                        <div className="flex flex-col gap-2 pr-2">
                            {documents.map((doc) => {
                                const status = getExpiryStatus(doc.expiresAt);
                                return (
                                    <div key={doc.id} className="w-full">
                                        <div className="py-2 w-full flex flex-col md:flex-row md:items-center justify-between gap-3 px-6 border-2 rounded-xl">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{doc.name}</div>
                                                <div className="text-xs text-neutral-500">Expiry date</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="date"
                                                    value={doc.expiresAt}
                                                    onChange={(e) => handleExpiryChange(doc.id, e.target.value)}
                                                    className="border rounded-md px-2 py-1 text-sm"
                                                />
                                                <span
                                                    className={
                                                        status.tone === "destructive"
                                                            ? "text-red-600 text-sm"
                                                            : status.tone === "warning"
                                                            ? "text-amber-600 text-sm"
                                                            : "text-neutral-600 text-sm"
                                                    }
                                                >
                                                    {status.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 md:ml-4">
                                                <Button variant="secondary">View</Button>
                                                <Button variant="destructive" onClick={() => handleDelete(doc.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
