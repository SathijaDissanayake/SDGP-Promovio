import React, { useRef, useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function App() {
  const chartRef = useRef(null);

  const [notifications, setNotifications] = useState([]);

  const handleDownload = () => {
    const chart = chartRef.current;
    if (chart) {
      const imageURL = chart.toBase64Image();

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "AD_Performance.png";
      link.click();
    }
  };

  // Fetch notifications data from a link when component mounts
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
        data: [],
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


  // Donut chart data 
  const doughnutData = {
    labels: ["Instagram", "Facebook", "Tiktok", "LinkedIn" ],
    datasets: [
      {
        label: "Dataset",
        data: [12, 19, 3, 5], // Values for each section
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center mb-2 sm:mb-4">
        <h1 className="text-lg sm:text-3xl font-bold text-purple-500">Analytics Dashboard</h1>
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded hover:bg-purple-700"
        >
          Download
        </button>
      </header>



      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Reach</h2>
          <p className="text-lg sm:text-2xl mt-1">45,231.99</p>
          <p className="text-xs sm:text-sm text-gray-400">+15% from last month</p>
        </div>
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Impressions</h2>
          <p className="text-lg sm:text-2xl mt-1">+2350</p>
          <p className="text-xs sm:text-sm text-gray-400">+120.1% from last month</p>
        </div>
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Cost Per Result</h2>
          <p className="text-lg sm:text-2xl mt-1">+18,000</p>
          <p className="text-xs sm:text-sm text-gray-400">+19% from last month</p>
        </div>
        <div className="bg-gray-800 p-1 sm:p-2 rounded shadow">
          <h2 className="text-sm sm:text-lg font-semibold">Amount Spent</h2>
          <p className="text-lg sm:text-2xl mt-1">+20,000</p>
          <p className="text-xs sm:text-sm text-gray-400">+820% since last host</p>
        </div>
      </div>

      {/* Graph & Notifications Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-2">
        {/* AD Performance Chart */}
        <div className="bg-gray-800 p-1 sm:p-2 rounded lg:col-span-2">
          <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">Clicks</h2>
          {/* Attach ref to the Bar chart */}
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>

        {/* Recent Notifications */}
        <div className="bg-gray-800 p-1 sm:p-2 rounded">
          <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">Publisher Platforms</h2>
          {<div style={{ width: "400px", height: "400px" }}>
              <Doughnut ref={chartRef} data={doughnutData} options={doughnutOptions} />
          </div>}
          {/* <ul className="space-y-1 sm:space-y-2">
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default App;