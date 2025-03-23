import axios from 'axios';
import { useState, useEffect } from 'react';
import "./ContentScheduling.css";
import ContentGrid from "./ContentGrid";
import ContentCalendar from "./ContentCalendar";
import { PlusIcon, CalendarIcon } from "./Icons";
import CreateIdeaModal from "./CreateIdeaModal";
import Analytics from './Analytics';
import PublishSidebar from "./PublishSideBar";
import IdeasFeed from "./IdeasFeed";  // ✅ Import IdeasFeed

const ContentScheduling = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showPublishSidebar, setShowPublishSidebar] = useState(false);
  const [showIdeasFeed, setShowIdeasFeed] = useState(false); // ✅ State for Ideas Feed

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

          <button className="create-btn" onClick={() => setShowAnalytics(!showAnalytics)}>
            Analyze
          </button>

          <button className="create-btn" onClick={() => setShowPublishSidebar(!showPublishSidebar)}>
            Publish
          </button>

          {/* ✅ Button to toggle IdeasFeed */}
          <button className="create-btn" onClick={() => setShowIdeasFeed(!showIdeasFeed)}>
            Ideas Feed
          </button>
        </div>
      </div>

      <div className="content-body">
        {showCalendar ? (
          <ContentCalendar scheduledPosts={contentData} />
        ) : showIdeasFeed ? (
          <IdeasFeed />
        ) : (
          <div className="content-main">
            {loading ? <p>Loading...</p> : <ContentGrid data={contentData} />}
          </div>
        )}

        {showAnalytics && (
          <div className="content-sidebar">
            <Analytics contentData={contentData} />
          </div>
        )}

        {showPublishSidebar && (
          <div className="content-sidebar">
            <PublishSidebar contentData={contentData} />
          </div>
        )}
      </div>

      {showCreateModal && <CreateIdeaModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default ContentScheduling;
