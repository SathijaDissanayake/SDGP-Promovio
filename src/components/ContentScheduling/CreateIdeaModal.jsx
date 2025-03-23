import { useState } from "react";
import axios from "axios";
import "./CreateIdeaModal.css";
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
      setPlatforms(platforms.filter((p) => p !== platform)); // Deselect platform
    } else {
      setPlatforms([...platforms, platform]); // Select platform
    }
  };

  // Previous handlers remain the same
  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Replace these placeholder values with your actual Cloudinary credentials
    formData.append("upload_preset", "promovio"); 
    const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dhwmpnup0/image/upload",
    formData
    );
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhwmpnup0/image/upload", // Replace with your cloud name
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAIContentGeneration = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/generate-content", {
        prompt: "Generate a creative idea for content creation",
        author: "User Name",
        contentType: "blog",
      });

      if (response.data.choices && response.data.choices[0]) {
        setGeneratedContent(response.data.choices[0].message.content);
      } else {
        alert("Error generating content.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      alert(`Failed to generate content: ${error.message}`);
    }
  };

  // Updated function to generate a poster with better error handling
  const generatePoster = async () => {
    if (!title || !description) {
      alert("Please fill in title and description first.");
      return;
    }
  
    setIsGeneratingPoster(true);
  
    try {
      console.log("Sending request to generate poster...");
      const response = await axios.post("http://localhost:5000/api/generate-poster", {
        prompt: `Create a professional poster with title: "${title}" and theme about: "${description}"`,
      });
  
      console.log("Response received:", response);
  
      if (response.data.success && response.data.imageUrl) {
        console.log("Setting poster image...");
        setPosterImage(response.data.imageUrl);
        
        // Convert the image URL to a File object for later upload
        try {
          const imageResponse = await fetch(response.data.imageUrl);
          const blob = await imageResponse.blob();
          const posterFile = new File([blob], "ai-generated-poster.png", { type: "image/png" });
          setFile(posterFile);
        } catch (conversionError) {
          console.error("Error converting image URL to file:", conversionError);
          // Continue with the poster URL even if conversion fails
        }
      } else {
        console.error("Invalid response format:", response.data);
        alert("Error generating poster: Invalid response format");
      }
    } catch (error) {
      console.error("Error generating poster:", error);
      
      // More detailed error reporting
      let errorMessage = "An unknown error occurred";
      
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error("Server error data:", error.response.data);
        errorMessage = error.response.data.error || 
                      `Server error: ${error.response.status}`;
                      
        if (error.response.data.details) {
          errorMessage += ` - ${error.response.data.details}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your network connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message;
      }
      
      alert(`Failed to generate poster: ${errorMessage}`);
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
          alert("Failed to upload image. Please try again.");
          return;
        }
      }
  
      const postData = {
        id: Date.now(), // temporary ID
        title,
        message: description,
        image: imageUrl,
        poster: posterImage || "",
        hasPoster: Boolean(posterImage),
        scheduledDate: new Date(),
        platforms,
      };
  
      // Get existing posts or initialize empty array
      const existingPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
      
      // Add new post
      existingPosts.push(postData);
      
      // Save back to localStorage
      localStorage.setItem("localPosts", JSON.stringify(existingPosts));
      
      alert("Post saved locally successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      alert(`Failed to save the post: ${error.message}`);
    }
  };


  return (
    <div className="modal-overlay" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className="modal-content">
        <h2>Create Idea</h2>

        <input 
          type="text" 
          placeholder="Give your idea a title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />

        <textarea 
          placeholder="Describe your idea..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />

        <div className="platform-selection">
          <h3>Select Platforms</h3>
          {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((platform) => (
            <label key={platform}>
              <input
                type="checkbox"
                value={platform}
                checked={platforms.includes(platform)}
                onChange={() => handlePlatformChange(platform)}
              />
              {platform}
            </label>
          ))}
        </div>


        <div className="ai-buttons">
          
          <button 
            className="poster-btn" 
            onClick={generatePoster} 
            disabled={isGeneratingPoster}
          >
            {isGeneratingPoster ? "Generating..." : "🖼️ Generate AI Poster"}
          </button>
        </div>

        {posterImage && (
          <div className="generated-poster">
            <h3>Generated Poster</h3>
            <div className="poster-container">
              <img src={posterImage} alt="AI-generated poster" />
            </div>
          </div>
        )}

        <div className="file-upload">
          <label htmlFor="fileInput" className="file-drop">
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>📂 Drag & drop or <span className="file-select">select a file</span></p>
            )}
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} hidden />
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSaveIdea}>Save Idea</button>
          <button className="close-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateIdeaModal;