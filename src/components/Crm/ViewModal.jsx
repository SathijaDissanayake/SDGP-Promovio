

const ViewModal = ({ customer, onClose }) => {
    // Format Last Contact Date (YYYY-MM-DD)
    const formatDate = (dateString) => {
        return dateString ? dateString.split("T")[0] : "N/A";
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]">
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-11/12 max-w-md text-left font-inter">
                <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
                <div className="space-y-3">
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Full Name:</span> {customer.fullName}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Email:</span> {customer.email}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Phone:</span> {customer.phone || "N/A"}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Lead Status:</span> {customer.leadStatus}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Last Contact:</span> {formatDate(customer.lastContact)}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Company Name:</span> {customer.companyName || "N/A"}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Job Title:</span> {customer.jobTitle || "N/A"}
    </p>
    <p className="text-lg text-white">
        <span className="block text-[#a58bff] text-base mb-1 font-semibold">Industry:</span> {customer.industry || "N/A"}
    </p>
</div>

                <button className="view-cancel-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ViewModal;
