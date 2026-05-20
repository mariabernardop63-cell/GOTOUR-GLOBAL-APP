import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User, MessageCircle, MoreHorizontal, Image,
    Layers, Bookmark, Heart, Plus, Share2, MapPin,
    BadgeCheck, Settings, X, Pencil, ChevronDown,
    Map, Navigation, Tent, Camera, Edit, UserPlus, UserMinus,
    LogOut
} from 'lucide-react';
import { useNavigation } from '../../App';
import { useAuth } from '../../context/AuthContext';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './ProfileScreen.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';

// Mock user data based on the new requirements
const mockUser = {
    name: 'James Aminoff',
    username: '@james_aminoff',
    bio: 'My name is James, I\'m a traveler and content creator from LA. Please follow my adventures.',
    avatar: 'https://i.pravatar.cc/150?img=11', // Placeholder avatar
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200', // Premium abstract cover
    nationality: { code: 'MZ', flag: '🇲🇿', name: 'Moçambique' },
    category: 'Explorador',
    interests: ['Natureza', 'Fotografia', 'Culturas', 'Mochilão', 'Gastronomia'],
    stats: { friends: 216, posts: 283, likes: 4872 }
};

// Mock Friends
const MOCK_FRIENDS = [
    { id: 1, name: 'Lindsey Workman', category: 'Viajante', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, name: 'Charlie Lipshutz', category: 'Turista', avatar: 'https://i.pravatar.cc/150?img=8' },
];

const MOCK_POSTS = [
    { id: 1, image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&q=80&w=400' },
    { id: 2, image: 'https://images.unsplash.com/photo-1506744626753-dba8d4ce9a8f?auto=format&fit=crop&q=80&w=400' },
    { id: 3, image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400' },
    { id: 4, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' },
    { id: 5, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400' },
    { id: 6, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400' }
];

const ProfileScreen = ({ isModal = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const friendData = location.state?.user; // If passed from message screen
    const isMe = !friendData;

    const { setModalBackground, modalBackground, navigateFade } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [friendRequested, setFriendRequested] = useState(false);
    
    // Dropdown state for Content Filter
    const [contentFilter, setContentFilter] = useState('Tudo');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const filterRef = useRef(null);

    const { user: authUser, signOut } = useAuth();

    // Initialize profile dynamically based on supabase authenticated user details if present
    const getInitialUser = () => {
        if (friendData) {
            return { ...mockUser, ...friendData };
        }
        if (authUser) {
            const emailName = authUser.email ? authUser.email.split('@')[0] : 'Viajante';
            const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
            return {
                ...mockUser,
                name: formattedName,
                username: `@${emailName.toLowerCase()}`
            };
        }
        return mockUser;
    };

    const [user, setUser] = useState(getInitialUser());
    const [isLoading, setIsLoading] = useState(true);

    const handleSignOut = async () => {
        try {
            await signOut();
            setModalBackground(null);
            navigateFade('/home');
        } catch (err) {
            console.error("Erro ao terminar sessão:", err);
        }
    };

    const handleClose = () => {
        if (modalBackground) {
            setModalBackground(null);
            navigate(modalBackground.pathname);
        } else {
            navigate(-1);
        }
    };

    const handleSaveProfile = (updatedData) => {
        setUser(prev => ({
            ...prev,
            name: updatedData.name,
            username: updatedData.username,
            avatar: updatedData.avatar || prev.avatar,
            bio: updatedData.bio || prev.bio
        }));
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClick = (e) => {
            if (isFilterDropdownOpen && filterRef.current && !filterRef.current.contains(e.target)) {
                setIsFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isFilterDropdownOpen]);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const hasAvatar = !!user.avatar;
    const hasCover = !!user.coverImage;

    const FILTERS = ['Tudo', 'Publicações', 'Coleções', 'Visitar Depois', 'Favorito'];

    return (
        <div className="profile-layout-root">
            <button className="profile-close-btn modal-desktop desktop-only" onClick={handleClose} aria-label="Fechar">
                <X size={24} />
            </button>
            {isModal && (
                <button className="profile-close-btn mobile-only" onClick={handleClose} aria-label="Close Profile">
                    <X size={24} strokeWidth={2} />
                </button>
            )}
            
            {!isModal && <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />}

            {/* FIXED HEADER (Home style) */}
            <div className="home-fixed-header mobile-only profile-fixed-header profile-list-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigateFade('/home')}
                    isDrawerOpen={isDrawerOpen}
                />
            </div>

            {/* SCROLLABLE CONTENT */}
            <main className="profile-main-wrapper">
                <div className="profile-scroll-content">
                {isLoading ? (
                    <div className="profile-skeleton-loader">Loading...</div>
                ) : (
                    <div className="profile-grid-layout">
                        
                        {/* LEFT/MAIN COLUMN */}
                        <div className="profile-main-col">
                            
                            {/* PREMIUM COVER & AVATAR BLOCK */}
                            <div className="profile-cover-card">
                                <div className="profile-cover-image-area">
                                    {user.coverImage ? (
                                        <img src={user.coverImage} alt="Capa" className="cover-img" />
                                    ) : (
                                        <div className="cover-gradient" />
                                    )}

                                    {/* Edit Button inside Cover */}
                                    {isMe && (
                                        <button 
                                            className="profile-cover-edit-btn" 
                                            onClick={() => setIsEditModalOpen(true)}
                                        >
                                            <Edit size={14} />
                                            <span>Edit Profile</span>
                                        </button>
                                    )}

                                    {/* Avatar & Info overlaying the cover */}
                                    <div className="profile-cover-overlay-info">
                                        <div className="profile-cover-avatar">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} />
                                            ) : (
                                                <User size={40} color="#fff" />
                                            )}
                                        </div>
                                        <div className="profile-cover-text">
                                            <h1 className="cover-name">{user.name}</h1>
                                            <p className="cover-username">{user.username}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* STATS BAR (Only Amigos, Posts, Curtidas) */}
                                <div className="profile-stats-bar">
                                    <div className="profile-stat-box">
                                        <span className="stat-number">{user.stats?.posts || 0}</span>
                                        <span className="stat-label">Posts</span>
                                        <div className="stat-active-indicator" />
                                    </div>
                                    <div className="profile-stat-box">
                                        <span className="stat-number">{user.stats?.friends || 0}</span>
                                        <span className="stat-label">Amigos</span>
                                    </div>
                                    <div className="profile-stat-box">
                                        <span className="stat-number">{user.stats?.likes || 0}</span>
                                        <span className="stat-label">Curtidas</span>
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTONS — Different for own vs other user */}
                            {isMe ? (
                                <div className="profile-action-bar profile-action-bar--premium">
                                    <button className="profile-premium-btn profile-premium-btn--secondary" onClick={() => navigateFade('/messages')}>
                                        <MessageCircle size={18} />
                                        <span>Mensagens</span>
                                    </button>
                                    <button className="profile-premium-btn profile-premium-btn--secondary" onClick={() => navigateFade('/settings')}>
                                        <Settings size={18} />
                                        <span>Definições</span>
                                    </button>
                                    <button className="profile-premium-btn profile-premium-btn--primary" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
                                        <Share2 size={18} />
                                        <span>Partilhar Perfil</span>
                                    </button>
                                    <button className="profile-premium-btn profile-premium-btn--cancel" onClick={handleSignOut}>
                                        <LogOut size={18} />
                                        <span>Terminar Sessão</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="profile-action-bar profile-action-bar--premium">
                                    {friendRequested ? (
                                        <button className="profile-premium-btn profile-premium-btn--cancel" onClick={() => setFriendRequested(false)}>
                                            <X size={18} />
                                            <span>Cancelar Pedido</span>
                                        </button>
                                    ) : (
                                        <button className="profile-premium-btn profile-premium-btn--primary" onClick={() => setFriendRequested(true)}>
                                            <UserPlus size={18} />
                                            <span>Adicionar Amigo</span>
                                        </button>
                                    )}
                                    <button className="profile-premium-btn profile-premium-btn--secondary" onClick={() => navigateFade('/chat', { state: { user: friendData } })}>
                                        <MessageCircle size={18} />
                                        <span>Mensagem</span>
                                    </button>
                                    <button className="profile-premium-btn profile-premium-btn--ghost" onClick={() => {}}>
                                        <MoreHorizontal size={18} />
                                        <span>Mais</span>
                                    </button>
                                </div>
                            )}

                            {/* CONTENT SECTION HEADER */}
                            <div className="profile-content-header">
                                <h2 className="content-title">Meus conteúdos</h2>
                                
                                <div className="content-filter" ref={filterRef}>
                                    <button 
                                        className="content-filter-btn" 
                                        onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                    >
                                        <span className="filter-prefix">ORDENAR POR</span>
                                        <span className="filter-value">{contentFilter}</span>
                                        <ChevronDown size={16} />
                                    </button>
                                    
                                    {isFilterDropdownOpen && (
                                        <div className="content-filter-dropdown">
                                            {FILTERS.map(f => (
                                                <button 
                                                    key={f} 
                                                    className={`filter-option ${contentFilter === f ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setContentFilter(f);
                                                        setIsFilterDropdownOpen(false);
                                                    }}
                                                >
                                                    {f}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* POST FEED GRID */}
                            <div className="profile-posts-grid">
                                {MOCK_POSTS.map(post => (
                                    <div key={post.id} className="profile-grid-item">
                                        <img src={post.image} alt="Post content" />
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* RIGHT SIDEBAR (Widgets) */}
                        <aside className="profile-sidebar">
                            
                            {/* BIOGRAPHY WIDGET */}
                            <div className="profile-widget">
                                <div className="widget-header">
                                    <h3 className="widget-title">Biografia</h3>
                                    <button className="widget-more-btn"><MoreHorizontal size={18} /></button>
                                </div>
                                <div className="widget-body">
                                    {user.bio ? (
                                        <p className="bio-text">{user.bio}</p>
                                    ) : (
                                        <p 
                                            className="bio-placeholder" 
                                            onClick={() => setIsEditModalOpen(true)}
                                        >
                                            Escreva algo aqui sobre você
                                        </p>
                                    )}
                                </div>
                                
                                <div className="widget-info-list">
                                    <div className="info-item">
                                        <MapPin size={18} className="info-icon" />
                                        <span>{user.nationality?.name || 'Não definida'}</span>
                                    </div>
                                    <div className="info-item">
                                        <BadgeCheck size={18} className="info-icon" />
                                        <span>{user.category || 'Não definida'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* INTERESTS WIDGET */}
                            <div className="profile-widget">
                                <div className="widget-header">
                                    <h3 className="widget-title">Interesses</h3>
                                </div>
                                <div className="widget-body">
                                    {user.interests && user.interests.length > 0 ? (
                                        <div className="interests-pills">
                                            {user.interests.map((interest, idx) => (
                                                <span key={idx} className="interest-pill">{interest}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <button className="add-interest-btn" onClick={() => setIsEditModalOpen(true)}>
                                            <Plus size={16} /> Adicionar interesses
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* SOCIAL / FRIENDS WIDGET */}
                            <div className="profile-widget">
                                <div className="widget-header">
                                    <h3 className="widget-title">Amigos</h3>
                                    <button 
                                        className="widget-link-btn"
                                        onClick={() => navigateFade('/friends')}
                                    >
                                        Ver mais
                                    </button>
                                </div>
                                <div className="widget-body">
                                    <div className="friends-list">
                                        {MOCK_FRIENDS.slice(0, 2).map(friend => (
                                            <div key={friend.id} className="friend-row">
                                                <div className="friend-info">
                                                    <div className="friend-avatar-wrap">
                                                        <img src={friend.avatar} alt={friend.name} />
                                                        <div className="friend-online-dot" />
                                                    </div>
                                                    <div className="friend-details">
                                                        <h4>{friend.name}</h4>
                                                        <span>{friend.category}</span>
                                                    </div>
                                                </div>
                                                <div className="friend-actions">
                                                    <button className="friend-msg-btn" aria-label="Message">
                                                        <MessageCircle size={18} />
                                                    </button>
                                                    <button className="friend-more-btn" aria-label="More">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </aside>

                    </div>
                )}
                </div>
            </main>
            
            <BottomNavBar />

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
