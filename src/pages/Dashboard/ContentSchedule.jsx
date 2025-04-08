import axios from 'axios';
import { useState, useEffect } from 'react';
import ContentGrid from '../../components/ContentSchedule/ContentGrid';
import ContentCalendar from '../../components/ContentSchedule/ContentCalendar';
import { PlusIcon, CalendarIcon } from '../../components/ContentSchedule/Icons';
import CreateIdeaModal from '../../components/ContentSchedule/CreateIdeaModal';
import PublishSidebar from '../../components/ContentSchedule/PublishSideBar';
import IdeasFeed from '../../components/ContentSchedule/IdeasFeed';
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from '../../components/layouts/DashboardLayout';

const ContentScheduling = () => {
  useUserAuth();

  const [activeTab, setActiveTab] = useState("scheduled");
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPublishSidebar, setShowPublishSidebar] = useState(false);
  const [showIdeasFeed, setShowIdeasFeed] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/content")
      .then((response) => {
        setContentData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content data:", error);
        setLoading(false);
      });
  }, []);

  const styles = {
    wrapper: { padding: "20px 0" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px"
    },
    heading: {
      color: "#d6e4f0",
      fontSize: "28px",
      fontWeight: 600
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "24px"
    },
    actionButtons: {
      display: "flex",
      gap: "12px"
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 18px",
      borderRadius: "6px",
      fontWeight: 500,
      background: "#1e2a40",           // 🔵 Dark blue background
      color: "#e4ecf4",                // Soft light text
      border: "1px solid #30425f",     // Slight border for definition
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      transition: "all 0.3s ease"
    },
    body: {
      display: "flex",
      gap: "24px"
    },
    main: {
      flex: 1
    },
    sidebar: {
      width: "360px",
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    },
    icon: {
      display: "flex",
      alignItems: "center"
    }
  };

  return (
    <DashboardLayout activeMenu="Schedule">
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Content Scheduling</h1>
        </div>

        <div style={styles.actions}>
          <div style={styles.actionButtons}>
            <button style={styles.button} onClick={() => setShowCreateModal(true)}>
              <span style={styles.icon}><PlusIcon /></span>
              Create
            </button>

            <button style={styles.button} onClick={() => setShowCalendar(!showCalendar)}>
              <span style={styles.icon}><CalendarIcon /></span>
              View Calendar
            </button>

            <button style={styles.button} onClick={() => setShowPublishSidebar(!showPublishSidebar)}>
              Publish
            </button>

            <button style={styles.button} onClick={() => setShowIdeasFeed(!showIdeasFeed)}>
              Ideas Feed
            </button>
          </div>
        </div>

        <div style={styles.body}>
          {showCalendar ? (
            <ContentCalendar scheduledPosts={contentData} />
          ) : showIdeasFeed ? (
            <IdeasFeed />
          ) : (
            <div style={styles.main}>
              {loading ? <p>Loading...</p> : <ContentGrid data={contentData} />}
            </div>
          )}

          {showPublishSidebar && (
            <div style={styles.sidebar}>
              <PublishSidebar contentData={contentData} />
            </div>
          )}
        </div>

        {showCreateModal && <CreateIdeaModal onClose={() => setShowCreateModal(false)} />}
      </div>
    </DashboardLayout>
  );
};

export default ContentScheduling;
