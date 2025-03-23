import { useState, useEffect } from "react";
import "./IdeasFeed.css";

const IdeasFeed = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocalIdeas();
  }, []);

  const fetchLocalIdeas = () => {
    try {
      // Get ideas from localStorage
      const localPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
      setIdeas(localPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ideas from localStorage:", error);
      setLoading(false);
    }
  };

  const handleDeleteIdea = (ideaId) => {
    // Filter out the idea with the matching id
    const updatedIdeas = ideas.filter((idea) => idea.id !== ideaId);
    
    // Update state
    setIdeas(updatedIdeas);
    
    // Update localStorage
    localStorage.setItem("localPosts", JSON.stringify(updatedIdeas));
  };

  if (loading) {
    return <div className="loading-spinner">Loading ideas...</div>;
  }

  if (ideas.length === 0) {
    return <div className="no-ideas-message">No ideas found. Create your first idea!</div>;
  }

  return (
    <div className="ideas-grid">
      {ideas.map((idea) => (
        <div key={idea.id} className="idea-card">
          {idea.image && (
            <div className={`idea-image ${idea.hasPoster ? "poster-image" : ""}`}>
              <img src={idea.image} alt={idea.title} />
            </div>
          )}
          <div className="idea-content">
            <h3>{idea.title}</h3>
            <p>{idea.message}</p>
            <div className="idea-footer">
              <span className="idea-date">
                {new Date(idea.scheduledDate).toLocaleDateString()}
              </span>
              {idea.hasPoster && <span className="poster-badge">AI Poster</span>}
              <div className="platforms">
                {idea.platforms.map((platform) => (
                  <span key={platform} className="platform-badge">{platform}</span>
                ))}
              </div>
              <button 
                className="delete-button" 
                onClick={() => handleDeleteIdea(idea.id)}
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