import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import SearchBarAI from '../../components/SearchBarAI/SearchBarAI';
import FilterChipsRow from '../../components/FilterChipsRow/FilterChipsRow';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import SearchResultsTabsHorizontal from '../../components/SearchResultsTabsHorizontal/SearchResultsTabsHorizontal';
import EmptyResultsComponent from '../../components/EmptyResultsComponent/EmptyResultsComponent';
import MustSeeSection from '../../components/MustSeeSection/MustSeeSection';
import NearYouSection from '../../components/NearYouSection/NearYouSection';
import { SkeletonSearchBar, SkeletonChips, SkeletonMustSee, SkeletonNearYou, SkeletonRecommendations } from '../../components/SkeletonHome/SkeletonHome';
import useHomeData from '../../hooks/useHomeData';
import useScrollDirection from '../../hooks/useScrollDirection';
import { Loader2, LayoutGrid, MapPinned, User, Rss, Home } from 'lucide-react';
import './HomeScreen.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';

const HomeScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Search State
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTabLoading, setIsTabLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [results, setResults] = useState([]);

    // Country State
    const [selectedCountry, setSelectedCountry] = useState({ code: 'MZ', flag: '🇲🇿', name: 'Moçambique' });

    // Progressive data loading with caching, now re-triggered by country changes
    const homeData = useHomeData(selectedCountry.code);

    const handleSearch = (query) => {
        setIsSearching(true);
        setSearchQuery(query);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            if (query.toLowerCase().includes('null') || query.toLowerCase().includes('empty') || query.toLowerCase().includes('nada')) {
                setResults([]);
            } else {
                setResults([1, 2, 3]);
            }
        }, 4000);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsTabLoading(true);
        setTimeout(() => {
            setIsTabLoading(false);
        }, 1000);
    };

    // Optimized Scroll Hook
    const isScrollVisible = useScrollDirection();
    // Combine with search state: if searching, ignore hiding
    const isChipsVisible = isSearching ? true : isScrollVisible;

    const handleLogoClick = () => {
        setIsSearching(false);
        setSearchQuery('');
        setResults([]);
        setActiveTab('all');
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`home-page ${(!isChipsVisible && !isSearching) ? 'scrolled-hide-chips' : ''}`}>
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Sticky Header — Logo & Menu always visible immediately */}
            <div className="home-fixed-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={handleLogoClick}
                    isDrawerOpen={isDrawerOpen}
                />
                {/* Search + Desktop Nav in one row */}
                <div className="desktop-search-nav-row">
                    {/* SearchBar: skeleton while loading, real when ready */}
                    {homeData.searchBar.isLoading ? (
                        <SkeletonSearchBar />
                    ) : (
                        <SearchBarAI
                            onSearch={handleSearch}
                            isSearching={isSearching}
                            isLoading={isLoading}
                            selectedCountry={selectedCountry}
                            onCountryChange={setSelectedCountry}
                        />
                    )}

                    {/* Desktop-only horizontal nav strip */}
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
                                onClick={() => navigate(item.path)}
                                aria-label={item.label}
                            >
                                <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.2 : 1.5} />
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Chips: skeleton while loading, real when ready */}
                {!isSearching && (
                    homeData.chips.isLoading ? <SkeletonChips /> : <div className="content-fade-in"><FilterChipsRow /></div>
                )}
            </div>

            <div className="home-scroll-content">
                {!isSearching ? (
                    /* Default Home View — each section loads independently */
                    <>
                        {/* MustSee Section */}
                        {homeData.mustSee.isLoading ? (
                            <SkeletonMustSee />
                        ) : (
                            <div className="content-fade-in">
                                <MustSeeSection countryName={selectedCountry.name} />
                            </div>
                        )}

                        {/* NearYou Section */}
                        {homeData.nearYou.isLoading ? (
                            <SkeletonNearYou />
                        ) : (
                            <div className="content-fade-in">
                                <NearYouSection />
                            </div>
                        )}

                        {/* Recommendations Section */}
                        {homeData.recommendations.isLoading ? (
                            <SkeletonRecommendations />
                        ) : (
                            <div className="home-content content-fade-in">
                                <h2 className="section-title">Recomendações para você em {selectedCountry.name}</h2>
                                <div className="recommendations-list">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="place-card">
                                            <div className="place-image-placeholder" />
                                            <div className="place-info">
                                                <h3 className="place-name">Hotel Paradise View {item}</h3>
                                                <p className="place-location">{selectedCountry.name} • 5.0 ★</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Search Results View */
                    <div className="search-results-section">
                        <SearchResultsTabsHorizontal
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />

                        {isTabLoading && !isLoading ? (
                            <div className="tab-loading-container">
                                <Loader2 className="spinner-icon spin" size={32} color="#1e293b" />
                            </div>
                        ) : (
                            <div className="search-results-content">
                                {results.length > 0 ? (
                                    <div className="recommendations-list">
                                        {results.map((item) => (
                                            <div key={item} className="place-card">
                                                <div className="place-image-placeholder" />
                                                <div className="place-info">
                                                    <h3 className="place-name">Result for "{searchQuery}" {item}</h3>
                                                    <p className="place-location">{activeTab} • 4.8 ★</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !isLoading && <EmptyResultsComponent searchQuery={searchQuery} />
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Spacer for bottom nav */}
                <div style={{ height: '80px' }} />
            </div>

            <BottomNavBar />
        </div>
    );
};

export default HomeScreen;
