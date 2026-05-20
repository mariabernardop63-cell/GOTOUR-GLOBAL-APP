import React, { useState, useEffect, useMemo } from 'react';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './GoTourSplashScreen.css';

const GoTourSplashScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const schedule = [
            [200, 1],     // Bar fade-in
            [600, 2],     // Text reveals from center (slower)
            [2400, 4],    // Text hides back to center (skip shine/phase 3)
            [3400, 5],    // Bar rotates horizontal
            [3900, 6],    // Line up + logo appears
            [4500, 7],    // Loading dots
            [5400, 8],    // Fade out
        ];

        const timers = schedule.map(([delay, p]) =>
            setTimeout(() => setPhase(p), delay)
        );

        const done = setTimeout(() => onComplete && onComplete(), 5800);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(done);
        };
    }, [onComplete]);

    // Bar transforms driven by phase — CSS transition handles animation
    const barStyle = useMemo(() => {
        const base = { transition: 'all 0.65s cubic-bezier(0.4, 0, 0.2, 1)' };
        if (phase >= 6) return { ...base, opacity: 0, width: '60px', height: '2px', borderRadius: '1px', transform: 'translate(-50%, calc(-50% - 70px))' };
        if (phase >= 5) return { ...base, opacity: 1, width: '60px', height: '2px', borderRadius: '1px', transform: 'translate(-50%, -50%)' };
        if (phase >= 4) return { ...base, opacity: 1, transform: 'translate(-50%, -50%)' };
        if (phase >= 2) return { ...base, opacity: 1, transform: 'translate(calc(-50% - var(--bar-travel)), -50%)' };
        if (phase >= 1) return { ...base, opacity: 1, transform: 'translate(-50%, -50%)' };
        return { ...base, opacity: 0, transform: 'translate(-50%, -50%)' };
    }, [phase]);

    const textClasses = [
        'splash-text-wrap',
        phase >= 2 && phase < 4 ? 'text-visible' : '',
        phase >= 4 ? 'text-hidden' : '',
    ].filter(Boolean).join(' ');

    return (
        <div className={`gotour-splash ${phase >= 8 ? 'splash-exit' : ''}`}>
            {/* Persistent cursor bar / horizontal line */}
            <div className="splash-bar" style={barStyle} />

            {/* Text "NOVA ERA" */}
            <div className={textClasses}>
                <span className="splash-text">
                    NOVA ERA
                </span>
            </div>

            {/* Logo phase */}
            <div className={`splash-logo-wrap ${phase >= 6 ? 'logo-visible' : ''}`}>
                <img src={gotourIcon} alt="GoTour" className="splash-logo" />
                {phase >= 7 && (
                    <div className="splash-dots">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoTourSplashScreen;
