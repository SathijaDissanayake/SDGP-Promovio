
import '../styles/SearchBar.css';



export default function SearchBar() {
    return (

        <div className="search-bar-container">
            <div className="tabs-container">
                <div className="filters">
                    <button className="button">All</button>
                    <button className="button">Active</button>
                    <button className="button">Archive</button>
                </div>
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Type here"/>
                <button className="purple-btn">Search</button>
                <button className="purple-btn">Download</button>
                <button className="purple-btn">Delete</button>
            </div>

        </div>
    );
}
