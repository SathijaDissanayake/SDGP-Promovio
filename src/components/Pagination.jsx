import { useState } from 'react';

export default function PaginationComponent({ totalEntries = 10328 }) {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const entriesOptions = [10, 25, 50, 100, 'All'];

    return (
        <div className="pagination-container">
            <div className="entries-info">
                <span>Showing </span>
                <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(e.target.value)}
                >
                    {entriesOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span> of {totalEntries} entries</span>
            </div>

            <div className="pagination">
                <button>&lt;</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>&gt;</button>
            </div>
        </div>
    );
}
