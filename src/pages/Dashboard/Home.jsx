import React, { useRef } from "react";
import { useState } from 'react';
import { motion } from "framer-motion";
import Overview from "../../components/Dashboard/Overview";
import Analytics from "../../components/Dashboard/Analytics";
import Reports from "../../components/Dashboard/Reports";
import Notifications from "../../components/Dashboard/Notifications";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import CurrentPage from '../../components/CurrentPage';
import { FaChartBar, FaFileAlt, FaBell, FaInfoCircle } from "react-icons/fa";



function Home() {
  useUserAuth();
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

  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = [
    { name: "Overview", icon: <FaInfoCircle /> },    
    { name: "Analytics", icon: <FaChartBar /> },      
    { name: "Reports", icon: <FaFileAlt /> },          
    { name: "Notifications", icon: <FaBell /> }        
  ];

  return (
      <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto  h-full">
                <div className="grid grid-cols-1 gap-6">
                <CurrentPage setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs} handleDownload={handleDownload}/>
            {activeTab === 'Overview' && <Overview chartRef={chartRef}/>}
            {activeTab === 'Analytics' && <Analytics />}
            {activeTab === 'Reports' && <Reports />}
            {activeTab === 'Notifications' && <Notifications />}
                </div>
            </div>
      </DashboardLayout>
 
  );
}

export default Home;