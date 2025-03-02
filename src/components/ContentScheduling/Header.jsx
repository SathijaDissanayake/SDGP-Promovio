import "./Header.css"
import { SearchIcon, UserIcon } from "./Icons"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="user-status">
            <span className="status-indicator"></span>
            <span className="user-name">Alicia Koch</span>
          </div>

          <nav className="main-nav">
            <ul>
              <li>
                <a href="#" className="nav-link">
                  Post Schedule
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  CRM
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Spend Tracker
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          <div className="search-box">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-avatar">
            <UserIcon />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

