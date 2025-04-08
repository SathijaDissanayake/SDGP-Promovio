import { useState } from "react";

export default function Reminder() {
    const [reminders] = useState([
        {
            type: "Meeting Follow-up",
            client: "Acme Corporation",
            dueDate: "2024-02-15",
            status: "Pending",
            autoSend: true,
        },
        {
            type: "Document Review",
            client: "TechStart Inc",
            dueDate: "2024-02-14",
            status: "In Progress",
            autoSend: false,
        },
        {
            type: "Project Deadline",
            client: "Global Systems",
            dueDate: "2024-02-16",
            status: "Completed",
            autoSend: true,
        },
    ]);

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            {/* Coming Soon Banner */}
            <div className="w-full bg-zinc-800 text-center py-2 rounded-md mb-4 animate-pulse">
                <p className="text-lg font-bold text-purple-400">🚀 This will be available soon!</p>
            </div>

            {/* Header Section */}
            <div className="flex justify-between items-center pb-6 border-b border-zinc-700">
                <h1 className="text-xl font-semibold">🔔 Reminders</h1>
                <button className="bg-purple-600 px-3 py-1.5 text-sm rounded-md hover:bg-purple-700 transition">
                    + New Reminder
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 my-6">
                <div className="p-3 bg-zinc-800 rounded-lg shadow text-center">
                    <p className="text-xs text-zinc-400">Total Reminders</p>
                    <p className="text-lg font-bold text-purple-400">24</p>
                </div>
                <div className="p-3 bg-zinc-800 rounded-lg shadow text-center">
                    <p className="text-xs text-zinc-400">Due Today</p>
                    <p className="text-lg font-bold text-orange-400">8</p>
                </div>
                <div className="p-3 bg-zinc-800 rounded-lg shadow text-center">
                    <p className="text-xs text-zinc-400">Overdue</p>
                    <p className="text-lg font-bold text-red-400">3</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="🔍 Search reminders..."
                    className="bg-zinc-800 text-white px-3 py-1.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 px-3 py-1.5 text-sm rounded-md hover:bg-purple-700 transition">
                    Filter ▼
                </button>
            </div>

            {/* Reminder Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-zinc-800 text-purple-300">
                            <th className="p-2 border border-zinc-700">Reminder Type</th>
                            <th className="p-2 border border-zinc-700">Client</th>
                            <th className="p-2 border border-zinc-700">Due Date</th>
                            <th className="p-2 border border-zinc-700">Status</th>
                            <th className="p-2 border border-zinc-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reminders.map((reminder, index) => (
                            <tr key={index} className="bg-zinc-800 hover:bg-zinc-700 transition">
                                <td className="p-2 border border-zinc-700">{reminder.type}</td>
                                <td className="p-2 border border-zinc-700">{reminder.client}</td>
                                <td className="p-2 border border-zinc-700">{reminder.dueDate}</td>
                                <td className="p-2 border border-zinc-700">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-md ${
                                            reminder.status === "Pending"
                                                ? "bg-purple-500 text-white"
                                                : reminder.status === "In Progress"
                                                ? "bg-orange-500 text-white"
                                                : "bg-green-500 text-white"
                                        }`}
                                    >
                                        {reminder.status}
                                    </span>
                                </td>
                                <td className="p-2 border border-zinc-700">
                                    <div className="flex items-center gap-2">
                                        <button className="bg-green-500 px-2 py-1 text-xs rounded-md text-white hover:bg-green-600">
                                            ✔ Done
                                        </button>
                                        <span className="text-xs text-zinc-400">Auto-send</span>
                                        <div
                                            className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${
                                                reminder.autoSend ? "bg-purple-600" : "bg-zinc-500"
                                            }`}
                                        >
                                            <div
                                                className={`w-3 h-3 bg-white rounded-full shadow transform ${
                                                    reminder.autoSend ? "translate-x-4" : "translate-x-0"
                                                } transition`}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
