import React from 'react';
import VideoBackground from '../VideoBackground/VideoBackground';
import AuthMarketingPanel from './AuthMarketingPanel';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout-container">
            {/* Persisted Video Background */}
            <VideoBackground />

            <div className="auth-desktop-grid">
                {/* Fixed Left Column - Marketing */}
                <div className="auth-left-col">
                    <AuthMarketingPanel />
                </div>

                {/* Dynamic Right Column - Content (Forms) */}
                <div className="auth-right-col">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
