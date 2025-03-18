import { useState } from "react";
import axios from "axios";
import "./CreateIdeaModal.css";

const CreateIdeaModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [showPublishOptions, setShowPublishOptions] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [publishType, setPublishType] = useState(""); // "now" or "schedule"
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

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

  const handleAIContentGeneration = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/generate-content", {
        prompt: "Generate a creative idea for content creation",
        author: "User Name",
        contentType: "blog",
      });

      if (response.data.success) {
        setGeneratedContent(response.data.choices[0].message.content);
      } else {
        alert("Error generating content.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  // Handle Save Idea and Ask for Publish/Schedule
  const handleSaveIdea = () => {
    setShowPublishOptions(true);
  };

  // Handle final confirmation of publishing
  const handleConfirmPublish = async () => {
    if (publishType === "schedule" && (!scheduleDate || !scheduleTime)) {
      alert("Please select both date and time for scheduling.");
      return;
    }

    let postData = {
      content: generatedContent,
      file,
      publishType,
      scheduleDate: publishType === "schedule" ? scheduleDate : null,
      scheduleTime: publishType === "schedule" ? scheduleTime : null,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/save-post", postData);
      
      console.log(response.data); // Log the response to check its structure

      if (response.data.success) {
        setSuccessMessage(
          publishType === "schedule"
            ? `✅ Scheduled successfully for ${scheduleDate} at ${scheduleTime}!`
            : "✅ Published successfully!"
        );

        // Auto-close modal after 3 seconds
        setTimeout(() => {
          onClose(); // Close modal after 3 seconds
          setSuccessMessage(""); // Reset success message
        }, 3000);
      } else {
        alert("Error saving post.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="modal-overlay" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div className="modal-content">
        <h2>Create Idea</h2>

        <input type="text" placeholder="Give your idea a title" />

        <textarea placeholder="Describe your idea..." value={generatedContent}></textarea>

        <button className="ai-btn" onClick={handleAIContentGeneration}>✨ Use AI Assistant</button>

        <div className="file-upload">
          <label htmlFor="fileInput" className="file-drop">
            {file ? <p>{file.name}</p> : <p>📂 Drag & drop or <span className="file-select">select a file</span></p>}
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} hidden />
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSaveIdea}>Save Idea</button>
          <button className="close-btn" onClick={onClose}>Cancel</button>
        </div>

        {/* Publish or Schedule Options */}
        {showPublishOptions && (
          <div className="publish-options">
            <h3>Would you like to publish now or schedule?</h3>
            <button onClick={() => setPublishType("now")}>📢 Publish Now</button>
            <button onClick={() => setPublishType("schedule")}>📅 Schedule</button>

            {publishType === "schedule" && (
              <div className="schedule-options">
                <label>Select Date:</label>
                <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />

                <label>Select Time:</label>
                <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
            )}

            <button className="confirm-btn" onClick={handleConfirmPublish}>Confirm</button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default CreateIdeaModal;
