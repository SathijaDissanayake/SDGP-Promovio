import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import StatusBadge from "./StatusBadge";
import SearchBar from "./SearchBar";
import CustomerForm from "./CustomerForm";
import ViewModal from "./ViewModal";
import "../styles/table.css";
import axios from "axios";




export default function Table({ activeTab }) {

    const [data, setData] = useState([]);
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
                const url = `http://localhost:8000/api/customers?${queryParams.toString()}`;
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchData();
    }, [leadFilter, searchTerm]);
    // Empty dependency array means it runs only once

    // Callback function to update filter from SearchBar
    const handleFilterChange = (status) => {
        setLeadFilter(status);
    };

    /**
     * Handles editing a customer.
     * - Sets the selected customer.
     * - Displays the customer form for editing.
     *
     * @param {Object} customer - The customer object to be edited.
     */
    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setShowForm(true);
    };

    /**
     * Handles viewing a customer’s details.
     * - Sets the selected customer.
     * - Displays the modal with customer information.
     *
     * @param {Object} customer - The customer object to be viewed.
     */
    const handleView = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };


    /**
     * Handles deleting a customer.
     * - Asks for confirmation before deleting.
     * - Sends a DELETE request to remove the customer from the backend.
     * - Updates the state to remove the deleted customer from the table.
     *
     * @param {string} id - The _id of the customer to delete.
     */
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/customers/${id}`); // Use _id directly
            setData(prevData => prevData.filter(customer => customer._id !== id)); // Remove from UI
        } catch (error) {
            console.error("Error deleting customer:", error);
            alert("Failed to delete customer. Please try again.");
        }
    };



    /**
     * Handles form submission for adding or updating a customer.
     * - If the customer exists, updates the existing record.
     * - If it's a new entry, updates the state with new customer data.
     *
     * @param {Object} updatedCustomer - The customer object with updated details.
     */
    const handleFormSubmit = async (updatedCustomer) => {
            try {
                let response;

                if (updatedCustomer._id) {
                    // Update existing customer (PUT request)
                    response = await axios.put(`http://localhost:8000/api/customers/${updatedCustomer._id}`, updatedCustomer);
                    setData(prevData =>
                        prevData.map(c => c._id === updatedCustomer._id ? response.data : c) // Update only the modified customer
                    );
                } else {
                    // Add new customer (POST request)
                    response = await axios.post("http://localhost:8000/api/customers", updatedCustomer);
                    setData(prevData => [...prevData, response.data]); // Append new customer to the list
                }

                // Close the form and reset selection
                setShowForm(false);
                setSelectedCustomer(null);
            } catch (error) {
                console.error("Error updating customer:", error);
                alert("Failed to update customer. Please try again.");
            }
        };



    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "N/A"; // Handles undefined, null, or empty values
        const date = new Date(dateString);
        if (date.toString() === "Invalid Date") return "N/A"; // Handles invalid date format
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
               <>
                   <button className="action-btn view-btn" onClick={() => handleView(row)}>View</button>
                   <button className="action-btn edit-btn" onClick={() => handleEdit(row)}>Edit</button>
                   <button className="action-btn delete-btn" onClick={() => handleDelete(row._id)}>Delete</button>
               </>
           ),
       },
   ];

    return (
        <>
            {activeTab === "Contacts" && (
                <>
                    <SearchBar onFilterChange={handleFilterChange} activeFilter={leadFilter}/>
                    {/* Additional search input for backend name filtering */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by Contact Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />

                        <button
                            className="create-btn"
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


            <div className="table-container">
                <DataTable

                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover

                />

            </div>

                {showForm && (
                    <CustomerForm
                        customer={selectedCustomer}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                {showViewModal && <ViewModal customer={selectedCustomer} onClose={() => setShowViewModal(false)}/>}
            </>
            );


            }



