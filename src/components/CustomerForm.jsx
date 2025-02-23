import { useState } from "react";

const CustomerForm = ({ customer, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(() => ({
        fullName: customer?.fullName || "",
        companyName: customer?.companyName || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        leadStatus: customer?.leadStatus || "New Lead",
        lastContact: customer?.lastContact || "",
        jobTitle: customer?.jobTitle || "",
        industry: customer?.industry || "",
    }));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">{customer ? "Edit Contact" : "Add New Contact"}</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <input className="w-full p-2 border rounded" type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                    <input className="w-full p-2 border rounded" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input className="w-full p-2 border rounded" type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

                    {/* Fix: Replacing undefined leadStatusColors */}
                    <select className="w-full p-2 border rounded" name="leadStatus" value={formData.leadStatus} onChange={handleChange}>
                        {["New Lead", "Contacted", "Qualified", "Proposal Sent", "Closed"].map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>

                    {/* Fix: Prevents page reload on cancel */}
                    <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded ml-2" onClick={(e) => { e.preventDefault(); onCancel(); }}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
