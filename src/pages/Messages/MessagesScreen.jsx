import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Menu, Plus, MessageSquare, Film, MoreVertical,
    Settings, Archive, CheckCheck, Lock, User,
    MessageCircle, Users, Bell, Heart, Search,
    MapPin, Compass, BookOpen, Layers, Phone, Video, Info as InfoIcon,
    Calendar, Briefcase, Clock, Ticket, Star, Crown,
    SlidersHorizontal, Globe, Palette, BellRing, ShieldCheck,
    Mic, Paperclip, Smile, Send, Check, Image as ImageIcon, FileText, ChevronRight,
    UserCircle, Shield, Moon, MoreHorizontal, Trash2, X, Square, AlertCircle, SearchX, Pin, BellOff, Ban
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import DesktopSidebar from '../../components/DesktopSidebar/DesktopSidebar';
import gotourLogo from '../../assets/images/gotour_icon.png';
import dubaiImage from '../../assets/images/dubai_city.png';
import './MessagesScreenStyles.css';

// Custom Gemini Icon Component
const GeminiIcon = ({ size = 26 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9961 0C12.6025 6.0145 17.6534 10.9157 23.3361 11.9056C17.6534 12.8955 12.6025 17.7967 11.9961 24C11.3897 17.7967 6.13843 12.8955 0.655273 11.9056C6.13843 10.9157 11.3897 6.0145 11.9961 0Z" fill="url(#paint0_linear)" />
        <defs>
            <linearGradient id="paint0_linear" x1="11.9957" y1="0" x2="11.9957" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1C7FF2" />
                <stop offset="0.35" stopColor="#9D38FA" />
                <stop offset="0.75" stopColor="#F93766" />
                <stop offset="1" stopColor="#FABC36" />
            </linearGradient>
        </defs>
    </svg>
);

// Mock data
const mockConversations = [
    {
        id: 'gotour-welcome',
        name: 'Equipe GoTour',
        avatar: gotourLogo,
        lastMessage: 'Bem-vindo ao GoTour! 🌍 Estamos felizes em ter você...',
        time: 'Agora',
        unread: 1,
        online: true,
        sentStatus: 'none',
        isFriend: true
    },
    {
        id: 'ana-silva',
        name: 'Ana Silva',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        lastMessage: 'As fotos de Dubai ficaram incríveis! ✨',
        time: '14:30',
        unread: 0,
        online: false,
        sentStatus: 'read',
        isFriend: true
    },
    {
        id: 'grupo-viagem',
        name: 'Viagem Japão 2026',
        avatar: null,
        lastMessage: 'Carlos: Alguém já viu os tickets do trem-bala?',
        time: 'Ontem',
        unread: 5,
        online: false,
        sentStatus: 'none',
        isGroup: true
    },
    {
        id: 'spam-1',
        name: 'Oferta Especial',
        avatar: null,
        lastMessage: 'Você ganhou 10,000 milhas grátis! Clique aqui.',
        time: 'Segunda',
        unread: 1,
        online: false,
        isSpam: true
    },
    {
        id: 'comm-1',
        name: 'Mochileiros MZ',
        avatar: null,
        lastMessage: 'Novo post: Melhor roteiro em Cape Town.',
        time: '23/02',
        unread: 2,
        online: false,
        isCommunity: true
    },
    {
        id: 'arq-1',
        name: 'Luís Mendes',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024c',
        lastMessage: 'Combinado, abraço!',
        time: '20/02',
        unread: 0,
        online: false,
        isArchived: true,
        isFriend: true
    }
];

const mockChatMessages = [
    { id: 1, text: 'Olá! Bem-vindo ao GoTour.', sender: 'them', time: '10:00', date: 'Hoje' },
    { id: 2, text: 'Espero que aproveite a plataforma.', sender: 'them', time: '10:01' },
    { id: 3, text: 'Muito obrigado! A interface está sensacional. 🔥', sender: 'me', time: '10:05', status: 'read' },
];

const MessagesScreen = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showNewMenu, setShowNewMenu] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todas'); // state for filters
    const [activeChat, setActiveChat] = useState(null); // state for tracking selected standard chat

    // New Active Chat States
    const [isChatSearching, setIsChatSearching] = useState(false);
    const [chatSearchTerm, setChatSearchTerm] = useState('');
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
    const [showActiveChatMenu, setShowActiveChatMenu] = useState(false);

    // Long press logic
    const longPressTimeoutRef = React.useRef(null);
    const longPressTriggeredRef = React.useRef(false);

    const handleMessagePointerDown = (msgId) => {
        longPressTriggeredRef.current = false;
        longPressTimeoutRef.current = setTimeout(() => {
            longPressTriggeredRef.current = true;
            handleToggleMessageSelection(msgId);
        }, 500); // 500ms long press to select
    };

    const handleMessagePointerUp = () => {
        if (longPressTimeoutRef.current) clearTimeout(longPressTimeoutRef.current);
    };

    const handleToggleMessageSelection = (msgId) => {
        if (selectedMessages.includes(msgId)) {
            setSelectedMessages(prev => prev.filter(id => id !== msgId));
        } else {
            setSelectedMessages(prev => [...prev, msgId]);
        }
    };

    const handleDeleteSelectedMessages = () => {
        // Logic to delete messages from mockChatMessages would go here
        setSelectedMessages([]);
        setShowDeleteMessageModal(false);
    };

    const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
    const handleDeleteChat = () => {
        // Mock logic to delete the entire active chat
        setShowDeleteChatModal(false);
        setActiveChat(null);
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ?
                <span key={index} style={{ backgroundColor: '#bfdbfe', color: '#1e3a8a', padding: '0 2px', borderRadius: '4px' }}>{part}</span> : part
        );
    };

    const activeChatMenuRef = React.useRef(null);
    const menuRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowNewMenu(false);
            }
            if (activeChatMenuRef.current && !activeChatMenuRef.current.contains(event.target)) {
                setShowActiveChatMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Derived logic for lists and badges
    const unreadCount = mockConversations.filter(c => c.unread > 0 && !c.isSpam && !c.isArchived).length;
    const spamCount = mockConversations.filter(c => c.isSpam && c.unread > 0).length;
    const groupCount = mockConversations.filter(c => c.isGroup && c.unread > 0).length;
    const commCount = mockConversations.filter(c => c.isCommunity && c.unread > 0).length;

    const filteredConversations = mockConversations.filter(convo => {
        switch (activeFilter) {
            case 'Todas': return !convo.isSpam && !convo.isArchived;
            case 'Não lidas': return convo.unread > 0 && !convo.isSpam;
            case 'Arquivadas': return convo.isArchived;
            case 'Spam': return convo.isSpam;
            case 'Favoritos': return convo.isFavorite; // mock data doesn't have favs yet but logic applies
            case 'Amigos': return convo.isFriend;
            case 'Grupos': return convo.isGroup;
            case 'Comunidades': return convo.isCommunity;
            case 'Histórias': return convo.hasStory;
            default: return true;
        }
    });

    const getBadge = (count) => count > 0 ? <span className="filter-badge">{count}</span> : null;

    return (
        <div className="messages-layout premium-redesign">
            <DesktopSidebar />
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <div className="messages-content-wrapper">

                {/* =========================================
                    COLUMN 1: CHAT LIST
                ========================================= */}
                <div className={`messages-list-column ${activeChat ? 'hide-on-mobile' : ''}`}>
                    <header className="messages-main-header">
                        <div className="header-brand">
                            <button className="messages-logo-btn mobile-only" onClick={() => navigate('/home')} aria-label="Home">
                                <img src={gotourLogo} alt="GoTour" className="messages-header-logo" />
                            </button>
                            <h1 className="messages-list-title">Mensagens</h1>
                        </div>
                        <div className="header-actions">
                            <button className="transparent-icon-btn" aria-label="Menu" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                                <Menu size={24} />
                            </button>
                        </div>
                    </header>

                    {/* Premium Search */}
                    <div className="messages-search-container">
                        <div className="search-row-layout">
                            <div className="search-input-wrapper flex-auto">
                                <Search size={18} className="search-icon" />
                                <input type="text" placeholder="Pesquisar..." className="premium-search-input" />
                            </div>

                            <button className="transparent-icon-btn more-options-btn" onClick={() => setShowNewMenu(!showNewMenu)} aria-label="Mais opções">
                                <MoreVertical size={24} />
                            </button>
                        </div>

                        {/* More Menu Dropdown logic from the old header */}
                        {showNewMenu && (
                            <div className="messages-new-dropdown left-aligned premium-dropdown" ref={menuRef}>
                                <div className="dropdown-section">
                                    <span className="dropdown-label">Ações de Conversa</span>
                                    <button onClick={() => setShowNewMenu(false)}><MessageSquare size={16} color="#475569" /> Nova mensagem</button>
                                    <button onClick={() => setShowNewMenu(false)}><Users size={16} color="#475569" /> Criar Grupo</button>
                                    <button onClick={() => setShowNewMenu(false)}><Globe size={16} color="#475569" /> Criar Comunidade</button>
                                </div>
                                <div className="menu-divider" />
                                <div className="dropdown-section">
                                    <span className="dropdown-label">Organização</span>
                                    <button onClick={() => setShowNewMenu(false)}><CheckCheck size={16} color="#475569" /> Marcar lidas</button>
                                    <button onClick={() => setShowNewMenu(false)}><Archive size={16} color="#475569" /> Arquivadas</button>
                                </div>
                                <div className="menu-divider" />
                                <div className="dropdown-section">
                                    <span className="dropdown-label">Conta & Preferências</span>
                                    <button onClick={() => { setShowNewMenu(false); navigate('/profile'); }}><UserCircle size={16} color="#475569" /> Meu Perfil</button>
                                    <button onClick={() => { setShowNewMenu(false); navigate('/settings'); }}><Shield size={16} color="#475569" /> Privacidade</button>
                                    <button onClick={() => { setShowNewMenu(false); navigate('/settings'); }}><Moon size={16} color="#475569" /> Tema Escuro</button>
                                    <button onClick={() => { setShowNewMenu(false); navigate('/settings'); }}><Settings size={16} color="#475569" /> Todas as Definições</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filters Scroll */}
                    <div className="messages-filters-scroll">
                        {['Todas', 'Não lidas', 'Arquivadas', 'Favoritos', 'Histórias', 'Grupos', 'Comunidades'].map(f => (
                            <button
                                key={f}
                                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                                {f === 'Não lidas' && getBadge(unreadCount)}
                                {f === 'Grupos' && getBadge(groupCount)}
                                {f === 'Comunidades' && getBadge(commCount)}
                            </button>
                        ))}
                    </div>

                    {/* Conversation List */}
                    <div className="conversations-list premium-scroll">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map((convo) => (
                                <button
                                    key={convo.id}
                                    className={`conversation-item premium ${activeChat?.id === convo.id ? 'active-chat' : ''}`}
                                    onClick={() => {
                                        // Deselect mode if a new chat is opened
                                        if (!convo.isGroup && !convo.isCommunity) {
                                            setActiveChat(convo);
                                            setSelectedMessages([]);
                                            setIsChatSearching(false);
                                            setChatSearchTerm('');
                                        }
                                    }}
                                >
                                    <div className="conversation-avatar">
                                        {convo.avatar ? <img src={convo.avatar} alt={convo.name} /> : <User size={26} color="#94a3b8" />}
                                        {convo.online && <div className="online-indicator"></div>}
                                    </div>
                                    <div className="conversation-content">
                                        <div className="conversation-header-row">
                                            <span className="conversation-name">{convo.name}</span>
                                            <span className="conversation-time">{convo.time}</span>
                                        </div>
                                        <div className="conversation-preview-row">
                                            <span className={`conversation-preview ${convo.unread > 0 ? 'is-unread' : ''}`}>
                                                {convo.lastMessage}
                                            </span>
                                            <div className="conversation-status-area">
                                                {convo.unread > 0 ? (
                                                    <span className="conversation-badge">{convo.unread}</span>
                                                ) : convo.sentStatus === 'read' ? (
                                                    <CheckCheck size={16} className="status-read" />
                                                ) : convo.sentStatus === 'delivered' ? (
                                                    <CheckCheck size={16} className="status-delivered" />
                                                ) : convo.sentStatus === 'sent' ? (
                                                    <Check size={16} className="status-sent" />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="empty-filter-state">
                                <MessageSquare size={48} color="#cbd5e1" />
                                <p>Nenhuma mensagem encontrada nesta secção.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* =========================================
                    COLUMN 2: ACTIVE CHAT AREA 
                ========================================= */}
                {activeChat && (
                    <div className="messages-active-chat-column">
                        <header className="active-chat-header premium-shadow">

                            {/* Selection Mode Header */}
                            {selectedMessages.length > 0 ? (
                                <div className="active-chat-selection-mode">
                                    <div className="selection-info">
                                        <button className="clear-icon-btn" onClick={() => setSelectedMessages([])}>
                                            <Square size={22} color="#0f172a" />
                                        </button>
                                        <span className="selection-count">{selectedMessages.length} selecionada(s)</span>
                                    </div>
                                    <button className="delete-selection-btn" onClick={() => setShowDeleteMessageModal(true)}>
                                        <Trash2 size={22} color="#ef4444" />
                                    </button>
                                </div>
                            ) : isChatSearching ? (
                                <div className="active-chat-search-mode">
                                    <button className="clear-icon-btn" onClick={() => { setIsChatSearching(false); setChatSearchTerm(''); }}>
                                        <ArrowLeft size={22} color="#64748b" />
                                    </button>
                                    <div className="chat-search-input-wrapper">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar na conversa..."
                                            value={chatSearchTerm}
                                            onChange={(e) => setChatSearchTerm(e.target.value)}
                                            autoFocus
                                        />
                                        {chatSearchTerm && (
                                            <button className="clear-icon-btn" onClick={() => setChatSearchTerm('')}>
                                                <X size={18} color="#94a3b8" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="active-chat-user-info">
                                        <button className="mobile-only back-to-list-btn" onClick={() => setActiveChat(null)}>
                                            <ArrowLeft size={24} color="#0f172a" />
                                        </button>
                                        <div
                                            className="chat-header-avatar profile-avatar-clickable"
                                            onClick={() => navigate('/user/1')}
                                        >
                                            {activeChat.avatar ? <img src={activeChat.avatar} alt={activeChat.name} /> : <User size={24} color="#94a3b8" />}
                                            {activeChat.online && <div className="online-indicator"></div>}
                                        </div>
                                        <div className="chat-header-details">
                                            <h2>{activeChat.name}</h2>
                                            <span>{activeChat.online ? 'Online agora' : `Visto às ${activeChat.time}`}</span>
                                        </div>
                                    </div>
                                    <div className="active-chat-actions" style={{ position: 'relative' }}>
                                        <button className="clear-icon-btn"><Phone size={22} color="#0d9488" /></button>
                                        <button className="clear-icon-btn"><Video size={22} color="#0d9488" /></button>
                                        <div className="header-divider" />
                                        <button className="clear-icon-btn" onClick={() => setIsChatSearching(true)}><Search size={22} color="#64748b" /></button>
                                        <button className="clear-icon-btn" onClick={() => setShowActiveChatMenu(!showActiveChatMenu)}><MoreVertical size={22} color="#64748b" /></button>

                                        {/* Dropdown Menu inside Active Chat */}
                                        {showActiveChatMenu && (
                                            <div className="messages-new-dropdown right-aligned premium-dropdown" ref={activeChatMenuRef}>
                                                <div className="dropdown-section">
                                                    <button onClick={() => { setShowActiveChatMenu(false); navigate('/user/1'); }}><User size={16} color="#475569" /> Ver perfil</button>
                                                    <button onClick={() => setShowActiveChatMenu(false)}><Pin size={16} color="#475569" /> Fixar conversa</button>
                                                    <button onClick={() => { setShowActiveChatMenu(false); setIsChatSearching(true); }}><Search size={16} color="#475569" /> Pesquisar na conversa</button>
                                                </div>
                                                <div className="menu-divider" />
                                                <div className="dropdown-section">
                                                    <button onClick={() => setShowActiveChatMenu(false)}><BellOff size={16} color="#475569" /> Silenciar</button>
                                                </div>
                                                <div className="menu-divider" />
                                                <div className="dropdown-section">
                                                    <button onClick={() => { setShowActiveChatMenu(false); setShowDeleteChatModal(true); }} className="danger-text"><Trash2 size={16} color="#ef4444" /> Apagar conversa</button>
                                                    <button onClick={() => setShowActiveChatMenu(false)} className="danger-text"><Ban size={16} color="#ef4444" /> Bloquear</button>
                                                    <button onClick={() => setShowActiveChatMenu(false)} className="danger-text"><AlertCircle size={16} color="#ef4444" /> Denunciar</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </header>

                        <div className="active-chat-scroll premium-scroll">
                            {mockChatMessages.map((msg, idx) => {
                                const isSelected = selectedMessages.includes(msg.id);
                                return (
                                    <React.Fragment key={msg.id}>
                                        {msg.date && <div className="chat-date-separator"><span>{msg.date}</span></div>}
                                        <div
                                            className={`chat-bubble-wrapper ${msg.sender === 'me' ? 'is-me' : 'is-them'} ${isSelected ? 'is-selected' : ''}`}
                                            onMouseDown={() => handleMessagePointerDown(msg.id)}
                                            onMouseUp={handleMessagePointerUp}
                                            onMouseLeave={handleMessagePointerUp}
                                            onTouchStart={() => handleMessagePointerDown(msg.id)}
                                            onTouchEnd={handleMessagePointerUp}
                                            onClick={() => {
                                                // Ignore this click if it was the release of a long press
                                                if (longPressTriggeredRef.current) {
                                                    longPressTriggeredRef.current = false; // Reset
                                                    return;
                                                }
                                                // If we are already in selection mode, click to toggle.
                                                if (selectedMessages.length > 0) {
                                                    handleToggleMessageSelection(msg.id);
                                                }
                                            }}
                                        >
                                            {/* Avatar for incoming messages */}
                                            {msg.sender !== 'me' && (
                                                <div className="chat-bubble-avatar">
                                                    {activeChat.avatar ? <img src={activeChat.avatar} alt="Avatar" /> : <User size={16} color="#94a3b8" />}
                                                </div>
                                            )}

                                            <div className="chat-bubble">
                                                <p>{highlightText(msg.text, chatSearchTerm)}</p>
                                                <div className="bubble-meta">
                                                    <span className="bubble-time">{msg.time}</span>
                                                    {msg.sender === 'me' && msg.status === 'read' && <CheckCheck size={14} className="status-read" />}
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <footer className="active-chat-input-area">
                            <button className="input-action-btn"><Plus size={24} color="#64748b" /></button>
                            <button className="input-action-btn"><ImageIcon size={24} color="#64748b" /></button>

                            <div className="premium-input-box">
                                <input type="text" placeholder="Escreva uma mensagem..." />
                                <button className="input-inner-btn"><Smile size={20} color="#94a3b8" /></button>
                            </div>

                            <button className="input-action-btn primary"><Send size={22} color="#ffffff" /></button>
                        </footer>
                    </div>
                )}
            </div>

            {/* Gemini FAB - Hide on mobile when chat is active */}
            {!activeChat && (
                <button className="gemini-fab" aria-label="Sasha IA">
                    <GeminiIcon size={28} />
                </button>
            )}

            {/* Mobile Nav Overlay - Hide when chat is active */}
            {!activeChat && <BottomNavBar />}

            {/* Custom Delete Message Modal */}
            {showDeleteMessageModal && (
                <div className="messages-modal-overlay">
                    <div className="messages-modal-card">
                        <div className="modal-icon-wrapper danger">
                            <Trash2 size={24} color="#ef4444" />
                        </div>
                        <h3>Apagar Mensagem</h3>
                        <p>Tem a certeza que quer apagar permanentemente {selectedMessages.length} mensagem(s)? Esta ação não pode ser desfeita.</p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowDeleteMessageModal(false)}>Cancelar</button>
                            <button className="btn-danger" onClick={handleDeleteSelectedMessages}>Deletar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Delete Chat Modal */}
            {showDeleteChatModal && (
                <div className="messages-modal-overlay">
                    <div className="messages-modal-card">
                        <div className="modal-icon-wrapper danger">
                            <Trash2 size={24} color="#ef4444" />
                        </div>
                        <h3>Apagar Conversa</h3>
                        <p>Tem a certeza que quer apagar permanentemente toda a conversa com <strong>{activeChat?.name}</strong>? Esta ação não pode ser desfeita.</p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowDeleteChatModal(false)}>Cancelar</button>
                            <button className="btn-danger" onClick={handleDeleteChat}>Deletar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesScreen;
