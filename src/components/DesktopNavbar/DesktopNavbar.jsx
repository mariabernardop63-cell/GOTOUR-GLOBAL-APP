import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DesktopNavbar.css';
import gotourIcon from '../../assets/images/gotour_icon.png';
import Button from '../Button/Button';

// Menu data configuration
const NAV_MENUS = [
    {
        id: 'sobre',
        label: 'Sobre',
        items: [
            { title: 'Quem Somos' },
            { title: 'Nossa Visão' },
            { title: 'Por que GoTour?' },
            { title: 'Parcerias' }
        ]
    },
    {
        id: 'como-funciona',
        label: 'Como Funciona',
        items: [
            { title: 'Descobrir Destinos' },
            { title: 'Planear Viagens' },
            { title: 'Reservar Experiências' },
            { title: 'Viajar com Confiança' }
        ]
    },
    {
        id: 'planos',
        label: 'Planos',
        items: [
            { title: 'Plano Free' },
            { title: 'Plano Explorer' },
            { title: 'Plano Premium' },
            { title: 'Comparar Planos' }
        ]
    },
    {
        id: 'ajuda',
        label: 'Ajuda',
        items: [
            { title: 'Centro de Ajuda' },
            { title: 'Fale Connosco' },
            { title: 'Segurança' },
            { title: 'Termos e Políticas' }
        ]
    }
];

const DesktopNavbar = ({ onLoginClick, onSignupClick }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownTimeoutRef = React.useRef(null);

    const handleMouseEnter = (id) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setActiveDropdown(id);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 300); // Small delay to allow moving mouse into the dropdown
    };

    const handleClick = (id) => {
        if (activeDropdown === id) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(id);
        }
    };

    // Close dropdowns on outside click (very robust pattern)
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.nav-item-container')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <nav className="desktop-navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    {/* Left: Brand */}
                    <div className="navbar-brand">
                        <img src={gotourIcon} alt="gotour icon" className="navbar-logo" />
                        <span className="navbar-brand-name">GO TOUR</span>
                    </div>

                    {/* Navigation Links with Dropdowns */}
                    <div className="navbar-links">
                        {NAV_MENUS.map((menu) => (
                            <div
                                key={menu.id}
                                className="nav-item-container"
                                onMouseEnter={() => handleMouseEnter(menu.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className={`nav-link ${activeDropdown === menu.id ? 'active' : ''}`}
                                    onClick={() => handleClick(menu.id)}
                                >
                                    {menu.label}
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

                {/* Mega Dropdown Panel */}
                <div
                    className={`nav-mega-dropdown ${activeDropdown ? 'show' : ''}`}
                    onMouseEnter={() => {
                        if (activeDropdown) handleMouseEnter(activeDropdown);
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="mega-dropdown-grid">
                        {activeDropdown && NAV_MENUS.find(m => m.id === activeDropdown)?.items.map((item, idx) => (
                            <div key={idx} className="mega-dropdown-item">
                                <span className="mega-dropdown-title">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;
