import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DesktopNavbar.css';
import gotourIcon from '../../assets/images/gotour_icon.png';
import Button from '../Button/Button';

// Menu data configuration
const NAV_MENUS = [
    { id: 'inicio', label: 'Início' },
    { id: 'funcionalidades', label: 'Funcionalidades' },
    { id: 'planos', label: 'Planos' },
    { id: 'sobre', label: 'Sobre' }
];

const DesktopNavbar = ({ onLoginClick, onSignupClick }) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // 1. Initial sentinel for top scroll (50px threshold)
        const sentinel = document.createElement('div');
        sentinel.id = 'navbar-sentinel';
        sentinel.style.position = 'absolute';
        sentinel.style.top = '50px';
        sentinel.style.left = '0';
        sentinel.style.width = '100%';
        sentinel.style.height = '1px';
        sentinel.style.pointerEvents = 'none';
        sentinel.style.zIndex = '-1';
        document.body.appendChild(sentinel);

        const observerOptions = { threshold: 0 };
        
        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                // If sentinel is not intersecting, we've scrolled past 50px
                if (entry.target.id === 'navbar-sentinel') {
                    if (!entry.isIntersecting) setIsScrolled(true);
                    else {
                        // Check if we are still above the features section
                        const feat = document.getElementById('funcionalidades');
                        if (feat) {
                            const rect = feat.getBoundingClientRect();
                            if (rect.top > 100) setIsScrolled(false);
                        } else {
                            setIsScrolled(false);
                        }
                    }
                }
                
                // If we hit functionalities, force scrolled state
                if (entry.target.id === 'funcionalidades') {
                    if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
                        setIsScrolled(true);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observer.observe(sentinel);

        // 2. Observe Features Section (#funcionalidades)
        const featSection = document.getElementById('funcionalidades');
        if (featSection) {
            observer.observe(featSection);
        }

        // 3. Fallback for window scroll (redundant but safe)
        const manualCheck = () => {
            if (window.scrollY > 50) setIsScrolled(true);
        };
        window.addEventListener('scroll', manualCheck, { passive: true });

        return () => {
            observer.disconnect();
            if (sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
            window.removeEventListener('scroll', manualCheck);
        };
    }, []);

    return (
        <nav className={`desktop-navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    {/* Left: Brand */}
                    <div className="navbar-brand">
                        <img src={gotourIcon} alt="gotour icon" className="navbar-logo" />
                        <span className="navbar-brand-name">GO TOUR</span>
                    </div>

                    {/* Navigation Links (No Dropdowns) */}
                    <div className="navbar-links">
                        {NAV_MENUS.map((menu) => (
                            <div key={menu.id} className="nav-item-container">
                                <button
                                    className="nav-link"
                                    onClick={() => {
                                        if (menu.id === 'inicio') {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        } else {
                                            const el = document.getElementById(menu.id);
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }
                                    }}
                                >
                                    <span className="nav-link-text">{menu.label}</span>
                                </button>
                            </div>
                        ))}
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
