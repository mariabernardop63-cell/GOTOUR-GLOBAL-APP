import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    X, User, ChevronRight, Star, Crown,
    MessageCircle, Users, Bell, Heart,
    MapPin, Compass, BookOpen, Layers,
    Calendar, Briefcase, Clock, Ticket,
    SlidersHorizontal, Globe, Palette, BellRing, ShieldCheck,
    Lock, UserX, Smartphone, FileText,
    LifeBuoy, AlertTriangle, Headphones, Info,
    LogOut, ChevronDown
} from 'lucide-react';
import './DrawerMenu.css';

const DrawerMenu = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isPlanOpen, setIsPlanOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsPlanOpen(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleNav = (path) => {
        onClose();
        setTimeout(() => navigate(path), 250);
    };

    return (
        <>
            <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

            <div className={`drawer-panel ${isOpen ? 'open' : ''}`}>

                {/* ===== HEADER ===== */}
                <div className="drawer-head">
                    <button className="drawer-close" onClick={onClose} aria-label="Fechar menu">
                        <X size={22} strokeWidth={2.5} />
                    </button>

                    <div className="drawer-profile" onClick={() => handleNav('/profile')}>
                        <div className="drawer-avatar">
                            <User size={26} />
                        </div>
                        <div className="drawer-user-info">
                            <span className="drawer-user-name">Usuário</span>
                            <span className="drawer-user-email">usuario@email.com</span>
                        </div>
                        <ChevronRight size={20} className="drawer-profile-arrow" />
                    </div>

                    {/* Plan Badge */}
                    <div className="drawer-plan-area">
                        <button className="drawer-plan-badge" onClick={() => setIsPlanOpen(!isPlanOpen)}>
                            <Crown size={14} />
                            <span>Plano Free</span>
                            <ChevronDown size={14} className={`drawer-plan-chevron ${isPlanOpen ? 'rotated' : ''}`} />
                        </button>

                        {isPlanOpen && (
                            <div className="drawer-plan-dropdown">
                                <button className="drawer-plan-option" onClick={() => setIsPlanOpen(false)}>
                                    <span>Plano Básico</span>
                                </button>
                                <button className="drawer-plan-option drawer-plan-premium" onClick={() => setIsPlanOpen(false)}>
                                    <span>Plano Premium</span>
                                    <Star size={14} />
                                </button>
                                <button className="drawer-plan-upgrade" onClick={() => setIsPlanOpen(false)}>
                                    Atualizar Plano
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== SCROLLABLE BODY ===== */}
                <div className="drawer-body">

                    {/* Quick Shortcuts */}
                    <div className="drawer-shortcuts">
                        <button className="drawer-shortcut" onClick={() => handleNav('/messages')}>
                            <div className="drawer-shortcut-icon"><MessageCircle size={20} /></div>
                            <span>Mensagens</span>
                            <span className="drawer-shortcut-count">0</span>
                        </button>
                        <button className="drawer-shortcut" onClick={() => handleNav('/friends')}>
                            <div className="drawer-shortcut-icon"><Users size={20} /></div>
                            <span>Amigos</span>
                            <span className="drawer-shortcut-count">0</span>
                        </button>
                        <button className="drawer-shortcut" onClick={() => handleNav('/notifications')}>
                            <div className="drawer-shortcut-icon"><Bell size={20} /></div>
                            <span>Notificações</span>
                            <span className="drawer-shortcut-count">0</span>
                        </button>
                        <button className="drawer-shortcut">
                            <div className="drawer-shortcut-icon"><Heart size={20} /></div>
                            <span>Favoritos</span>
                            <span className="drawer-shortcut-count">0</span>
                        </button>
                    </div>

                    <div className="drawer-sep" />

                    {/* Ferramentas */}
                    <p className="drawer-section-label">Ferramentas</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={MessageCircle} label="Mensagens" onClick={() => handleNav('/messages')} />
                        <DrawerItem icon={BellRing} label="Notificações" onClick={() => handleNav('/notifications')} />
                        <DrawerItem icon={Users} label="Amigos" onClick={() => handleNav('/friends')} />
                        <DrawerItem icon={Compass} label="Interesses" />
                        <DrawerItem icon={Layers} label="Coleções" />
                        <DrawerItem icon={MapPin} label="Notas de Viagem" />
                        <DrawerItem icon={Calendar} label="Visitar Depois" />
                        <DrawerItem icon={BookOpen} label="Minhas Publicações" />
                        <DrawerItem icon={Briefcase} label="Meus Comentários" />
                        <DrawerItem icon={Clock} label="Histórico" />
                        <DrawerItem icon={Ticket} label="Minhas Reservas" />
                        <DrawerItem icon={Star} label="Eventos Próximos" />
                        <DrawerItem icon={Crown} label="Planos & Assinatura" />
                    </nav>

                    <div className="drawer-sep" />

                    {/* Definições */}
                    <p className="drawer-section-label">Definições</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={SlidersHorizontal} label="Conta" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Globe} label="Idioma & País" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Palette} label="Aparência" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Bell} label="Notificações" onClick={() => handleNav('/notifications')} />
                        <DrawerItem icon={ShieldCheck} label="Segurança" onClick={() => handleNav('/settings')} />
                    </nav>

                    <div className="drawer-sep" />

                    {/* Privacidade */}
                    <p className="drawer-section-label">Privacidade</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={Lock} label="Privacidade da Conta" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={UserX} label="Bloqueados" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Smartphone} label="Permissões do App" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={FileText} label="Termos e Políticas" onClick={() => handleNav('/settings')} />
                    </nav>

                    <div className="drawer-sep" />

                    {/* Suporte */}
                    <p className="drawer-section-label">Suporte</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={LifeBuoy} label="Central de Ajuda" />
                        <DrawerItem icon={AlertTriangle} label="Reportar Problema" />
                        <DrawerItem icon={Headphones} label="Contactar Suporte" />
                        <DrawerItem icon={Info} label="Sobre a GoTour" />
                    </nav>
                </div>

                {/* ===== FOOTER ===== */}
                <div className="drawer-foot">
                    <button className="drawer-logout">
                        <LogOut size={20} />
                        <span>Terminar Sessão</span>
                    </button>
                </div>
            </div>
        </>
    );
};

/* Drawer Item Component */
const DrawerItem = ({ icon: Icon, label, onClick }) => (
    <button className="drawer-item" onClick={onClick}>
        <Icon size={20} strokeWidth={1.8} />
        <span>{label}</span>
    </button>
);

export default DrawerMenu;
