import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ContentCalendar.css";

const ScheduleCalendar = ({ onSchedule }) => {
  const startHour = 0; // Start of the day (12 AM)
  const endHour = 23; // End of the day (11 PM)
  const daysToShow = 7; // Show a week

  const [selectedDate, setSelectedDate] = useState(moment());
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState("");

  const timeSlots = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => moment().hour(startHour + i).minute(0).format("h A")
  );

  const weekDays = Array.from({ length: daysToShow }, (_, i) =>
    selectedDate.clone().add(i, "days").format("ddd, MMM D")
  );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [scheduledPosts, setScheduledPosts] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Fetch saved posts from localStorage
  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
    setSavedPosts(localPosts);
  }, []);

  const handleSlotClick = (day, time) => {
    setSelectedSlot({ day, time });
    setSelectedPostId(""); // Reset selection
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

    // Store the scheduled post information
    const scheduledPostInfo = {
      id: selectedPost.id,
      title: selectedPost.title,
      day: selectedSlot.day,
      time: selectedSlot.time
    };

    // Update the UI state
    setScheduledPosts(prev => ({ ...prev, [key]: scheduledPostInfo }));

    // Call the parent component's onSchedule function
    onSchedule({
      day: selectedSlot.day,
      time: selectedSlot.time,
      post: selectedPost
    });

    // Save scheduled posts to localStorage (optional)
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

  // Go to next week
  const handleNextWeek = () => {
    setSelectedDate(prev => prev.clone().add(7, 'days'));
  };
  useEffect(() => {
    const checkForUpcomingPost = () => {
      const now = moment();
      const currentDay = now.format("ddd, MMM D");  // e.g. "Sun, Mar 23"
      const currentHour = now.format("h A");        // e.g. "7 AM"

      const scheduled = JSON.parse(localStorage.getItem("scheduledPosts") || "[]");

      const match = scheduled.find(post =>
        post.day === currentDay && post.time === currentHour
      );

      if (match) {
        // Only show once per hour
        const notifiedKey = `${currentDay}-${currentHour}`;
        const alreadyNotified = localStorage.getItem("notifiedFor") === notifiedKey;

        if (!alreadyNotified) {
          alert("🔔 You have 1 post available to publish this hour.");
          localStorage.setItem("notifiedFor", notifiedKey);
        }
      }
    };

    checkForUpcomingPost();

    // Optional: Run again every 5 minutes
    const interval = setInterval(checkForUpcomingPost, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Schedule Your Post</h2>

      <div className="mb-4 flex items-center gap-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md custom-button"
          onClick={() => setSelectedDate(prev => prev.clone().subtract(1, "month"))}
        >
          ◀ Prev Month
        </button>

        <DatePicker
          selected={selectedDate.toDate()}
          onChange={(date) => setSelectedDate(moment(date))}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border px-3 py-1 rounded-md"
        />

        <button
          className="px-3 py-1 bg-gray-200 rounded-md custom-button"
          onClick={() => setSelectedDate(prev => prev.clone().add(1, "month"))}
        >
          Next Month ▶
        </button>
      </div>

      <div className="grid grid-cols-[100px_repeat(7,1fr)] border border-gray-300">
        <div className="border p-2 bg-gray-200 text-center font-bold">Time</div>
        {weekDays.map((day, i) => (
          <div key={i} className="border p-2 bg-gray-200 text-center font-bold">
            {day}
            {i === weekDays.length - 1 && (
              <button
                className="ml-2 text-sm text-gray-600 hover:text-gray-800"
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
            <div className="border p-2 text-center font-bold bg-gray-100">
              {time}
            </div>
            {weekDays.map((day, colIndex) => {
              const key = `${day}-${time}`;
              const scheduledPost = scheduledPosts[key];
              return (
                <div
                  key={`slot-${rowIndex}-${colIndex}`}
                  className={`border p-4 cursor-pointer text-center relative hover:bg-gray-200`}
                  onClick={() => handleSlotClick(day, time)}
                >
                  {scheduledPost ? (
                    <span className="block text-xs text-blue-600">{scheduledPost.title}</span>
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 text-sm text-gray-500">
                      +
                    </span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>


      {/* Modal for Selecting a Post */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Schedule a Post</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select a post to schedule on {selectedSlot?.day} at {selectedSlot?.time}
            </p>

            {savedPosts.length === 0 ? (
              <p className="text-center py-4">No saved posts found. Create some posts first!</p>
            ) : (
              <div className="post-select-container">
                <select
                  value={selectedPostId}
                  onChange={(e) => setSelectedPostId(e.target.value)}
                  className="post-select"
                >
                  <option value="">-- Select a post --</option>
                  {savedPosts.map((post) => (
                    <option key={post.id} value={post.id}>
                      {post.title}
                    </option>
                  ))}
                </select>

                {selectedPostId && (
                  <div className="post-preview">
                    <h4 className="preview-title">Post Preview:</h4>
                    <p className="preview-text">
                      {savedPosts.find(p => p.id.toString() === selectedPostId)?.message.substring(0, 100)}
                      {savedPosts.find(p => p.id.toString() === selectedPostId)?.message.length > 100 ? '...' : ''}
                    </p>
                  </div>
                )}
              </div>
            )}


            <div className="modal-actions">
              <button
                className="btn save-btn"
                onClick={handleSchedulePost}
                disabled={!selectedPostId}
              >
                Schedule
              </button>
              <button className="btn cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;