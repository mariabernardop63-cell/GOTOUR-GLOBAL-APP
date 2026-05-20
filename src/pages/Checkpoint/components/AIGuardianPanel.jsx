import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import './AIGuardianPanel.css';

const INITIAL_MESSAGES = [
    {
        id: 1,
        text: "System initialized. Establishing encrypted connection to Maputo safety grid...",
        type: 'info',
        time: 'T-00:05'
    },
    {
        id: 2,
        text: "Weather cross-referenced. No immediate environmental risks detected in your 5km radius.",
        type: 'info',
        time: 'T-00:03'
    }
];

const AIGuardianPanel = () => {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Simulate AI analyzing and typing after mount
        const typingTimer = setTimeout(() => {
            setIsTyping(true);
        }, 2000);

        const msgTimer = setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
                ...prev,
                {
                    id: 3,
                    text: "Notice: Avoid the Av. Marginal intersection after 21:00 due to reduced lighting and increased accident reports in the last 48 hours.",
                    type: 'warning',
                    time: 'Now'
                }
            ]);
        }, 5000);

        return () => {
            clearTimeout(typingTimer);
            clearTimeout(msgTimer);
        };
    }, []);

    return (
        <div className="tic-guardian-container">
            {/* Header */}
            <div className="tic-guardian-status">
                <div className="tic-guardian-avatar">
                    <Cpu size={20} color="#3b82f6" strokeWidth={1.5} />
                </div>
                <div className="tic-guardian-core">
                    <span className="tic-guardian-title">Guardian AI Node</span>
                    <span className="tic-guardian-subtitle">Active Surveillance</span>
                </div>
            </div>

            {/* Feed */}
            <div className="tic-guardian-feed">
                {messages.map((msg) => (
                    <div key={msg.id} className={`tic-guardian-msg ${msg.type}`}>
                        {msg.text}
                        <div className="tic-guardian-msg-time">{msg.time}</div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="tic-typing-indicator">
                        <div className="tic-typing-dot"></div>
                        <div className="tic-typing-dot"></div>
                        <div className="tic-typing-dot"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIGuardianPanel;
