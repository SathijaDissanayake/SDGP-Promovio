import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import promovio from './assets/promovio.png';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className='logo'>
          <img src={promovio} alt="Logo" />
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1 className="display-2 fw-bold mb-4">Your Success, Powered by <br /> Digital Innovation</h1>
          <p className="lead mb-5">Performance Insights | Budget Optimization | Customer Management <br></br>Automated Planning | Seamless Sharing | Smart Assistance</p>
          <Button variant="primary" size="lg" className="cta-button">Get Started Today</Button>
        </Container>
      </section>
    </>
  );
};

export default Navbar;
