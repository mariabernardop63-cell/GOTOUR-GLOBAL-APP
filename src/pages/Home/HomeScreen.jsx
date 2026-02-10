import React, { useState, useEffect } from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import SearchBarAI from '../../components/SearchBarAI/SearchBarAI';
import FilterChipsRow from '../../components/FilterChipsRow/FilterChipsRow';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import SearchResultsTabsHorizontal from '../../components/SearchResultsTabsHorizontal/SearchResultsTabsHorizontal';
import EmptyResultsComponent from '../../components/EmptyResultsComponent/EmptyResultsComponent';
import MustSeeSection from '../../components/MustSeeSection/MustSeeSection';
import NearYouSection from '../../components/NearYouSection/NearYouSection';
import SkeletonHome from '../../components/SkeletonHome/SkeletonHome';
import { Loader2 } from 'lucide-react';
import './HomeScreen.css';
import '../../components/HomeHeader/HomeFixedHeader.css';

const HomeScreen = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    // Search State
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTabLoading, setIsTabLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [results, setResults] = useState([]);

    // Country State
    const [selectedCountry, setSelectedCountry] = useState({ code: 'MZ', flag: '🇲🇿', name: 'Moçambique' });

    // Simulate initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (query) => {
        setIsSearching(true);
        setSearchQuery(query);
        setIsLoading(true);

        // Simulate network request delays
        // Requirement: Neon/Loading lasts 3-5 seconds (using 4s)
        setTimeout(() => {
            setIsLoading(false);
            // Simulate results check
            if (query.toLowerCase().includes('null') || query.toLowerCase().includes('empty') || query.toLowerCase().includes('nada')) {
                setResults([]);
            } else {
                setResults([1, 2, 3]); // Placeholder results
            }
        }, 4000);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsTabLoading(true);
        // Simulate quick fetch for tab change
        setTimeout(() => {
            setIsTabLoading(false);
        }, 1000);
    };

    const handleLogoClick = () => {
        // Reset to initial state
        setIsSearching(false);
        setSearchQuery('');
        setResults([]);
        setActiveTab('all');
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Fixed Header Wrapper */}
            <div className="home-fixed-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={handleLogoClick}
                    isDrawerOpen={isDrawerOpen}
                />
                <SearchBarAI
                    onSearch={handleSearch}
                    isSearching={isSearching}
                    isLoading={isLoading}
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                />
                {!isSearching && <FilterChipsRow />}
            </div>

            <div className="home-scroll-content">
                {isPageLoading ? (
                    <SkeletonHome />
                ) : !isSearching ? (
                    /* Default Home View */
                    <>
                        <MustSeeSection countryName={selectedCountry.name} />
                        <NearYouSection />

                        <div className="home-content">
                            <h2 className="section-title">Recomendações para você em {selectedCountry.name}</h2>

                            <div className="recommendations-list">
                                {/* Placeholder Cards */}
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="place-card">
                                        <div className="place-image-placeholder">
                                            {/* Image would go here */}
                                        </div>
                                        <div className="place-info">
                                            <h3 className="place-name">Hotel Paradise View {item}</h3>
                                            <p className="place-location">{selectedCountry.name} • 5.0 ★</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* Search Results View */
                    <div className="search-results-section">
                        <SearchResultsTabsHorizontal
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />

                        {/* Loading State for Tab Switch */}
                        {isTabLoading && !isLoading ? (
                            <div className="tab-loading-container">
                                <Loader2 className="spinner-icon spin" size={32} color="#1e293b" />
                            </div>
                        ) : (
                            /* Results Content */
                            <div className="search-results-content">
                                {results.length > 0 ? (
                                    <div className="recommendations-list">
                                        {/* Mock Results - Reusing cards style for now */}
                                        {results.map((item) => (
                                            <div key={item} className="place-card">
                                                <div className="place-image-placeholder"></div>
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
                <div style={{ height: '80px' }}></div>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default HomeScreen;
