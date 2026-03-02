import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, MessageCircle, Edit3, MoreHorizontal,
    Image, Layers, Bookmark, Heart,
    Plus, Compass, Menu, Pencil, Camera, ImagePlus, Film, Trash2, Globe, Settings, Share2, MapPin, BadgeCheck
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DesktopSidebar from '../../components/DesktopSidebar/DesktopSidebar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import SearchBarAI from '../../components/SearchBarAI/SearchBarAI'; // We only need it if we import CountryDropdown, but let's make a copy of it or extract it if needed. Actually we can just render the Globe button here and not a full dropdown if just visual, or implement a simple dropdown
import gotourLogo from '../../assets/images/gotour_icon.png';
import './ProfileScreen.css';
import './ProfileScreenDesktop.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';

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

// Mock user data
const mockUser = {
    name: 'Nome do Usuário',
    username: '@gotour_user',
    bio: 'Amante de viagens e aventuras. 🌍✈️ Explorando o mundo, um destino de cada vez.',
    avatar: null,
    coverImage: null,
    hasStory: false,
    stats: { friends: 0, collections: 0, posts: 0 }
};

const TABS = [
    { id: 'publicacoes', label: 'Publicações' },
    { id: 'colecoes', label: 'Coleções' },
    { id: 'visitar', label: 'Visitar Depois' },
    { id: 'favorito', label: 'Favorito' },
];

const TAB_CONTENT = {
    publicacoes: {
        icon: Image, title: 'Você ainda não tem nenhuma publicação.',
        description: 'Comece agora e compartilhe suas experiências de viagem com outros viajantes.',
        buttonText: 'Publicar algo', buttonIcon: Plus,
    },
    colecoes: {
        icon: Layers, title: 'Você ainda não tem nenhuma coleção.',
        description: 'Organize seus destinos favoritos em coleções temáticas.',
        buttonText: 'Criar coleção', buttonIcon: Plus,
    },
    visitar: {
        icon: Bookmark, title: 'Você não adicionou nenhum lugar para visitar depois.',
        description: 'Salve destinos incríveis para planejar suas próximas aventuras.',
        buttonText: 'Explorar destinos', buttonIcon: Compass,
    },
    favorito: {
        icon: Heart, title: 'Você ainda não tem favoritos.',
        description: 'Marque publicações e destinos que mais gostou como favoritos.',
        buttonText: 'Adicionar favoritos', buttonIcon: Heart,
    },
};

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('publicacoes');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [user, setUser] = useState(mockUser);
    const [selectedCountry, setSelectedCountry] = useState({ code: 'MZ', flag: '🇲🇿', name: 'Moçambique' });
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New state for skeleton
    const modalRef = useRef(null);
    const globeRef = useRef(null);

    const handleSaveProfile = (updatedData) => {
        setUser(prev => ({
            ...prev,
            name: updatedData.name,
            username: updatedData.username,
            avatar: updatedData.avatar || prev.avatar
        }));
    };

    const currentTabContent = TAB_CONTENT[activeTab];
    const TabIcon = currentTabContent.icon;
    const ButtonIcon = currentTabContent.buttonIcon;

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Close modal & globe on click outside
    useEffect(() => {
        const handleClick = (e) => {
            if (showBannerModal && modalRef.current && !modalRef.current.contains(e.target)) {
                setShowBannerModal(false);
            }
            if (isCountryOpen && globeRef.current && !globeRef.current.contains(e.target)) {
                setIsCountryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showBannerModal, isCountryOpen]);

    const hasAvatar = !!user.avatar;
    const hasCover = !!user.coverImage;

    // Skeleton loader component
    const ProfileSkeleton = () => (
        <div className="profile-skeleton-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto', paddingTop: '24px' }}>
            <div className="skeleton-avatar" style={{ width: '112px', height: '112px', borderRadius: '50%', background: '#e2e8f0', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}></div>
            <div className="skeleton-name" style={{ width: '200px', height: '24px', borderRadius: '4px', background: '#e2e8f0', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}></div>
            <div className="skeleton-actions" style={{ display: 'flex', gap: '10px', width: '100%', padding: '0 20px', marginBottom: '24px', justifyContent: 'center' }}>
                <div style={{ flex: 1, maxWidth: '160px', height: '42px', borderRadius: '14px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ flex: 1, maxWidth: '160px', height: '42px', borderRadius: '14px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }}></div>
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

            {/* FIXED HEADER (Home style) */}
            <div className="home-fixed-header profile-fixed-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigate('/home')}
                    isDrawerOpen={isDrawerOpen}
                />

                {/* Globe on Desktop (Top Right near Hamburger) */}
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
                        {/* BANNER (Full Width - Facebook style) */}
                        <div className="profile-banner-wrapper">
                            <div className="profile-banner">
                                {user.coverImage ? (
                                    <img src={user.coverImage} alt="Capa do perfil" className="profile-banner-image" />
                                ) : (
                                    <div className="profile-banner-gradient" />
                                )}
                                <button className="profile-banner-edit-btn" onClick={() => setShowBannerModal(true)} aria-label="Editar capa">
                                    <Pencil size={16} />
                                </button>
                            </div>
                        </div>

                        {/* BANNER EDIT MODAL */}
                        {showBannerModal && (
                            <div className="banner-modal-overlay">
                                <div className="banner-modal" ref={modalRef}>
                                    <div className="banner-modal-handle" />
                                    <p className="banner-modal-title">Editar Perfil</p>

                                    {hasAvatar ? (
                                        <button className="banner-modal-option" onClick={() => setShowBannerModal(false)}>
                                            <span className="banner-modal-option-icon"><Camera size={20} /></span>
                                            Trocar foto de perfil
                                        </button>
                                    ) : (
                                        <button className="banner-modal-option" onClick={() => setShowBannerModal(false)}>
                                            <span className="banner-modal-option-icon"><Camera size={20} /></span>
                                            Adicionar foto de perfil
                                        </button>
                                    )}

                                    {hasCover ? (
                                        <button className="banner-modal-option" onClick={() => setShowBannerModal(false)}>
                                            <span className="banner-modal-option-icon"><ImagePlus size={20} /></span>
                                            Trocar foto de capa
                                        </button>
                                    ) : (
                                        <button className="banner-modal-option" onClick={() => setShowBannerModal(false)}>
                                            <span className="banner-modal-option-icon"><ImagePlus size={20} /></span>
                                            Adicionar foto de capa
                                        </button>
                                    )}

                                    {!user.hasStory ? (
                                        <button className="banner-modal-option" onClick={() => setShowBannerModal(false)}>
                                            <span className="banner-modal-option-icon"><Film size={20} /></span>
                                            Adicionar história
                                        </button>
                                    ) : (
                                        <button className="banner-modal-option destructive" onClick={() => setShowBannerModal(false)}>
                                            <span className="banner-modal-option-icon"><Trash2 size={20} /></span>
                                            Remover história
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* AVATAR & INFO CONTAINER (For horizontal layout on desktop) */}
                        <div className="profile-header-container">
                            {/* AVATAR (overlapping cover - Facebook style) */}
                            <div className="profile-avatar-section">
                                <div className="profile-avatar">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <User size={48} className="profile-avatar-placeholder" />
                                    )}
                                </div>
                            </div>

                            <div className="profile-info-section">
                                {/* USER INFO (centered, horizontal Name | Username) */}
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
                                        {user.bio ? (
                                            user.bio.length > 100 ? user.bio.substring(0, 100) + '...' : user.bio
                                        ) : (
                                            <span className="profile-bio-placeholder">Adicionar Biografia</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="profile-actions">
                            <button className="profile-action-btn primary" onClick={() => setIsEditModalOpen(true)}>
                                Editar Perfil
                            </button>
                            <button className="profile-action-btn secondary-outline" onClick={() => navigate('/messages')}>
                                Mensagens
                            </button>
                            <button className="profile-action-btn icon-only subtle" aria-label="Definições" onClick={() => navigate('/settings')}>
                                <Settings size={20} />
                            </button>
                            <button className="profile-action-btn icon-only subtle" aria-label="Partilhar">
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* STATS (centered row) */}
                        <div className="profile-stats">
                            <div className="profile-stat-item">
                                <span className="profile-stat-number">{user.stats.friends}</span>
                                <span className="profile-stat-label">A Seguir</span>
                            </div>
                            <div className="profile-stat-item">
                                <span className="profile-stat-number">{user.stats.collections}</span>
                                <span className="profile-stat-label">Seguidores</span>
                            </div>
                            <div className="profile-stat-item">
                                <span className="profile-stat-number">{user.stats.posts}</span>
                                <span className="profile-stat-label">Interações</span>
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
                            <button className="tab-content-btn">
                                <ButtonIcon size={16} /> {currentTabContent.buttonText}
                            </button>
                        </div>
                    </>
                )}
            </main>
            <BottomNavBar />

            {/* Premium Floating Editor Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userData={user}
                onSave={handleSaveProfile}
            />
        </div>
    );
};

export default ProfileScreen;
