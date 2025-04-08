import { useState } from 'react';
import Table from '../../components/Crm/Table';
import Email from '../../components/Crm/Email';
import Task from '../../components/Crm/Task';
import Reminder from '../../components/Crm/Reminder';
import CurrentPage from '../../components/CurrentPage';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { FaUser, FaEnvelope, FaTasks, FaClock } from "react-icons/fa";

export default function CRM() {    
    useUserAuth();
    const [activeTab, setActiveTab] = useState('Contacts');
    const tabs = [
        { name: "Contacts", icon: <FaUser /> },
        { name: "Email", icon: <FaEnvelope /> },
        { name: "Task", icon: <FaTasks /> },
        { name: "Reminder", icon: <FaClock /> }
    ];

    return (
        <DashboardLayout activeMenu="CRM">
            <div className="my-5 mx-auto  h-full">
                <div className="grid grid-cols-1 gap-6">
                <CurrentPage setActiveTab={setActiveTab} activeTab={activeTab} tabs={tabs}  />
            {/* <SearchBar /> */}

            {/* Render the component based on activeTab */}
            {activeTab === 'Contacts' && <Table activeTab={activeTab}/>}
            {activeTab === 'Email' && <Email />}
            {activeTab === 'Task' && <Task />}
            {activeTab === 'Reminder' && <Reminder />}
                </div>
            </div>
        </DashboardLayout>
    );
}
