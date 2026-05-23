import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User, MessageCircle, MoreHorizontal, Image,
    Layers, Bookmark, Heart, Plus, Share2, MapPin,
    BadgeCheck, Settings, X, Pencil, ChevronDown,
    Map, Navigation, Tent, Camera, Edit, UserPlus, UserMinus,
    LogOut, Users
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { getDisplayName, getUsername, uploadCover, uploadAvatarFromBlob, upsertProfile } from '../../lib/profileService';
import { friendsService } from '../../lib/friendsService';
import { supabase } from '../../lib/supabase';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './ProfileScreen.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';

const ProfileScreen = ({ isModal = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const friendData = location.state?.user;
    const isMe = !friendData;

    const { setModalBackground, modalBackground, navigateFade } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalOpenToBio, setModalOpenToBio] = useState(false);
    const [friendRequested, setFriendRequested] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);

    const [contentFilter, setContentFilter] = useState('Tudo');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const filterRef = useRef(null);
    const coverInputRef = useRef(null);

    const [friendCount, setFriendCount] = useState(0);
    const [friendsList, setFriendsList] = useState([]);

    // View-mode: full data for the other user
    const [fullViewProfile, setFullViewProfile] = useState(null);
    const [viewFriendCount, setViewFriendCount] = useState(0);
    const [mutualFriends, setMutualFriends] = useState([]);
    const [isLoadingViewProfile, setIsLoadingViewProfile] = useState(false);

    const { user: authUser, profile, profileLoading, refreshProfile, signOut } = useAuth();

    const displayName = isMe
        ? getDisplayName(profile, authUser)
        : (friendData?.name || 'Utilizador');

    const username = isMe
        ? getUsername(profile, authUser)
        : (friendData?.username ? `@${friendData.username}` : '@utilizador');

    const bio = isMe ? (profile?.bio || null) : (fullViewProfile?.bio || friendData?.bio || null);
    const avatarUrl = isMe
        ? (profile?.avatar_url || null)
        : (fullViewProfile?.avatar_url || friendData?.avatar_url || friendData?.avatar || null);
    const coverUrl = isMe ? (profile?.cover_url || null) : (fullViewProfile?.cover_url || friendData?.cover_url || null);
    const category = isMe ? (profile?.category || null) : (fullViewProfile?.category || friendData?.category || null);
    const interests = isMe ? (profile?.interests || []) : (fullViewProfile?.interests || friendData?.interests || []);

    // Lock body scroll on desktop when profile modal is open
    useEffect(() => {
        const isDesktop = window.innerWidth >= 1025;
        if (isDesktop) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, []);

    // Load real friends data (own profile)
    useEffect(() => {
        if (!isMe || !authUser?.id) return;
        friendsService.getFriends(authUser.id)
            .then(data => {
                setFriendCount(data.length);
                setFriendsList(data);
            })
            .catch(err => console.error('Error loading friends for profile:', err));
    }, [authUser?.id, isMe]);

    // Fetch full profile when viewing another user
    useEffect(() => {
        if (isMe || !friendData?.id) return;
        setIsLoadingViewProfile(true);
        (async () => {
            try {
                const [{ data: fullP }, viewedFriends] = await Promise.all([
                    supabase.from('profiles').select('*').eq('id', friendData.id).single(),
                    friendsService.getFriends(friendData.id).catch(() => []),
                ]);
                if (fullP) setFullViewProfile(fullP);
                setViewFriendCount(viewedFriends.length);

                // Compute mutual friends if logged in
                if (authUser?.id) {
                    const myFriends = await friendsService.getFriends(authUser.id).catch(() => []);
                    const myIds = new Set(myFriends.map(f => f.id));
                    setMutualFriends(viewedFriends.filter(f => myIds.has(f.id)));
                }
            } catch (err) {
                console.error('Error fetching full profile view:', err);
            } finally {
                setIsLoadingViewProfile(false);
            }
        })();
    }, [isMe, friendData?.id, authUser?.id]);

    const handleSignOut = async () => {
        try {
            await signOut();
            setModalBackground(null);
            navigateFade('/home');
        } catch (err) {
            console.error('Erro ao terminar sessão:', err);
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

    const handleCoverFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !authUser?.id) return;
        e.target.value = '';
        setIsUploadingCover(true);
        try {
            const url = await uploadCover(authUser.id, file);
            await upsertProfile(authUser.id, { cover_url: url });
            await refreshProfile();
        } catch (err) {
            console.error('Error uploading cover:', err);
        } finally {
            setIsUploadingCover(false);
        }
    };

    const handleSaveProfile = async () => {
        await refreshProfile();
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (isFilterDropdownOpen && filterRef.current && !filterRef.current.contains(e.target)) {
                setIsFilterDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isFilterDropdownOpen]);

    const FILTERS = ['Tudo', 'Publicações', 'Coleções', 'Visitar Depois', 'Favorito'];

    const FriendAvatarItem = ({ friend }) => {
        const initials = (friend.name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        return (
            <button
                className="friends-widget-item"
                onClick={() => navigate('/profile', { state: { user: friend } })}
                title={friend.name}
            >
                {friend.avatar ? (
                    <img src={friend.avatar} alt={friend.name} className="friends-widget-avatar" />
                ) : (
                    <div className="friends-widget-avatar friends-widget-initials">{initials}</div>
                )}
                <span className="friends-widget-name">{friend.name?.split(' ')[0] || 'Amigo'}</span>
            </button>
        );
    };

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

            <div className="home-fixed-header mobile-only profile-fixed-header profile-list-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigateFade('/home')}
                    isDrawerOpen={isDrawerOpen}
                />
            </div>

            <main className="profile-main-wrapper">
                <div className="profile-scroll-content">
                    {profileLoading && isMe ? (
                        <div className="profile-skeleton-loader">A carregar perfil...</div>
                    ) : (
                        <div className="profile-grid-layout">

                            {/* LEFT/MAIN COLUMN */}
                            <div className="profile-main-col">

                                {/* COVER & AVATAR BLOCK */}
                                <div className="profile-cover-card">
                                    <div className="profile-cover-image-area">
                                        {coverUrl ? (
                                            <img src={coverUrl} alt="Capa" className="cover-img" />
                                        ) : (
                                            <div className="cover-gradient" />
                                        )}

                                        {isMe && (
                                            <button
                                                className="profile-cover-edit-btn"
                                                onClick={() => setIsEditModalOpen(true)}
                                            >
                                                <Edit size={14} />
                                                <span>Editar Perfil</span>
                                            </button>
                                        )}

                                        {isMe && (
                                            <>
                                                <button
                                                    className="profile-cover-camera-btn"
                                                    onClick={() => coverInputRef.current?.click()}
                                                    disabled={isUploadingCover}
                                                    title="Alterar capa"
                                                >
                                                    {isUploadingCover ? (
                                                        <div className="cover-upload-spinner" />
                                                    ) : (
                                                        <Camera size={18} />
                                                    )}
                                                </button>
                                                <input
                                                    ref={coverInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={handleCoverFileChange}
                                                />
                                            </>
                                        )}

                                        <div className="profile-cover-overlay-info">
                                            <div className="profile-cover-avatar">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt={displayName} />
                                                ) : (
                                                    <div className="profile-default-avatar">
                                                        <User size={36} color="#94a3b8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="profile-cover-text">
                                                <h1 className="cover-name">{displayName}</h1>
                                                <p className="cover-username">{username}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STATS BAR */}
                                    <div className="profile-stats-bar">
                                        <div className="profile-stat-box">
                                            <span className="stat-number">0</span>
                                            <span className="stat-label">Posts</span>
                                            <div className="stat-active-indicator" />
                                        </div>
                                        <div className="profile-stat-box">
                                            <span className="stat-number">{isMe ? friendCount : viewFriendCount}</span>
                                            <span className="stat-label">Amigos</span>
                                        </div>
                                        <div className="profile-stat-box">
                                            <span className="stat-number">0</span>
                                            <span className="stat-label">Curtidas</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
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
                                        <button className="profile-premium-btn profile-premium-btn--secondary" onClick={() => {
                                            setModalBackground(null);
                                            navigate('/messages', {
                                                state: {
                                                    openWithUserId: friendData.id,
                                                    openWithUser: {
                                                        id: friendData.id,
                                                        name: displayName,
                                                        username: (username || '').replace('@', ''),
                                                        avatar_url: avatarUrl,
                                                    }
                                                }
                                            });
                                        }}>
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

                                {/* EMPTY POSTS STATE */}
                                <div className="profile-posts-empty">
                                    <div className="profile-posts-empty-icon">
                                        <Image size={40} color="#cbd5e1" />
                                    </div>
                                    <p className="profile-posts-empty-title">Nenhuma publicação ainda</p>
                                    <p className="profile-posts-empty-sub">As suas publicações aparecerão aqui</p>
                                </div>

                            </div>

                            {/* RIGHT SIDEBAR */}
                            <aside className="profile-sidebar">

                                {/* BIOGRAPHY WIDGET */}
                                <div className="profile-widget">
                                    <div className="widget-header">
                                        <h3 className="widget-title">Biografia</h3>
                                        {isMe && (
                                            <button className="widget-more-btn" onClick={() => setIsEditModalOpen(true)}>
                                                <Pencil size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="widget-body">
                                        {bio ? (
                                            <p className="bio-text">{bio}</p>
                                        ) : (
                                            isMe ? (
                                                <button
                                                    className="bio-placeholder-btn"
                                                    onClick={() => { setModalOpenToBio(true); setIsEditModalOpen(true); }}
                                                >
                                                    Diga mais sobre você
                                                </button>
                                            ) : (
                                                <p className="bio-empty-other">Sem biografia</p>
                                            )
                                        )}
                                    </div>

                                    {(category) && (
                                        <div className="widget-info-list">
                                            {category && (
                                                <div className="info-item">
                                                    <BadgeCheck size={18} className="info-icon" />
                                                    <span>{category}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {isMe && !category && (
                                        <button
                                            className="widget-configure-btn"
                                            onClick={() => navigate('/settings', { state: { openSetting: 'edit_profile_type' } })}
                                        >
                                            <Plus size={14} />
                                            <span>Configurar tipo de viajante</span>
                                        </button>
                                    )}
                                </div>

                                {/* INTERESTS WIDGET */}
                                <div className="profile-widget">
                                    <div className="widget-header">
                                        <h3 className="widget-title">Interesses</h3>
                                        {isMe && interests.length > 0 && (
                                            <button
                                                className="widget-more-btn"
                                                onClick={() => navigate('/settings', { state: { openSetting: 'edit_interests' } })}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="widget-body">
                                        {interests && interests.length > 0 ? (
                                            <div className="interests-pills">
                                                {interests.map((interest, idx) => (
                                                    <span key={idx} className="interest-pill">{interest}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            isMe ? (
                                                <button
                                                    className="add-interest-btn"
                                                    onClick={() => navigate('/settings', { state: { openSetting: 'edit_interests' } })}
                                                >
                                                    <Plus size={16} /> Configurar interesses
                                                </button>
                                            ) : (
                                                <p className="bio-empty-other">Sem interesses definidos</p>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* FRIENDS WIDGET */}
                                <div className="profile-widget">
                                    <div className="widget-header">
                                        <h3 className="widget-title">
                                            {isMe
                                                ? <>Amigos {friendCount > 0 && <span className="widget-count">({friendCount})</span>}</>
                                                : <>Amigos em comum {mutualFriends.length > 0 && <span className="widget-count">({mutualFriends.length})</span>}</>
                                            }
                                        </h3>
                                        {isMe && friendsList.length > 0 && (
                                            <button className="widget-link-btn" onClick={() => navigateFade('/friends')}>
                                                Ver todos
                                            </button>
                                        )}
                                    </div>
                                    <div className="widget-body">
                                        {isMe ? (
                                            friendsList.length > 0 ? (
                                                <div className="friends-widget-grid">
                                                    {friendsList.slice(0, 6).map(friend => (
                                                        <FriendAvatarItem key={friend.id} friend={friend} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="friends-empty-state">
                                                    <Users size={32} color="#cbd5e1" />
                                                    <p className="friends-empty-text">Ainda não tem amigos adicionados</p>
                                                    <button className="add-friends-btn" onClick={() => navigateFade('/friends')}>
                                                        <UserPlus size={16} />
                                                        <span>Adicionar Amigos</span>
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            mutualFriends.length > 0 ? (
                                                <div className="friends-widget-grid">
                                                    {mutualFriends.slice(0, 3).map(friend => (
                                                        <FriendAvatarItem key={friend.id} friend={friend} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="friends-empty-state" style={{ padding: '12px 0' }}>
                                                    <Users size={28} color="#cbd5e1" />
                                                    <p className="friends-empty-text">Nenhum amigo em comum</p>
                                                </div>
                                            )
                                        )}
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
                onClose={() => { setIsEditModalOpen(false); setModalOpenToBio(false); }}
                onSave={handleSaveProfile}
                openToBio={modalOpenToBio}
            />
        </div>
    );
};

export default ProfileScreen;
