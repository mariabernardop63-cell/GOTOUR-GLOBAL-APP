import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Menu, Plus, MessageSquare, Film,
    Settings, Archive, CheckCheck, Lock, User,
    MessageCircle, Users, Bell, Heart,
    MapPin, Compass, BookOpen, Layers,
    Calendar, Briefcase, Clock, Ticket, Star, Crown,
    SlidersHorizontal, Globe, Palette, BellRing, ShieldCheck,
    UserX, Smartphone, FileText,
    LifeBuoy, AlertTriangle, Headphones, Info
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import gotourLogo from '../../assets/images/gotour_icon.png';
import dubaiImage from '../../assets/images/dubai_city.png';
import './MessagesScreen.css';

// Mock data
const mockStories = [
    { id: 'add', name: 'Sua história', avatar: null, isAdd: true },
    { id: 'gotour', name: 'GoTour', avatar: gotourLogo, hasStory: true },
    { id: 'dubai', name: 'Dubai Noite', avatar: dubaiImage, hasStory: true },
];

const mockConversations = [
    {
        id: 'gotour-welcome',
        name: 'GoTour',
        avatar: gotourLogo,
        lastMessage: 'Bem-vindo ao GoTour! 🌍 Estamos felizes em ter você conosco. Explore destinos incríveis e compartilhe suas experiências de viagem...',
        time: 'Agora',
        unread: 1,
    },
];

/* Sidebar Nav Item */
const SidebarItem = ({ icon: Icon, label, onClick }) => (
    <button className="sidebar-item" onClick={onClick}>
        <Icon size={20} strokeWidth={1.8} />
        <span>{label}</span>
    </button>
);

const MessagesScreen = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showNewMenu, setShowNewMenu] = useState(false);
    const [showFabMenu, setShowFabMenu] = useState(false);

    const handleNav = (path) => navigate(path);

    return (
        <div className="messages-layout">
            {/* Mobile-only drawer */}
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* ===== LEFT: MESSAGES PANEL ===== */}
            <div className="messages-panel">

                {/* MAIN HEADER */}
                <header className="messages-main-header">
                    <button className="messages-logo-btn" onClick={() => navigate('/home')} aria-label="Home">
                        <img src={gotourLogo} alt="GoTour" className="messages-header-logo" />
                    </button>
                    <button className="messages-menu-btn" onClick={() => setIsDrawerOpen(!isDrawerOpen)} aria-label="Menu">
                        <Menu size={24} />
                    </button>
                </header>

                {/* SUB HEADER */}
                <div className="messages-sub-header">
                    <button className="messages-back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                        <ArrowLeft size={20} />
                    </button>
                    <span className="messages-sub-title">Mensagens</span>
                </div>

                {/* NEW MESSAGE BUTTON */}
                <div className="messages-action-row">
                    <button className="messages-new-btn" onClick={() => setShowNewMenu(!showNewMenu)}>
                        <span className="messages-new-btn-icon"><Plus size={20} /></span>
                        <span className="messages-new-btn-text">Nova ação</span>
                    </button>
                </div>

                {showNewMenu && (
                    <div className="messages-new-dropdown">
                        <button onClick={() => setShowNewMenu(false)}>
                            <MessageSquare size={18} /> Nova mensagem
                        </button>
                        <button onClick={() => setShowNewMenu(false)}>
                            <Film size={18} /> Adicionar história
                        </button>
                    </div>
                )}

                {/* STORIES */}
                <div className="stories-section">
                    <div className="stories-scroll">
                        {mockStories.map((story) => (
                            <button
                                key={story.id}
                                className="story-item"
                                onClick={() => {
                                    if (!story.isAdd && story.hasStory) {
                                        navigate('/story-viewer', { state: { story } });
                                    }
                                }}
                            >
                                <div className={`story-ring ${story.isAdd ? 'add-story' : ''} ${!story.hasStory && !story.isAdd ? 'no-story' : ''}`}>
                                    <div className="story-ring-inner">
                                        {story.isAdd ? (
                                            <Plus size={24} className="story-add-icon" />
                                        ) : story.avatar ? (
                                            <img src={story.avatar} alt={story.name} />
                                        ) : (
                                            <User size={28} color="#94a3b8" />
                                        )}
                                    </div>
                                </div>
                                <span className="story-name">{story.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONVERSATIONS */}
                <div className="conversations-list">
                    {mockConversations.map((convo) => (
                        <button
                            key={convo.id}
                            className="conversation-item"
                            onClick={() => navigate('/chat', { state: { contact: convo } })}
                        >
                            <div className="conversation-avatar">
                                {convo.avatar ? (
                                    <img src={convo.avatar} alt={convo.name} />
                                ) : (
                                    <User size={26} color="#94a3b8" />
                                )}
                            </div>
                            <div className="conversation-content">
                                <span className="conversation-name">{convo.name}</span>
                                <span className="conversation-preview">{convo.lastMessage}</span>
                            </div>
                            <div className="conversation-meta">
                                <span className="conversation-time">{convo.time}</span>
                                {convo.unread > 0 && (
                                    <span className="conversation-badge">{convo.unread}</span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* FAB */}
                <button className="messages-fab" onClick={() => setShowFabMenu(!showFabMenu)} aria-label="Opções">
                    <Settings size={22} />
                </button>

                {showFabMenu && (
                    <div className="fab-menu">
                        <button onClick={() => setShowFabMenu(false)}><Archive size={18} /> Arquivar mensagens</button>
                        <button onClick={() => setShowFabMenu(false)}><CheckCheck size={18} /> Marcar como lidas</button>
                        <button onClick={() => setShowFabMenu(false)}><Lock size={18} /> Trancar conversas</button>
                        <button onClick={() => {
                            setShowFabMenu(false);
                            navigate('/message-settings');
                        }}><Settings size={18} /> Definições</button>
                    </div>
                )}

                <BottomNavBar />
            </div>

            {/* ===== RIGHT: DESKTOP SIDEBAR ===== */}
            <aside className="messages-sidebar">
                <div className="sidebar-head">
                    <span className="sidebar-head-title">Menu</span>
                </div>

                <div className="sidebar-scroll">
                    {/* Quick Actions */}
                    <div className="sidebar-shortcuts">
                        <button className="sidebar-shortcut" onClick={() => handleNav('/messages')}>
                            <MessageCircle size={18} />
                            <span>Mensagens</span>
                            <span className="sidebar-shortcut-count">0</span>
                        </button>
                        <button className="sidebar-shortcut">
                            <Users size={18} />
                            <span>Amigos</span>
                            <span className="sidebar-shortcut-count">0</span>
                        </button>
                        <button className="sidebar-shortcut">
                            <Bell size={18} />
                            <span>Notificações</span>
                            <span className="sidebar-shortcut-count">0</span>
                        </button>
                        <button className="sidebar-shortcut">
                            <Heart size={18} />
                            <span>Favoritos</span>
                            <span className="sidebar-shortcut-count">0</span>
                        </button>
                    </div>

                    <div className="sidebar-sep" />

                    <p className="sidebar-label">Ferramentas</p>
                    <nav className="sidebar-nav">
                        <SidebarItem icon={MessageCircle} label="Mensagens" onClick={() => handleNav('/messages')} />
                        <SidebarItem icon={BellRing} label="Notificações" />
                        <SidebarItem icon={Users} label="Amigos" />
                        <SidebarItem icon={Compass} label="Interesses" />
                        <SidebarItem icon={Layers} label="Coleções" />
                        <SidebarItem icon={MapPin} label="Notas de Viagem" />
                        <SidebarItem icon={Calendar} label="Visitar Depois" />
                        <SidebarItem icon={BookOpen} label="Minhas Publicações" />
                        <SidebarItem icon={Briefcase} label="Meus Comentários" />
                        <SidebarItem icon={Clock} label="Histórico" />
                        <SidebarItem icon={Ticket} label="Minhas Reservas" />
                        <SidebarItem icon={Star} label="Eventos Próximos" />
                        <SidebarItem icon={Crown} label="Planos & Assinatura" />
                    </nav>

                    <div className="sidebar-sep" />

                    <p className="sidebar-label">Definições</p>
                    <nav className="sidebar-nav">
                        <SidebarItem icon={SlidersHorizontal} label="Conta" onClick={() => handleNav('/edit-profile')} />
                        <SidebarItem icon={Globe} label="Idioma & País" />
                        <SidebarItem icon={Palette} label="Aparência" />
                        <SidebarItem icon={Bell} label="Notificações" />
                        <SidebarItem icon={ShieldCheck} label="Segurança" />
                    </nav>

                    <div className="sidebar-sep" />

                    <p className="sidebar-label">Privacidade</p>
                    <nav className="sidebar-nav">
                        <SidebarItem icon={Lock} label="Privacidade da Conta" />
                        <SidebarItem icon={UserX} label="Bloqueados" />
                        <SidebarItem icon={Smartphone} label="Permissões do App" />
                        <SidebarItem icon={FileText} label="Termos e Políticas" />
                    </nav>

                    <div className="sidebar-sep" />

                    <p className="sidebar-label">Suporte</p>
                    <nav className="sidebar-nav">
                        <SidebarItem icon={LifeBuoy} label="Central de Ajuda" />
                        <SidebarItem icon={AlertTriangle} label="Reportar Problema" />
                        <SidebarItem icon={Headphones} label="Contactar Suporte" />
                        <SidebarItem icon={Info} label="Sobre a GoTour" />
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default MessagesScreen;
