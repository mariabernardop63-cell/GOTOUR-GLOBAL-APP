import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../App';
import Button from '../../components/Button/Button';
import { Globe, Hotel, MapPin, Map as MapIcon, Users } from 'lucide-react';
import './Welcome.css';

import gotourIcon from '../../assets/images/gotour_icon.png';

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

const Welcome = () => {
    const { navigateForward } = useNavigation();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [loadingBtn, setLoadingBtn] = useState(null); // 'primary' | 'secondary' | null

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % marketingTexts.length);
        }, 6000); // Text rotation every 6s

        return () => clearInterval(textInterval);
    }, []);

    const handleNavigation = (path, btnType) => {
        setLoadingBtn(btnType);
        setTimeout(() => {
            setLoadingBtn(null);
            navigateForward(path);
        }, 2000);
    };

    return (
        <div className="welcome-page-content">
            {/* --- DESKTOP GRID LAYOUT --- */}

            {/* Elements visible on Mobile Only (Logo) - Top Right Absolute */}
            <div className="mobile-logo-area fade-in">
                <img src={gotourIcon} alt="GoTour Icon" className="gotour-icon" />
                <span className="gotour-text">GOTOUR</span>
            </div>

            <div className="welcome-desktop-grid">

                {/* LEFT COL: Marketing Text (Desktop Only) */}
                <div className="welcome-left-col">
                    <div className="logo-brand-area">
                        <img src={gotourIcon} alt="GoTour" className="brand-logo-img" />
                        <span className="brand-name-text">GOTOUR</span>
                    </div>

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

                {/* RIGHT COL: Action Container (Desktop puts this in right col, Mobile centers it) */}
                <div className="welcome-right-col">
                    {/* Mobile Title (Hidden on Desktop) */


                        {/* Mobile Title (Hidden on Desktop) */ }
                        < div className="mobile-intro slide-up">
                    <h1 className="welcome-title">Explore o Mundo <br />Como um Local</h1>
                    <p className="welcome-subtitle">
                        Descubra destinos incríveis, conecte-se com guias locais e viva experiências autênticas.
                    </p>
                </div>

                {/* Glass Card Container (Desktop) / Standard (Mobile) */}
                <div className="action-glass-card slide-up">
                    <div className="desktop-card-header">
                        <h2>Comece sua jornada</h2>
                        <p>Crie sua conta ou faça login para continuar.</p>
                    </div>

                    <div className="welcome-actions">
                        <Button
                            type="button"
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={() => handleNavigation('/signup', 'primary')}
                            isLoading={loadingBtn === 'primary'}
                        >
                            Começar Agora
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            size="lg"
                            fullWidth
                            onClick={() => handleNavigation('/login', 'secondary')}
                            isLoading={loadingBtn === 'secondary'}
                        >
                            Já tenho conta
                        </Button>
                    </div>
                </div>
            </div>

        </div>
        </div >
    );
};

export default Welcome;
