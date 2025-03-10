import { useEffect, useRef } from 'react';
import "./Services.css";
const Services = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;
    let scrollSpeed = 2; // Adjust this value for faster/slower scrolling

    const scroll = () => {
      if (slider) {
        // Auto-scroll the slider
        slider.scrollLeft += scrollSpeed;
        scrollAmount += scrollSpeed;

        // Reset scroll position when reaching the end
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    };

    const interval = setInterval(scroll, 50); // Adjust timing for smooth scrolling

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className='services'>
      <h1>Our Services</h1>
      <div className='slider-container'>
        <button className="prev" onClick={() => (sliderRef.current.scrollLeft -= 300)}>&lt;</button>
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
        </div>
        <button className="next" onClick={() => (sliderRef.current.scrollLeft += 300)}>&gt;</button>
      </div>
    </section>
  );
};

export default Services;
