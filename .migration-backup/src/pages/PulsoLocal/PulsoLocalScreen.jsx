import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Radio, CloudSun, Languages, Activity } from 'lucide-react';
import './PulsoLocalScreen.css';

const CULTURAL_TIPS = [
    'Cumprimente sempre com um aperto de mão firme. É sinal de respeito.',
    'A gorjeta não é obrigatória, mas 10% é apreciado em restaurantes.',
    'Peça permissão antes de fotografar pessoas, especialmente em mercados.',
    'Vista-se modestamente ao visitar zonas rurais e locais religiosos.',
];

const TRENDING_PLACES = [
    { name: 'Costa do Sol', type: 'Praia', popularity: 5 },
    { name: 'Mercado do Peixe', type: 'Mercado Local', popularity: 4 },
    { name: 'Café Acácia', type: 'Restaurante', popularity: 4 },
    { name: 'Fortaleza de Maputo', type: 'Monumento', popularity: 3 },
    { name: 'Jardim Tunduru', type: 'Parque', popularity: 3 },
];

const EVENTS_TODAY = [
    { time: '19:00', name: 'Festival de Marrabenta', location: 'Praça dos Trabalhadores' },
    { time: '21:00', name: 'Jazz ao Vivo', location: 'Gil Vicente Café' },
    { time: '10:00', name: 'Feira de Artesanato', location: 'FEIMA — Praça 25 de Junho' },
];

const PulsoLocalScreen = () => {
    const navigate = useNavigate();
    const [tipIndex, setTipIndex] = useState(0);
    const [tipVisible, setTipVisible] = useState(true);

    // Rotate cultural tips every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTipVisible(false);
            setTimeout(() => {
                setTipIndex((prev) => (prev + 1) % CULTURAL_TIPS.length);
                setTipVisible(true);
            }, 400);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const activityLevel = 72; // Mock: 72% vibrante
    const activityColor = activityLevel > 70 ? '#ec4899' : activityLevel > 30 ? '#f59e0b' : '#3b82f6';
    const activityLabel = activityLevel > 70 ? 'Vibrante' : activityLevel > 30 ? 'Moderado' : 'Calmo';

    return (
        <div className="pl-modal-container" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="pl-header">
                <div className="pl-title-group">
                    <div className="pl-icon-wrapper">
                        <Radio size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="pl-title">Pulso Local</h2>
                        <p className="pl-subtitle">O que está a acontecer agora</p>
                    </div>
                </div>
                <button className="pl-close-btn" onClick={() => navigate(-1)} aria-label="Fechar">
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Content */}
            <div className="pl-content">

                {/* Left — Snapshot */}
                <div className="pl-sidebar">
                    {/* Activity Level */}
                    <div className="pl-activity-block">
                        <span className="pl-section-label">Nível de Atividade</span>
                        <div className="pl-activity-bar-wrap">
                            <div
                                className="pl-activity-fill"
                                style={{ width: `${activityLevel}%`, background: activityColor }}
                            />
                        </div>
                        <span className="pl-activity-label" style={{ color: activityColor }}>
                            <Activity size={16} strokeWidth={2.5} />
                            {activityLabel} — {activityLevel}%
                        </span>
                    </div>

                    {/* Weather */}
                    <div className="pl-weather-snap">
                        <CloudSun size={32} color="#f59e0b" strokeWidth={1.5} />
                        <div>
                            <div className="pl-weather-temp">31°C</div>
                        </div>
                        <div className="pl-weather-info">
                            <span className="pl-weather-condition">Parcialmente Nublado</span>
                            <span className="pl-weather-city">Maputo, Moçambique</span>
                        </div>
                    </div>

                    {/* Cultural Tip (Rotating) */}
                    <div className="pl-cultural-card">
                        <span className="pl-cultural-label">Dica Cultural</span>
                        <p className="pl-cultural-text" style={{ opacity: tipVisible ? 1 : 0 }}>
                            {CULTURAL_TIPS[tipIndex]}
                        </p>
                    </div>

                    {/* Language */}
                    <div className="pl-language-chip">
                        <Languages size={14} strokeWidth={2.5} />
                        Português · Changana
                    </div>
                </div>

                {/* Right — What's Happening */}
                <div className="pl-main-area">
                    <h3 className="pl-section-title">Trending Agora</h3>

                    <div className="pl-trending-list">
                        {TRENDING_PLACES.map((place) => (
                            <div key={place.name} className="pl-trending-item">
                                <div className="pl-trending-left">
                                    <span className="pl-trending-name">{place.name}</span>
                                    <span className="pl-trending-type">{place.type}</span>
                                </div>
                                <div className="pl-popularity">
                                    {[1, 2, 3, 4, 5].map((bar) => (
                                        <div
                                            key={bar}
                                            className={`pl-pop-bar ${bar <= place.popularity ? 'active' : ''}`}
                                            style={{ height: `${8 + bar * 4}px` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="pl-section-title" style={{ marginTop: '8px' }}>Eventos Hoje</h3>

                    <div className="pl-events-list">
                        {EVENTS_TODAY.map((evt) => (
                            <div key={evt.name} className="pl-event-card">
                                <span className="pl-event-time">{evt.time}</span>
                                <div className="pl-event-info">
                                    <span className="pl-event-name">{evt.name}</span>
                                    <span className="pl-event-location">{evt.location}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PulsoLocalScreen;
