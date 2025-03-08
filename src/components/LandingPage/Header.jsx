import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import LogoIcon from "../../assets/Promovio.png";
import "./Header.css";

export default function Header({ scrollToFeatures }) {
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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/dashboard" className="nav-link">Dashboards</Link>
            <Link to="/FeatureSection" className="nav-link">Features</Link>
            <Link to="/AboutUs" className="nav-link">About Us</Link>
            <Link to="/content-scheduling" className="nav-link">ContentSchedule</Link>
            
          </nav>

          {/* Sign Up Button */}
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    </header>
  );
}
