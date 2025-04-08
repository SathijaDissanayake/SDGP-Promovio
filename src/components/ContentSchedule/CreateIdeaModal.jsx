import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateIdeaModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterImage, setPosterImage] = useState(null);
  const [platforms, setPlatforms] = useState([]);

  const handlePlatformChange = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "promovio");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhwmpnup0/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const generatePoster = async () => {
    if (!title || !description) {
      alert("Please fill in title and description first.");
      return;
    }

    setIsGeneratingPoster(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/poster/generate", {
        prompt: `Create a professional poster with title: "${title}" and theme about: "${description}"`,
      });

      if (response.data.success && response.data.imageUrl) {
        setPosterImage(response.data.imageUrl);

        try {
          const imageResponse = await fetch(response.data.imageUrl);
          const blob = await imageResponse.blob();
          const posterFile = new File([blob], "ai-generated-poster.png", { type: "image/png" });
          setFile(posterFile);
        } catch (err) {
          console.error("Error converting image to file:", err);
        }
      } else {
        alert("Error generating poster");
      }
    } catch (error) {
      console.error("Poster generation failed:", error);
      alert("Poster generation failed.");
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  const handleSaveIdea = async () => {
    if (!title || !description || platforms.length === 0) {
      alert("Please fill in all required fields and select at least one platform.");
      return;
    }

    try {
      let imageUrl = "";
      if (file) {
        imageUrl = await uploadImageToCloudinary(file);
        if (!imageUrl) {
          alert("Failed to upload image.");
          return;
        }
      }

      const postData = {
        id: Date.now(),
        title,
        message: description,
        image: imageUrl,
        poster: posterImage || "",
        hasPoster: Boolean(posterImage),
        scheduledDate: new Date(),
        platforms,
      };

      const existingPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
      existingPosts.push(postData);
      localStorage.setItem("localPosts", JSON.stringify(existingPosts));

      alert("Post saved locally!");
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save the post.");
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      background: "rgba(30, 30, 46, 0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(8px)",
      zIndex: 1000,
    },
    content: {
      background: "#1e1e2e",
      padding: "25px",
      width: "450px",
      maxHeight: "85vh",
      overflowY: "auto",
      borderRadius: "10px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif"
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      border: "2px solid #bb86fc",
      borderRadius: "8px",
      background: "#2b2b3d",
      color: "#ffffff",
      fontSize: "14px",
      outline: "none"
    },
    posterBtn: {
      width: "100%",
      padding: "12px",
      marginTop: "12px",
      backgroundColor: "#bb86fc",
      color: "#1e1e2e",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      cursor: "pointer",
      fontWeight: 500
    },
    posterContainer: {
      margin: "20px 0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      borderRadius: "8px",
      overflow: "hidden",
      background: "#2b2b3d",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    },
    fileDrop: {
      display: "block",
      padding: "20px",
      border: "2px dashed #bb86fc",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "15px",
      background: "#2b2b3d",
      color: "#ffffff"
    },
    modalActions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px"
    },
    saveBtn: {
      padding: "12px 18px",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: 500,
      backgroundColor: "#bb86fc",
      color: "#1e1e2e"
    },
    closeBtn: {
      padding: "12px 18px",
      border: "1px solid #bb86fc",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: 500,
      backgroundColor: "transparent",
      color: "#bb86fc"
    }
  };

  return (
    <div style={styles.overlay} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div style={styles.content}>
        <h2 style={{ fontSize: "22px", fontWeight: 600, marginBottom: "15px", color: "#bb86fc" }}>Create Idea</h2>

        <input type="text" placeholder="Give your idea a title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
        <textarea placeholder="Describe your idea..." value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} />

        <div style={{ textAlign: "left", marginTop: "15px" }}>
          <h3 style={{ marginBottom: "8px", color: "#bb86fc", fontSize: "16px" }}>Select Platforms</h3>
          {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((platform) => (
            <label key={platform} style={{ display: "block", color: "white", marginBottom: "6px" }}>
              <input
                type="checkbox"
                value={platform}
                checked={platforms.includes(platform)}
                onChange={() => handlePlatformChange(platform)}
                style={{ marginRight: "8px" }}
              />
              {platform}
            </label>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
          <button
            style={{
              ...styles.posterBtn,
              backgroundColor: isGeneratingPoster ? "#6b4c84" : styles.posterBtn.backgroundColor,
              cursor: isGeneratingPoster ? "not-allowed" : "pointer"
            }}
            onClick={generatePoster}
            disabled={isGeneratingPoster}
          >
            {isGeneratingPoster ? "Generating..." : "🖼 Generate AI Poster"}
          </button>
        </div>

        {posterImage && (
          <div>
            <h3 style={{ color: "#bb86fc", fontSize: "18px", marginBottom: "10px" }}>Generated Poster</h3>
            <div style={styles.posterContainer}>
              <img src={posterImage} alt="AI-generated poster" style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", display: "block" }} />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="fileInput" style={styles.fileDrop}>
            {file ? <p>{file.name}</p> : <p>📂 Drag & drop or <span style={{ fontWeight: "bold", color: "#60a5fa", cursor: "pointer" }}>select a file</span></p>}
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} hidden />
        </div>

        <div style={styles.modalActions}>
          <button style={styles.saveBtn} onClick={handleSaveIdea}>Save Idea</button>
          <button style={styles.closeBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateIdeaModal;