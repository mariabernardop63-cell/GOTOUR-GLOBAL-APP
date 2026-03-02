import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    User, MessageCircle, MoreVertical, MoreHorizontal,
    Image, Layers, Bookmark, Heart, Plus, Compass,
    Globe, Share2, MapPin, BadgeCheck, Download, UserPlus, UserMinus, ShieldAlert, Ban, Shield, Link, X
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DesktopSidebar from '../../components/DesktopSidebar/DesktopSidebar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import '../Profile/ProfileScreen.css';
import '../Profile/ProfileScreenDesktop.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './UserProfileScreenStyles.css';

// Reusing CountryDropdown locally for Profile
const CountryDropdown = ({ selectedCountry, onSelect, isOpen, onClose }) => {
    const countries = [
        { code: 'MZ', flag: '🇲🇿', name: 'Moçambique' },
        { code: 'ZA', flag: '🇿🇦', name: 'África do Sul' },
        { code: 'PT', flag: '🇵🇹', name: 'Portugal' },
        { code: 'BR', flag: '🇧🇷', name: 'Brasil' },
    ];

    if (!isOpen) return null;

    return (
        <div className="country-dropdown-glass profile-globe-dropdown">
            {countries.map((country) => (
                <button
                    key={country.code}
                    className={`country-option-glass ${selectedCountry.code === country.code ? 'active' : ''}`}
                    onClick={() => {
                        onSelect(country);
                        onClose();
                    }}
                >
                    <span className="country-flag">{country.flag}</span>
                    <span className="country-label">{country.name}</span>
                </button>
            ))}
        </div>
    );
};

const TABS = [
    { id: 'publicacoes', label: 'Publicações' },
    { id: 'colecoes', label: 'Coleções' },
    { id: 'visitar', label: 'Visitar Depois' },
    { id: 'favorito', label: 'Favorito' },
];

const TAB_CONTENT = {
    publicacoes: {
        icon: Image, title: 'Nenhuma publicação ainda.',
        description: 'Este usuário ainda não compartilhou fotos ou experiências.',
        buttonText: null, buttonIcon: null,
    },
    colecoes: {
        icon: Layers, title: 'Nenhuma coleção.',
        description: 'Este usuário não possui coleções públicas no momento.',
        buttonText: null, buttonIcon: null,
    },
    visitar: {
        icon: Bookmark, title: 'Sem destinos salvos.',
        description: 'Não há destinos marcados para visitar depois visíveis publicamente.',
        buttonText: null, buttonIcon: null,
    },
    favorito: {
        icon: Heart, title: 'Nenhum favorito público.',
        description: 'Os favoritos deste usuário são privados ou não existem.',
        buttonText: null, buttonIcon: null,
    },
};

const UserProfileScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Using react-router params if we navigated with /user/:id
    const [activeTab, setActiveTab] = useState('publicacoes');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Mock user data for the other profile
    const [user] = useState({
        name: 'Ana Silva',
        username: '@anasilva_explorer',
        bio: 'Viajante apaixonada por fotografias e conhecer novas culturas! 📸✈️',
        avatar: null, // Will render placeholder icon if null
        coverImage: null,
        hasStory: true,
        stats: { friends: 245, collections: 12, posts: 48 }
    });

    const [isFriend, setIsFriend] = useState(false);
    const [friendRequested, setFriendRequested] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isAvatarViewerOpen, setIsAvatarViewerOpen] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState({ code: 'MZ', flag: '🇲🇿', name: 'Moçambique' });
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const globeRef = useRef(null);
    const moreMenuRef = useRef(null);

    const currentTabContent = TAB_CONTENT[activeTab];
    const TabIcon = currentTabContent.icon;

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClick = (e) => {
            if (isCountryOpen && globeRef.current && !globeRef.current.contains(e.target)) {
                setIsCountryOpen(false);
            }
            if (showMoreMenu && moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
                setShowMoreMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isCountryOpen, showMoreMenu]);

    const handleMessageClick = () => {
        // Navigation logic to open the specific chat with this user
        navigate('/chat');
    };

    // Skeleton loader component
    const ProfileSkeleton = () => (
        <div className="profile-skeleton-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto', paddingTop: '24px' }}>
            <div className="skeleton-avatar" style={{ width: '112px', height: '112px', borderRadius: '50%', background: '#e2e8f0', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}></div>
            <div className="skeleton-name" style={{ width: '200px', height: '24px', borderRadius: '4px', background: '#e2e8f0', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}></div>
            <div className="skeleton-actions" style={{ display: 'flex', gap: '10px', width: '100%', padding: '0 20px', marginBottom: '24px', justifyContent: 'center' }}>
                <div style={{ flex: 1, maxWidth: '160px', height: '42px', borderRadius: '14px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ flex: 1, maxWidth: '160px', height: '42px', borderRadius: '14px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
            </div>
            <div className="skeleton-stats" style={{ display: 'flex', gap: '32px', marginBottom: '32px', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '30px', borderRadius: '4px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '40px', height: '30px', borderRadius: '4px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '40px', height: '30px', borderRadius: '4px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
            </div>
            <div className="skeleton-tabs" style={{ display: 'flex', gap: '16px', width: '100%', padding: '0 16px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ width: '80px', height: '20px', borderRadius: '4px', background: '#e2e8f0', marginBottom: '10px', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '80px', height: '20px', borderRadius: '4px', background: '#e2e8f0', marginBottom: '10px', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '80px', height: '20px', borderRadius: '4px', background: '#e2e8f0', marginBottom: '10px', animation: 'pulse 1.5s infinite' }}></div>
            </div>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
            `}</style>
        </div>
    );

    return (
        <div className="profile-page">
            <DesktopSidebar />
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* FIXED HEADER */}
            <div className="home-fixed-header profile-fixed-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigate('/home')}
                    isDrawerOpen={isDrawerOpen}
                />

                {/* Globe on Desktop */}
                <div className="globe-selector profile-globe" ref={globeRef}>
                    <button
                        className="globe-btn"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        aria-label="Select country"
                    >
                        <Globe size={20} strokeWidth={1.8} />
                    </button>
                    <CountryDropdown
                        selectedCountry={selectedCountry}
                        onSelect={setSelectedCountry}
                        isOpen={isCountryOpen}
                        onClose={() => setIsCountryOpen(false)}
                    />
                </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <main className="profile-scroll-content">
                {isLoading ? (
                    <ProfileSkeleton />
                ) : (
                    <>
                        {/* BANNER */}
                        <div className="profile-banner-wrapper">
                            <div className="profile-banner">
                                {user.coverImage ? (
                                    <img src={user.coverImage} alt="Capa do perfil" className="profile-banner-image" />
                                ) : (
                                    <div className="profile-banner-gradient" />
                                )}
                            </div>
                        </div>

                        {/* AVATAR & INFO CONTAINER */}
                        <div className="profile-header-container">
                            <div className="profile-avatar-section">
                                <div className="profile-avatar profile-avatar-clickable" onClick={() => setIsAvatarViewerOpen(true)}>
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <User size={48} className="profile-avatar-placeholder" />
                                    )}
                                </div>
                            </div>

                            <div className="profile-info-section">
                                <div className="profile-user-info">
                                    <h1 className="profile-user-name">
                                        {user.name} <span className="profile-username-divider">|</span> <span className="profile-username">{user.username}</span>
                                    </h1>
                                    <div className="profile-user-badges">
                                        <div className="profile-badge-item">
                                            <MapPin size={16} className="profile-badge-icon" />
                                            <span>Moçambique</span>
                                        </div>
                                        <span className="profile-badge-divider">|</span>
                                        <div className="profile-badge-item">
                                            <BadgeCheck size={16} className="profile-badge-icon explorer-icon" />
                                            <span>Explorador</span>
                                        </div>
                                    </div>
                                    <div className="profile-user-bio">
                                        {user.bio}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTONS FOR OTHER USER */}
                        <div className="profile-actions">
                            {isFriend ? (
                                <button
                                    className="profile-action-btn secondary-outline"
                                    onClick={() => setIsFriend(false)}
                                >
                                    <UserMinus size={18} /> Mando Convite
                                </button>
                            ) : friendRequested ? (
                                <button
                                    className="profile-action-btn primary"
                                    onClick={() => setFriendRequested(false)}
                                    style={{ background: '#ef4444', borderColor: '#ef4444', color: 'white' }}
                                >
                                    <X size={18} /> Cancelar
                                </button>
                            ) : (
                                <button
                                    className="profile-action-btn primary"
                                    onClick={() => setFriendRequested(true)}
                                >
                                    <UserPlus size={18} /> Adicionar amigo
                                </button>
                            )}

                            <button className="profile-action-btn secondary-outline" onClick={handleMessageClick}>
                                <MessageCircle size={18} /> Mensagem
                            </button>

                            <div style={{ position: 'relative' }} ref={moreMenuRef}>
                                <button className="profile-action-btn icon-only subtle" onClick={() => setShowMoreMenu(!showMoreMenu)}>
                                    <MoreVertical size={20} />
                                </button>

                                {/* 3 DOTS MENU */}
                                {showMoreMenu && (
                                    <div className="user-profile-more-dropdown premium-dropdown">
                                        <div className="dropdown-section">
                                            {isFriend && (
                                                <button onClick={() => { setShowMoreMenu(false); setIsFriend(false); }} className="danger-text">
                                                    <UserMinus size={16} color="#ef4444" /> Eliminar Amizade
                                                </button>
                                            )}
                                            <button onClick={() => setShowMoreMenu(false)}>
                                                <Link size={16} color="#475569" /> Copiar link do perfil
                                            </button>
                                            <button onClick={() => setShowMoreMenu(false)}>
                                                <Share2 size={16} color="#475569" /> Compartilhar perfil
                                            </button>
                                        </div>
                                        <div className="menu-divider" />
                                        <div className="dropdown-section">
                                            <button onClick={() => setShowMoreMenu(false)} className="danger-text">
                                                <ShieldAlert size={16} color="#ef4444" /> Denunciar perfil
                                            </button>
                                            <button onClick={() => setShowMoreMenu(false)} className="danger-text">
                                                <Ban size={16} color="#ef4444" /> Bloquear usuario
                                            </button>
                                            <button onClick={() => setShowMoreMenu(false)} className="danger-text">
                                                <Shield size={16} color="#ef4444" /> Restringir usuario
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="profile-action-btn icon-only subtle" onClick={() => alert('Compartilhar perfil')}>
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="profile-stats">
                            <div className="profile-stat-item">
                                <span className="profile-stat-number">{user.stats.friends}</span>
                                <span className="profile-stat-label">Amigos</span>
                            </div>
                            <div className="profile-stat-item">
                                <span className="profile-stat-number">{user.stats.collections}</span>
                                <span className="profile-stat-label">Coleções</span>
                            </div>
                            <div className="profile-stat-item">
                                <span className="profile-stat-number">{user.stats.posts}</span>
                                <span className="profile-stat-label">Publicações</span>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="profile-tabs-card">
                            <div className="profile-tabs-scroll">
                                {TABS.map((tab) => (
                                    <button key={tab.id} className={`profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* TAB CONTENT */}
                        <div className="profile-tab-content-card" key={activeTab}>
                            <div className="tab-content-icon"><TabIcon size={28} /></div>
                            <h2 className="tab-content-title">{currentTabContent.title}</h2>
                            <p className="tab-content-description">{currentTabContent.description}</p>
                        </div>
                    </>
                )}
            </main>
            <BottomNavBar />

            {/* FULL SCREEN AVATAR VIEWER */}
            {isAvatarViewerOpen && (
                <div className="avatar-viewer-overlay" onClick={() => setIsAvatarViewerOpen(false)}>
                    <div className="avatar-viewer-header" onClick={(e) => e.stopPropagation()}>
                        <button className="avatar-viewer-btn" onClick={() => setIsAvatarViewerOpen(false)}>
                            <X size={24} />
                        </button>
                        <button className="avatar-viewer-btn" onClick={() => alert('Opção de download em desenvolvimento')}>
                            <Download size={24} />
                        </button>
                    </div>

                    <div className="avatar-viewer-image-container">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="avatar-viewer-image" />
                        ) : (
                            <div style={{ background: '#333', padding: '100px', borderRadius: '50%' }}>
                                <User size={120} color="#cbd5e1" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileScreen;
