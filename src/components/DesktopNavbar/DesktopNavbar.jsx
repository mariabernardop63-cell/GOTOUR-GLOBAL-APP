import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DesktopNavbar.css';
import gotourIcon from '../../assets/images/gotour_icon.png';
import Button from '../Button/Button';

const DesktopNavbar = ({ onLoginClick, onSignupClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`desktop-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    {/* Left: Brand */}
                    <div className="navbar-brand">
                        <img src={gotourIcon} alt="GoTour" className="navbar-logo" />
                        <span className="navbar-brand-name">GOTOUR</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="navbar-links">
                        <a href="#features" className="nav-link">Funcionalidades</a>
                        <a href="#countries" className="nav-link">Países</a>
                        <a href="#plans" className="nav-link">Planos</a>
                        <a href="#how-it-works" className="nav-link">Como funciona</a>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="navbar-actions">
                    <button className="nav-btn-text" onClick={onLoginClick || (() => navigate('/login'))}>
                        Login
                    </button>
                    <button className="nav-btn-text" onClick={onSignupClick || (() => navigate('/signup'))}>
                        Sign up
                    </button>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={onSignupClick || (() => navigate('/signup'))}
                        className="nav-btn-primary"
                    >
                        Começar
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;
