import '../styles/currentpage.css';

export default function CurrentPage() {
    return (
        <div className="currentPageContainer">
            <div className="currentPageHeader">
                <div className="header-left">
                    <div className="title">
                        <h2>CRM</h2>
                    </div>
                    <div className="tabs">
                        <button className="tab">Contacts</button>
                        <button className="tab">Email</button>
                        <button className="tab">Task</button>
                        <button className="tab">Reminder</button>
                    </div>
                </div>

                <div className="header-search">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-customers">Search Customers</button>
                </div>
            </div>
        </div>
    );
}

