import axios from 'axios';
import { useState, useEffect } from 'react';
import "./ContentScheduling.css";
import ContentGrid from "./ContentGrid";
import ContentCalendar from "./ContentCalendar"; // Updated Import
import { PlusIcon, CalendarIcon } from "./Icons";
import CreateIdeaModal from "./CreateIdeaModal";
import Analytics from './Analytics';  // Import the Analytics component
import PublishSidebar from"./PublishSideBar"; // Import the new Publish Sidebar component

const ContentScheduling = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // Show calendar state
  const [showAnalytics, setShowAnalytics] = useState(false); // State to toggle analytics view
  const [showPublishSidebar, setShowPublishSidebar] = useState(false); // State to toggle Publish Sidebar

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content")
      .then((response) => {
        setContentData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content-scheduling">
      <div className="content-header">
        <h1>Content Scheduling</h1>
        
      </div>

      <div className="content-actions">
        <div className="action-buttons">
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            <span className="icon">
              <PlusIcon />
            </span>
            Create
          </button>

          <button className="create-btn" onClick={() => setShowCalendar(!showCalendar)}>
            <span className="icon">
              <CalendarIcon />
            </span>
            View Calendar
          </button>

          {/* Analyze button to toggle analytics */}
          <button className="create-btn" onClick={() => setShowAnalytics(!showAnalytics)}>
            Analyze
          </button>

          {/* Publish button to toggle the Publish Sidebar */}
          <button className="create-btn" onClick={() => setShowPublishSidebar(!showPublishSidebar)}>
            Publish
          </button>
        </div>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "scheduled" ? "active" : ""}`}
            onClick={() => setActiveTab("scheduled")}
          >
            Scheduled Post
          </button>
          <button
            className={`tab ${activeTab === "recent" ? "active" : ""}`}
            onClick={() => setActiveTab("recent")}
          >
            Recent Post
          </button>
        </div>
      </div>

      <div className="content-body">
        {showCalendar ? (
          <ContentCalendar scheduledPosts={contentData} />
        ) : (
          <div className="content-main">
            {loading ? <p>Loading...</p> : <ContentGrid data={contentData} />}
          </div>
        )}

        {/* Analytics Sidebar - Show it when "Analyze" button is clicked */}
        {showAnalytics && (
          <div className="content-sidebar">
            <Analytics contentData={contentData} /> {/* Pass content data to the Analytics component */}
          </div>
        )}

        {/* Publish Sidebar - Show it when "Publish" button is clicked */}
        {showPublishSidebar && (
          <div className="content-sidebar">
            <PublishSidebar contentData={contentData} /> {/* Pass content data to the PublishSidebar component */}
          </div>
        )}
      </div>

      {showCreateModal && <CreateIdeaModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default ContentScheduling;
