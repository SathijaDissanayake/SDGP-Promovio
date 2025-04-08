import { useState } from "react";

export default function Email() {
    const [emails] = useState([
        {
            sender: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            subject: "Project Update: Q4 Marketing Campaign",
            preview: "Hi Sarah, I wanted to share the latest updates on our Q4 marketing campaign...",
            time: "10:30 AM",
            isUnread: true,
        },
        {
            sender: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg",
            subject: "Design Review Meeting Notes",
            preview: "Here are the key points we discussed during today’s design review meeting...",
            time: "Yesterday",
            isUnread: false,
        },
        {
            sender: "Emily Rodriguez",
            avatar: "https://randomuser.me/api/portraits/women/46.jpg",
            subject: "Client Presentation Feedback",
            preview: "Thank you for presenting to our client today. They were very impressed...",
            time: "Yesterday",
            isUnread: true,
        },
        {
            sender: "David Kim",
            avatar: "https://randomuser.me/api/portraits/men/47.jpg",
            subject: "Weekly Team Sync Summary",
            preview: "Here’s a quick summary of what we covered in today’s team sync meeting...",
            time: "Mon",
            isUnread: false,
        },
        {
            sender: "Lisa Thompson",
            avatar: "https://randomuser.me/api/portraits/women/48.jpg",
            subject: "Product Launch Timeline",
            preview: "I’ve updated the product launch timeline based on our discussion...",
            time: "Mon",
            isUnread: false,
        },
    ]);

    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            {/* Availability Message */}
            <div className="w-full text-center py-6 bg-zinc-800 shadow-lg animate-pulse">
                <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-md">
                    🚀 This will be available soon!
                </h2>
            </div>

            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="w-[250px] bg-zinc-800 p-5 flex flex-col gap-5">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-center cursor-pointer hover:bg-purple-700 transition">
                        + New Email
                    </button>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center p-2 rounded-md cursor-pointer bg-zinc-700 hover:bg-zinc-600 transition">
                            📥 Inbox <span className="text-purple-300">12</span>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700 transition">
                            📤 Sent <span className="text-purple-300">24</span>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700 transition">
                            📝 Drafts <span className="text-purple-300">4</span>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-zinc-700 transition">
                            🗑️ Trash
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-zinc-900 p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-700">
                        <h1 className="text-xl font-semibold">Sent Emails</h1>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search emails..."
                                className="bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 transition">
                                Filter ▼
                            </button>
                        </div>
                    </div>

                    {/* Email List */}
                    <div className="mt-4 space-y-4">
                        {emails.map((email, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 p-4 rounded-lg ${
                                    email.isUnread ? "bg-zinc-800 border-l-4 border-purple-500" : "bg-zinc-800"
                                } hover:bg-zinc-700 transition`}
                            >
                                <input type="checkbox" className="w-5 h-5 text-purple-500" />
                                <img
                                    src={email.avatar}
                                    alt={email.sender}
                                    className="w-12 h-12 rounded-full border border-zinc-600"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">
                                            {email.sender} {email.isUnread && <span className="text-purple-400">•</span>}
                                        </h3>
                                        <span className="text-sm text-zinc-400">{email.time}</span>
                                    </div>
                                    <h4 className="text-md font-semibold">{email.subject}</h4>
                                    <p className="text-sm text-zinc-400">{email.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
