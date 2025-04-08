

export default function CurrentPage({ setActiveTab, activeTab, tabs, handleDownload }) {
    

    return (
        <div className="">
            {/* Sub Navbar */}
            <div className="bg-zinc-900 flex justify-start items-center p-3 rounded-lg gap-4 mb-3 shadow-lg">
                <div className="flex gap-4">
                {tabs.map(({ name, icon }) => (
                    <button
                        key={name}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-white
                        ${activeTab === name ? "bg-primary shadow-md" : "hover:bg-gray-800"}`}
                        onClick={() => setActiveTab(name)}
                    >
                        <span className="text-lg">{icon}</span>
                        <span className="text-sm font-medium">{name}</span>
                    </button>
                ))}
                </div>
                {handleDownload && (
                    <button
                        onClick={handleDownload}
                        className="ml-auto bg-primary hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
                    >
                        Download
                    </button>
                )}
            </div>
        </div>
    );
}
