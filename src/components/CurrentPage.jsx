import { FaUser, FaEnvelope, FaTasks, FaClock } from "react-icons/fa";
import "../styles/currentpage.css";

export default function CurrentPage({ setActiveTab, activeTab }) {
    const tabs = [
        { name: "Contacts", icon: <FaUser /> },
        { name: "Email", icon: <FaEnvelope /> },
        { name: "Task", icon: <FaTasks /> },
        { name: "Reminder", icon: <FaClock /> }
    ];

    return (
        <div className="currentPageContainer">
            <div className="title">
                <h2>CRM</h2>
            </div>

            {/* Header Section */}
            <div className="currentPageHeader">
                {tabs.map(({ name, icon }) => (
                    <button
                        key={name}
                        className={`tab ${activeTab === name ? "active" : ""}`}
                        onClick={() => setActiveTab(name)}
                    >
                        <span className="tab-icon">{icon}</span>
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
