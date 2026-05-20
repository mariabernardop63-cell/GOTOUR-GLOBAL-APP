import React, { useState, useEffect } from 'react';
import { Globe, Hotel, Map as MapIcon } from 'lucide-react';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './AuthLayout.css';

const marketingTexts = [
    {
        title: "Descubra o mundo com um clique.",
        subtitle: "Explore praias, hotéis, restaurantes e experiências únicas, tudo num só lugar.",
        desc: "A Gotour mostra-te o melhor do teu país e do mundo, de forma rápida e inteligente."
    },
    {
        title: "África é gigante. E tu ainda viste pouco.",
        subtitle: "Explora destinos autênticos, cultura, gastronomia e aventuras reais.",
        desc: ""
    },
    {
        title: "Planeie a tua viagem como um profissional.",
        subtitle: "Crie roteiros, guarde lugares favoritos e encontre destinos incríveis perto de ti.",
        desc: "Viajar nunca foi tão simples e organizado. Da tua província para o mundo."
    }
];

const AuthMarketingPanel = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % marketingTexts.length);
        }, 6000);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <div className="auth-marketing-panel">
            <div className="rotating-text-container">
                {marketingTexts.map((item, index) => (
                    <div
                        key={index}
                        className={`text-slide ${index === currentTextIndex ? 'active' : ''}`}
                    >
                        <h1 className="marketing-title">{item.title}</h1>
                        <h2 className="marketing-subtitle">{item.subtitle}</h2>
                        {item.desc && <p className="marketing-desc">{item.desc}</p>}
                    </div>
                ))}
            </div>

            {/* Dots Indicators */}
            <div className="rotation-indicators">
                {marketingTexts.map((_, idx) => (
                    <div
                        key={idx}
                        className={`dot ${idx === currentTextIndex ? 'active' : ''}`}
                    ></div>
                ))}
            </div>

            {/* Mini Features Line */}
            <div className="mini-features">
                <div className="feat-item"><Globe size={16} /> Destinos reais</div>
                <div className="feat-separator">•</div>
                <div className="feat-item"><Hotel size={16} /> Lugares incríveis</div>
                <div className="feat-separator">•</div>
                <div className="feat-item"><MapIcon size={16} /> Exploração inteligente</div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-box">
                    <span className="stat-num">+500</span>
                    <span className="stat-label">destinos</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num">+10</span>
                    <span className="stat-label">províncias</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num">+2k</span>
                    <span className="stat-label">viajantes</span>
                </div>
            </div>
        </div>
    );
};

export default AuthMarketingPanel;
