import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ContentCalendar.css";

const ScheduleCalendar = ({ onSchedule }) => {
  const startHour = 0; // Start of the day (12 AM)
  const endHour = 23; // End of the day (11 PM)
  const daysToShow = 7; // Show a week

  const [selectedDate, setSelectedDate] = useState(moment());

  const timeSlots = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => moment().hour(startHour + i).minute(0).format("h A")
  );

  const weekDays = Array.from({ length: daysToShow }, (_, i) =>
    selectedDate.clone().add(i, "days").format("ddd, MMM D")
  );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [posts, setPosts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");

  const handleSlotClick = (day, time) => {
    setSelectedSlot({ day, time });
    setShowModal(true);
  };

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;

    const key = `${selectedSlot.day}-${selectedSlot.time}`;
    setPosts((prev) => ({ ...prev, [key]: postContent }));

    onSchedule({ day: selectedSlot.day, time: selectedSlot.time, post: postContent });

    setShowModal(false);
    setPostContent("");
  };

  // Go to next week
  const handleNextWeek = () => {
    setSelectedDate(prev => prev.clone().add(7, 'days'));
  };

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
            {/* Add the arrow beside the last day */}
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
          <>
            <div key={`time-${rowIndex}`} className="border p-2 text-center font-bold bg-gray-100">
              {time}
            </div>
            {weekDays.map((day, colIndex) => {
              const key = `${day}-${time}`;
              return (
                <div
                  key={`slot-${rowIndex}-${colIndex}`}
                  className={`border p-4 cursor-pointer text-center relative hover:bg-gray-200`}
                  onClick={() => handleSlotClick(day, time)}
                >
                  {posts[key] ? (
                    <span className="block text-xs text-blue-600">{posts[key]}</span>
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 text-sm text-gray-500">
                      
                    </span>
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>

      {/* Modal for Adding Post */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Post</h3>
            <textarea
              className="post-input"
              placeholder="Enter your post..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            <div className="modal-actions">
              <button className="btn save-btn" onClick={handlePostSubmit}>Schedule</button>
              <button className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
