import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PreparingScreen.css';
import gotourIcon from '../../assets/images/gotour_icon.png';

const PreparingScreen = ({ onComplete, duration = 4000 }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, duration / 100);

        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [duration, onComplete]);

    return (
        <motion.div 
            className="preparing-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Centralized Text inside the fixed frame */}
            <motion.div 
                className="preparing-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <p className="preparing-text">
                    Entrando
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.0 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}>.</motion.span>
                </p>
                
                {/* Subtle progress bar remains if helpful to show timing */}
                <div className="preparing-progress-track" style={{ marginTop: '16px' }}>
                    <motion.div 
                        className="preparing-progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </motion.div>

            {/* Logo pinned to back bottom center */}
            <motion.div 
                className="preparing-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <img src={gotourIcon} alt="GoTour" className="preparing-footer-logo" />
            </motion.div>
        </motion.div>
    );
};

export default PreparingScreen;
