import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import StatusBadge from "./StatusBadge";
import SearchBar from "./SearchBar";
import CustomerForm from "./CustomerForm";
import ViewModal from "./ViewModal";
import axios from "axios";

export default function Table({ activeTab }) {
    const [data, setData] = useState([
        {
            _id: "1",
            fullName: "Alice Johnson",
            email: "alice@example.com",
            leadStatus: "Hot",
            lastContact: "2024-03-15",
        },
        {
            _id: "2",
            fullName: "Bob Smith",
            email: "bob@example.com",
            leadStatus: "Cold",
            lastContact: "2024-02-10",
        },
        {
            _id: "3",
            fullName: "Charlie Davis",
            email: "charlie@example.com",
            leadStatus: "Warm",
            lastContact: "2024-01-20",
        },
    ]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [leadFilter, setLeadFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (leadFilter && leadFilter !== "All") {
                    queryParams.append("leadStatus", leadFilter);
                }
                if (searchTerm) {
                    queryParams.append("search", searchTerm);
                }
                const url = `http://localhost:8000/api/v1/customers?${queryParams.toString()}`;
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchData();
    }, [leadFilter, searchTerm]);

    const handleFilterChange = (status) => {
        setLeadFilter(status);
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setShowForm(true);
    };

    const handleView = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/customers/${id}`);
            setData(prevData => prevData.filter(customer => customer._id !== id));
        } catch (error) {
            console.error("Error deleting customer:", error);
            alert("Failed to delete customer. Please try again.");
        }
    };

    const handleFormSubmit = async (updatedCustomer) => {
        try {
            let response;
            if (updatedCustomer._id) {
                response = await axios.put(`http://localhost:8000/api/customers/${updatedCustomer._id}`, updatedCustomer);
                setData(prevData =>
                    prevData.map(c => c._id === updatedCustomer._id ? response.data : c)
                );
            } else {
                response = await axios.post("http://localhost:8000/api/customers", updatedCustomer);
                setData(prevData => [...prevData, response.data]);
            }
            setShowForm(false);
            setSelectedCustomer(null);
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("Failed to update customer. Please try again.");
        }
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (date.toString() === "Invalid Date") return "N/A";
        return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };

    const columns = [
        { name: "Contact", selector: row => row.fullName, sortable: true },
        { name: "Email", selector: row => row.email, sortable: true },
        { name: "Lead Status", selector: row => <StatusBadge status={row.leadStatus} />, sortable: true },
        { name: "Last Contact", selector: row => formatDateForDisplay(row.lastContact), sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-purple-950 text-white rounded hover:bg-purple-500 transition" onClick={() => handleView(row)}>View</button>
                    <button className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-500 transition" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="px-3 py-1 bg-red-900 text-white rounded hover:bg-red-500 transition" onClick={() => handleDelete(row._id)}>Delete</button>
                </div>
            ),
        },
    ];

    return (
        <>

            <style>
                    {`
                    .rdt_Pagination button {
                        color: white !important;
                        fill: white !important;
                    }

                    .rdt_Pagination button:hover {
                        background-color: #374151 !important;
                    }
                    `}
                </style>
            {activeTab === "Contacts" && (
                <>
                    <SearchBar onFilterChange={handleFilterChange} activeFilter={leadFilter} />

                    <div className="flex justify-between items-center  p-4 rounded-lg  mt-4">
                        <input
                            type="text"
                            placeholder="Search by Contact Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-1/2 px-4 py-2 text-white bg-zinc-900 border border-gray-700 rounded-md transition focus:outline-none focus:ring-2 focus:ring-purple-700"
                        />

                        <button
                            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-md transition duration-300 hover:bg-purple-800"
                            onClick={() => {
                                setSelectedCustomer(null);
                                setShowForm(true);
                            }}
                        >
                            Add New Customer
                        </button>
                    </div>
                </>
            )}

            <div className="w-full mt-5 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    className="text-white"
                    customStyles={{
                        headCells: {
                            style: {
                                backgroundColor: "#171717", // Dark gray header
                                color: "#ffffff",
                                fontWeight: "bold",
                            },
                        },
                        rows: {
                            style: {
                                backgroundColor: "#111827", // Dark background for rows
                                color: "#ffffff",
                            },
                        },
                        cells: {
                            style: {
                                backgroundColor: "#1C1C1C", // Ensuring all cells have dark background
                                color: "#ffffff",
                            },
                        },
                        pagination: {
                            style: {
                                backgroundColor: "#171717", // Darker background for pagination
                                color: "#ffffff",
                                borderTop: "1px solid #ffffff", // Slight border to separate from rows
                            },
                            pageButtonsStyle: {
                                color: "#ffffff", // White text for buttons
                                fill: "#ffffff", // Ensures arrow icons are white
                                "&:hover": {
                                    backgroundColor: "#374151",
                                },
                            },
                        },
                    }}
                    
                />
            </div>

            {showForm && (
                <CustomerForm
                    customer={selectedCustomer}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}
            {showViewModal && <ViewModal customer={selectedCustomer} onClose={() => setShowViewModal(false)} />}
        </>
    );
}
