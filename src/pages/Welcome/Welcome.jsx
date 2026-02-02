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

const Welcome = () => {
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
                <MapPin size={24} /> GO TOUR
            </div>

            <div className="welcome-content slide-up">
                <h1 className="welcome-title">Explore the World <br />Like a Local</h1>
                <p className="welcome-subtitle">
                    Your personal intelligent travel companion. Discover hidden gems, meet new people, and travel smarter.
                </p>

                <div className="welcome-actions">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/signup')}
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/login')}
                        style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', backdropFilter: 'blur(4px)' }}
                    >
                        I already have an account
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
