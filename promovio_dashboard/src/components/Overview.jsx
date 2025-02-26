import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Overview({ chartRef }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications data when component mounts
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

  // Data for the Bar Chart
  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "AD Performance",
        data: [5800, 1200, 3000, 3200, 5000, 2000, 1800, 4600, 4700, 5200, 5400, 5800],
        backgroundColor: "#8B5CF6", 
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#fff" },
      },
      y: {
        grid: { color: "#444" },
        ticks: { color: "#fff" },
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-2 sm:p-4 md:p-6 lg:p-8">
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Active Campaigns</h2>
          <p className="text-lg sm:text-2xl mt-1">45,231.89</p>
          <p className="text-xs sm:text-sm text-gray-400">+20% from last month</p>
        </div>
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">ROI</h2>
          <p className="text-lg sm:text-2xl mt-1">+2350</p>
          <p className="text-xs sm:text-sm text-gray-400">+180.1% from last month</p>
        </div>
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Performance</h2>
          <p className="text-lg sm:text-2xl mt-1">+12,234</p>
          <p className="text-xs sm:text-sm text-gray-400">+19% from last month</p>
        </div>
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Active Now</h2>
          <p className="text-lg sm:text-2xl mt-1">+573</p>
          <p className="text-xs sm:text-sm text-gray-400">+20% since last host</p>
        </div>
      </div>

      {/* Graph & Notifications Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-2">
        {/* AD Performance Chart */}
        <div className="bg-gray-800 p-1 sm:p-2 rounded lg:col-span-2">
          <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">AD Performance</h2>
          {/* Attach ref to the Bar chart */}
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        {/* Recent Notifications */}
        <div className="bg-gray-800 p-1 sm:p-2 rounded">
          <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">Recent Notifications</h2>
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
      </div>
    </div>
  );
}

export default Overview;