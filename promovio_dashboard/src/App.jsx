import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Overview from "./components/Overview";
import Analytics from "./components/Analytics";
import Reports from "./components/Reports";
import Notifications from "./components/Notifications";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="mt-4">
      <ul className="flex space-x-4">
        {[
          { name: "Overview", path: "/" },
          { name: "Analytics", path: "/analytics" },
          { name: "Reports", path: "/reports" },
          { name: "Notifications", path: "/notifications" },
        ].map(({ name, path }) => (
          <li key={name} className="relative">
            <Link
              to={path}
              className={`relative transition-colors duration-200 hover:text-gray-300 ${
                location.pathname === path ? "text-purple-400 font-bold" : "text-gray-500"
              }`}
            >
              {name}
              {location.pathname === path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-0.5 bg-purple-400 w-full"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  const chartRef = useRef(null);

  // Function to handle download
  const handleDownload = () => {
    if (chartRef.current) {
      const imageURL = chartRef.current.toBase64Image(); // Convert to image
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "AD_Performance.png";
      link.click();
    }
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-900 text-white p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Dashboard Header */}
        <header className="mb-2 sm:mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-purple-500">Dashboard</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded hover:bg-purple-700"
              >
                Download
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Navbar />
        </header>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Overview chartRef={chartRef} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;