import { useState, useEffect } from "react";

const IdeasFeed = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocalIdeas();
  }, []);

  const fetchLocalIdeas = () => {
    try {
      const localPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
      setIdeas(localPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ideas from localStorage:", error);
      setLoading(false);
    }
  };

  const handleDeleteIdea = (ideaId) => {
    const updatedIdeas = ideas.filter((idea) => idea.id !== ideaId);
    setIdeas(updatedIdeas);
    localStorage.setItem("localPosts", JSON.stringify(updatedIdeas));
  };

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "25px",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    card: {
      background: "#1e1e2e",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease"
    },
    imageWrapper: {
      width: "100%",
      height: "180px",
      overflow: "hidden"
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease"
    },
    content: {
      padding: "20px"
    },
    title: {
      margin: "0 0 10px 0",
      color: "#bb86fc",
      fontSize: "18px"
    },
    message: {
      color: "#e2e8f0",
      fontSize: "14px",
      lineHeight: "1.6",
      marginBottom: "15px",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    },
    footer: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
      paddingTop: "10px",
      marginTop: "10px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)"
    },
    date: {
      fontSize: "12px",
      color: "#a29daa"
    },
    badge: {
      backgroundColor: "#bb86fc",
      color: "#1e1e2e",
      border: "none",
      borderRadius: "4px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "0.8rem"
    },
    posterBadge: {
      backgroundColor: "#03dac6",
      color: "#1e1e2e",
      padding: "2px 6px",
      fontSize: "0.7rem",
      borderRadius: "4px"
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      color: "#e3e5e8",
      fontSize: "18px"
    },
    noIdeas: {
      textAlign: "center",
      padding: "30px",
      color: "#a29daa",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "8px"
    },
    platform: {
      backgroundColor: "#3c2d5a",
      color: "white",
      padding: "2px 6px",
      fontSize: "0.7rem",
      borderRadius: "4px"
    }
  };

  return loading ? (
    <div style={styles.loading}>Loading ideas...</div>
  ) : ideas.length === 0 ? (
    <div style={styles.noIdeas}>No ideas found. Create your first idea!</div>
  ) : (
    <div style={styles.grid}>
      {ideas.map((idea) => (
        <div
          key={idea.id}
          style={styles.card}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
          }}
        >
          {idea.image && (
            <div style={styles.imageWrapper}>
              <img
                src={idea.image}
                alt={idea.title}
                style={styles.image}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          )}
          <div style={styles.content}>
            <h3 style={styles.title}>{idea.title}</h3>
            <p style={styles.message}>{idea.message}</p>
            <div style={styles.footer}>
              <span style={styles.date}>
                {new Date(idea.scheduledDate).toLocaleDateString()}
              </span>
              {idea.hasPoster && <span style={styles.posterBadge}>AI Poster</span>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {idea.platforms.map((platform) => (
                  <span
                    key={platform}
                    style={styles.platform}
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleDeleteIdea(idea.id)}
                style={styles.badge}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeasFeed;