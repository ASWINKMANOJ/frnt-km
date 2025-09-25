export default function Features() {
    const features = [
        {
            icon: "🔍",
            title: "Instant Search",
            desc: "Find answers in your documents instantly with AI-powered search.",
        },
        {
            icon: "💬",
            title: "Ask Anything",
            desc: "Type your question and get direct, relevant answers from your files.",
        },
        {
            icon: "🔒",
            title: "Secure & Private",
            desc: "Your data stays safe. We never store your documents or queries.",
        },
        {
            icon: "⚡",
            title: "Lightning Fast",
            desc: "No more waiting—get results in seconds, even with large files.",
        },
        {
            icon: "📁",
            title: "All Formats Supported",
            desc: "Works with PDFs, Word, Excel, and more—no conversion needed.",
        },
        {
            icon: "🌐",
            title: "Access Anywhere",
            desc: "Use on any device, anytime. Your knowledge is always at hand.",
        },
    ];

    return (
        <section className="w-full max-w-6xl mx-auto py-16 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">
                Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="bg-neutral-900 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <div className="text-5xl mb-4">{f.icon}</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {f.title}
                        </h3>
                        <p className="text-neutral-300 text-center">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
