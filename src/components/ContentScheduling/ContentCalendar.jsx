import React, { useState } from "react";
import "./ContentCalendar.css";

const ContentCalendar = ({ scheduledPosts }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatTime = (hour) => `${hour}:00`;

  // Get month and year for display
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Function to change month
  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="nav-button">❮</button>
        <h2>{currentMonth} {currentYear}</h2>
        <button onClick={() => changeMonth(1)} className="nav-button">❯</button>
      </div>

      <div className="calendar">
        <div className="weekdays">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
            (day, index) => (
              <div key={index} className="calendar-day">{day}</div>
            )
          )}
        </div>

        <div className="calendar-body">
          {[...Array(12)].map((_, hour) => (
            <div key={hour} className="calendar-row">
              <div className="calendar-time">{formatTime(hour * 2)}</div>
              {Array(7).fill(null).map((_, dayIndex) => (
                <div key={dayIndex} className="calendar-cell">
                  {scheduledPosts.map((post, i) => {
                    const postDate = new Date(post.scheduledTime);
                    return (
                      postDate.getDay() === dayIndex &&
                      postDate.getHours() === hour * 2 &&
                      postDate.getMonth() === currentDate.getMonth() &&
                      postDate.getFullYear() === currentDate.getFullYear() && (
                        <div key={i} className="calendar-post">
                          {post.content}
                        </div>
                      )
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
