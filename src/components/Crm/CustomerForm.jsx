import { useState } from "react";
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
                ? `http://localhost:8000/api/v1/customers/${customer._id}`
                : "http://localhost:8000/api/v1/customers";
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
        <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center">
            <div className="bg-[#1c1c2e] text-white p-8 rounded-xl shadow-lg w-11/12 max-w-md text-center">
                <h2 className="mb-4 text-xl font-bold text-left text-gray-100">{customer ? "Edit Contact" : "Add New Contact"}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400" />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400" />
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400" />
            <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400" />
            <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400" />
            <input type="date" name="lastContact" value={formData.lastContact} onChange={handleChange} 
                className="bg-gray-800 border-none p-3 rounded-md text-white w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400 w-[90%]" />
            
            {/* Dropdown for Lead Status */}
            <select name="leadStatus" value={formData.leadStatus} onChange={handleChange} 
                className="cursor-pointer appearance-none bg-gray-800 text-white border-none p-3 rounded-md w-[90%] outline-none transition-all focus:bg-gray-700 focus:outline-purple-400 bg-no-repeat bg-right pr-10" 
                style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill=\"white\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')` }}>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
            </select>
            
            <div className="flex justify-between mt-5">
                <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-md w-[48%] transition-all hover:bg-purple-400">Save</button>
                <button type="button" className="bg-transparent text-white py-2 px-4 rounded-md w-[48%] border border-white transition-all hover:bg-purple-400 hover:bg-opacity-20" onClick={onCancel}>Cancel</button>
            </div>
        </form>
            </div>
        </div>
    );
};

export default CustomerForm;
