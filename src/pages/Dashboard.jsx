import { useState } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import Email from '../components/Email';
import Task from '../components/Task';
import Reminder from '../components/Reminder';
import '../styles/dashboard.css';
import CurrentPage from "../components/CurrentPage.jsx";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('Contacts');

    return (
        <div className="dashboard">
            <Header />
            <CurrentPage setActiveTab={setActiveTab} activeTab={activeTab} />
            {/*<SearchBar />*/}

            {/* Render the component based on activeTab */}
            {activeTab === 'Contacts' && <Table activeTab={activeTab}/>}
            {activeTab === 'Email' && <Email />}
            {activeTab === 'Task' && <Task />}
            {activeTab === 'Reminder' && <Reminder />}
        </div>
    );
}
