import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, Search, UserPlus, Filter, Check, X, MessageCircle,
    Eye, UserMinus, Ban, MoreVertical, Clock, Wifi, Star,
    ChevronDown, MapPin, Compass, Globe
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { friendsService } from '../../lib/friendsService';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './FriendsScreenStyles.css';

const FILTERS = ['Todos', 'Recentes', 'Favoritos'];

// ── COMPONENT ──────────────────────────────────────────────

const FriendsScreen = () => {
    const navigate = useNavigate();
    const { navigateBack } = useNavigation();
    const { user } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [activeSection, setActiveSection] = useState('friends');
    const [friends, setFriends] = useState([]);
    const [requestsReceived, setRequestsReceived] = useState([]);
    const [requestsSent, setRequestsSent] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [profileModal, setProfileModal] = useState(null);
    const [suggestionsSearch, setSuggestionsSearch] = useState('');
    const [error, setError] = useState(null);
    const modalRef = useRef(null);
    const suggestionsSearchTimer = useRef(null);

    const loadData = useCallback(async () => {
        if (!user?.id) return;
        setIsLoading(true);
        setError(null);
        try {
            const [friendsData, receivedData, sentData] = await Promise.all([
                friendsService.getFriends(user.id),
                friendsService.getReceivedRequests(user.id),
                friendsService.getSentRequests(user.id),
            ]);
            setFriends(friendsData);
            setRequestsReceived(receivedData);
            setRequestsSent(sentData);
        } catch (err) {
            console.error('Friends load error:', err);
            setError('Erro ao carregar dados. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    const loadSuggestions = useCallback(async (search = '') => {
        if (!user?.id) return;
        setSuggestionsLoading(true);
        try {
            const data = await friendsService.getSuggestions(user.id, search);
            setSuggestions(data);
        } catch (err) {
            console.error('Suggestions load error:', err);
        } finally {
            setSuggestionsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (activeSection === 'suggestions') {
            loadSuggestions(suggestionsSearch);
        }
    }, [activeSection]);

    useEffect(() => {
        if (activeSection !== 'suggestions') return;
        clearTimeout(suggestionsSearchTimer.current);
        suggestionsSearchTimer.current = setTimeout(() => {
            loadSuggestions(suggestionsSearch);
        }, 350);
        return () => clearTimeout(suggestionsSearchTimer.current);
    }, [suggestionsSearch]);

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
    const acceptRequest = async (req) => {
        try {
            await friendsService.acceptFriendRequest(req.id);
            setRequestsReceived(prev => prev.filter(r => r.id !== req.id));
            setFriends(prev => [...prev, {
                id: req.senderId,
                name: req.name,
                username: req.username,
                avatar: req.avatar,
                online: false,
                isFavorite: false,
            }]);
        } catch (err) {
            console.error('Accept request error:', err);
        }
    };

    const rejectRequest = async (req) => {
        try {
            await friendsService.rejectFriendRequest(req.id);
            setRequestsReceived(prev => prev.filter(r => r.id !== req.id));
        } catch (err) {
            console.error('Reject request error:', err);
        }
    };

    const cancelSentRequest = async (req) => {
        try {
            await friendsService.cancelFriendRequest(req.id);
            setRequestsSent(prev => prev.filter(r => r.id !== req.id));
        } catch (err) {
            console.error('Cancel request error:', err);
        }
    };

    const removeFriend = async (friendId) => {
        try {
            await friendsService.removeFriend(user.id, friendId);
            setFriends(prev => prev.filter(f => f.id !== friendId));
        } catch (err) {
            console.error('Remove friend error:', err);
        }
    };

    const addFromSuggestion = async (sug) => {
        try {
            await friendsService.sendFriendRequest(user.id, sug.id);
            setSuggestions(prev => prev.filter(s => s.id !== sug.id));
            setRequestsSent(prev => [...prev, {
                id: `temp-${sug.id}`,
                receiverId: sug.id,
                name: sug.name,
                username: sug.username,
                avatar: sug.avatar,
                status: 'pending',
                date: 'Agora',
            }]);
        } catch (err) {
            console.error('Send friend request error:', err);
        }
    };

    // ── Filtering ──
    const filteredFriends = friends.filter(f => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q ||
            (f.name || '').toLowerCase().includes(q) ||
            (f.username || '').toLowerCase().includes(q);
        let matchesFilter = true;
        if (activeFilter === 'Favoritos') matchesFilter = !!f.isFavorite;
        return matchesSearch && matchesFilter;
    });

    const sectionTabs = [
        { key: 'friends', label: 'Meus Amigos', count: friends.length },
        { key: 'received', label: 'Pedidos Recebidos', count: requestsReceived.length },
        { key: 'sent', label: 'Pedidos Enviados', count: requestsSent.length },
        { key: 'suggestions', label: 'Sugestões', count: null },
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
    const AvatarImg = ({ src, name, size = 48 }) => {
        const initials = (name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        if (src) return <img src={src} alt={name} className="friend-card-avatar" />;
        return (
            <div className="friend-card-avatar friend-avatar-initials" style={{ width: size, height: size, fontSize: size * 0.35 }}>
                {initials}
            </div>
        );
    };

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
                    <div key={friend.id} className="friend-card">
                        <div className="friend-card-avatar-wrapper">
                            <AvatarImg src={friend.avatar} name={friend.name} />
                            {friend.online && <div className="friend-online-dot"></div>}
                            {friend.isFavorite && <div className="friend-favorite-badge"><Star size={10} color="#fff" fill="#fff" /></div>}
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{friend.name}</h4>
                            {friend.username && <span className="friend-card-username">{friend.username}</span>}
                            {friend.nationality && (
                                <span className="friend-card-location"><Globe size={12} /> {friend.nationality}</span>
                            )}
                        </div>
                        <div className="friend-card-actions">
                            <button className="friend-action-btn" title="Enviar mensagem" onClick={(e) => { e.stopPropagation(); navigate('/messages'); }}>
                                <MessageCircle size={16} />
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
                            <AvatarImg src={req.avatar} name={req.name} />
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{req.name}</h4>
                            {req.username && <span className="friend-card-username">{req.username}</span>}
                            <span className="friend-card-meta"><Clock size={12} /> {req.date}</span>
                        </div>
                        <div className="friend-card-actions request-actions">
                            <button className="friend-action-pill accept" onClick={(e) => { e.stopPropagation(); acceptRequest(req); }}>
                                <Check size={16} /> Aceitar
                            </button>
                            <button className="friend-action-pill reject" onClick={(e) => { e.stopPropagation(); rejectRequest(req); }}>
                                <X size={16} /> Recusar
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
                            <AvatarImg src={req.avatar} name={req.name} />
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{req.name}</h4>
                            {req.username && <span className="friend-card-username">{req.username}</span>}
                            <span className="friend-card-meta"><Clock size={12} /> {req.date}</span>
                        </div>
                        <div className="friend-card-actions">
                            <span className="friend-status-badge pending">Pendente</span>
                            <button className="friend-action-pill cancel" onClick={(e) => { e.stopPropagation(); cancelSentRequest(req); }}>
                                <X size={16} /> Cancelar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSuggestions = () => {
        if (suggestionsLoading) {
            return (
                <div className="friends-skeleton-loader">
                    {[1, 2, 3].map(n => (
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
        }

        if (suggestions.length === 0) {
            return (
                <div className="friends-empty-state">
                    <div className="empty-icon-circle"><Compass size={32} color="#94a3b8" /></div>
                    <h3>{suggestionsSearch ? 'Nenhum utilizador encontrado.' : 'Sem sugestões no momento.'}</h3>
                    <p>{suggestionsSearch ? 'Tenta pesquisar por um nome ou username diferente.' : 'Convida amigos para a plataforma!'}</p>
                </div>
            );
        }
        return (
            <div className="friends-list-grid">
                {suggestions.map(sug => (
                    <div key={sug.id} className="friend-card suggestion-card">
                        <div className="friend-card-avatar-wrapper">
                            <AvatarImg src={sug.avatar} name={sug.name} />
                        </div>
                        <div className="friend-card-info">
                            <h4 className="friend-card-name">{sug.name}</h4>
                            {sug.username && <span className="friend-card-username">{sug.username}</span>}
                            {sug.nationality && <span className="friend-card-location"><Globe size={12} /> {sug.nationality}</span>}
                        </div>
                        <div className="friend-card-actions">
                            <button className="friend-action-pill accept" onClick={(e) => { e.stopPropagation(); addFromSuggestion(sug); }}>
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
        if (error) return (
            <div className="friends-empty-state">
                <div className="empty-icon-circle"><X size={32} color="#ef4444" /></div>
                <h3>Ocorreu um erro</h3>
                <p>{error}</p>
                <button className="friend-action-pill accept" style={{ marginTop: 16 }} onClick={loadData}>
                    Tentar novamente
                </button>
            </div>
        );
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
                                    {tab.count != null && tab.count > 0 && <span className="tab-count">{tab.count}</span>}
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
