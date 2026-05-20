import React, { useState, useEffect } from 'react';
import { Crosshair, Layers, Maximize } from 'lucide-react';
import './InteractiveSafetyMap.css';

// Simulated dynamic points on the radar
const INITIAL_MARKERS = [
    { id: 1, x: '30%', y: '40%', type: 'safe', label: 'Hotel Zone' },
    { id: 2, x: '60%', y: '25%', type: 'danger', label: 'Protest Alert' },
    { id: 3, x: '75%', y: '70%', type: 'warning', label: 'Traffic Jam' },
    { id: 4, x: '45%', y: '65%', type: 'safe', label: 'Hospital' },
    { id: 5, x: '50%', y: '50%', type: 'safe', label: 'User Location', pulse: true }, // Center
];

const InteractiveSafetyMap = () => {
    const [markers, setMarkers] = useState(INITIAL_MARKERS);
    const [coords, setCoords] = useState("LAT: -25.9692 | LNG: 32.5732");

    // Simulate moving coordinates slightly to feel alive
    useEffect(() => {
        const timer = setInterval(() => {
            const latFuzz = (Math.random() * 0.0002).toFixed(4);
            const lngFuzz = (Math.random() * 0.0002).toFixed(4);
            setCoords(`LAT: -25.96${latFuzz.slice(2)} | LNG: 32.57${lngFuzz.slice(2)}`);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="tic-map-container">
            {/* 3D Grid background */}
            <div className="tic-map-grid" />
            
            {/* Radar Sweep */}
            <div className="tic-map-radar" />

            {/* Simulated Live Markers */}
            {markers.map(marker => (
                <div 
                    key={marker.id} 
                    className={`tic-marker ${marker.type}`}
                    style={{ left: marker.x, top: marker.y }}
                    title={marker.label}
                >
                    <div className="tic-marker-ripple" />
                    <div className="tic-marker-core" />
                </div>
            ))}

            {/* UI Overlays */}
            <div className="tic-map-ui top-left">
                <div className="tic-map-coord">{coords}</div>
            </div>

            <div className="tic-map-ui bottom-right">
                <button className="tic-map-tool" title="Recenter">
                    <Crosshair size={16} />
                </button>
                <button className="tic-map-tool" title="Map Layers">
                    <Layers size={16} />
                </button>
                <button className="tic-map-tool" title="Fullscreen">
                    <Maximize size={16} />
                </button>
            </div>
        </div>
    );
};

export default InteractiveSafetyMap;
