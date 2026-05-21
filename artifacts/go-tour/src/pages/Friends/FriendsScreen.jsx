import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, Search, UserPlus, Filter, Check, X, MessageCircle,
    Eye, UserMinus, Ban, MoreVertical, Clock, Wifi, Star,
    ChevronDown, MapPin, Compass, Globe
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './FriendsScreenStyles.css';

// ── MOCK DATA ──────────────────────────────────────────────

const MOCK_FRIENDS = [
    { id: 1, name: 'Ana Silva', username: '@anasilva', avatar: 'https://i.pravatar.cc/150?u=ana', online: true, location: 'Lisboa, Portugal', type: 'Exploradora', interests: ['Fotografia', 'Gastronomia', 'Trekking'], mutualFriends: 8, isFavorite: true },
    { id: 2, name: 'João Paulo', username: '@joaopaulo', avatar: 'https://i.pravatar.cc/150?u=joao', online: true, location: 'Maputo, Moçambique', type: 'Viajante', interests: ['Praia', 'Surf', 'Música'], mutualFriends: 15, isFavorite: false },
    { id: 3, name: 'Mariana Costa', username: '@marianacosta', avatar: 'https://i.pravatar.cc/150?u=mariana', online: false, location: 'São Paulo, Brasil', type: 'Exploradora', interests: ['Cultura', 'Arte', 'Culinária'], mutualFriends: 5, isFavorite: true },
    { id: 4, name: 'Sofia Lopes', username: '@sofialopes', avatar: 'https://i.pravatar.cc/150?u=sofia', online: false, location: 'Porto, Portugal', type: 'Aventureira', interests: ['Montanha', 'Rapel', 'Camping'], mutualFriends: 3, isFavorite: false },
    { id: 5, name: 'Pedro Almeida', username: '@pedroalmeida', avatar: 'https://i.pravatar.cc/150?u=pedro', online: true, location: 'Luanda, Angola', type: 'Viajante', interests: ['Fotografia', 'História', 'Natureza'], mutualFriends: 11, isFavorite: false },
];

const MOCK_REQUESTS_RECEIVED = [
    { id: 101, name: 'Carlos Mendes', username: '@carlosmendes', avatar: 'https://i.pravatar.cc/150?u=carlos', date: 'Há 2 horas', mutualFriends: 12, type: 'Fotógrafo' },
    { id: 102, name: 'Beatriz Fernandes', username: '@beatrizf', avatar: 'https://i.pravatar.cc/150?u=beatriz', date: 'Ontem', mutualFriends: 4, type: 'Exploradora' },
];

const MOCK_REQUESTS_SENT = [
    { id: 201, name: 'Ricardo Nunes', username: '@ricardonunes', avatar: 'https://i.pravatar.cc/150?u=ricardo', status: 'pending', date: 'Há 3 dias' },
    { id: 202, name: 'Inês Martins', username: '@inesmartins', avatar: 'https://i.pravatar.cc/150?u=ines', status: 'pending', date: 'Há 1 semana' },
];

const MOCK_SUGGESTIONS = [
    { id: 301, name: 'Miguel Santos', username: '@miguelsantos', avatar: 'https://i.pravatar.cc/150?u=miguel', mutualFriends: 7, location: 'Beira, Moçambique', interests: ['Mergulho', 'Fotografia'] },
    { id: 302, name: 'Catarina Oliveira', username: '@catarinao', avatar: 'https://i.pravatar.cc/150?u=catarina', mutualFriends: 3, location: 'Cascais, Portugal', interests: ['Surf', 'Yoga'] },
    { id: 303, name: 'Lucas Ferreira', username: '@lucasf', avatar: 'https://i.pravatar.cc/150?u=lucas', mutualFriends: 9, location: 'Rio de Janeiro, Brasil', interests: ['Trilhas', 'Escalada'] },
];

const FILTERS = ['Todos', 'Online', 'Recentes', 'Favoritos'];

// ── COMPONENT ──────────────────────────────────────────────

const FriendsScreen = () => {
    const navigate = useNavigate();
    const { navigateBack } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [activeSection, setActiveSection] = useState('friends'); // friends | received | sent | suggestions
    const [friends, setFriends] = useState([]);
    const [requestsReceived, setRequestsReceived] = useState([]);
    const [requestsSent, setRequestsSent] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [profileModal, setProfileModal] = useState(null);
    const [suggestionsSearch, setSuggestionsSearch] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFriends(MOCK_FRIENDS);
            setRequestsReceived(MOCK_REQUESTS_RECEIVED);
            setRequestsSent(MOCK_REQUESTS_SENT);
            setSuggestions(MOCK_SUGGESTIONS);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setProfileModal(null);
            }
        };
        if (profileModal) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileModal]);

    // ── Actions ──
    const acceptRequest = (id) => {
        const req = requestsReceived.find(r => r.id === id);
        setRequestsReceived(prev => prev.filter(r => r.id !== id));
        if (req) setFriends(prev => [...prev, { ...req, online: false, location: '', interests: [], isFavorite: false }]);
    };

    const rejectRequest = (id) => {
        setRequestsReceived(prev => prev.filter(r => r.id !== id));
    };

    const cancelSentRequest = (id) => {
        setRequestsSent(prev => prev.filter(r => r.id !== id));
    };

    const removeFriend = (id) => {
        setFriends(prev => prev.filter(f => f.id !== id));
    };

    const addFromSuggestion = (id) => {
        const sug = suggestions.find(s => s.id === id);
        setSuggestions(prev => prev.filter(s => s.id !== id));
        if (sug) setRequestsSent(prev => [...prev, { ...sug, status: 'pending', date: 'Agora' }]);
    };

    // ── Filtering ──
    const filteredFriends = friends.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.username.toLowerCase().includes(searchQuery.toLowerCase());
        let matchesFilter = true;
        switch (activeFilter) {
            case 'Online': matchesFilter = f.online; break;
            case 'Favoritos': matchesFilter = f.isFavorite; break;
            case 'Recentes': matchesFilter = true; break; // mock: all are recent
            default: break;
        }
        return matchesSearch && matchesFilter;
    });

    const sectionTabs = [
        { key: 'friends', label: 'Meus Amigos', count: friends.length },
        { key: 'received', label: 'Pedidos Recebidos', count: requestsReceived.length },
        { key: 'sent', label: 'Pedidos Enviados', count: requestsSent.length },
        { key: 'suggestions', label: 'Sugestões', count: suggestions.length },
    ];

    // ── Skeletons ──
    const renderSkeletons = () => (
        <div className="friends-skeleton-loader">
            {[1, 2, 3, 4].map(n => (
                <div key={n} className="skeleton-friend-card">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-lines">
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    // ── Render Sections ──
    const renderFriendsList = () => {
        if (filteredFriends.length === 0) {
            return (
                <div className="friends-empty-state">
                    <div className="empty-icon-circle"><Users size={32} color="#94a3b8" /></div>
                    <h3>Você ainda não possui amigos.</h3>
                    <p>Envie pedidos de amizade ou explore sugestões!</p>
                </div>
            );
        }
        return (
            <div className="friends-list-grid">
                {filteredFriends.map(friend => (
                    <div key={friend.id} className="friend-card" onClick={() => navigate('/profile', { state: { user: friend } })}>
                        <div className="friend-card-avatar-wrapper">
                            <img src={friend.avatar} alt={friend.name} className="friend-card-avatar" />
                            {friend.online && <div className="friend-online-dot"></div>}
                            {friend.isFavorite && <div className="friend-favorite-badge"><Star size={10} color="#fff" fill="#fff" /></div>}
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{friend.name}</h4>
                            <span className="friend-card-username">{friend.username}</span>
                            {friend.location && (
                                <span className="friend-card-location"><MapPin size={12} /> {friend.location}</span>
                            )}
                        </div>
                        <div className="friend-card-actions">
                            <button className="friend-action-btn" title="Enviar mensagem" onClick={(e) => { e.stopPropagation(); navigate('/messages'); }}>
                                <MessageCircle size={16} />
                            </button>
                            <button className="friend-action-btn" title="Ver perfil" onClick={(e) => { e.stopPropagation(); navigate('/profile', { state: { user: friend } }); }}>
                                <Eye size={16} />
                            </button>
                            <button className="friend-action-btn danger" title="Remover amigo" onClick={(e) => { e.stopPropagation(); removeFriend(friend.id); }}>
                                <UserMinus size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderReceivedRequests = () => {
        if (requestsReceived.length === 0) {
            return (
                <div className="friends-empty-state">
                    <div className="empty-icon-circle"><UserPlus size={32} color="#94a3b8" /></div>
                    <h3>Sem novos pedidos de amizade.</h3>
                    <p>Quando alguém lhe enviar um pedido, aparecerá aqui.</p>
                </div>
            );
        }
        return (
            <div className="friends-list-grid">
                {requestsReceived.map(req => (
                    <div key={req.id} className="friend-card request-card">
                        <div className="friend-card-avatar-wrapper">
                            <img src={req.avatar} alt={req.name} className="friend-card-avatar" />
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{req.name}</h4>
                            <span className="friend-card-username">{req.username}</span>
                            <span className="friend-card-meta"><Clock size={12} /> {req.date} · {req.mutualFriends} amigos em comum</span>
                        </div>
                        <div className="friend-card-actions request-actions">
                            <button className="friend-action-pill accept" onClick={(e) => { e.stopPropagation(); acceptRequest(req.id); }}>
                                <Check size={16} /> Aceitar
                            </button>
                            <button className="friend-action-pill reject" onClick={(e) => { e.stopPropagation(); rejectRequest(req.id); }}>
                                <X size={16} /> Recusar
                            </button>
                            <button className="friend-action-btn" title="Ver perfil" onClick={(e) => { e.stopPropagation(); navigate('/profile', { state: { user: req } }); }}>
                                <Eye size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSentRequests = () => {
        if (requestsSent.length === 0) {
            return (
                <div className="friends-empty-state">
                    <div className="empty-icon-circle"><Clock size={32} color="#94a3b8" /></div>
                    <h3>Nenhum pedido enviado.</h3>
                    <p>Os seus pedidos de amizade pendentes aparecerão aqui.</p>
                </div>
            );
        }
        return (
            <div className="friends-list-grid">
                {requestsSent.map(req => (
                    <div key={req.id} className="friend-card sent-card">
                        <div className="friend-card-avatar-wrapper">
                            <img src={req.avatar} alt={req.name} className="friend-card-avatar" />
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{req.name}</h4>
                            <span className="friend-card-username">{req.username}</span>
                            <span className="friend-card-meta"><Clock size={12} /> {req.date}</span>
                        </div>
                        <div className="friend-card-actions">
                            <span className="friend-status-badge pending">Pendente</span>
                            <button className="friend-action-pill cancel" onClick={(e) => { e.stopPropagation(); cancelSentRequest(req.id); }}>
                                <X size={16} /> Cancelar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSuggestions = () => {
        const filteredSuggestions = suggestionsSearch.trim()
            ? suggestions.filter(s =>
                s.name.toLowerCase().includes(suggestionsSearch.toLowerCase()) ||
                s.username.toLowerCase().includes(suggestionsSearch.toLowerCase()) ||
                (s.location && s.location.toLowerCase().includes(suggestionsSearch.toLowerCase()))
            )
            : suggestions;

        if (filteredSuggestions.length === 0) {
            return (
                <div className="friends-empty-state">
                    <div className="empty-icon-circle"><Compass size={32} color="#94a3b8" /></div>
                    <h3>{suggestionsSearch ? 'Nenhum resultado encontrado.' : 'Sem sugestões no momento.'}</h3>
                    <p>{suggestionsSearch ? 'Tenta um nome ou localização diferente.' : 'Volte mais tarde para novas sugestões de amizade.'}</p>
                </div>
            );
        }
        return (
            <div className="friends-list-grid">
                {filteredSuggestions.map(sug => (
                    <div key={sug.id} className="friend-card suggestion-card">
                        <div className="friend-card-avatar-wrapper">
                            <img src={sug.avatar} alt={sug.name} className="friend-card-avatar" />
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{sug.name}</h4>
                            <span className="friend-card-username">{sug.username}</span>
                            <span className="friend-card-meta"><Users size={12} /> {sug.mutualFriends} amigos em comum</span>
                            <span className="friend-card-location"><MapPin size={12} /> {sug.location}</span>
                            <div className="friend-card-interests">
                                {sug.interests.map((int, i) => <span key={i} className="interest-tag">{int}</span>)}
                            </div>
                        </div>
                        <div className="friend-card-actions">
                            <button className="friend-action-pill accept" onClick={(e) => { e.stopPropagation(); addFromSuggestion(sug.id); }}>
                                <UserPlus size={16} /> Adicionar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderActiveSection = () => {
        if (isLoading) return renderSkeletons();
        switch (activeSection) {
            case 'received': return renderReceivedRequests();
            case 'sent': return renderSentRequests();
            case 'suggestions': return renderSuggestions();
            default: return renderFriendsList();
        }
    };

    return (
        <div className="friends-layout-root">
            <button className="friends-close-btn desktop-only" onClick={() => navigateBack()} aria-label="Fechar">
                <X size={24} />
            </button>
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <div className="home-fixed-header mobile-only">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigate('/home')}
                    isDrawerOpen={isDrawerOpen}
                />
            </div>

            <main className="friends-main-content">
                <section className="friends-list-column">

                    {/* HEADER */}
                    <header className="friends-list-header">
                        <div className="friends-title-row">
                            <div>
                                <h1><Users size={24} className="title-icon" /> Amigos</h1>
                                <p className="friends-subtitle">Gerencie suas conexões, interações e pedidos de amizade.</p>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="friends-section-tabs">
                            {sectionTabs.map(tab => (
                                <button
                                    key={tab.key}
                                    className={`friends-tab ${activeSection === tab.key ? 'active' : ''}`}
                                    onClick={() => setActiveSection(tab.key)}
                                >
                                    {tab.label}
                                    {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
                                </button>
                            ))}
                        </div>

                        {/* SEARCH (for suggestions tab) */}
                        {activeSection === 'suggestions' && (
                            <div className="friends-controls-row">
                                <div className="friends-search-wrapper">
                                    <Search size={18} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Pesquisar sugestões por nome ou localização..."
                                        value={suggestionsSearch}
                                        onChange={(e) => setSuggestionsSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* SEARCH + FILTERS (only for friends list) */}
                        {activeSection === 'friends' && (
                            <div className="friends-controls-row">
                                <div className="friends-search-wrapper">
                                    <Search size={18} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Pesquisar amigos por nome ou username..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="friends-filter-pills">
                                    {FILTERS.map(filter => (
                                        <button
                                            key={filter}
                                            className={`friends-filter-pill ${activeFilter === filter ? 'active' : ''}`}
                                            onClick={() => setActiveFilter(filter)}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </header>

                    {/* SCROLLABLE LIST */}
                    <div className="friends-scroll-area premium-scroll">
                        {renderActiveSection()}
                    </div>
                </section>
            </main>

            {/* PROFILE MODAL OVERLAY */}
            {profileModal && (
                <div className="friend-profile-modal-overlay" onClick={() => setProfileModal(null)}>
                    <div className="friend-profile-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setProfileModal(null)}><X size={20} /></button>
                        <div className="modal-profile-header">
                            <img src={profileModal.avatar} alt={profileModal.name} className="modal-avatar" />
                            <div className="modal-profile-info">
                                <h2>{profileModal.name}</h2>
                                <span className="modal-username">{profileModal.username}</span>
                                {profileModal.type && <span className="modal-type-badge"><Compass size={14} /> {profileModal.type}</span>}
                                {profileModal.location && <span className="modal-location"><MapPin size={14} /> {profileModal.location}</span>}
                            </div>
                        </div>
                        {profileModal.interests && profileModal.interests.length > 0 && (
                            <div className="modal-interests">
                                <h4>Interesses</h4>
                                <div className="modal-interest-tags">
                                    {profileModal.interests.map((int, i) => <span key={i} className="interest-tag">{int}</span>)}
                                </div>
                            </div>
                        )}
                        <div className="modal-actions">
                            <button className="modal-action-btn primary" onClick={() => { setProfileModal(null); navigate('/messages'); }}>
                                <MessageCircle size={16} /> Enviar Mensagem
                            </button>
                            <button className="modal-action-btn secondary" onClick={() => { setProfileModal(null); navigate('/profile', { state: { user: profileModal } }); }}>
                                <Eye size={16} /> Ver Perfil Completo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNavBar />
        </div>
    );
};

export default FriendsScreen;
