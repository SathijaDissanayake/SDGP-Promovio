import { useState } from "react";
import StatusBadge from "./StatusBadge";
import SearchBar from "./SearchBar";
import CustomerForm from "./CustomerForm";
import ViewModal from "./ViewModal";
import "../styles/table.css";
import axios from "axios";

export default function Table({ activeTab }) {
    const [data, setData] = useState([
        {
            contact: 'Earl Grayson',
            email: 'earl.grayson@example.com',
            leadStatus: 'New Lead',
            lastContact: '29 Jul 2023',
            companyName: 'Grayson Ltd',
            jobTitle: 'Sales Manager',
            industry: 'Retail'
        },
        {
            contact: 'Jake Vargas',
            email: 'jake.vargas@example.com',
            leadStatus: 'Contacted',
            lastContact: '1 Jul 2023',
            companyName: 'Vargas Corp',
            jobTitle: 'CEO',
            industry: 'Tech'
        }
    ]);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

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
     * - Finds the customer by email and asks for confirmation before deleting.
     * - Sends a DELETE request to remove the customer from the backend.
     * - Updates the state to remove the deleted customer from the table.
     *
     * @param {string} email - The email of the customer to delete.
     */
    const handleDelete = async (email) => {
        const customerToDelete = data.find(customer => customer.email === email);
        if (!customerToDelete) return;

        const confirmDelete = window.confirm(`Are you sure you want to delete ${customerToDelete.contact}?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/customers/${customerToDelete.id}`);
            setData(data.filter(customer => customer.email !== email));
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
    const handleFormSubmit = (updatedCustomer) => {
        setData(data.map(c =>
            c.email === selectedCustomer.email
                ? { ...c, ...updatedCustomer, contact: updatedCustomer.fullName }
                : c
        ));
        setShowForm(false);
        setSelectedCustomer(null);
    };

    return (
        <>
            {activeTab === "Contacts" && <SearchBar/>}
            <button className="create-btn" onClick={() => {
                setSelectedCustomer(null);
                setShowForm(true);
            }}>
                Add New Customer
            </button>

            <table className="lead-table">
                <thead>
                <tr>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Lead Status</th>
                    <th>Last Contact</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.contact}</td>
                        <td>{item.email}</td>
                        <td><StatusBadge status={item.leadStatus}/></td>
                        <td>{item.lastContact}</td>
                        <td>
                            <button className="action-btn view" onClick={() => handleView(item)}>View</button>
                            <button className="action-btn edit" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="action-btn delete" onClick={() => handleDelete(item.email)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showForm && <CustomerForm customer={selectedCustomer} onSubmit={handleFormSubmit}
                                       onCancel={() => setShowForm(false)}/>}
            {showViewModal && <ViewModal customer={selectedCustomer} onClose={() => setShowViewModal(false)}/>}
        </>
    );
}
