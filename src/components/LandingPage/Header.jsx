import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import LogoIcon from "../../assets/Promovio.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="head">
      <div className="container">
        <div className="flex items-center header-content">
          {/* Logo Section */}
          <div className="logo-container">
            <img src={LogoIcon || "/placeholder.svg"} alt="Logo" className="logo-img" />
          </div>

          {/* Navigation Section */}
          <nav className="navbar">
            <Link to="/landingPage" className="nav-link">Home</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link> {/* ✅ Navigate to Pricing */}
            <Link to="/dashboard" className="nav-link">Dashboards</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/about" className="nav-link">About Us</Link>
          </nav>

          {/* Sign Up Button */}
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    </header>
  );
}
