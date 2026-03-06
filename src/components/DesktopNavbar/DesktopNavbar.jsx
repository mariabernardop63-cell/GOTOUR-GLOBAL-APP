import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DesktopNavbar.css';
import gotourIcon from '../../assets/images/gotour_icon.png';
import Button from '../Button/Button';

// Menu data configuration
const NAV_MENUS = [
    {
        id: 'inicio',
        label: 'Início',
        items: []
    },
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

    return (
        <nav className="desktop-navbar">
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
                                <button className="nav-link">
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
