import React from 'react';

const AuthWaveOverlay = () => {
    return (
        <div className="da-wave-mask" style={{ position: 'absolute', top: 0, left: '-1px', width: '180px', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
            {/* The primary solid white wave */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                <path
                    d="M 0 0 
                       C 120 15, 80 35, 60 50 
                       C 30 70, 150 85, 0 100 
                       Z"
                    fill="#FFFFFF"
                />

                {/* 
                  The dashed line. We apply building offsets to mimic exactly what 
                  the "Anywhere app" does. It follows the shoreline of the wave. 
                */}
                <path
                    d="M 5 0 
                       C 125 15, 85 35, 65 50 
                       C 35 70, 155 85, 5 100"
                    fill="none"
                    stroke="#D9E2EC"
                    strokeWidth="0.8"
                    strokeDasharray="2,4"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

export default AuthWaveOverlay;
