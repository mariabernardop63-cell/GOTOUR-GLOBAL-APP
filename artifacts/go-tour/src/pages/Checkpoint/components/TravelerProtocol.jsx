import React, { useState } from 'react';
import { Fingerprint, CheckCircle } from 'lucide-react';
import './TravelerProtocol.css';

const TravelerProtocol = () => {
    const [status, setStatus] = useState('idle'); // idle, processing, success
    const [lastCheckin, setLastCheckin] = useState('T-04:22:10');

    const handleCheckin = () => {
        if (status !== 'idle') return;
        
        setStatus('processing');
        
        // Simulate network delay for biometric/location sync
        setTimeout(() => {
            setStatus('success');
            setLastCheckin('Just now');
            
            // Reset after a few seconds
            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }, 2000);
    };

    return (
        <div className="tic-protocol-wrapper">
            <p className="tic-protocol-info">
                Guardian Mode active. Periodic check-ins are required to maintain passive safety monitoring. Failure to check in will escalate to trusted contacts.
            </p>

            <button 
                className={`tic-checkin-btn ${status}`}
                onClick={handleCheckin}
            >
                {status === 'idle' && (
                    <>
                        <Fingerprint size={18} strokeWidth={2} />
                        Transmit Safe Status
                    </>
                )}
                {status === 'processing' && (
                    <>
                        <Fingerprint size={18} strokeWidth={2} style={{ animation: 'ticPulseAlert 1s infinite' }} />
                        Verifying Biometrics...
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle size={18} strokeWidth={2} />
                        Status Verified
                    </>
                )}
            </button>

            <div className="tic-protocol-status">
                <span className="tic-protocol-label">Last Sync</span>
                <span className="tic-protocol-value" style={{ color: status === 'success' ? 'var(--tic-accent)' : 'inherit' }}>
                    {lastCheckin}
                </span>
            </div>
        </div>
    );
};

export default TravelerProtocol;
