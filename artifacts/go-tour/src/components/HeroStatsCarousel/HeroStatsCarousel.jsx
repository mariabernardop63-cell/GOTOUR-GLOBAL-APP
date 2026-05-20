import React from 'react';
import { Globe, Users, MessagesSquare, BadgeCheck } from 'lucide-react';
import './HeroStatsCarousel.css';

const STATS = [
    { id: 1, num: '+500', label: 'Destinos', icon: Globe },
    { id: 2, num: '+10M', label: 'Usuários', icon: Users },
    { id: 3, num: '+5K', label: 'Comunidades', icon: MessagesSquare },
    { id: 4, num: '+5M', label: 'Locais Verificados', icon: BadgeCheck },
];

const HeroStatsCarousel = () => {
    return (
        <div className="hero-stats-carousel-wrapper">
            <div className="hero-stats-carousel-track">
                {/* Clone the array of 4 items twice to create the seamless infinite scroll effect */}
                {[...STATS, ...STATS].map((stat, idx) => (
                    <div className="hero-stat-card" key={idx}>
                        <div className="stat-icon-wrapper">
                            <stat.icon size={24} strokeWidth={1.5} />
                        </div>
                        <div className="stat-text-wrapper">
                            <span className="stat-num">{stat.num}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroStatsCarousel;
