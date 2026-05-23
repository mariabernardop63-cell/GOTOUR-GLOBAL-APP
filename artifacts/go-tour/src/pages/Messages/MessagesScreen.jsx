import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, MessageSquare, MoreVertical,
    Settings, Archive, User,
    Users, Search, Send,
    Phone, Video,
    ListFilter,
    X, Check, CheckCheck
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { messagesService } from '../../lib/messagesService';
import { supabase } from '../../lib/supabase';
import './MessagesScreenStyles.css';

function formatTime(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Agora';
    if (diffMin < 60) return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'Ontem';
    if (diffD < 7) return d.toLocaleDateString('pt-PT', { weekday: 'short' });
    return d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
}

const AvatarDisplay = ({ src, name, size = 40, online = false }) => {
    const initials = (name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    return (
        <div className="ws-chat-item-avatar" style={{ width: size, height: size, flexShrink: 0 }}>
            {src
                ? <img src={src} alt={name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: size * 0.35 }}>{initials}</div>
            }
            {online && <div className="online-dot" />}
        </div>
    );
};

const SetupNeededBanner = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
        <MessageSquare size={56} color="#E2E8F0" />
        <h3 style={{ color: '#1e293b', fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Configuração necessária</h3>
        <p style={{ color: '#64748b', fontSize: 14, maxWidth: 320, lineHeight: 1.6 }}>
            Para activar o sistema de mensagens, precisa de correr o ficheiro <strong>supabase_migration.sql</strong> no seu dashboard do Supabase (SQL Editor).
        </p>
    </div>
);

const MessagesScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground } = useNavigation();
    const { user: authUser } = useAuth();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tablesExist, setTablesExist] = useState(true);
    const [activeConvo, setActiveConvo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isOtherTyping, setIsOtherTyping] = useState(false);
    const [isOtherOnline, setIsOtherOnline] = useState(false);
    const [currentTab, setCurrentTab] = useState('mensagens');
    const [searchQuery, setSearchQuery] = useState('');

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const realtimeChannelRef = useRef(null);
    const presenceChannelRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const isSendingRef = useRef(false);

    const loadConversations = useCallback(async () => {
        if (!authUser?.id) return;
        try {
            setIsLoading(true);
            const data = await messagesService.getConversations(authUser.id);
            setConversations(data);
            setTablesExist(true);
        } catch (err) {
            if (err?.code === '42P01' || err?.message?.includes('does not exist')) {
                setTablesExist(false);
            }
            console.error('Error loading conversations:', err);
        } finally {
            setIsLoading(false);
        }
    }, [authUser?.id]);

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    // Handle navigation state: open conversation with a specific user
    useEffect(() => {
        const state = location.state;
        if (!state?.openWithUserId || !authUser?.id) return;
        (async () => {
            try {
                const convoId = await messagesService.getOrCreateConversation(state.openWithUserId);
                await loadConversations();
                const partner = state.openWithUser || { id: state.openWithUserId };
                openConversation({ id: convoId, partner, lastMessage: null });
            } catch (err) {
                console.error('Error opening conversation with user:', err);
            }
        })();
    }, [location.state, authUser?.id]);

    const openConversation = useCallback(async (convo) => {
        setActiveConvo(convo);
        setIsLoadingMessages(true);
        setMessages([]);

        // Unsubscribe previous channels
        if (realtimeChannelRef.current) {
            supabase.removeChannel(realtimeChannelRef.current);
            realtimeChannelRef.current = null;
        }
        if (presenceChannelRef.current) {
            supabase.removeChannel(presenceChannelRef.current);
            presenceChannelRef.current = null;
        }

        try {
            const msgs = await messagesService.getMessages(convo.id);
            setMessages(msgs);
            await messagesService.markAsRead(convo.id, authUser.id);

            // Update unread count in list
            setConversations(prev => prev.map(c => c.id === convo.id ? { ...c, _unread: 0 } : c));
        } catch (err) {
            console.error('Error loading messages:', err);
        } finally {
            setIsLoadingMessages(false);
        }

        // Subscribe to new messages
        realtimeChannelRef.current = messagesService.subscribeToMessages(
            convo.id,
            authUser.id,
            (newMsg) => {
                setMessages(prev => {
                    if (prev.some(m => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
                if (newMsg.sender_id !== authUser.id) {
                    messagesService.markAsRead(convo.id, authUser.id);
                }
                setConversations(prev => prev.map(c =>
                    c.id === convo.id
                        ? { ...c, lastMessage: newMsg.content, lastMessageAt: newMsg.created_at }
                        : c
                ));
            }
        );

        // Subscribe to presence/typing
        presenceChannelRef.current = messagesService.subscribeToPresence(
            convo.id,
            authUser.id,
            ({ isOnline, isTyping }) => {
                setIsOtherOnline(isOnline);
                setIsOtherTyping(isTyping);
            }
        );

        setTimeout(() => inputRef.current?.focus(), 100);
    }, [authUser?.id]);

    const handleSendMessage = useCallback(async (text) => {
        if (!text.trim() || !activeConvo || isSendingRef.current || !authUser?.id) return;
        isSendingRef.current = true;
        setIsSending(true);

        const trimmed = text.trim();
        setMessageInput('');

        // Stop typing
        clearTimeout(typingTimeoutRef.current);
        presenceChannelRef.current?.track({ typing: false, online_at: new Date().toISOString() });

        // Optimistic insert
        const tempId = `temp-${Date.now()}`;
        const tempMsg = {
            id: tempId,
            conversation_id: activeConvo.id,
            sender_id: authUser.id,
            content: trimmed,
            type: 'text',
            created_at: new Date().toISOString(),
            sender: null,
            _pending: true,
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const sent = await messagesService.sendMessage(activeConvo.id, authUser.id, trimmed);
            setMessages(prev => prev.map(m => m.id === tempId ? { ...sent, _pending: false } : m));
            setConversations(prev => {
                const updated = prev.map(c =>
                    c.id === activeConvo.id
                        ? { ...c, lastMessage: trimmed, lastMessageAt: sent.created_at }
                        : c
                );
                // Sort by most recent
                return [...updated].sort((a, b) =>
                    new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0)
                );
            });
        } catch (err) {
            console.error('Send error:', err);
            setMessages(prev => prev.filter(m => m.id !== tempId));
        } finally {
            isSendingRef.current = false;
            setIsSending(false);
        }
    }, [activeConvo, authUser?.id]);

    const handleTyping = useCallback((value) => {
        setMessageInput(value);
        if (presenceChannelRef.current) {
            presenceChannelRef.current.track({ typing: true, online_at: new Date().toISOString() });
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                presenceChannelRef.current?.track({ typing: false, online_at: new Date().toISOString() });
            }, 2000);
        }
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(messageInput);
        }
    }, [handleSendMessage, messageInput]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        return () => {
            if (realtimeChannelRef.current) supabase.removeChannel(realtimeChannelRef.current);
            if (presenceChannelRef.current) supabase.removeChannel(presenceChannelRef.current);
            clearTimeout(typingTimeoutRef.current);
        };
    }, []);

    const filteredConversations = conversations.filter(c => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (c.partner?.name || '').toLowerCase().includes(q) ||
            (c.partner?.username || '').toLowerCase().includes(q);
    });

    const partnerName = activeConvo?.partner?.name || 'Utilizador';
    const partnerAvatar = activeConvo?.partner?.avatar_url || null;

    return (
        <div className="messages-ws-layout">
            <div className="ws-window">

                {/* ── A. LEFT SIDEBAR ── */}
                <aside className="ws-sidebar">
                    <div className="ws-logo-container" style={{ justifyContent: 'flex-start' }}>
                        <button
                            onClick={() => {
                                if (setModalBackground) setModalBackground(null);
                                navigate(-1);
                            }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#1E293B' }}
                            aria-label="Voltar"
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

                {/* ── B. CENTER PANEL ── */}
                <div className={`ws-center-panel ${activeConvo ? 'hidden-on-mobile' : ''}`}>
                    <div className="ws-center-header">
                        <div className="ws-search-bar">
                            <Search size={16} color="#94A3B8" />
                            <input
                                type="text"
                                placeholder="Pesquisar conversas"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ws-chat-list-container">
                        <div className="ws-list-label">conversas</div>

                        {!tablesExist ? (
                            <SetupNeededBanner />
                        ) : isLoading ? (
                            <div style={{ padding: '24px', color: '#94A3B8', fontSize: 13, textAlign: 'center' }}>
                                A carregar...
                            </div>
                        ) : filteredConversations.length === 0 ? (
                            <div style={{ padding: '32px 16px', color: '#94A3B8', fontSize: 13, textAlign: 'center' }}>
                                <MessageSquare size={36} color="#E2E8F0" style={{ marginBottom: 12 }} />
                                <p>Nenhuma conversa ainda.</p>
                                <p style={{ marginTop: 4 }}>Abre o perfil de alguém e clica em Mensagem.</p>
                            </div>
                        ) : (
                            filteredConversations.map((convo) => (
                                <button
                                    key={convo.id}
                                    className={`ws-chat-item ${activeConvo?.id === convo.id ? 'active' : ''}`}
                                    onClick={() => openConversation(convo)}
                                >
                                    <AvatarDisplay
                                        src={convo.partner?.avatar_url}
                                        name={convo.partner?.name}
                                        size={44}
                                        online={false}
                                    />
                                    <div className="ws-chat-item-content">
                                        <div className="ws-chat-item-top">
                                            <span className="ws-chat-item-name">
                                                {convo.partner?.name || 'Utilizador'}
                                            </span>
                                            <span className="ws-chat-item-time">
                                                {formatTime(convo.lastMessageAt)}
                                            </span>
                                        </div>
                                        <div className="ws-chat-item-bottom">
                                            <span className="ws-chat-item-msg">
                                                {convo.lastMessage || 'Sem mensagens ainda'}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* ── C. RIGHT PANEL (Chat Window) ── */}
                <div className={`ws-right-panel ${!activeConvo ? 'hidden-on-mobile' : ''}`}>
                    {activeConvo ? (
                        <>
                            <header className="ws-chat-header">
                                <div className="ws-chat-header-user">
                                    <button
                                        onClick={() => setActiveConvo(null)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '8px', display: 'flex', alignItems: 'center' }}
                                        className="ws-mobile-back"
                                    >
                                        <ArrowLeft size={24} color="#1E293B" />
                                    </button>
                                    <AvatarDisplay
                                        src={partnerAvatar}
                                        name={partnerName}
                                        size={40}
                                        online={isOtherOnline}
                                    />
                                    <div className="ws-chat-header-info">
                                        <span className="ws-chat-header-name">{partnerName}</span>
                                        <span className="ws-chat-header-status">
                                            {isOtherTyping
                                                ? <span style={{ color: '#6366f1', fontStyle: 'italic' }}>a escrever...</span>
                                                : isOtherOnline ? 'Online' : 'Offline'
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div className="ws-chat-header-actions">
                                        <button title="Chamada de voz"><Phone size={20} /></button>
                                        <button title="Chamada de vídeo"><Video size={20} /></button>
                                    </div>
                                    <div className="ws-top-right-icons">
                                        <button
                                            onClick={() => {
                                                setModalBackground(location);
                                                navigate('/profile', { state: { user: activeConvo.partner } });
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

                            <div className="ws-chat-messages">
                                {isLoadingMessages ? (
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: 14 }}>
                                        A carregar mensagens...
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', padding: 24, textAlign: 'center' }}>
                                        <MessageSquare size={48} color="#E2E8F0" />
                                        <p style={{ marginTop: 12, fontSize: 14 }}>Começa a conversa!</p>
                                    </div>
                                ) : (
                                    <>
                                        {messages.map((msg, idx) => {
                                            const isMine = msg.sender_id === authUser?.id;
                                            const prevMsg = messages[idx - 1];
                                            const showDate = !prevMsg ||
                                                new Date(msg.created_at).toDateString() !== new Date(prevMsg.created_at).toDateString();

                                            return (
                                                <React.Fragment key={msg.id}>
                                                    {showDate && (
                                                        <div className="ws-message-date">
                                                            {new Date(msg.created_at).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
                                                        </div>
                                                    )}
                                                    <div className={`ws-message-row ${isMine ? 'sent' : 'received'}`}>
                                                        <div className={`ws-message-bubble ${msg._pending ? 'pending' : ''}`}>
                                                            {msg.content}
                                                        </div>
                                                        <span className="ws-message-meta">
                                                            {formatTime(msg.created_at)}
                                                            {isMine && (
                                                                <span style={{ marginLeft: 4, color: msg._pending ? '#94A3B8' : '#6366f1' }}>
                                                                    {msg._pending ? <Check size={12} /> : <CheckCheck size={12} />}
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}
                                        {isOtherTyping && (
                                            <div className="ws-message-row received">
                                                <div className="ws-message-bubble ws-typing-indicator">
                                                    <span /><span /><span />
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>

                            <div className="ws-chat-input-area">
                                <div className="ws-input-row">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="ws-text-input"
                                        placeholder="Escreve uma mensagem..."
                                        value={messageInput}
                                        onChange={e => handleTyping(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isSending}
                                    />
                                    <button
                                        className={`ws-send-btn ${messageInput.trim() ? 'active' : ''}`}
                                        onClick={() => handleSendMessage(messageInput)}
                                        disabled={!messageInput.trim() || isSending}
                                        aria-label="Enviar"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
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
                            <h2 style={{ marginTop: '16px', color: '#94A3B8', fontWeight: 500, fontSize: '16px' }}>
                                Selecione uma conversa
                            </h2>
                            <p style={{ color: '#CBD5E1', fontSize: 13, marginTop: 6 }}>
                                Ou abre o perfil de alguém e clica em Mensagem
                            </p>
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
