import React, { useState, useEffect } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://api.example.com/notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
        <div className="bg-gray-800 p-1 sm:p-2 rounded">
          <h1 className="text-3xl font-bold text-purple-400">Recent Notifications</h1>
          <ul className="space-y-1 sm:space-y-2">
            {notifications.map((notification, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{notification.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{notification.message}</p>
                </div>
                <p className="text-green-400">+${notification.amount}</p>
              </li>
            ))}
          </ul>
        </div>
  );
}

export default Notifications;
