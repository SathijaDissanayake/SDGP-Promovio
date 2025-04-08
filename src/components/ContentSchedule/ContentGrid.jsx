import { useState, useEffect } from "react";
import axios from "axios";
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
} from "./Icons";

const ContentGrid = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px",
    },
    card: {
      backgroundColor: "var(--card-bg)",
      borderRadius: "8px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "280px",
    },
    emptyCard: {
      backgroundColor: "#2a2a2a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emptyPlaceholder: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
    plusIcon: {
      fontSize: "48px",
      color: "#555",
    },
    postHeader: {
      display: "flex",
      alignItems: "center",
      padding: "12px",
      gap: "8px",
    },
    platformIcon: {
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    postInfo: {
      display: "flex",
      flexDirection: "column",
    },
    username: {
      fontSize: "12px",
      fontWeight: 500,
    },
    postDate: {
      fontSize: "10px",
      color: "var(--text-secondary)",
    },
    postImage: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    postImgTag: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    postActions: {
      display: "flex",
      padding: "8px 12px",
      borderTop: "1px solid var(--border)",
    },
    actionButton: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginRight: "16px",
    },
    count: {
      fontSize: "12px",
      color: "var(--text-secondary)",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.grid}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            ...styles.card,
            ...(post.platform === "empty" ? styles.emptyCard : {}),
          }}
        >
          {post.platform === "empty" ? (
            <div style={styles.emptyPlaceholder}>
              <div style={styles.plusIcon}>+</div>
            </div>
          ) : (
            <>
              <div style={styles.postHeader}>
                <div style={styles.platformIcon}>{post.icon}</div>
                <div style={styles.postInfo}>
                  <div style={styles.username}>{post.username}</div>
                  <div style={styles.postDate}>{post.date}</div>
                </div>
              </div>
              <div style={styles.postImage}>
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post content"
                  style={styles.postImgTag}
                />
              </div>
              <div style={styles.postActions}>
                <div style={styles.actionButton}>
                  <HeartIcon />
                  <span style={styles.count}>{post.likes}</span>
                </div>
                <div style={styles.actionButton}>
                  <CommentIcon />
                  <span style={styles.count}>{post.comments}</span>
                </div>
                <div style={styles.actionButton}>
                  <ShareIcon />
                  <span style={styles.count}>{post.shares}</span>
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