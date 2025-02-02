import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import '../styles/dashboard.css';
import CurrentPage from "../components/CurrentPage.jsx";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Header />
            <CurrentPage />
            <SearchBar />
            <Table />
            <Pagination />
        </div>

    );
}
