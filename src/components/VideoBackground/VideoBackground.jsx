import React, { useState, useEffect, useRef } from 'react';
import './VideoBackground.css';

const VideoBackground = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);

    // Optimized handling for low-power mode or slow connections
    const handleCanPlay = () => {
        setIsLoaded(true);
    };

    return (
        <div className="video-background-container">
            {/* Fallback/Mobile Gradient Background - Always visible / underneath */}
            <div className="mobile-bg-fallback" />

            {/* Desktop Video - Hidden on mobile via CSS for double safety, 
                but we use CSS media queries to ensure the browser doesn't download it on mobile */}
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
                    {/* Try standard file paths first, then root */}
                    <source
                        src="https://video-hostingnew.vercel.app/video.mp4"
                        type="video/mp4"
                    />
                    <source
                        src="https://video-hostingnew.vercel.app/assets/video.mp4"
                        type="video/mp4"
                    />
                    <source
                        src="https://video-hostingnew.vercel.app"
                        type="video/mp4"
                    />
                    {/* Fallback text or element not needed as we have the div underneath */}
                </video>
            </div>

            {/* Overlay for text readability */}
            <div className="video-overlay" />
        </div>
    );
};

export default VideoBackground;
