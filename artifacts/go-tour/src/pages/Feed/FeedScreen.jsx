import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Search, ListFilter, User, Image, Video, MapPin, 
    MoreHorizontal, Users, Calendar, PartyPopper, Award,
    Heart, MessageCircle, Share2, Radio, Home, LayoutGrid, Rss, MapPinned, X,
    UserPlus, UserMinus, MessageSquare, Eye
} from 'lucide-react';
import { useNavigation } from '../../App';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import gotourLogo from '../../assets/images/gotour_icon.png';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './FeedScreen.css';

// Mock Data
const MOCK_USER_AVATAR = "https://i.pravatar.cc/150?img=11";

const RECENT_STORIES = [
    {
        id: 1,
        author: 'Sofia Almeida',
        time: '2 Dias atrás',
        avatar: 'https://i.pravatar.cc/150?img=5',
        text: 'Pôr do sol em Tofo! 🌅🌴',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 2,
        author: 'Carlos Mendes',
        time: '3 Dias atrás',
        avatar: 'https://i.pravatar.cc/150?img=8',
        text: 'A explorar as dunas. 🚙💨',
        image: 'https://images.unsplash.com/photo-1547471080-7fc2caa6f17f?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 3,
        author: 'Ana Silva',
        time: '4 Dias atrás',
        avatar: 'https://i.pravatar.cc/150?img=9',
        text: 'Mergulho incrível! 🐠🌊',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400'
    }
];

const MAIN_POSTS = [
    {
        id: 1,
        author: 'João Ricardo',
        time: '4 min atrás',
        avatar: 'https://i.pravatar.cc/150?img=12',
        text: 'Pessoal, o que acham de planearmos uma viagem ao Arquipélago do Bazaruto para o próximo feriado? As águas estão perfeitas nesta altura do ano!',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=1000'
    }
];

const EXTRA_POSTS = [
    {
        id: 10,
        author: 'Mariana Costa',
        time: '25 min atrás',
        avatar: 'https://i.pravatar.cc/150?img=20',
        text: 'Acabo de chegar à Ilha de Moçambique! A fortaleza de São Sebastião é simplesmente majestosa. Quem já esteve aqui? 🏰🌊',
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 11,
        author: 'Ricardo Nhampossa',
        time: '1 hora atrás',
        avatar: 'https://i.pravatar.cc/150?img=15',
        text: 'Trilha matinal pela Serra da Gorongosa. A natureza moçambicana nunca deixa de me surpreender! 🌿🦜',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000'
    }
];

const INITIAL_SUGGESTIONS = [
    { id: 1, name: 'Tânia Dias', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Pedro Costa', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 3, name: 'Luísa Santos', avatar: 'https://i.pravatar.cc/150?img=16' }
];

const COMUNIDADES = [
    { id: 1, name: 'Mochileiros MZ', unread: 4, avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=150' },
    { id: 2, name: 'Amantes da Praia', unread: 0, avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=150' }
];

const EVENTOS = [
    { id: 1, name: 'Concerto Neyma', date: 'Hoje', avatar: 'https://images.unsplash.com/photo-1540039155732-d68a9fc4c77c?auto=format&fit=crop&q=80&w=150' },
    { id: 2, name: 'Festival Tropical', date: 'Amanhã', avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150' }
];

const LIVE_STREAMS = [
    { id: 1, user: 'Ana Viajante', viewers: 234, avatar: 'https://i.pravatar.cc/150?img=25', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300' },
    { id: 2, user: 'Marco Explorer', viewers: 89, avatar: 'https://i.pravatar.cc/150?img=53', thumb: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=300' },
    { id: 3, user: 'Sofia Travel', viewers: 512, avatar: 'https://i.pravatar.cc/150?img=44', thumb: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=300' },
    { id: 4, user: 'DJ Maputo', viewers: 1200, avatar: 'https://i.pravatar.cc/150?img=60', thumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300' },
];

const FeedScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground, navigateFade } = useNavigation();
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
    const totalSuggestions = 25;

    const imageInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const remaining = 10 - uploadedImages.length;
        const toAdd = files.slice(0, remaining).map(f => URL.createObjectURL(f));
        setUploadedImages(prev => [...prev, ...toAdd]);
        // Reset input so same file can be re-selected
        e.target.value = '';
    };

    const removeImage = (index) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const clearAllImages = () => {
        setUploadedImages([]);
    };

    const handleAddFriend = (id) => {
        setSuggestions(prev => prev.filter(s => s.id !== id));
    };

    const handleRemoveSuggestion = (id) => {
        setSuggestions(prev => prev.filter(s => s.id !== id));
    };

    // Thumbnails: show max 3, last one with +N overlay
    const visibleThumbs = uploadedImages.slice(0, 3);
    const extraCount = uploadedImages.length - 3;
    const hasUploads = uploadedImages.length > 0;

    const renderPostCard = (post) => (
        <div key={post.id} className="feed-card feed-main-post">
            <div className="feed-post-header">
                <div className="feed-post-author">
                    <img src={post.avatar} alt={post.author} />
                    <div className="feed-post-author-info">
                        <h4>{post.author}</h4>
                        <p>{post.time}</p>
                    </div>
                </div>
                <MoreHorizontal size={20} color="#94A3B8" />
            </div>
            <div className="feed-main-post-text">
                {post.text}
            </div>
            <img src={post.image} alt="Post" className="feed-main-post-image" />
            
            <div className="feed-post-social-actions">
                <button className="feed-social-btn">
                    <Heart size={20} />
                    <span>Adoro</span>
                </button>
                <button className="feed-social-btn">
                    <MessageCircle size={20} />
                    <span>Comentar</span>
                </button>
                <button className="feed-social-btn">
                    <Share2 size={20} />
                    <span>Partilhar</span>
                </button>
            </div>
        </div>
    );

    const renderAdBlock = (adId) => (
        <div key={adId} className="feed-ad-block">
            <div className="feed-ad-label">Anúncio · Patrocinado</div>
            <div className="feed-ad-content">
                <div className="feed-ad-icon">Ad</div>
                <div className="feed-ad-info">
                    <span className="feed-ad-title">
                        {adId === 1 && 'Booking.com — Hotéis em Maputo'}
                        {adId === 2 && 'TAP Air Portugal — Voos desde 299€'}
                        {adId === 3 && 'Airbnb — Estadias Únicas em Moçambique'}
                    </span>
                    <span className="feed-ad-desc">
                        {adId === 1 && 'Reserve agora com até 40% de desconto. Cancelamento gratuito na maioria dos quartos.'}
                        {adId === 2 && 'Voos directos Lisboa–Maputo. Reserve com antecedência e poupe.'}
                        {adId === 3 && 'Descubra casas, apartamentos e experiências locais autênticas.'}
                    </span>
                    <span className="feed-ad-url">
                        {adId === 1 && 'booking.com'}
                        {adId === 2 && 'flytap.com'}
                        {adId === 3 && 'airbnb.com'}
                    </span>
                </div>
            </div>
            <button className="feed-ad-cta">Saber mais</button>
        </div>
    );

    return (
        <div className="feed-page">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <input 
                type="file" 
                ref={imageInputRef} 
                style={{ display: 'none' }} 
                accept="image/*" 
                multiple
                onChange={handleImageUpload} 
            />

            {/* --- FIXED HEADER --- */}
            <header className="feed-header feed-header-fixed">
                <div className="feed-header-left">
                    <button 
                        onClick={() => navigateFade('/home')} 
                        className="logo-button"
                        aria-label="Go to Home"
                    >
                        <img src={gotourLogo} alt="GoTour" className="home-header-logo" />
                    </button>
                </div>

                <div className="feed-header-center">
                    <div className="feed-search-bar">
                        <Search size={18} color="#94A3B8" />
                        <input type="text" placeholder="Pesquisar destinos, pessoas..." />
                    </div>
                </div>

                <div className="feed-header-right" style={{ gap: '12px' }}>
                    <button 
                        onClick={() => {
                            setModalBackground(location);
                            navigateFade('/profile');
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        aria-label="Ir para o Perfil"
                    >
                        <User size={24} strokeWidth={2} color="#475569" />
                    </button>
                    <button 
                        className="menu-pill-button"
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Toggle menu"
                    >
                        <ListFilter size={24} strokeWidth={2.5} color="#0e172a" />
                    </button>
                </div>
            </header>

            {/* --- MAIN GRID LAYOUT --- */}
            <main className="feed-main-container">
                
                {/* --- LEFT COLUMN --- */}
                <div className="feed-col-main">
                    
                    {/* Share Card */}
                    <div className="feed-card">
                        <div className="feed-share-top">
                            <img src={MOCK_USER_AVATAR} alt="You" className="feed-avatar" />
                            <input 
                                type="text" 
                                className="feed-share-input" 
                                placeholder="Partilhe a sua próxima viagem com a comunidade..." 
                            />
                        </div>
                        <div className="feed-share-bottom">
                            <div className="feed-share-actions">
                                {hasUploads ? (
                                    <>
                                        {visibleThumbs.map((src, idx) => (
                                            <div key={idx} className="feed-preview-thumb">
                                                {idx === 2 && extraCount > 0 ? (
                                                    <>
                                                        <img src={src} alt="preview" />
                                                        <div className="feed-preview-overlay">+{extraCount}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <img src={src} alt="preview" />
                                                        <button className="feed-preview-remove" onClick={() => removeImage(idx)}>&times;</button>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        {uploadedImages.length < 10 && (
                                            <button 
                                                className="feed-preview-add"
                                                onClick={() => imageInputRef.current.click()}
                                                title="Adicionar mais"
                                            >+</button>
                                        )}
                                        <button 
                                            className="feed-preview-clear"
                                            onClick={clearAllImages}
                                            title="Remover todas"
                                        >
                                            <X size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="feed-share-btn" onClick={() => imageInputRef.current.click()}>
                                            <Image size={18} /> Imagem
                                        </button>
                                        <button className="feed-share-btn" onClick={() => imageInputRef.current.click()}>
                                            <Video size={18} /> Vídeo
                                        </button>
                                        <button className="feed-share-btn">
                                            <MapPin size={18} /> Local
                                        </button>
                                        <button className="feed-share-btn">
                                            <Radio size={18} /> Live
                                        </button>
                                    </>
                                )}
                            </div>
                            <button className="feed-post-btn">
                                Publicar
                            </button>
                        </div>
                    </div>

                    {/* Recent Stories Section */}
                    <div>
                        <h3 className="feed-section-title" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>POSTS EM DESTAQUES</h3>
                        <div className="feed-stories-grid">
                            {RECENT_STORIES.map(story => (
                                <div key={story.id} className="feed-story-card">
                                    <div className="feed-post-header">
                                        <div className="feed-post-author">
                                            <img src={story.avatar} alt={story.author} />
                                            <div className="feed-post-author-info">
                                                <h4>{story.author}</h4>
                                                <p>{story.time}</p>
                                            </div>
                                        </div>
                                        <MoreHorizontal size={18} color="#94A3B8" />
                                    </div>
                                    <div className="feed-story-text">
                                        {story.text}
                                    </div>
                                    <img src={story.image} alt="Story" className="feed-story-image" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feed Post 1 */}
                    {MAIN_POSTS.map(post => renderPostCard(post))}

                    {/* Lives Section */}
                    <div>
                        <h3 className="feed-section-title" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <Radio size={16} style={{ marginRight: '6px', color: '#EF4444' }} /> LIVES AGORA
                        </h3>
                        <div className="feed-lives-grid">
                            {LIVE_STREAMS.map(live => (
                                <div key={live.id} className="feed-live-card">
                                    <div className="feed-live-thumb">
                                        <img src={live.thumb} alt={live.user} />
                                        <div className="feed-live-badge">
                                            <span className="feed-live-dot" /> LIVE
                                        </div>
                                        <div className="feed-live-viewers">
                                            <Eye size={12} /> {live.viewers >= 1000 ? `${(live.viewers/1000).toFixed(1)}k` : live.viewers}
                                        </div>
                                    </div>
                                    <div className="feed-live-info">
                                        <img src={live.avatar} alt={live.user} className="feed-live-avatar" />
                                        <span>{live.user}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Extra Posts */}
                    {EXTRA_POSTS.map(post => renderPostCard(post))}

                </div>

                {/* --- RIGHT COLUMN (WIDGETS) --- */}
                <aside className="feed-col-sidebar">
                    
                    {/* Widget 1: Recomendações de amigos */}
                    <div className="feed-widget">
                        <div className="feed-widget-header">
                            <div className="feed-widget-title-row">
                                <Users size={20} className="feed-widget-icon" />
                                <span className="feed-widget-title">Recomendações de amigos</span>
                            </div>
                            <span className="feed-widget-count">{suggestions.length}/{totalSuggestions}</span>
                        </div>
                        <div className="feed-widget-list">
                            {suggestions.map(c => (
                                <div key={c.id} className="feed-widget-row">
                                    <div className="feed-widget-user">
                                        <img src={c.avatar} alt={c.name} />
                                        <span>{c.name}</span>
                                    </div>
                                    <div className="feed-widget-actions">
                                        <button 
                                            className="feed-widget-action-btn add"
                                            onClick={() => handleAddFriend(c.id)}
                                            title="Adicionar amigo"
                                        >
                                            <UserPlus size={14} />
                                        </button>
                                        <button 
                                            className="feed-widget-action-btn remove"
                                            onClick={() => handleRemoveSuggestion(c.id)}
                                            title="Remover sugestão"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div 
                                className="feed-widget-ver-mais"
                                onClick={() => navigateFade('/friends?tab=sugestoes')}
                                style={{ cursor: 'pointer' }}
                            >
                                Ver mais
                            </div>
                        </div>
                    </div>

                    {/* Widget 2: Minhas Comunidades */}
                    <div className="feed-widget">
                        <div className="feed-widget-header">
                            <div className="feed-widget-title-row">
                                <Users size={20} className="feed-widget-icon" />
                                <span className="feed-widget-title" style={{ textTransform: 'uppercase' }}>Minhas Comunidades</span>
                            </div>
                            <span className="feed-widget-count">{COMUNIDADES.length}</span>
                        </div>
                        <div className="feed-widget-list">
                            {COMUNIDADES.map(g => (
                                <div key={g.id} className="feed-widget-row">
                                    <div className="feed-widget-user">
                                        <img src={g.avatar} alt={g.name} style={{ borderRadius: '8px' }} />
                                        <span>{g.name}</span>
                                    </div>
                                    {g.unread > 0 ? (
                                        <span className="feed-community-unread">+{g.unread}</span>
                                    ) : (
                                        <span className="feed-widget-value" style={{ color: '#94A3B8', fontSize: '11px' }}>—</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Widget 3: Eventos */}
                    <div className="feed-widget">
                        <div className="feed-widget-header">
                            <div className="feed-widget-title-row">
                                <PartyPopper size={20} className="feed-widget-icon" />
                                <span className="feed-widget-title" style={{ textTransform: 'uppercase' }}>Eventos</span>
                            </div>
                            <span className="feed-widget-count">1/25</span>
                        </div>
                        <div className="feed-widget-list">
                            {EVENTOS.map(e => (
                                <div key={e.id} className="feed-widget-row">
                                    <div className="feed-widget-user">
                                        <img src={e.avatar} alt={e.name} style={{ borderRadius: '8px' }} />
                                        <span>{e.name}</span>
                                    </div>
                                    <span className="feed-widget-value">{e.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ad Blocks (sticky when scrolled) */}
                    <div className="feed-ads-sticky-zone">
                        {renderAdBlock(1)}
                        {renderAdBlock(2)}
                        {renderAdBlock(3)}
                    </div>

                </aside>
            </main>

            {/* Desktop-only floating nav strip */}
            <nav className="desktop-nav-strip">
                {[
                    { id: 'home', label: 'Home', icon: Home, path: '/home' },
                    { id: 'categories', label: 'Categorias', icon: LayoutGrid, path: '/categories' },
                    { id: 'feed', label: 'Feed', icon: Rss, path: '/feed' },
                    { id: 'map', label: 'Mapa', icon: MapPinned, path: '/map' },
                    { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
                ].map(item => (
                    <button
                        key={item.id}
                        className={`desktop-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => {
                            if (item.id === 'profile') {
                                setModalBackground(location);
                            } else {
                                setModalBackground(null);
                            }
                            navigateFade(item.path);
                        }}
                        aria-label={item.label}
                    >
                        <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.2 : 1.5} />
                    </button>
                ))}
            </nav>

            <BottomNavBar />
        </div>
    );
};

export default FeedScreen;
