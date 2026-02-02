import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Welcome.css';

import dubaiCity from '../../assets/images/dubai_city.png';
import africanForest from '../../assets/images/african_forest_tourists.png';
import japaneseVillage from '../../assets/images/japanese_village.png';

const images = [
    dubaiCity,
    africanForest,
    japaneseVillage,
];

import gotourLogo from '../../assets/images/gotour_logo_white.png';

const Welcome = () => {
    // ... existing hook logic ...
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="welcome-page">
            {/* Background Slideshow */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`welcome-bg ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                ></div>
            ))}

            <div className="welcome-overlay"></div>

            <div className="logo-overlay fade-in">
                <img src={gotourLogo} alt="Go Tour Logo" style={{ height: '40px', width: 'auto' }} /> GO TOUR
            </div>

            <div className="welcome-content slide-up">
                <h1 className="welcome-title">Explore o Mundo <br />Como um Local</h1>
                <p className="welcome-subtitle">
                    Seu companheiro de viagem inteligente. Descubra joias escondidas, conheça novas pessoas e viaje com mais sabedoria.
                </p>

                <div className="welcome-actions">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/signup')}
                    >
                        Começar Agora
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/login')}
                        style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', backdropFilter: 'blur(4px)' }}
                    >
                        Já tenho uma conta
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
