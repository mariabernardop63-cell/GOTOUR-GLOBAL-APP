import React, { useState, useEffect, useRef } from 'react';
import './SosButton.css';

const SosButton = () => {
    const [status, setStatus] = useState('standby'); // standby, holding, triggered
    const [progress, setProgress] = useState(0);
    const holdTimerRef = useRef(null);
    const progressTimerRef = useRef(null);

    const HOLD_DURATION = 2000; // 2 seconds to trigger
    const TICK_RATE = 20; // ms

    const startHold = (e) => {
        // Prevent default to avoid scrolling on mobile touch
        if (e.cancelable) e.preventDefault();
        
        if (status === 'triggered') return;
        
        setStatus('holding');
        setProgress(0);

        let currentProgress = 0;
        const totalTicks = HOLD_DURATION / TICK_RATE;
        const progressPerTick = 100 / totalTicks;

        progressTimerRef.current = setInterval(() => {
            currentProgress += progressPerTick;
            if (currentProgress >= 100) {
                currentProgress = 100;
                triggerEmergency();
            }
            setProgress(currentProgress);
        }, TICK_RATE);
    };

    const stopHold = () => {
        if (status === 'triggered') return;
        
        clearInterval(progressTimerRef.current);
        setStatus('standby');
        setProgress(0);
    };

    const triggerEmergency = () => {
        clearInterval(progressTimerRef.current);
        setStatus('triggered');
        setProgress(100);
        // Simulate API call to emergency services
        console.log("[TIC] Emergency Protocol Activated. Coordinates transmitted.");
    };

    const resetSos = () => {
        setStatus('standby');
        setProgress(0);
    };

    // SVG Circle Math
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="tic-sos-wrapper">
            <div className="tic-sos-btn-container">
                {/* Ripples for visual weight */}
                {status !== 'triggered' && (
                    <>
                        <div className="tic-sos-ripple" />
                        <div className="tic-sos-ripple" />
                    </>
                )}

                {/* Progress Ring */}
                <svg className="tic-sos-progress-ring" width="116" height="116">
                    <circle
                        className="tic-sos-progress-circle"
                        cx="58" cy="58" r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ opacity: status === 'holding' ? 1 : 0 }}
                    />
                </svg>

                {/* Main Button */}
                <button
                    className={`tic-sos-btn ${status === 'holding' ? 'triggering' : ''} ${status === 'triggered' ? 'active' : ''}`}
                    onMouseDown={startHold}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    onTouchStart={startHold}
                    onTouchEnd={stopHold}
                >
                    <span className="tic-sos-text">SOS</span>
                    <span className="tic-sos-subtext">Hold 2s</span>
                </button>
            </div>

            {/* Status Text */}
            <div className="tic-sos-status">
                {status === 'standby' && (
                    <>
                        <div className="tic-sos-status-title">System Armed</div>
                        <div className="tic-sos-status-desc">Hold to activate emergency protocol</div>
                    </>
                )}
                {status === 'holding' && (
                    <>
                        <div className="tic-sos-status-title" style={{ color: '#f59e0b' }}>Arming Protocol...</div>
                        <div className="tic-sos-status-desc">Release to cancel</div>
                    </>
                )}
                {status === 'triggered' && (
                    <>
                        <div className="tic-sos-status-title" style={{ color: '#ef4444' }}>PROTOCOL ACTIVE</div>
                        <div className="tic-sos-status-desc">Transmitting coordinates...</div>
                        <button 
                            onClick={resetSos}
                            style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', marginTop: '8px', cursor: 'pointer' }}
                        >
                            CANCEL DISPATCH
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SosButton;
