import React from 'react';
import { motion } from 'framer-motion';
import SiteOverview from "../../assets/Site Overview.png";
import './BodyPart2.css';

export default function BodyPart2() {
    return (
        <div className='image-container'>
            <motion.img 
                className='image' 
                src={SiteOverview} 
                alt='site-overview'
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
            />
        </div>
    );
}
