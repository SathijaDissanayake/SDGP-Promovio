import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaLinkedin } from 'react-icons/fa';  // Importing icons
import "./PublishSidebar.css";

const PublishSidebar = ({ contentData }) => {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const togglePostSelection = (postId) => {
    setSelectedPosts((prevSelectedPosts) =>
      prevSelectedPosts.includes(postId)
        ? prevSelectedPosts.filter(id => id !== postId)
        : [...prevSelectedPosts, postId]
    );
  };

  const togglePlatformSelection = (platform) => {
    setSelectedPlatforms((prevSelectedPlatforms) =>
      prevSelectedPlatforms.includes(platform)
        ? prevSelectedPlatforms.filter(p => p !== platform)
        : [...prevSelectedPlatforms, platform]
    );
  };

  const handlePublish = () => {
    alert(`Publishing to ${selectedPlatforms.join(', ')} with selected posts: ${selectedPosts.join(', ')}`);
  };

  return (
    <div className="publish-sidebar">
      <h2 className="sidebar-header">Connect and Publish Your Content</h2>

      {/* Post Selection */}
      <div className="selection-section">
        <button>Select Posts</button>
        <div className="post-list">
          {contentData.map((post) => (
            <div key={post.id} className="post-option">
              <input
                type="checkbox"
                checked={selectedPosts.includes(post.id)}
                onChange={() => togglePostSelection(post.id)}
              />
              <label>{post.title}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Selection */}
      <div className="selection-section">
        <h3>Select Platforms</h3>
        <div className="platform-list">
          <div className="checkbox-container">
            {[{
              platform: 'Instagram',
              icon: <FaInstagram />
            },
            {
              platform: 'TikTok',
              icon: <FaTiktok />
            },
            {
              platform: 'Twitter',
              icon: <FaTwitter />
            },
            {
              platform: 'YouTube',
              icon: <FaYoutube />
            },
            {
              platform: 'LinkedIn',
              icon: <FaLinkedin />
            }]
            .map(({ platform, icon }) => (
              <div key={platform} className="platform-option">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => togglePlatformSelection(platform)}
                />
                <label className="platform-label">
                  {icon} {platform}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publish and Cancel Buttons */}
      <div className="action-buttons">
        <button className="publish-btn" onClick={handlePublish}>Publish Now</button>
        <button className="cancel-btn" onClick={() => alert('Publishing canceled')}>Cancel</button>
      </div>
    </div>
  );
};

export default PublishSidebar;
