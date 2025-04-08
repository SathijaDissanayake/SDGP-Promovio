import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

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

    if (selectedPlatforms.includes('Facebook')) {
      const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com&quote=${encodedMessage}`;
      window.open(fbShareUrl, '_blank');
    }

    if (selectedPlatforms.includes('LinkedIn')) {
      const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://yourwebsite.com&summary=${encodedMessage}`;
      window.open(linkedInShareUrl, '_blank');
    }

    if (selectedPlatforms.includes('Instagram')) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        navigator.clipboard.writeText(post.message || post.title).then(() => {
          alert('📋 Post caption copied! Opening Instagram...');
          window.location.href = 'instagram://app';
        }).catch(() => {
          alert('Could not copy to clipboard, but opening Instagram anyway.');
          window.location.href = 'instagram://app';
        });
      } else {
        alert('Instagram sharing is only supported on mobile devices.');
      }
    }
  };

  const styles = {
    sidebar: {
      width: '380px',
      padding: '20px',
      backgroundColor: '#1e1e2e',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      color: '#ffffff',
      fontFamily: 'Poppins, sans-serif'
    },
    header: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#bb86fc'
    },
    sectionTitle: {
      fontSize: '1.1rem',
      marginBottom: '10px',
      color: '#d0aaff'
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '1rem',
      backgroundColor: '#2c2c3a',
      border: '1px solid #bb86fc',
      color: '#ffffff',
      outline: 'none'
    },
    platformList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginTop: '10px'
    },
    platformOption: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px',
      padding: '10px',
      border: '1px solid #bb86fc',
      borderRadius: '8px',
      backgroundColor: '#2a2a3a'
    },
    checkbox: {
      marginRight: '10px',
      transform: 'scale(1.2)',
      cursor: 'pointer',
      accentColor: '#bb86fc'
    },
    platformLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 500,
      color: '#ffffff'
    },
    icon: {
      fontSize: '1.5rem',
      color: '#bb86fc',
      marginRight: '15px'
    },
    actionButtons: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    button: {
      padding: '12px 24px',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      width: '48%',
      transition: 'background-color 0.3s ease-in-out',
      color: '#1e1e2e',
      fontWeight: 600
    },
    publishBtn: {
      backgroundColor: '#bb86fc'
    },
    publishBtnDisabled: {
      backgroundColor: '#555',
      cursor: 'not-allowed',
      color: '#aaa'
    },
    cancelBtn: {
      backgroundColor: '#444',
      color: '#ffffff'
    }
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.header}>Connect and Publish Your Content</h2>

      <div>
        <h3 style={styles.sectionTitle}>Select a Post</h3>
        <select
          value={selectedPostId}
          onChange={e => setSelectedPostId(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select a post --</option>
          {savedPosts.map(post => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 style={styles.sectionTitle}>Select Platforms</h3>
        <div style={styles.platformList}>
          {[
            { platform: 'Facebook', icon: <FaFacebook style={styles.icon} /> },
            { platform: 'Instagram', icon: <FaInstagram style={styles.icon} /> },
            { platform: 'LinkedIn', icon: <FaLinkedin style={styles.icon} /> }
          ].map(({ platform, icon }) => (
            <div key={platform} style={styles.platformOption}>
              <label style={styles.platformLabel}>
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => togglePlatformSelection(platform)}
                  style={styles.checkbox}
                />
                {icon}
                {platform}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.actionButtons}>
        <button
          style={{
            ...styles.button,
            ...styles.publishBtn,
            ...(selectedPlatforms.length === 0 || !selectedPostId ? styles.publishBtnDisabled : {})
          }}
          onClick={handlePublish}
          disabled={selectedPlatforms.length === 0 || !selectedPostId}
        >
          Publish Now
        </button>
        <button
          style={{ ...styles.button, ...styles.cancelBtn }}
          onClick={() => alert('Publishing canceled')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PublishSidebar;
