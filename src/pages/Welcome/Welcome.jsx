import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigation } from '../../App';
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

import gotourIcon from '../../assets/images/gotour_icon.png';

const Welcome = () => {
    const { navigateForward } = useNavigation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

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
                <img src={gotourIcon} alt="GoTour Icon" className="gotour-icon" />
                <span className="gotour-text">GOTOUR</span>
            </div>

            <div className="welcome-content slide-up">
                <h1 className="welcome-title">Explore o Mundo <br />Como um Local</h1>
                <p className="welcome-subtitle">
                    Descubra destinos incríveis, conecte-se com guias locais e viva experiências autênticas.
                </p>

                <div className="welcome-actions">
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => navigateForward('/signup')}
                    >
                        Começar Agora
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={() => navigateForward('/login')}
                    >
                        Já tenho conta
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
