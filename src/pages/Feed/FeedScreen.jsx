import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Image, Video, MapPin, X, Clock, ChevronDown } from 'lucide-react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import './FeedScreen.css';

const FeedScreen = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogoClick = () => {
        navigate('/home');
    };

    const toggleSearchMode = () => {
        setIsSearchMode(!isSearchMode);
        setSearchQuery(''); // Reset query when toggling
    };

    const recentSearches = [
        "Praias em Maputo",
        "Restaurantes em Nampula",
        "Ilha de Moçambique",
        "Hotéis baratos",
        "Passeios turísticos"
    ];

    return (
        <div className="feed-page">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* FIXED HEADER */}
            <div className="feed-fixed-top">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={handleLogoClick}
                    isDrawerOpen={isDrawerOpen}
                />

                {/* SEPARATOR GLOW */}
                <div className="header-separator"></div>

                {/* SEARCH OVERLAY (Takes over the header/filter area visibly or sits on top) */}
                {isSearchMode ? (
                    <div className="feed-search-bar-container animate-slide-down">
                        <div className="feed-search-input-wrapper">
                            <Search className="search-icon-input" size={20} />
                            <input
                                type="text"
                                placeholder="Pesquisar publicações, lugares, usuários..."
                                className="feed-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            {searchQuery && (
                                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <button className="cancel-search-btn" onClick={toggleSearchMode}>
                            Cancelar
                        </button>
                    </div>
                ) : (
                    /* FILTER BAR (Visible when NOT in search mode) */
                    <div className="feed-filter-bar">
                        <div className="country-filter">
                            <span className="flag-emoji">🇲🇿</span>
                            <ChevronDown size={16} className="dropdown-arrow" />
                        </div>

                        <div className="filter-actions">
                            <button className="icon-btn" onClick={toggleSearchMode} aria-label="Pesquisar">
                                <Search size={22} />
                            </button>
                            <button className="icon-btn" aria-label="Filtros">
                                <SlidersHorizontal size={22} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* MAIN CONTENT */}
            <div className="feed-scrollable-content">
                {isSearchMode ? (
                    /* SEARCH RESULTS / RECENT */
                    <div className="search-mode-content">
                        <div className="recent-searches-section">
                            <h3>Pesquisas recentes</h3>
                            <div className="recent-list">
                                {recentSearches.map((term, index) => (
                                    <div key={index} className="recent-item">
                                        <div className="recent-left">
                                            <Clock size={16} className="recent-icon" />
                                            <span>{term}</span>
                                        </div>
                                        <button className="remove-recent-btn">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* NORMAL FEED */
                    <>
                        {/* CREATE POST WIDGET */}
                        <div className="create-post-widget">
                            <div className="post-input-row">
                                <div className="upload-avatar-btn">
                                    <Image size={24} color="#6b7280" />
                                </div>
                                <div className="fake-input">
                                    O que você está pensando?
                                </div>
                            </div>
                            <div className="post-actions-row">
                                <button className="post-action-chip">
                                    <Image size={16} /> Foto
                                </button>
                                <button className="post-action-chip">
                                    <Video size={16} /> Vídeo
                                </button>
                                <button className="post-action-chip">
                                    <MapPin size={16} /> Localização
                                </button>
                            </div>
                        </div>

                        {/* POSTS LIST (EMPTY STATE) */}
                        <div className="feed-posts-area">
                            <div className="empty-feed-state">
                                <h2>Nenhuma publicação encontrada</h2>
                                <p>Seja o primeiro a compartilhar uma experiência incrível.<br />Publique fotos, vídeos e lugares que você recomenda.</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <BottomNavBar />
        </div>
    );
};

export default FeedScreen;
