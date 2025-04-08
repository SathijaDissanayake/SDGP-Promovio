import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContentCalendar = ({ onSchedule }) => {
  const startHour = 0;
  const endHour = 23;
  const daysToShow = 7;

  const [selectedDate, setSelectedDate] = useState(moment());
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [scheduledPosts, setScheduledPosts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const timeSlots = Array.from({ length: endHour - startHour + 1 }, (_, i) =>
    moment().hour(startHour + i).minute(0).format("h A")
  );

  const weekDays = Array.from({ length: daysToShow }, (_, i) =>
    selectedDate.clone().add(i, "days").format("ddd, MMM D")
  );

  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
    setSavedPosts(localPosts);
  }, []);

  const handleSlotClick = (day, time) => {
    setSelectedSlot({ day, time });
    setSelectedPostId("");
    setShowModal(true);
  };

  const handleSchedulePost = () => {
    if (!selectedPostId) {
      alert("Please select a post to schedule");
      return;
    }

    const selectedPost = savedPosts.find(post => post.id.toString() === selectedPostId);
    if (!selectedPost) return;

    const key = `${selectedSlot.day}-${selectedSlot.time}`;

    const scheduledPostInfo = {
      id: selectedPost.id,
      title: selectedPost.title,
      day: selectedSlot.day,
      time: selectedSlot.time
    };

    setScheduledPosts(prev => ({ ...prev, [key]: scheduledPostInfo }));

    onSchedule({
      day: selectedSlot.day,
      time: selectedSlot.time,
      post: selectedPost
    });

    const existingScheduled = JSON.parse(localStorage.getItem("scheduledPosts") || "[]");
    existingScheduled.push({
      postId: selectedPost.id,
      day: selectedSlot.day,
      time: selectedSlot.time,
      scheduledAt: new Date().toISOString()
    });
    localStorage.setItem("scheduledPosts", JSON.stringify(existingScheduled));

    setShowModal(false);
  };

  const handleNextWeek = () => {
    setSelectedDate(prev => prev.clone().add(7, 'days'));
  };

  useEffect(() => {
    const checkForUpcomingPost = () => {
      const now = moment();
      const currentDay = now.format("ddd, MMM D");
      const currentHour = now.format("h A");

      const scheduled = JSON.parse(localStorage.getItem("scheduledPosts") || "[]");

      const match = scheduled.find(post =>
        post.day === currentDay && post.time === currentHour
      );

      if (match) {
        const notifiedKey = `${currentDay}-${currentHour}`;
        const alreadyNotified = localStorage.getItem("notifiedFor") === notifiedKey;

        if (!alreadyNotified) {
          alert("🔔 You have 1 post available to publish this hour.");
          localStorage.setItem("notifiedFor", notifiedKey);
        }
      }
    };

    checkForUpcomingPost();
    const interval = setInterval(checkForUpcomingPost, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      padding: "1.5rem",
      backgroundColor: "#1e1e2e",
      color: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "100px repeat(7, 1fr)",
      border: "1px solid #bb86fc",
      backgroundColor: "rgba(255,255,255,0.05)"
    },
    slot: (isHovered) => ({
      border: "1px solid #bb86fc",
      padding: "1rem",
      position: "relative",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: isHovered ? "#2a2a3a" : undefined,
      transition: "background 0.3s ease"
    }),
    tooltip: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#444",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "12px"
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: "#2c2c3a",
      color: "#fff",
      padding: "2rem",
      borderRadius: "10px",
      width: "400px",
      maxWidth: "100%",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)"
    },
    postSelect: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #bb86fc",
      marginBottom: "1rem",
      backgroundColor: "#1e1e2e",
      color: "#fff"
    },
    previewBox: {
      backgroundColor: "#1e1e2e",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "10px"
    },
    modalActions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem"
    },
    btn: {
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      fontWeight: 600,
      cursor: "pointer"
    },
    saveBtn: {
      backgroundColor: "#bb86fc",
      color: "#1e1e2e"
    },
    cancelBtn: {
      backgroundColor: "#444",
      color: "#ffffff"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", color: "#bb86fc" }}>Schedule Your Post</h2>

      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          style={{ backgroundColor: "#bb86fc", color: "#1e1e2e", padding: "0.5rem 1rem", borderRadius: "5px", fontWeight: 600 }}
          onClick={() => setSelectedDate(prev => prev.clone().subtract(1, "month"))}
        >
          ◀ Prev Month
        </button>

        <DatePicker
          selected={selectedDate.toDate()}
          onChange={(date) => setSelectedDate(moment(date))}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="react-datepicker__input"
        />

        <button
          style={{ backgroundColor: "#bb86fc", color: "#1e1e2e", padding: "0.5rem 1rem", borderRadius: "5px", fontWeight: 600 }}
          onClick={() => setSelectedDate(prev => prev.clone().add(1, "month"))}
        >
          Next Month ▶
        </button>
      </div>

      <div style={styles.grid}>
        <div style={{ border: "1px solid #bb86fc", padding: "0.5rem", backgroundColor: "#2a2a3a", textAlign: "center", fontWeight: "bold" }}>Time</div>
        {weekDays.map((day, i) => (
          <div key={i} style={{ border: "1px solid #bb86fc", padding: "0.5rem", backgroundColor: "#2a2a3a", textAlign: "center", fontWeight: "bold" }}>
            {day}
            {i === weekDays.length - 1 && (
              <button
                style={{ marginLeft: "0.5rem", fontSize: "0.875rem", color: "#bb86fc" }}
                onClick={handleNextWeek}
                title="Next Week"
              >
                ➡️
              </button>
            )}
          </div>
        ))}

        {timeSlots.map((time, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <div style={{ border: "1px solid #bb86fc", padding: "0.5rem", backgroundColor: "#37374f", textAlign: "center", fontWeight: "bold" }}>{time}</div>
            {weekDays.map((day, colIndex) => {
              const key = `${day}-${time}`;
              const scheduledPost = scheduledPosts[key];
              const isHovered = hoveredSlot === key;
              return (
                <div
                  key={`slot-${rowIndex}-${colIndex}`}
                  style={styles.slot(isHovered)}
                  onClick={() => handleSlotClick(day, time)}
                  onMouseEnter={() => setHoveredSlot(key)}
                  onMouseLeave={() => setHoveredSlot(null)}
                >
                  {scheduledPost ? (
                    <span style={{ fontSize: "14px", color: "#bb86fc", fontWeight: "bold" }}>{scheduledPost.title}</span>
                  ) : (
                    isHovered && <span style={styles.tooltip}>Add Post</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ color: "#bb86fc" }}>Schedule a Post</h3>
            <p style={{ fontSize: "14px", marginBottom: "1rem" }}>
              Select a post to schedule on {selectedSlot?.day} at {selectedSlot?.time}
            </p>

            {savedPosts.length === 0 ? (
              <p style={{ textAlign: "center", padding: "1rem" }}>No saved posts found. Create some posts first!</p>
            ) : (
              <>
                <select
                  value={selectedPostId}
                  onChange={(e) => setSelectedPostId(e.target.value)}
                  style={styles.postSelect}
                >
                  <option value="">-- Select a post --</option>
                  {savedPosts.map((post) => (
                    <option key={post.id} value={post.id}>
                      {post.title}
                    </option>
                  ))}
                </select>

                {selectedPostId && (
                  <div style={styles.previewBox}>
                    <h4 style={{ fontWeight: "bold", fontSize: "14px", color: "#bb86fc" }}>Post Preview:</h4>
                    <p style={{ fontSize: "13px", marginTop: "5px", color: "#e0e0e0" }}>
                      {savedPosts.find(p => p.id.toString() === selectedPostId)?.message.substring(0, 100)}
                      {savedPosts.find(p => p.id.toString() === selectedPostId)?.message.length > 100 ? '...' : ''}
                    </p>
                  </div>
                )}
              </>
            )}

            <div style={styles.modalActions}>
              <button
                style={{ ...styles.btn, ...styles.saveBtn }}
                onClick={handleSchedulePost}
                disabled={!selectedPostId}
              >
                Schedule
              </button>
              <button
                style={{ ...styles.btn, ...styles.cancelBtn }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCalendar;
