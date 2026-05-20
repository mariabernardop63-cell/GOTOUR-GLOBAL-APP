import React, { useState, useEffect, useRef } from 'react';
import './VideoBackground.css';

// Import images for mobile slideshow
import img1 from '../../assets/images/mobile_bg_1.jpg';
import img2 from '../../assets/images/mobile_bg_2.jpg';
import img3 from '../../assets/images/mobile_bg_3.jpg';
import img4 from '../../assets/images/mobile_bg_4.jpg';
import img5 from '../../assets/images/mobile_bg_5.jpg';

const mobileImages = [img1, img2, img3, img4, img5];

const VideoBackground = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Track if video has started playing
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const videoRef = useRef(null);

    // Optimized handling for low-power mode or slow connections
    const handleCanPlay = () => {
        setIsLoaded(true);
    };

    const handleVideoPlay = () => {
        setIsVideoPlaying(true);
    };

    // Mobile Slideshow Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="video-background-container" style={{ backgroundColor: '#000' }}>
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

            {/* --- Desktop Fallback Image (Dubai Night) --- */}
            {/* Shows immediately, fades out when video starts playing */}
            <div
                className={`desktop-fallback ${isVideoPlaying ? 'fade-out' : ''}`}
                style={{ backgroundImage: `url(${img2})` }}
            />

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
                    poster={img2}
                    onCanPlay={handleCanPlay}
                    onPlay={handleVideoPlay}
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
