import React from 'react';
import { FaChartLine, FaUsers, FaUniversity, FaRocket } from 'react-icons/fa';
import './AboutUs.css';
import apoorwa from "../../assets/apoorwa.jpg";
import dulani from "../../assets/Dulani.jpg";
import omar from "../../assets/Omar.jpg";
import menaya from "../../assets/Menaya.jpg";
import sathija from "../../assets/Sathija.jpg";
import adheeb from "../../assets/Adheeb.jpg";

const AboutUs = () => {
  return (
    <div className="about-us">
      
      <main className="main-content">
        <section className="hero">
          <h2 className="hero-title">Revolutionizing Digital Marketing Intelligence</h2>
          <p className="hero-description">
            Promovio is an innovative Insight Marketing Intelligence Hub designed to empower businesses and educational institutions in the digital age.
          </p>
        </section>

        <section className="mission">
          <h3 className="section-title">Our Mission</h3>
          <div className="mission-content">
            <p>
              At Promovio, we aim to transform digital marketing by offering a seamless, intelligent, and cost-effective solution for businesses and educational institutions to thrive in the digital era. Our platform addresses key challenges in the industry, providing tools for efficient content management, performance analysis, and lead tracking.
            </p>
          </div>
        </section>

        <section className="features">
          <h3 className="section-title">Key Features</h3>
          <div className="features-grid">
            <FeatureCard
              icon={<FaChartLine className="feature-icon" />}
              title="Advanced Analytics"
              description="Real-time insights into campaign performance and marketing spend."
            />
            <FeatureCard
              icon={<FaUsers className="feature-icon" />}
              title="Integrated Social Media Management"
              description="Streamlined posting and scheduling across multiple platforms."
            />
            <FeatureCard
              icon={<FaUniversity className="feature-icon" />}
              title="University-Specific Lead Management"
              description="Tailored CRM tools for educational institutions to track and engage prospective students."
            />
            <FeatureCard
              icon={<FaRocket className="feature-icon" />}
              title="AI-Powered Support"
              description="Intelligent chatbot for instant platform support and troubleshooting."
            />
          </div>
        </section>

        <section className="team">
          <h3 className="section-title">Our Team</h3>
          <div className="team-grid">
            <TeamMember name="Sathija Gayara Dissanayake" role="Project Lead" avatar= {sathija}/>
            <TeamMember name="Mohamed Adheeb AbdulRahuman" role="Backend Developer" avatar={adheeb}/>
            <TeamMember name="Naslam Nuhman Ahamed Omar" role="Frontend Developer" avatar={omar} />
            <TeamMember name="Methmi Apoorwa Liyanage" role="UI/UX Designer" avatar={apoorwa}/>
            <TeamMember name="Dona Dulani Linara" role="Data Analyst" avatar={dulani} />
            <TeamMember name="Lihini Menaya Karunanayake" role="Marketing Specialist" avatar={menaya}/>
          </div>
        </section>

        <section className="vision">
          <h3 className="section-title">Our Vision</h3>
          <div className="vision-content">
            <p>
              Promovio envisions a future where digital marketing is accessible, efficient, and data-driven for businesses of all sizes and educational institutions. We strive to be at the forefront of marketing technology, continuously innovating to meet the evolving needs of our users in the dynamic digital landscape.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Promovio. All rights reserved.</p>
          <p>Trusted by the all innovative teams</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-header">
        {icon}
        <h4 className="feature-title">{title}</h4>
      </div>
      <p className="feature-description">{description}</p>
    </div>
  );
};

const TeamMember = ({ name, role, avatar }) => {
    return (
      <div className="team-member">
        <div className="member-avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <h4 className="member-name">{name}</h4>
        <p className="member-role">{role}</p>
      </div>
    );
  };
  

export default AboutUs;
