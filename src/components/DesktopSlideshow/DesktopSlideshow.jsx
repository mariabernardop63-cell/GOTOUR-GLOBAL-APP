import React, { useState, useEffect } from 'react';
import './DesktopSlideshow.css';

// Importing the 4 user-provided photos
import img1 from '../../assets/images/Primeira foto.jpg';
import img2 from '../../assets/images/Segunda Foto.jpg';
import img3 from '../../assets/images/Terceira foto.jpg';
import img4 from '../../assets/images/quarta foto.jpg';

const IMAGES = [img1, img2, img3, img4];

const DesktopSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Change image every 4 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="desktop-slideshow-container">
            {IMAGES.map((img, index) => (
                <div
                    key={index}
                    className={`slideshow-slide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url("${img}")` }}
                />
            ))}
            <div className="slideshow-overlay" />
        </div>
    );
};

export default DesktopSlideshow;
