import React from 'react';

import { motion } from 'framer-motion';
import './BodyPart1.css';

export default function BodyPart1() {
  return (
    <div className='title'>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="first-line">Digitize your</span><br />
        <span className="second-line">Marketing with AI.</span>
      </motion.h1>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        "Your Marketing, Our Platform"
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.button 
          className='Start-for-free'
          whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(255, 81, 47, 0.5)" }}
          whileTap={{ scale: 0.9 }}
        >
          Start for free
        </motion.button>
      </motion.div>
    </div>
  );
}
