import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, MoreVertical, Plus, Send, Mic, Phone, Menu,
    User, Ban, Flag, BellOff, Trash2, Lock,
    Eye, Gift, Image, Video, Smile, FileText,
    MapPin, ChevronDown
} from 'lucide-react';
import './ChatScreenStyles.css';

// Mock messages
const initialMessages = [
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

const ChatScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const contact = location.state?.contact;
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [showNewMsgBtn, setShowNewMsgBtn] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // Click Outside Logic
    const menuRef = React.useRef(null);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMoreMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const contactName = contact?.name || 'GoTour';
    const contactAvatar = contact?.avatar || null;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => { scrollToBottom(); }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMsg = {
            id: Date.now(), sender: 'user', senderName: 'EU',
            text: inputText, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMsg]);
        setInputText('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    // Detect scroll position for new message button
    const handleScroll = () => {
        const el = messagesContainerRef.current;
        if (!el) return;
        const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
        setShowNewMsgBtn(!isAtBottom && messages.length > 3);
    };

    return (
        <div className="chat-page">
            {/* HEADER */}
            <div className="chat-header">
                <div className="chat-header-left">
                    <button className="chat-back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="chat-contact-avatar">
                        {contactAvatar ? <img src={contactAvatar} alt={contactName} /> : <User size={22} color="#94a3b8" />}
                    </div>
                    <span className="chat-contact-name">{contactName}</span>
                </div>

                <div className="chat-header-actions">
                    <button className="chat-action-icon" aria-label="Menu">
                        <Menu size={22} color="#048c83" /> {/* Added Menu Icon with specific color */}
                    </button>
                    <button className="chat-action-icon" aria-label="Chamada de voz">
                        <Phone size={22} />
                    </button>
                    <button className="chat-action-icon" aria-label="Chamada de vídeo">
                        <Video size={22} />
                    </button>

                    <div className="chat-menu-container" ref={menuRef}>
                        <button className="chat-more-btn" onClick={() => setShowMoreMenu(!showMoreMenu)} aria-label="Mais">
                            <MoreVertical size={22} color="#048c83" />
                        </button>
                        {showMoreMenu && (
                            <div className="chat-more-menu">
                                <button onClick={() => setShowMoreMenu(false)}><Ban size={18} color="#048c83" /> Bloquear utilizador</button>
                                <button className="destructive" onClick={() => setShowMoreMenu(false)}><Flag size={18} /> Denunciar</button>
                                <button onClick={() => setShowMoreMenu(false)}><BellOff size={18} color="#048c83" /> Silenciar notificações</button>
                                <button onClick={() => setShowMoreMenu(false)}><Trash2 size={18} color="#048c83" /> Limpar conversa</button>
                                <button className="destructive" onClick={() => setShowMoreMenu(false)}><Trash2 size={18} /> Apagar conversa</button>
                                <button onClick={() => setShowMoreMenu(false)}><Lock size={18} color="#048c83" /> Trancar conversa</button>
                                <button onClick={() => setShowMoreMenu(false)}><Eye size={18} color="#048c83" /> Ver perfil</button>
                                <button onClick={() => setShowMoreMenu(false)}><Gift size={18} color="#048c83" /> Presentear plano</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MESSAGES */}
            {/* MESSAGES */}
            <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-row ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                        {/* Avatar for Received */}
                        {msg.sender !== 'user' && (
                            <div className="chat-avatar-container">
                                {contactAvatar ? <img src={contactAvatar} alt={contactName} /> : <User size={20} color="#64748b" />}
                            </div>
                        )}

                        <div className="chat-bubble-group">
                            {/* Sender Name */}
                            <span className="chat-sender-name">
                                {msg.sender === 'user' ? 'Eu' : msg.senderName}
                            </span>

                            {/* Bubble */}
                            <div className="chat-bubble">
                                {msg.text}
                                <span className="chat-timestamp">{msg.time}</span>
                            </div>
                        </div>

                        {/* Avatar for Sent (User) */}
                        {msg.sender === 'user' && (
                            <div className="chat-avatar-container user">
                                <User size={20} color="#048c83" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* New message scroll button */}
            {showNewMsgBtn && (
                <button className="chat-new-msg-btn" onClick={scrollToBottom}>
                    <ChevronDown size={16} /> Nova mensagem
                </button>
            )}

            {/* INPUT BAR */}
            <footer className="chat-footer">
                <div className="chat-input-container">
                    <button className="chat-action-btn" aria-label="Anexar arquivo">
                        <Plus size={22} />
                    </button>
                    <button className="chat-action-btn" aria-label="Enviar Imagem">
                        <Image size={22} />
                    </button>

                    <input
                        className="chat-input-field"
                        placeholder="Escreva uma mensagem..."
                        value={inputText} onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    {inputText.trim() ? (
                        <button className="chat-send-fab" onClick={handleSend} aria-label="Enviar">
                            <Send size={18} />
                        </button>
                    ) : (
                        <button className="chat-action-btn" aria-label="Gravar áudio">
                            <Mic size={22} />
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default ChatScreen;
