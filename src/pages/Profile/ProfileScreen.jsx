import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, MessageCircle, Edit3, MoreHorizontal,
    Image, Layers, Bookmark, Heart,
    MapPin, Plus, Compass, Menu
} from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './ProfileScreen.css';

// Mock user data (placeholder for future backend integration)
const mockUser = {
    name: 'Nome do Usuário',
    username: '@gotour_user',
    bio: 'Amante de viagens e aventuras. 🌍✈️ Explorando o mundo, um destino de cada vez.',
    avatar: null, // null = use placeholder
    coverImage: null, // null = use gradient fallback
    stats: {
        friends: 0,
        collections: 0,
        posts: 0,
    }
};

// Tab definitions
const TABS = [
    { id: 'publicacoes', label: 'Publicações' },
    { id: 'colecoes', label: 'Coleções' },
    { id: 'visitar', label: 'Visitar Depois' },
    { id: 'favorito', label: 'Favorito' },
];

// Tab empty state content
const TAB_CONTENT = {
    publicacoes: {
        icon: Image,
        title: 'Você ainda não tem nenhuma publicação.',
        description: 'Comece agora e compartilhe suas experiências de viagem com outros viajantes.',
        buttonText: 'Publicar algo',
        buttonIcon: Plus,
    },
    colecoes: {
        icon: Layers,
        title: 'Você ainda não tem nenhuma coleção.',
        description: 'Organize seus destinos favoritos em coleções temáticas.',
        buttonText: 'Criar coleção',
        buttonIcon: Plus,
    },
    visitar: {
        icon: Bookmark,
        title: 'Você não adicionou nenhum lugar para visitar depois.',
        description: 'Salve destinos incríveis para planejar suas próximas aventuras.',
        buttonText: 'Explorar destinos',
        buttonIcon: Compass,
    },
    favorito: {
        icon: Heart,
        title: 'Você ainda não tem favoritos.',
        description: 'Marque publicações e destinos que mais gostou como favoritos.',
        buttonText: 'Adicionar favoritos',
        buttonIcon: Heart,
    },
};

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('publicacoes');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [user] = useState(mockUser);

    const currentTabContent = TAB_CONTENT[activeTab];
    const TabIcon = currentTabContent.icon;
    const ButtonIcon = currentTabContent.buttonIcon;

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
        <div className="profile-page">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* ===== HEADER ===== */}
            <header className="profile-header">
                <button className="profile-logo-btn" onClick={handleLogoClick} aria-label="Ir para Home">
                    <img src={gotourLogo} alt="GoTour" className="profile-header-logo" />
                </button>
                <button
                    className="profile-menu-btn"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    aria-label="Menu"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* ===== BANNER / COVER ===== */}
            <div className="profile-banner-wrapper">
                <div className="profile-banner">
                    {user.coverImage ? (
                        <img
                            src={user.coverImage}
                            alt="Capa do perfil"
                            className="profile-banner-image"
                        />
                    ) : (
                        <div className="profile-banner-gradient" />
                    )}
                </div>
            </div>

            {/* ===== AVATAR + STATS ===== */}
            <div className="profile-avatar-section">
                <div className="profile-avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                    ) : (
                        <User size={44} className="profile-avatar-placeholder" />
                    )}
                </div>
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
                        <span className="profile-stat-label">Posts</span>
                    </div>
                </div>
            </div>

            {/* ===== USER INFO ===== */}
            <div className="profile-user-info">
                <h1 className="profile-user-name">{user.name}</h1>
                <p className="profile-username">{user.username}</p>
                <p className="profile-bio">{user.bio}</p>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="profile-actions">
                <button className="profile-action-btn secondary">
                    <MessageCircle size={16} />
                    Mensagem
                </button>
                <button className="profile-action-btn primary">
                    <Edit3 size={16} />
                    Editar Perfil
                </button>
                <button className="profile-action-btn icon-only" aria-label="Mais opções">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* ===== TABS CARD ===== */}
            <div className="profile-tabs-card">
                <div className="profile-tabs-scroll">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== TAB CONTENT ===== */}
            <div className="profile-tab-content-card" key={activeTab}>
                <div className="tab-content-icon">
                    <TabIcon size={28} />
                </div>
                <h2 className="tab-content-title">{currentTabContent.title}</h2>
                <p className="tab-content-description">{currentTabContent.description}</p>
                <button className="tab-content-btn">
                    <ButtonIcon size={16} />
                    {currentTabContent.buttonText}
                </button>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default ProfileScreen;
