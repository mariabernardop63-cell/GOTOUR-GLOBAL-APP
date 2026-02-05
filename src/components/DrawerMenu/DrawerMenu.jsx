import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessageSquare, Users, Bell, User, Check, Zap } from 'lucide-react';
import './DrawerMenu.css';

const DrawerMenu = ({ isOpen, onClose }) => {
    const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <div
                className={`drawer-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            ></div>

            <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <button className="close-btn" onClick={onClose}>
                        <ArrowLeft size={28} />
                    </button>
                </div>

                <div className="drawer-profile-section">
                    <div className="profile-top-row">
                        <div className="profile-info">
                            <div className="profile-avatar-wrapper">
                                <div className="profile-avatar">
                                    <User size={32} color="#7c3aed" />
                                </div>
                            </div>
                            <div className="profile-details">
                                <span className="profile-name">USUARIO</span>
                                <span className="profile-email">usuario@email.com</span>
                            </div>
                        </div>

                        {/* Plan Toggle Button */}
                        <button
                            className="plan-selector-btn"
                            onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
                        >
                            <span className="plan-text">PLANO FREE</span>
                            <div className="plan-arrow-icon" style={{ transform: isPlanDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}></div>
                        </button>
                    </div>

                    {/* Plan Dropdown Content */}
                    {isPlanDropdownOpen && (
                        <div className="plan-dropdown">
                            <div className="plan-option">
                                <span>PLANO BÁSICO</span>
                                <div className="radio-circle"></div>
                            </div>
                            <div className="plan-option">
                                <span>PLANO PREMIUM</span>
                                <Zap size={14} color="#cca500" />
                            </div>
                            <button className="update-plan-btn">
                                ATUALIZAR
                            </button>
                        </div>
                    )}
                </div>

                <div className="drawer-separator"></div>

                <div className="drawer-actions">
                    <button className="drawer-action-btn">
                        <div className="btn-left-content">
                            <MessageSquare className="drawer-icon" size={20} />
                            <span className="drawer-btn-text">MENSAGENS</span>
                        </div>
                        <span className="drawer-counter">0+</span>
                    </button>

                    <button className="drawer-action-btn">
                        <div className="btn-left-content">
                            <Users className="drawer-icon" size={20} />
                            <span className="drawer-btn-text">AMIGOS</span>
                        </div>
                        <span className="drawer-counter">0+</span>
                    </button>

                    <button className="drawer-action-btn">
                        <div className="btn-left-content">
                            <Bell className="drawer-icon" size={20} />
                            <span className="drawer-btn-text">NOTIFICAÇÃO</span>
                        </div>
                        <span className="drawer-counter">0+</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default DrawerMenu;
