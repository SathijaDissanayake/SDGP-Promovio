// Analytics.jsx
import React from 'react';
import "./Analytics.css";  // For styling

const Analytics = ({ contentData }) => {
  // Dummy analytics data (replace with actual dynamic data)
  const analyticsData = {
    totalPosts: contentData.length,
    scheduledPosts: contentData.filter(post => post.status === 'scheduled').length,
    publishedPosts: contentData.filter(post => post.status === 'published').length,
    upcomingPosts: contentData.filter(post => post.status === 'upcoming').length,
  };

  return (
    <div className="analytics-buffer">
      <h2>Analytics Overview</h2>
      <p><strong>Total Posts:</strong> {analyticsData.totalPosts}</p>
      <p><strong>Scheduled Posts:</strong> {analyticsData.scheduledPosts}</p>
      <p><strong>Published Posts:</strong> {analyticsData.publishedPosts}</p>
      
    </div>
  );
};

export default Analytics;
