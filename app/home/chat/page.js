"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, Bot } from "lucide-react";

export default function ChatPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [question, setQuestion] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [qaList, setQaList] = useState([
        {
            id: 1,
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces.",
            timestamp: new Date().toLocaleTimeString(),
        },
        {
            id: 2,
            question: "What is Tailwind CSS?",
            answer: "Tailwind CSS is a utility-first CSS framework for styling apps quickly.",
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [qaList]);

    const simulateAnswer = (question) => {
        const responses = [
            "That's a great question! Let me help you with that.",
            "I understand what you're asking. Here's what I think...",
            "Based on your question, I can provide some insights.",
            "Let me break this down for you step by step.",
            "That's an interesting point. Here's my perspective...",
            "I can help you with that! Here's what you need to know.",
        ];

        return (
            responses[Math.floor(Math.random() * responses.length)] +
            " " +
            "This is a sample response to demonstrate the chat functionality. In a real application, this would be connected to your actual LLM service."
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const newQA = {
            id: Date.now(),
            question: question.trim(),
            answer: "",
            timestamp: new Date().toLocaleTimeString(),
        };

        // Add question immediately
        setQaList((prev) => [...prev, newQA]);
        setQuestion(""); // clear input
        setIsTyping(true);

        // Simulate LLM response delay
        setTimeout(() => {
            const answer = simulateAnswer(question);
            setQaList((prev) =>
                prev.map((qa) => (qa.id === newQA.id ? { ...qa, answer } : qa))
            );
            setIsTyping(false);
        }, 1500);
    };

    return (
        <SidebarProvider>
            <AppSidebar isLoading={isLoading} />
            <SidebarTrigger />
            <div className="h-screen w-full flex flex-col">
                {/* Chat Messages Area */}
                <div className="flex-1 w-full overflow-y-scroll px-4 py-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {qaList.map((qa) => (
                            <div key={qa.id} className="space-y-4">
                                {/* User Question - Right Side */}
                                <div className="flex justify-end">
                                    <div className="flex items-start space-x-3 max-w-xs lg:max-w-md xl:max-w-lg">
                                        <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-sm">
                                            <p className="text-sm leading-relaxed">
                                                {qa.question}
                                            </p>
                                            <p className="text-xs mt-2 text-blue-100">
                                                {qa.timestamp}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* AI Answer - Left Side */}
                                {qa.answer && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start space-x-3 max-w-xs lg:max-w-md xl:max-w-lg">
                                            <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                                                <p className="text-sm leading-relaxed">
                                                    {qa.answer}
                                                </p>
                                                <p className="text-xs mt-2 text-gray-400">
                                                    {qa.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-3 max-w-xs">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0.1s",
                                                }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{
                                                    animationDelay: "0.2s",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Section */}
                <div className="border-t border-gray-200 bg-white">
                    <form
                        onSubmit={handleSubmit}
                        className="px-6 md:px-12 py-4"
                    >
                        <div className="max-w-4xl mx-auto flex items-center space-x-3">
                            <div className="flex-1 relative">
                                <Input
                                    type="text"
                                    placeholder="Ask Question Here..."
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                    className="pr-12 h-12 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={isTyping}
                                />
                                <Button
                                    type="submit"
                                    disabled={!question.trim() || isTyping}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 rounded-full disabled:bg-gray-300"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarProvider>
    );
}
