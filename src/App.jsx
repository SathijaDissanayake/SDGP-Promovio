import { useState, useRef } from 'react';

import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { FaRocket, FaChartLine, FaBullseye, FaUsers, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './App.css';
import promovio from "./assets/promovio.png"
import member1 from "./assets/member1.jpg"
import member2 from "./assets/member2.jpg"
import member3 from "./assets/member3.jpg"
import member4 from "./assets/member4.jpg"
import member5 from "./assets/member5.jpg"
import member6 from "./assets/member6.jpg"





function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
  };

  
    const sliderRef = useRef(null);
  
    
    const scrollSlider = (direction) => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
      }
    }
    
 

  return (
    <div className="app-container">
      

      {/* Hero Section */}
      <section className="hero-section">

         {/* Navigation Bar */}
      <section className='navigation'>
        <nav className="navbar">
          <div className='logo'>
            <img src={promovio} alt="Logo" />
          </div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      </section>
        <Container>
          <h1 className="display-2 fw-bold mb-4">Your Success, Powered by <br></br> Digital Innovation</h1>
          <p className="lead mb-5">Elevate your brand with cutting-edge digital marketing solutions</p>
          <Button variant="primary" size="lg" className="cta-button">Get Started Today</Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="text-center mb-5">Why Choose Us</h2>
          <Row>
            <Col md={3}>
              <div className="feature-card">
                <FaRocket className="feature-icon" />
                <h3>Fast Results</h3>
                <p>Effective marketing strategies for fast results.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaChartLine className="feature-icon" />
                <h3>Data Driven</h3>
                <p>Make informed decisions based on real-time analytics</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaBullseye className="feature-icon" />
                <h3>Targeted Reach</h3>
                <p>Connect with your ideal audience effectively</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaUsers className="feature-icon" />
                <h3>Expert Team</h3>
                <p>Dedicated professionals at your service</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* text section */}
      <div className='box'>
          <h2>AI-Powered Marketing Made Simple: <br></br> Generate Engaging Content, <br></br>Track Performance, Optimize Spend,<br></br> and Automate Customer Support<br></br>ALL IN ONE SMART PLATFORM. </h2>
      </div>
    

      {/* Services Section */}
      <section id="services" className='services'>
      <h1>Our Services</h1>
      <div className='slider-container'>
      <button className="prev" onClick={() => scrollSlider(-1)}>&lt;</button>
      <div className='slider' ref={sliderRef}>
        
          <div className='cards'>
              <h2>Social media management</h2>
              <p>Effortlessly schedule content across Facebook, Instagram, Twitter, and LinkedIn while tracking campaign performance—all in one place!</p>
          </div>

          <div className='cards'>
              <h2>Customer Relationship Management </h2>
              <p>Seamlessly manage customer relationships with a powerful CRM—track interactions, nurture leads, and build lasting connections, all in one intuitive platform!</p>
          </div>

          <div className='cards'>
              <h2>Analytics Dashboard</h2>
              <p>Gain deep insights with a powerful analytics dashboard—track performance, monitor key metrics, and optimize campaigns in real time, all from one centralized platform!</p>
          </div>

          <div className='cards'>
              <h2>Customer Support Chatbot</h2>
              <p>Enhance customer experience with an AI-powered chatbot—provide instant support, answer queries, and engage users 24/7, all while streamlining your workflow!</p>
          </div>

          <div className='cards'>
              <h2>Integration with Meta API</h2>
              <p>Seamlessly integrate with the Meta API—effortlessly post, track performance, and analyze content across Facebook and Instagram from one powerful platform!</p>
          </div>

          <button className="next" onClick={() => scrollSlider(1)}>&gt;</button>
      </div>
      </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <Container>
          <h2 className="text-center mb-5">Pricing Plans</h2>
          <Row>
            {[
              { name: 'Starter', price: '599', features: ['Basic SEO', 'Social Media Setup', '5 Posts per Month', 'Basic Analytics'] },
              { name: 'Professional', price: '1599', features: ['Advanced SEO', 'Social Media Management', '15 Posts per Month', 'Detailed Analytics'] },
              { name: 'Enterprise', price: '3999', features: ['Full SEO Suite', 'Complete Social Management', 'Unlimited Posts', 'Advanced Analytics'] }
            ].map((plan, index) => (
              <Col md={4} key={index}>
                <Card className="pricing-card mb-4">
                  <Card.Body>
                    <Card.Title className="text-center">{plan.name}</Card.Title>
                    <div className="price-tag text-center my-4">
                      <span className="currency">Rs</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">/mo</span>
                    </div>
                    <ul className="feature-list">
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                    <Button variant="primary" className="w-100">Choose Plan</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <Container>
          <Row>
            <Col md={6} className="mx-auto">
              <h2 className="text-center mb-5">Get In Touch</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Send Message</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      

    
    {/* our team */}
      <section  id="about" className='team'>
        <h1>Our Team</h1>
        <h4>Meet the Experts Behind Your Success! Our team of digital marketing strategists, AI specialists, and creative minds work together to deliver innovative solutions that drive growth. Passionate, results-driven, and always ahead of the curve—your success is our mission!</h4>

            <div className='wrap'>
            <div className='thambnail'>
                <img src={member5} alt="team member1" className='image' />
                <div className='expand'>
                    <p>Sathija Dissanayake</p>
                </div>

              </div>

              <div className='thambnail'>
                <img src={member6} alt="team member1" className='image' />
                <div className='expand'> <p>Mohommed Adheeb</p></div>

              </div>


              <div className='thambnail'>
                <img src={member1} alt="team member1" className='image' />
                <div className='expand'> <p>Omer Nuhman</p></div>

              </div>

              <div className='thambnail'>
                <img src={member2} alt="team member2" className='image' />
                <div className='expand'> <p>Dulani Kamkanamge</p></div>

              </div>
            </div>


              <div className='wrap2'>

              <div className='thambnail'>
                <img src={member3} alt="team member3" className='image' />
                <div className='expand'> <p>Methmi Apoorwa</p></div>

              </div>

              <div className='thambnail'>
               <img src={member4} alt="team member4" className='image' />
                <div className='expand'>
                    <p>Menaya Karunanayake</p>
                </div>

              </div>
              </div>
            

    </section>



      {/* Footer */}
      <footer className="footer-section">
        <Container>
          <Row className="py-5">
            <Col md={4} className="mb-4">
              <h4 className="mb-4">About Us</h4>
              <p>We are a leading digital marketing agency dedicated to helping businesses grow their online presence and achieve their marketing goals.</p>
              <div className="social-icons">
                <a href="#" className="me-3"><FaFacebookF /></a>
                <a href="#" className="me-3"><FaTwitter /></a>
                <a href="#" className="me-3"><FaLinkedinIn /></a>
                <a href="#" className="me-3"><FaInstagram /></a>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <h4 className="mb-4">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#services">Services</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>

              </ul>
            </Col>
            <Col md={4} className="mb-4">
              <h4 className="mb-4">Contact Info</h4>
              <ul className="contact-info">
                <li><FaPhone className="me-2" /> +94 (77) 675 3490</li>
                <li><FaEnvelope className="me-2" /> promovio@gmail.com</li>
               
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className="text-center py-3 border-top">
              <p className="mb-0">&copy; 2025 promovio.lk All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;