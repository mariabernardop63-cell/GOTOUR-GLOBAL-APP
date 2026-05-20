import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudLightning, Activity, AlertCircle } from 'lucide-react';
import './LiveAlertFeed.css';

// Simulated real-time intelligence feed
const INITIAL_ALERTS = [
    {
        id: 1,
        severity: 'critical', // critical, warning, info
        type: 'weather',
        title: 'Severe Storm Warning',
        desc: 'Heavy rainfall and localized flooding expected in Baixa district. Avoid low-lying areas.',
        time: 'Just now',
        icon: CloudLightning
    },
    {
        id: 2,
        severity: 'warning',
        type: 'traffic',
        title: 'Traffic Disruption',
        desc: 'Accident reported on Av. Marginal. High congestion. Rerouting recommended.',
        time: '12m ago',
        icon: AlertTriangle
    },
    {
        id: 3,
        severity: 'info',
        type: 'activity',
        title: 'High Crowd Density',
        desc: 'Mercado Central experiencing peak visitor volume. Pickpocketing risk elevated.',
        time: '45m ago',
        icon: Activity
    }
];

const LiveAlertFeed = () => {
    const [alerts, setAlerts] = useState(INITIAL_ALERTS);

    // Simulate an incoming alert after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            const newAlert = {
                id: Date.now(),
                severity: 'warning',
                type: 'security',
                title: 'Protest Activity',
                desc: 'Unverified reports of gathering near Praça da Independência. Maintain distance.',
                time: 'Just now',
                icon: AlertCircle
            };
            setAlerts(prev => [newAlert, ...prev].map((a, i) => {
                if (i > 0 && a.time === 'Just now') return { ...a, time: '10m ago' };
                return a;
            }));
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="tic-alert-list">
            {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                    <div key={alert.id} className={`tic-alert-card ${alert.severity}`}>
                        <div className="tic-alert-glow-line" />
                        <div className="tic-alert-icon-wrap">
                            <Icon size={16} strokeWidth={2.5} />
                        </div>
                        <div className="tic-alert-content">
                            <div className="tic-alert-header">
                                <span className="tic-alert-title">{alert.title}</span>
                                <span className="tic-alert-time">{alert.time}</span>
                            </div>
                            <p className="tic-alert-desc">{alert.desc}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LiveAlertFeed;
