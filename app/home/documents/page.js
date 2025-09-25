import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function DocumentsPage() {
    const pdfFiles = [
        { id: 1, name: "Report_Q1.pdf" },
        { id: 2, name: "Project_Plan.pdf" },
        { id: 3, name: "Invoice_2025.pdf" },
        { id: 4, name: "Meeting_Notes.pdf" },
        { id: 5, name: "Resume.pdf" },
        { id: 6, name: "Budget_2025.pdf" },
        { id: 7, name: "Presentation_Deck.pdf" },
        { id: 8, name: "Research_Paper.pdf" },
        { id: 9, name: "Contract_Agreement.pdf" },
        { id: 10, name: "User_Manual.pdf" },
    ];

    return (
        <div className="h-screen w-full flex flex-col pt-16">
            <div className="h-full w-full flex flex-col px-6 md:px-16 py-4">
                {/* Header Section - Fixed Height */}
                <div className="flex-shrink-0 mb-6">
                    <h1 className="text-3xl font-sans font-bold">
                        YOUR DOCUMENTS
                    </h1>
                    <p className="text-md mt-4">
                        Upload your documents and let our AI-powered system{" "}
                        <br />
                        analyze and understand them instantly.
                    </p>
                </div>

                <div className="flex flex-col flex-1 gap-2 w-full z-10 overflow-y-auto px-2 border-2 rounded-3xl p-4">
                    {pdfFiles.map((file, i) => (
                        <div key={i} className="w-full">
                            <div className="py-2 w-full flex items-center justify-between px-6 border-2">
                                {file.name}
                                <Button variant="destructive">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
