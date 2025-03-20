import { useState } from "react";
import "../styles/CustomerForm.css";
import axios from "axios";

// Convert lastContact to YYYY-MM-DD format for the input field
const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Handle empty value
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const CustomerForm = ({ customer, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(() => ({
        fullName: customer?.fullName || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        leadStatus: customer?.leadStatus || "New Lead",
        lastContact: formatDateForInput(customer?.lastContact),
        companyName: customer?.companyName || "",
        jobTitle: customer?.jobTitle || "",
        industry: customer?.industry || "",
    }));

    // Updates the formData state in real-time as the user types in the input fields.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    /**
     * Handles form submission for adding or updating a customer.
     * - If a customer exists, sends a PUT request to update the record.
     * - If no customer exists, sends a POST request to create a new record.
     *
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert lastContact to ISO format before sending to the backend
        const formattedData = {
            ...formData,
            lastContact: formData.lastContact ? new Date(formData.lastContact).toISOString() : null
        };
        try {
            const url = customer
                ? `http://localhost:8000/api/customers/${customer._id}`
                : "http://localhost:8000/api/customers";
            const method = customer ? "put" : "post";
            const response = await axios({ method, url, data: formattedData });
            console.log("Customer saved:", response.data);
            onSubmit(response.data);
        } catch (error) {
            console.error("Error saving customer:", error);
            alert("An error occurred while saving the customer. Please try again.");
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{customer ? "Edit Contact" : "Add New Contact"}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                    <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
                    <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
                    <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} />
                    <input type="date" name="lastContact" value={formData.lastContact} onChange={handleChange} />

                    {/* Dropdown for Lead Status */}
                    <select name="leadStatus" value={formData.leadStatus} onChange={handleChange}>
                        <option value="New Lead">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">Save</button>
                        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
