import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import './PublishSidebar.css';

const PublishSidebar = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
    setSavedPosts(localPosts);
  }, []);

  const selectedPost = savedPosts.find(p => p.id.toString() === selectedPostId);

  const togglePlatformSelection = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePublish = () => {
    if (!selectedPostId || selectedPlatforms.length === 0) {
      alert('Please select a post and at least one platform.');
      return;
    }

    const post = selectedPost;
    const encodedMessage = encodeURIComponent(post.message || post.title);

    // ✅ Facebook Share
    if (selectedPlatforms.includes('Facebook')) {
      const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com&quote=${encodedMessage}`;
      window.open(fbShareUrl, '_blank');
    }

    // ✅ LinkedIn Share
    if (selectedPlatforms.includes('LinkedIn')) {
      const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://yourwebsite.com&summary=${encodedMessage}`;
      window.open(linkedInShareUrl, '_blank');
    }

    // ✅ Instagram App Launch + Clipboard Support (Mobile Only)
    if (selectedPlatforms.includes('Instagram')) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Copy post message to clipboard
        navigator.clipboard.writeText(post.message || post.title).then(() => {
          alert('📋 Post caption copied! Opening Instagram...');
          window.location.href = 'instagram://app'; // open app
        }).catch(() => {
          alert('Could not copy to clipboard, but opening Instagram anyway.');
          window.location.href = 'instagram://app';
        });
      } else {
        alert('Instagram sharing is only supported on mobile devices.');
      }
    }
  };

  return (
    <div className="publish-sidebar">
      <h2 className="sidebar-header">Connect and Publish Your Content</h2>

      {/* Select a Post */}
      <div className="selection-section">
        <h3>Select a Post</h3>
        <select
          value={selectedPostId}
          onChange={e => setSelectedPostId(e.target.value)}
          className="post-select"
        >
          <option value="">-- Select a post --</option>
          {savedPosts.map(post => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        </select>
      </div>

      {/* Select Platforms */}
      <div className="selection-section">
        <h3>Select Platforms</h3>
        <div className="platform-list">
          {[
            { platform: 'Facebook', icon: <FaFacebook /> },
            { platform: 'Instagram', icon: <FaInstagram /> },
            { platform: 'LinkedIn', icon: <FaLinkedin /> }
          ].map(({ platform, icon }) => (
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

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="publish-btn" onClick={handlePublish}>Publish Now</button>
        <button className="cancel-btn" onClick={() => alert('Publishing canceled')}>Cancel</button>
      </div>
    </div>
  );
};

export default PublishSidebar;
