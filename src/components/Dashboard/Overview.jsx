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

  const StatCard = ({ title, value, change }) => (
    <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
      <h2 className="text-sm sm:text-lg font-semibold">{title}</h2>
      <p className="text-lg sm:text-2xl mt-1">{value}</p>
      <p className="text-xs sm:text-sm text-gray-400">+{change}% from last month</p>
    </div>
  );


  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch notifications data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard overview
        const overviewRes = await fetch("http://localhost:8000/api/analytics/dashboard");
        const overviewData = await overviewRes.json();
        setDashboardData(overviewData);

        // Fetch notifications (already done)
        const notificationsRes = await fetch("http://localhost:8000/api/notifications");
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  // Data for the Bar Chart
  const chartData = {
    labels: dashboardData ? dashboardData.adPerformance.map(item => item.month) : [],
    datasets: [
      {
        label: "AD Performance",
        data: dashboardData ? dashboardData.adPerformance.map(item => item.value) : [],
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
    <div className="min-h-screen w-full  text-white p-2 sm:p-4 md:p-6 lg:p-8">

      {/* Dashboard Stats */}
      {dashboardData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatCard
            title="Active Campaigns"
            value={dashboardData.overview.activeCampaigns.count}
            change={dashboardData.overview.activeCampaigns.percentChange}
          />
          <StatCard
            title="ROI"
            value={dashboardData.overview.roi.value}
            change={dashboardData.overview.roi.percentChange}
          />
          <StatCard
            title="Performance"
            value={dashboardData.overview.performance.value}
            change={dashboardData.overview.performance.percentChange}
          />
          <StatCard
            title="Active Now"
            value={dashboardData.overview.activeNow.count}
            change={dashboardData.overview.activeNow.percentChange}
          />
        </div>
      )}


      {/* Graph & Notifications Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-2">
        {/* AD Performance Chart */}
        <div className="bg-zinc-900 p-1 sm:p-2 rounded lg:col-span-2">
          <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">AD Performance</h2>
          {/* Attach ref to the Bar chart */}
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        {/* Recent Notifications */}
        <div className="bg-zinc-900 p-1 sm:p-2 rounded">
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