import "../styles/searchbar.css";

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
        <div className="search-bar-container">
            <div className="tabs-container">
                <div className="filters">
                    {filters.map((status) => (
                        <button
                            key={status}
                            className={`button ${activeFilter === status ? 'active' : ''}`}
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
