import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Menu, Plus, MessageSquare, Film,
    Settings, Archive, CheckCheck, Lock, User
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

const MessagesScreen = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showNewMenu, setShowNewMenu] = useState(false);
    const [showFabMenu, setShowFabMenu] = useState(false);

    return (
        <div className="messages-page">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

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
    );
};

export default MessagesScreen;
