import React, { useState, useEffect, useRef } from 'react';
import './VideoBackground.css';

// Import images for mobile slideshow
import img1 from '../../assets/images/african_forest_tourists.png';
import img2 from '../../assets/images/dubai_city.png';
import img3 from '../../assets/images/japanese_village.png';

const mobileImages = [img1, img2, img3];

const VideoBackground = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const videoRef = useRef(null);

    // Optimized handling for low-power mode or slow connections
    const handleCanPlay = () => {
        setIsLoaded(true);
    };

    // Mobile Slideshow Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="video-background-container">
            {/* --- Mobile Slideshow --- */}
            <div className="mobile-slideshow">
                {mobileImages.map((img, index) => (
                    <div
                        key={index}
                        className={`slide-bg ${index === currentImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                {/* Overlay for mobile readability */}
                <div className="mobile-overlay" />
            </div>

            {/* --- Desktop Video --- */}
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    className={`bg-video ${isLoaded ? 'fade-in' : ''}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={handleCanPlay}
                    onError={(e) => console.error("Video failed to load", e)}
                    style={{ opacity: isLoaded ? 1 : 0 }}
                >
                    <source
                        src="https://video-hostingnew.vercel.app/video-bg.mp4"
                        type="video/mp4"
                        media="(min-width: 1024px)"
                    />
                </video>
            </div>

            {/* Global Overlay (optional, for extra readability on desktop if needed, 
                but distinct from mobile overlay to allow video brightness) */}
            <div className="desktop-overlay" />
        </div>
    );
};

export default VideoBackground;
