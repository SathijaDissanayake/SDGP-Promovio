import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./ContentGrid.css";
import { HeartIcon, CommentIcon, ShareIcon, InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from "./Icons";

// ContentGrid component
const ContentGrid = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch posts from backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content") // Adjust this URL to your backend API
      .then((response) => {
        setPosts(response.data); // Set posts data to state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error); // Log any errors
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Render loading message while waiting for data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render posts data
  return (
    <div className="content-grid">
      {posts.map((post) => (
        <div key={post.id} className={`post-card ${post.platform === "empty" ? "empty-card" : ""}`}>
          {post.platform === "empty" ? (
            <div className="empty-placeholder">
              <div className="plus-icon">+</div>
            </div>
          ) : (
            <>
              <div className="post-header">
                <div className="platform-icon">{post.icon}</div>
                <div className="post-info">
                  <div className="username">{post.username}</div>
                  <div className="post-date">{post.date}</div>
                </div>
              </div>
              <div className="post-image">
                <img src={post.image || "/placeholder.svg"} alt="Post content" />
              </div>
              <div className="post-actions">
                <div className="action-button">
                  <HeartIcon />
                  <span className="count">{post.likes}</span>
                </div>
                <div className="action-button">
                  <CommentIcon />
                  <span className="count">{post.comments}</span>
                </div>
                <div className="action-button">
                  <ShareIcon />
                  <span className="count">{post.shares}</span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
