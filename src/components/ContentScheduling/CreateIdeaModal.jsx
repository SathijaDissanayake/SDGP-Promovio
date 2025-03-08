import { useState } from "react";
import "./CreateIdeaModal.css";

const CreateIdeaModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  // Handle File Drop
  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <div className="modal-overlay" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className="modal-content">
        <h2>Create Idea</h2>

        {/* Title Input */}
        <input type="text" placeholder="Give your idea a title" />

        {/* Description */}
        <textarea placeholder="Describe your idea..."></textarea>

        {/* AI Assistant Button */}
        <button className="ai-btn">✨ Use AI Assistant</button>

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
