// Modified SearchBar.jsx
export default function SearchBar({ onFilterChange, activeFilter }) {
    const filters = ["All", "New Lead", "Contacted", "Interested", "Negotiation", "Converted", "Lost"];

    const handleFilterClick = (status) => {
        if (typeof onFilterChange === 'function') {
            onFilterChange(status);
        } else {
            console.warn('onFilterChange is not a function');
        }
    };

    return (
        <div className="p-5 bg-zinc-900 rounded-lg shadow-md mx-auto">
            <div className="flex w-full">
            <div className="flex flex-wrap justify-center gap-3">
    {filters.map((status) => (
        <button
            key={status}
            className={`px-4 py-2 rounded-xl text-sm font-medium border border-[rgba(9,5,78,0.4)] bg-[#1e1e2f] text-white cursor-pointer transition-all duration-300 capitalize
                ${activeFilter === status ? 'bg-[#8f5de8] border-[#8f5de8] font-bold' : 'hover:bg-[#6a3fbb] focus:outline focus:outline-[#8f5de8] focus:outline-offset-2'}
            `}
            onClick={() => handleFilterClick(status)}
        >
            {status}
        </button>
    ))}
</div>

            </div>
        </div>
    );
}
