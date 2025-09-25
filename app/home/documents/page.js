import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocumentsPage() {
    const pdfFiles = [
        { id: 1, name: "Report_Q1.pdf", expires: "2025-10-15" },
        { id: 2, name: "Project_Plan.pdf", expires: "2025-12-01" },
        { id: 3, name: "Invoice_2025.pdf", expires: "2025-11-10" },
        { id: 4, name: "Meeting_Notes.pdf", expires: "2026-01-01" },
        { id: 5, name: "Resume.pdf", expires: "2026-03-05" },
        { id: 6, name: "Budget_2025.pdf", expires: "2025-12-20" },
        { id: 7, name: "Presentation_Deck.pdf", expires: "2025-11-30" },
        { id: 8, name: "Research_Paper.pdf", expires: "2026-02-01" },
        { id: 9, name: "Contract_Agreement.pdf", expires: "2025-10-28" },
        { id: 10, name: "User_Manual.pdf", expires: "2026-04-15" },
    ];

    const today = new Date();

    const getDaysLeft = (expiry) => {
        const expDate = new Date(expiry);
        const diffTime = expDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="h-screen w-full flex flex-col pt-16">
            <div className="h-full w-full flex flex-col px-6 md:px-16 py-4">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <div>
                        <h1 className="text-3xl font-sans font-bold">
                            YOUR DOCUMENTS
                        </h1>
                        <p className="text-md mt-4">
                            Upload your documents and let our AI-powered system{" "}
                            <br />
                            analyze and understand them instantly.
                        </p>
                    </div>
                    <Button>Add Document</Button>
                </div>

                {/* Document List */}
                <ScrollArea className="h-[70vh] w-full border-2 rounded-3xl p-4 z-20">
                    <div className="flex flex-col gap-3">
                        {pdfFiles.map((file) => {
                            const daysLeft = getDaysLeft(file.expires);
                            const isExpiringSoon = daysLeft <= 7;

                            return (
                                <Card key={file.id} className="w-full">
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="font-semibold">
                                                {file.name}
                                            </p>
                                            <p
                                                className={`text-sm ${
                                                    isExpiringSoon
                                                        ? "text-red-500 font-semibold"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                Expires in {daysLeft} day
                                                {daysLeft !== 1 && "s"}
                                            </p>
                                        </div>
                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
