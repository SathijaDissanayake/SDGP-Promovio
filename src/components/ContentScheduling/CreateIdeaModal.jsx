import { useState } from "react";
import axios from "axios";
import "./CreateIdeaModal.css";

const CreateIdeaModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");

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

  // 🧠 Function to Call OpenAI API for Content Generation
  // CreateIdeaModal.jsx

const handleAIContentGeneration = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/content/generate", {
      prompt: "Generate a creative idea for content creation",  // The AI prompt
      author: "User Name",  // The author of the content
      contentType: "blog",  // The type of content (e.g., blog, social, email)
    });

    // Check if content was successfully generated and saved
    if (response.data.success) {
      setGeneratedContent(response.data.content.body); // Set the generated content to the state
    } else {
      alert("Error generating content.");
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
};


  return (
    <div className="modal-overlay" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className="modal-content">
        <h2>Create Idea</h2>

        {/* Title Input */}
        <input type="text" placeholder="Give your idea a title" />

        {/* Description */}
        <textarea placeholder="Describe your idea..." value={generatedContent}></textarea>

        {/* AI Assistant Button */}
        <button className="ai-btn" onClick={handleAIContentGeneration}>✨ Use AI Assistant</button>

        {/* Drag & Drop or File Upload */}
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

        {/* Modal Actions */}
        <div className="modal-actions">
          <button className="save-btn">Save Idea</button>
          <button className="close-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateIdeaModal;
