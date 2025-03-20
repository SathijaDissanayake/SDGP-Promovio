import "../styles/ViewModel.css";

const ViewModal = ({ customer, onClose }) => {
    // Format Last Contact Date (YYYY-MM-DD)
    const formatDate = (dateString) => {
        return dateString ? dateString.split("T")[0] : "N/A";
    };

    return (
        <div className="view-modal-overlay">
            <div className="view-modal-content">
                <h2>Contact Details</h2>
                <div className="modal-details">
                    <p><strong>Full Name:</strong> {customer.fullName}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
                    <p><strong>Lead Status:</strong> {customer.leadStatus}</p>
                    <p><strong>Last Contact:</strong> {formatDate(customer.lastContact)}</p>
                    <p><strong>Company Name:</strong> {customer.companyName || "N/A"}</p>
                    <p><strong>Job Title:</strong> {customer.jobTitle || "N/A"}</p>
                    <p><strong>Industry:</strong> {customer.industry || "N/A"}</p>
                </div>
                <button className="view-cancel-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ViewModal;
