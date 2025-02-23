const ViewModal = ({ customer, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Contact Details</h2>
                <div className="space-y-2">
                    <p><strong>Full Name:</strong> {customer.fullName}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p><strong>Lead Status:</strong> {customer.leadStatus}</p>
                    <p><strong>Last Contact:</strong> {customer.lastContact}</p>
                    <p><strong>Company Name:</strong> {customer.companyName}</p>
                    <p><strong>Job Title:</strong> {customer.jobTitle}</p>
                    <p><strong>Industry:</strong> {customer.industry}</p>
                </div>
                <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewModal;
