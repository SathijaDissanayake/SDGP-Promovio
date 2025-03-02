import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './FeatureSection.css';

export default function FeatureSection() {
    // Drop-in animation with bounce effect
    const dropIn = {
        hidden: { opacity: 0, y: -100, scale: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { type: "spring", stiffness: 120, damping: 12 }
        }
    };

    return (
        <div>
            <motion.h1 
                className='topic'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                Features
            </motion.h1>
            
            <div className='container'>
                {[ 
                    { title: "Campaign Analytics Dashboard", text: "Track and analyze your marketing campaign in real-time", link: "/campaign-analytics" },
                    { title: "AI-Powered Content Recommendations", text: "Get AI-driven content suggestions to optimize audience engagement and boost conversions", link: "/content-recommendations" },
                    { title: "Cross-Platform Social Media Posting", text: "Easily post content to multiple social media channels like Facebook, Instagram, and Twitter from a single interface", link: "/social-media-posting" },
                    { title: "AI-Powered Chatbot", text: "Get 24/7 support with an AI-Powered chatbot", link: "/ai-chatbot" },
                    { title: "Marketing Spend Tracker", text: "Monitor and optimize your marketing budget, track ad spend, and set alerts", link: "/marketing-spend" },
                    { title: "Integrated CRM", text: "Manage customer relationships, track interactions, and improve communication with an integrated CRM system", link: "/integrated-crm" },
                    { title: "Customizable Reports", text: "Generate detailed, customizable marketing reports that give you insights into your campaign performance and ROI", link: "/custom-reports" },
                    { title: "Social Media Insights", text: "Access detailed engagement metrics, such as likes, shares, reach, and audience demographics.", link: "/social-media-insights" },
                    { title: "Content Scheduling & Calendar", text: "Plan and schedule posts in advance with an integrated content calendar", link: "/contentScheduling" }
                ].map((feature, index) => (
                    <motion.div 
                        key={index} 
                        className={`box box${index + 1}`}
                        variants={dropIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: index * 0.15 }} // Staggered fall effect
                        whileHover={{ scale: 1.1, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }} // Hover interaction
                    >
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                        <Link to={feature.link} className="view-more-btn">View More</Link> 
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
