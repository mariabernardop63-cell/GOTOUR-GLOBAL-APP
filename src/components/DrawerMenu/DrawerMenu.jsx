import React, { useEffect, useState } from 'react';
import {
    ArrowLeft, User, MessageSquare, Users, Bell, Star, Zap,
    Settings, Globe, Shield, HelpCircle, LogOut, ChevronRight,
    Bookmark, Calendar, MapPin, Grid, Briefcase
} from 'lucide-react';
import './DrawerMenu.css';

const DrawerMenu = ({ isOpen, onClose }) => {
    const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsPlanDropdownOpen(false); // Close dropdown when drawer closes
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

                {/* 1. Header Area (Back + Profile + Plan) */}
                <div className="drawer-header">
                    <button className="back-btn" onClick={onClose}>
                        <ArrowLeft size={24} color="#1e293b" />
                    </button>

                    <div className="profile-row">
                        <div className="profile-left">
                            <div className="profile-img-container">
                                <User size={28} color="#7c3aed" />
                            </div>
                            <div className="profile-text">
                                <span className="user-name">USUÁRIO</span>
                                <span className="user-email">usuario@email.com</span>
                            </div>
                        </div>

                        <div className="plan-section">
                            <div
                                className="plan-toggle"
                                onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
                            >
                                <span>PLANO FREE</span>
                                <div className={`triangle-icon ${isPlanDropdownOpen ? 'open' : ''}`}></div>
                            </div>

                            {/* Dropdown */}
                            {isPlanDropdownOpen && (
                                <div className="plan-dropdown-menu">
                                    <div className="dropdown-item">PLANO BÁSICO</div>
                                    <div className="dropdown-item premium">PLANO PREMIUM <Star size={12} fill="#eab308" color="#eab308" /></div>
                                    <button className="update-btn">ATUALIZAR</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="drawer-divider"></div>

                <div className="drawer-scrollable">
                    {/* 2. Quick Shortcuts (Grid) */}
                    <div className="section-container">
                        <h3 className="section-title">ATALHOS RÁPIDOS</h3>
                        <div className="shortcuts-grid">
                            <button className="shortcut-card">
                                <div className="shortcut-icon"><MessageSquare size={20} /></div>
                                <span>Mensagens</span>
                                <div className="badge">0+</div>
                            </button>
                            <button className="shortcut-card">
                                <div className="shortcut-icon"><Users size={20} /></div>
                                <span>Amigos</span>
                                <div className="badge">0+</div>
                            </button>
                            <button className="shortcut-card">
                                <div className="shortcut-icon"><Bell size={20} /></div>
                                <span>Notificações</span>
                                <div className="badge">0+</div>
                            </button>
                            <button className="shortcut-card">
                                <div className="shortcut-icon"><Star size={20} /></div>
                                <span>Favoritos</span>
                                <div className="badge">0+</div>
                            </button>
                        </div>
                    </div>

                    <div className="drawer-divider"></div>

                    {/* 3. Tools List */}
                    <div className="section-container">
                        <h3 className="section-title">FERRAMENTAS</h3>
                        <div className="menu-list">
                            <MenuItem icon={<MessageSquare />} text="Mensagens" />
                            <MenuItem icon={<Bell />} text="Notificações" />
                            <MenuItem icon={<Users />} text="Amigos" />
                            <MenuItem icon={<Grid />} text="Interesses" />
                            <MenuItem icon={<Bookmark />} text="Coleções" />
                            <MenuItem icon={<MapPin />} text="Notas de Viagem" />
                            <MenuItem icon={<Calendar />} text="Visitar Depois" />
                            <MenuItem icon={<Briefcase />} text="Minhas Publicações" />
                            <MenuItem icon={<Briefcase />} text="Meus Comentários" />
                            <MenuItem icon={<Zap />} text="Histórico" />
                            <MenuItem icon={<Calendar />} text="Minhas Reservas" />
                            <MenuItem icon={<Star />} text="Eventos Próximos" />
                            <MenuItem icon={<Zap />} text="Planos & Assinatura" />
                        </div>
                    </div>

                    <div className="drawer-divider"></div>

                    {/* 4. Settings */}
                    <div className="section-container">
                        <h3 className="section-title">DEFINIÇÕES</h3>
                        <div className="menu-list">
                            <MenuItem icon={<User />} text="Conta" />
                            <MenuItem icon={<Globe />} text="Idioma & País" />
                            <MenuItem icon={<Settings />} text="Aparência" /> {/* Dark mode future */}
                            <MenuItem icon={<Bell />} text="Notificações" />
                            <MenuItem icon={<Shield />} text="Segurança" />
                        </div>
                    </div>

                    <div className="drawer-divider"></div>

                    {/* 5. Privacy */}
                    <div className="section-container">
                        <h3 className="section-title">PRIVACIDADE</h3>
                        <div className="menu-list">
                            <MenuItem icon={<Shield />} text="Privacidade da Conta" />
                            <MenuItem icon={<User />} text="Bloqueados" />
                            <MenuItem icon={<Settings />} text="Permissões do App" />
                            <MenuItem icon={<HelpCircle />} text="Termos e Políticas" />
                        </div>
                    </div>

                    <div className="drawer-divider"></div>

                    {/* 6. Support */}
                    <div className="section-container">
                        <h3 className="section-title">SUPORTE</h3>
                        <div className="menu-list">
                            <MenuItem icon={<HelpCircle />} text="Central de Ajuda" />
                            <MenuItem icon={<MessageSquare />} text="Reportar Problema" />
                            <MenuItem icon={<MessageSquare />} text="Contactar Suporte" />
                            <MenuItem icon={<Grid />} text="Sobre a GoTour" />
                        </div>
                    </div>
                </div>

                {/* 7. Footer Logout */}
                <div className="drawer-footer">
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span>Terminar Sessão</span>
                    </button>
                </div>
            </div>
        </>
    );
};

// Helper Component for List Items
const MenuItem = ({ icon, text }) => (
    <button className="menu-item-btn">
        <div className="menu-item-left">
            <span className="menu-icon-wrapper">{icon}</span>
            <span className="menu-text">{text}</span>
        </div>
        <ChevronRight size={16} color="#9ca3af" />
    </button>
);

export default DrawerMenu;
