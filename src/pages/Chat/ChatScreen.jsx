import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, MoreVertical, Plus, Send, Mic,
    User, Ban, Flag, BellOff, Trash2, Lock,
    Eye, Gift, Image, Video, Smile, FileText,
    MapPin, ChevronDown
} from 'lucide-react';
import './ChatScreen.css';

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
                <button className="chat-back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                    <ArrowLeft size={20} />
                </button>
                <div className="chat-contact-avatar">
                    {contactAvatar ? <img src={contactAvatar} alt={contactName} /> : <User size={22} color="#94a3b8" />}
                </div>
                <span className="chat-contact-name">{contactName}</span>
                <button className="chat-more-btn" onClick={() => setShowMoreMenu(!showMoreMenu)} aria-label="Mais">
                    <MoreVertical size={20} />
                    {showMoreMenu && (
                        <div className="chat-more-menu">
                            <button onClick={() => setShowMoreMenu(false)}><Ban size={16} /> Bloquear utilizador</button>
                            <button className="destructive" onClick={() => setShowMoreMenu(false)}><Flag size={16} /> Denunciar</button>
                            <button onClick={() => setShowMoreMenu(false)}><BellOff size={16} /> Silenciar notificações</button>
                            <button onClick={() => setShowMoreMenu(false)}><Trash2 size={16} /> Limpar conversa</button>
                            <button className="destructive" onClick={() => setShowMoreMenu(false)}><Trash2 size={16} /> Apagar conversa</button>
                            <button onClick={() => setShowMoreMenu(false)}><Lock size={16} /> Trancar conversa</button>
                            <button onClick={() => setShowMoreMenu(false)}><Eye size={16} /> Ver perfil</button>
                            <button onClick={() => setShowMoreMenu(false)}><Gift size={16} /> Presentear plano</button>
                        </div>
                    )}
                </button>
            </div>

            {/* MESSAGES */}
            <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                        <span className="chat-bubble-sender">{msg.senderName}</span>
                        <div className="chat-bubble">{msg.text}</div>
                        <span className="chat-bubble-time">{msg.time}</span>
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
            <div className="chat-input-bar">
                <button className="chat-attach-btn" onClick={() => setShowAttachMenu(!showAttachMenu)} aria-label="Anexar">
                    <Plus size={20} />
                    {showAttachMenu && (
                        <div className="chat-attach-menu">
                            <button onClick={() => setShowAttachMenu(false)}><Image size={16} /> Foto</button>
                            <button onClick={() => setShowAttachMenu(false)}><Video size={16} /> Vídeo</button>
                            <button onClick={() => setShowAttachMenu(false)}><Smile size={16} /> Sticker</button>
                            <button onClick={() => setShowAttachMenu(false)}><Smile size={16} /> GIF</button>
                            <button onClick={() => setShowAttachMenu(false)}><FileText size={16} /> Documento</button>
                            <button onClick={() => setShowAttachMenu(false)}><MapPin size={16} /> Localização</button>
                        </div>
                    )}
                </button>
                <input
                    className="chat-text-input" placeholder="Escrever mensagem..."
                    value={inputText} onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button className="chat-send-btn" onClick={handleSend} aria-label="Enviar">
                    <Send size={18} />
                </button>
                <button className="chat-mic-btn" aria-label="Áudio">
                    <Mic size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
