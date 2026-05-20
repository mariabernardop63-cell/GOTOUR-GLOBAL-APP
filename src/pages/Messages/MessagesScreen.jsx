import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, MessageSquare, MoreVertical,
    Settings, Archive, User,
    Users, Search,
    Phone, Video,
    ListFilter,
    MessageSquarePlus,
    X
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import ChatInputBar from '../../components/ChatInputBar/ChatInputBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import { useNavigation } from '../../App';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './MessagesScreenStyles.css';

// Mock data — conversations
const mockConversations = [
    {
        id: 'gotour-welcome',
        name: 'Equipe GoTour',
        avatar: gotourLogo,
        lastMessage: 'Estamos • Maputo',
        location: '🇲🇿 Maputo',
        time: '14:10',
        unread: 1,
        online: true,
        lastSeen: 'Online',
        sentStatus: 'none',
        isFriend: true,
        verified: true,
        isArchived: false
    },
    {
        id: 'ana-silva',
        name: 'Ana Silva',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        lastMessage: 'Acho que Tóquio é a melhor escolha para a nossa próxima aventura em grupo!',
        location: '🇯🇵 Tóquio',
        time: '14:20',
        unread: 0,
        online: false,
        lastSeen: 'Há 3h',
        sentStatus: 'read',
        isFriend: true,
        verified: true,
        isArchived: false
    },
    {
        id: 'ana-sofia',
        name: 'Ana Sofia',
        avatar: 'https://i.pravatar.cc/150?u=as001',
        lastMessage: 'Olá! Como estás? Posso te fazer uma pergunta?',
        location: '🇲🇿 Maputo',
        time: '12:45',
        unread: 3,
        online: true,
        sentStatus: 'none',
        isFriend: true,
        isArchived: false
    },
    {
        id: 'vinicius-grego',
        name: 'Vinícius Grego',
        avatar: 'https://i.pravatar.cc/150?u=vg001',
        lastMessage: 'Já reservaste o hotel para Tóquio? Vi um muito bom perto de Shibuya.',
        location: '🇯🇵 Tóquio',
        time: '14:05',
        unread: 0,
        online: false,
        lastSeen: 'Há 3h',
        sentStatus: 'read',
        isFriend: true,
        verified: true,
        isArchived: false
    },
    {
        id: 'comm-1',
        name: 'Mochileiros MZ',
        avatar: null,
        lastMessage: 'Cape Town • Maputo',
        location: '🇲🇿 Maputo',
        time: '09:16',
        unread: 2,
        online: false,
        lastSeen: '12:00',
        isCommunity: true,
        isArchived: false
    },
    {
        id: 'grupo-viagem',
        name: 'Viagem Japão 2026',
        avatar: null,
        lastMessage: 'Tóquio',
        location: '🇯🇵 Tóquio',
        time: '',
        unread: 5,
        online: false,
        lastSeen: 'Ontem',
        sentStatus: 'none',
        isGroup: true,
        isArchived: false
    },
    {
        id: 'felipe-costa',
        name: 'Felipe Costa',
        avatar: 'https://i.pravatar.cc/150?u=fc001',
        lastMessage: 'Sarajevo',
        location: '🇧🇦 Sarajevo',
        time: '23 Apr',
        unread: 0,
        online: false,
        lastSeen: '23 Apr',
        sentStatus: 'read',
        isFriend: true,
        isArchived: false
    }
];

const initialChatMessages = [
    {
        id: 1, sender: 'contact', senderName: 'GoTour',
        text: 'Bem-vindo ao GoTour! 🌍 Estamos felizes em ter você conosco.',
        time: '23:30',
    },
    {
        id: 2, sender: 'contact', senderName: 'GoTour',
        text: 'Explore destinos incríveis, compartilhe suas experiências e conecte-se com outros viajantes ao redor do mundo. ✈️',
        time: '23:30',
    },
    {
        id: 3, sender: 'contact', senderName: 'GoTour',
        text: 'Se precisar de ajuda, estamos aqui! Basta nos enviar uma mensagem. 😊',
        time: '23:31',
    },
];

const MessagesScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { navigateBack, setModalBackground } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [conversations, setConversations] = useState(mockConversations);
    const [messages, setMessages] = useState(initialChatMessages);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [selectedMessageIds, setSelectedMessageIds] = useState([]);
    const [currentTab, setCurrentTab] = useState('mensagens');
    const [toastMessage, setToastMessage] = useState('');
    
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const moreMenuRef = useRef(null);
    const pressTimer = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (activeChat) scrollToBottom();
    }, [messages, activeChat]);

    // Click outside handler for the more menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setShowMoreMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMessageSelection = (id) => {
        setSelectedMessageIds(prev => 
            prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
        );
    };

    const handleConvoClick = (convo) => {
        setActiveChat(convo);
    };

    // Long press logic for archiving/unarchiving conversations (3 seconds)
    const startPress = (convoId) => {
        pressTimer.current = setTimeout(() => {
            toggleArchiveConvo(convoId);
        }, 3000);
    };

    const endPress = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
        }
    };

    const toggleArchiveConvo = (convoId) => {
        let msg = "";
        setConversations(prev => prev.map(c => {
            if (c.id === convoId) {
                const newArchived = !c.isArchived;
                msg = newArchived ? "Conversa arquivada!" : "Conversa desarquivada!";
                return { ...c, isArchived: newArchived };
            }
            return c;
        }));
        if (msg) {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(''), 2500);
        }
        if (activeChat?.id === convoId) {
            setActiveChat(null);
        }
    };

    // Filter conversations based on current active tab
    const filteredConversations = conversations.filter(convo => {
        if (currentTab === 'arquivadas') {
            return convo.isArchived;
        } else if (currentTab === 'mensagens') {
            return !convo.isArchived;
        } else if (currentTab === 'comunidades') {
            return convo.isCommunity || convo.isGroup;
        }
        return true;
    });

    return (
        <div className="messages-ws-layout">
            {toastMessage && (
                <div className="ws-toast">
                    {toastMessage}
                </div>
            )}

            <div className="ws-window">
                {/* --- A. LEFT SIDEBAR --- */}
                <aside className="ws-sidebar">
                    <div className="ws-logo-container" style={{ justifyContent: 'flex-start' }}>
                        <button 
                            onClick={() => navigate('/home')} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E293B' }}
                            aria-label="Voltar para Home"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="ws-nav">
                        <button 
                            className={`ws-nav-item ${currentTab === 'mensagens' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('mensagens')}
                        >
                            <MessageSquare size={20} />
                            <span>Mensagens</span>
                        </button>
                        <button 
                            className={`ws-nav-item ${currentTab === 'comunidades' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('comunidades')}
                        >
                            <Users size={20} />
                            <span>Comunidades</span>
                        </button>
                        <button 
                            className={`ws-nav-item ${currentTab === 'arquivadas' ? 'active' : ''}`}
                            onClick={() => setCurrentTab('arquivadas')}
                        >
                            <Archive size={20} />
                            <span>Arquivadas</span>
                        </button>
                    </nav>

                    <div className="ws-nav-bottom">
                        <button className="ws-nav-item" onClick={() => navigate('/settings')}>
                            <Settings size={20} />
                            <span>Definições</span>
                        </button>
                    </div>
                </aside>

                {/* --- B. CENTER PANEL (Activities & Chats) --- */}
                <div className={`ws-center-panel ${activeChat ? 'hidden-on-mobile' : ''}`}>
                    <div className="ws-center-header">
                        <div className="ws-search-bar">
                            <Search size={16} color="#94A3B8" />
                            <input type="text" placeholder="Search anything" />
                        </div>
                    </div>

                    <div className="ws-chat-list-container">
                        <div className="ws-list-label">conversas</div>
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map((convo) => (
                                <button
                                    key={convo.id}
                                    className={`ws-chat-item ${activeChat?.id === convo.id ? 'active' : ''}`}
                                    onClick={() => handleConvoClick(convo)}
                                    onPointerDown={() => startPress(convo.id)}
                                    onPointerUp={endPress}
                                    onPointerLeave={endPress}
                                >
                                    <div className="ws-chat-item-avatar">
                                        {convo.avatar ? <img src={convo.avatar} alt={convo.name} /> : <User size={24} color="#94a3b8" />}
                                        {convo.online && <div className="online-dot"></div>}
                                    </div>
                                    <div className="ws-chat-item-content">
                                        <div className="ws-chat-item-top">
                                            <span className="ws-chat-item-name">{convo.name}</span>
                                            <span className="ws-chat-item-time">{convo.time}</span>
                                        </div>
                                        <div className="ws-chat-item-bottom">
                                            <span className="ws-chat-item-msg">{convo.lastMessage}</span>
                                            {convo.unread > 0 && <span className="ws-chat-item-badge">{convo.unread}</span>}
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94A3B8', fontSize: '13px' }}>
                                Nenhuma conversa encontrada
                            </div>
                        )}
                    </div>
                </div>

                {/* --- C. RIGHT PANEL (Chat Window) --- */}
                <div className={`ws-right-panel ${!activeChat ? 'hidden-on-mobile' : ''}`}>
                    {activeChat ? (
                        <>
                            <header className="ws-chat-header">
                                <div className="ws-chat-header-user">
                                    <button 
                                        onClick={() => setActiveChat(null)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '8px', display: 'flex', alignItems: 'center' }}
                                        className="ws-mobile-back"
                                    >
                                        <ArrowLeft size={24} color="#1E293B" />
                                    </button>
                                    <div className="ws-chat-item-avatar">
                                        {activeChat.avatar ? <img src={activeChat.avatar} alt={activeChat.name} /> : <User size={44} color="#94a3b8" />}
                                        {activeChat.online && <div className="online-dot"></div>}
                                    </div>
                                    <div className="ws-chat-header-info">
                                        <span className="ws-chat-header-name">{activeChat.name}</span>
                                        <span className="ws-chat-header-status">{activeChat.lastSeen || 'Offline'}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="ws-chat-header-actions" ref={moreMenuRef}>
                                        <button><Phone size={20} /></button>
                                        <button><Video size={20} /></button>
                                        <button onClick={() => setShowMoreMenu(!showMoreMenu)}><MoreVertical size={20} /></button>
                                    </div>
                                    <div className="ws-top-right-icons">
                                        <button 
                                            onClick={() => {
                                                setModalBackground(location);
                                                navigate('/profile');
                                            }}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                        >
                                            <User size={24} strokeWidth={2} color="#475569" />
                                        </button>
                                        <button 
                                            onClick={() => setIsDrawerOpen(true)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                        >
                                            <ListFilter size={24} strokeWidth={2.5} color="#0e172a" />
                                        </button>
                                    </div>
                                </div>
                            </header>

                            <div className="ws-chat-messages" ref={messagesContainerRef}>
                                <div className="ws-message-date">Hoje</div>
                                {messages.map((msg) => (
                                    <div 
                                        key={msg.id} 
                                        className={`ws-message-row ${msg.sender === 'user' ? 'sent' : 'received'}`}
                                        onClick={() => toggleMessageSelection(msg.id)}
                                    >
                                        <div className="ws-message-bubble">
                                            {msg.text}
                                        </div>
                                        <span className="ws-message-meta">{msg.time}</span>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="ws-chat-input-area">
                                <ChatInputBar 
                                    onSendMessage={(text) => {
                                        setMessages([...messages, {
                                            id: Date.now(), sender: 'user', senderName: 'Eu', text: text,
                                            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                        }]);
                                    }}
                                    onSendImage={(photoSrc, text) => {
                                        setMessages([...messages, {
                                            id: Date.now(), sender: 'user', senderName: 'Eu', text: text ? `📷 ${text}` : '📷 Imagem enviada',
                                            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                        }]);
                                    }}
                                    onSendAudio={(audioSrc, duration) => {
                                        setMessages([...messages, {
                                            id: Date.now(), sender: 'user', senderName: 'Eu', text: `🎤 Áudio (${duration}s)`,
                                            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                        }]);
                                    }}
                                    onSendLocation={(lat, lng) => {
                                        setMessages([...messages, {
                                            id: Date.now(), sender: 'user', senderName: 'Eu', text: '📍 Localização partilhada',
                                            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                        }]);
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="ws-empty-chat">
                            <div className="ws-top-right-icons" style={{ position: 'absolute', top: 24, right: 32, display: 'flex' }}>
                                <button 
                                    onClick={() => {
                                        setModalBackground(location);
                                        navigate('/profile');
                                    }}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                >
                                    <User size={24} strokeWidth={2} color="#475569" />
                                </button>
                                <button 
                                    onClick={() => setIsDrawerOpen(true)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                >
                                    <ListFilter size={24} strokeWidth={2.5} color="#0e172a" />
                                </button>
                            </div>
                            <MessageSquare size={64} color="#E2E8F0" />
                            <h2 style={{ marginTop: '16px', color: '#94A3B8', fontWeight: 500, fontSize: '16px' }}>Selecione uma conversa</h2>
                        </div>
                    )}
                </div>
            </div>
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <BottomNavBar />
        </div>
    );
};

export default MessagesScreen;
