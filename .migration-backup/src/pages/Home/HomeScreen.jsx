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
import ExploreRegionsSection from '../../components/ExploreRegionsSection/ExploreRegionsSection';
import MostSearchedSection from '../../components/MostSearchedSection/MostSearchedSection';
import BudgetDestinationsSection from '../../components/BudgetDestinationsSection/BudgetDestinationsSection';

import { ValueSection, LuxurySection } from '../../components/HomeSections/ValueAndLuxurySections';
import { RecommendedSection, HotelsSection, RestaurantsSection } from '../../components/HomeSections/PlacesSections';
import { ApartmentsSection, ResortsSection, GuesthouseSection } from '../../components/HomeSections/LodgingSections';
import { HostelsSection, VillasSection, LodgesSection } from '../../components/HomeSections/AlternativeStaysSections';
import {
    ExperiencesSection, EventsSection, CultureSection, 
    BeachesSection, NightlifeSection, TransportSection, CarRentalSection, 
    FlightsSection, ShoppingServicesSection, SectionWrapper, UniversalCard
} from '../../components/HomeSections/NewCategoriesSections';
import ExploreCTA from '../../components/HomeSections/ExploreCTA';
import FooterSection from '../Welcome/FooterSection/FooterSection';

import { 
    SkeletonSearchBar, 
    SkeletonChips, 
    SkeletonMustSee, 
    SkeletonNearYou, 
    SkeletonRecommendations,
    SkeletonExploreRegions,
    SkeletonStandardSection
} from '../../components/SkeletonHome/SkeletonHome';
import useHomeData from '../../hooks/useHomeData';
import { Loader2, LayoutGrid, MapPinned, User, Rss, Home, ChevronDown, Globe, Star, MapPin, Clock, Sparkles, Building2, ConciergeBell, Utensils, Camera, Zap, Ticket, Landmark, Waves, Palmtree, Moon, Bus, Navigation2, Car, Plane, ShoppingBag, SlidersHorizontal, Search, MapIcon, CalendarRange, Users, X } from 'lucide-react';
import gotourLogo from '../../assets/images/gotour_icon.png';
import { useNavigation } from '../../App';

// Import MOCK DATA for Results Grid
import { MOCK_RECOMMENDED, MOCK_HOTELS, MOCK_RESTAURANTS } from '../../components/HomeSections/PlacesSections';
import { 
    MOCK_EXPERIENCES, MOCK_ACTIVITIES, MOCK_EVENTS, MOCK_CULTURE, MOCK_BEACHES, 
    MOCK_NIGHTLIFE, MOCK_TRANSPORT, MOCK_CARRENTAL, MOCK_FLIGHTS, MOCK_SHOPPING 
} from '../../components/HomeSections/NewCategoriesSections';

import './HomeScreen.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';

const SECTION_METADATA = {
    'Hotéis': { icon: ConciergeBell, subtitle: 'As melhores estadias para todos os padrões de excelência', color: 'badge-indigo' },
    'Alojamentos': { icon: ConciergeBell, subtitle: 'Opções de estadia diversas', color: 'badge-indigo' },
    'Restaurantes': { icon: Utensils, subtitle: 'Sabores autênticos locais', color: 'badge-amber' },
    'Experiências': { icon: Camera, subtitle: 'Viva momentos que ficam na memória', color: 'badge-rose' },
    'Atividades': { icon: Zap, subtitle: 'Ação e aventuras ao ar livre', color: 'badge-gold' },
    'Eventos': { icon: Ticket, subtitle: 'Concertos musicais, festivais e grandes feiras', color: 'badge-indigo' },
    'Cultura': { icon: Landmark, subtitle: 'Descubra a riqueza histórica e da arte nacional', color: 'badge-gold' },
    'Praias': { icon: Palmtree, subtitle: 'As melhores extensões costeiras de África', color: 'badge-emerald' },
    'Praias & Ilhas': { icon: Palmtree, subtitle: 'As melhores extensões costeiras de África', color: 'badge-emerald' },
    'Vida Noturna': { icon: Moon, subtitle: 'Diversão garantida quando o sol se põe', color: 'badge-rose' },
    'Transportes': { icon: Navigation2, subtitle: 'Mova-se entre distritos e cidades com facilidade', color: 'badge-slate' },
    'Aluguer de Carros': { icon: Car, subtitle: 'A estrada é sua, viaje no seu ritmo', color: 'badge-amber' },
    'Voos Nacionais': { icon: Plane, subtitle: 'Encurte a viagem até ao seu paraíso', color: 'badge-indigo' },
    'Voos': { icon: Plane, subtitle: 'Encurte a viagem até ao seu paraíso', color: 'badge-indigo' },
    'Compras & Serviços': { icon: ShoppingBag, subtitle: 'Tudo o que lhe faz falta durante a estadia', color: 'badge-rose' },
    'Compras': { icon: ShoppingBag, subtitle: 'Tudo o que lhe faz falta durante a estadia', color: 'badge-rose' }
};

const INTENT_TO_SECTION = {
    'hotels': 'Alojamentos',
    'resorts': 'Alojamentos',
    'guesthouses': 'Alojamentos',
    'apartments': 'Alojamentos',
    'villas': 'Alojamentos',
    'lodges': 'Alojamentos',
    'hostels': 'Alojamentos',
    'restaurants': 'Restaurantes',
    'beaches': 'Praias',
    'car-rental': 'Aluguer',
    'flights': 'Voos',
    'experiences': 'Experiências',
    'activities': 'Atividades',
    'events': 'Eventos',
    'culture': 'Cultura',
    'nightlife': 'Vida Noturna',
    'transport': 'Transportes',
    'shopping': 'Compras'
};

const INTENT_TO_TAB_ID = {
    'Alojamentos': 'hotels',
    'Restaurantes': 'restaurants',
    'Praias': 'beaches',
    'Aluguer': 'car-rental',
    'Voos': 'flights',
    'Experiências': 'experiences',
    'Atividades': 'activities',
    'Eventos': 'events',
    'Cultura': 'culture',
    'Vida Noturna': 'nightlife',
    'Transportes': 'transport',
    'Compras': 'shopping'
};

const SearchAllCategories = ({ results, navigate, aiAnalysis, onTabChange }) => {
    const grouped = {};
    results.forEach(item => {
        const cat = item.sectionCategory || 'Resultados';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item);
    });

    let targetSection = null;
    if (aiAnalysis && aiAnalysis.intentCategory && aiAnalysis.intentCategory !== 'all') {
        targetSection = INTENT_TO_SECTION[aiAnalysis.intentCategory];
    }

    const entries = Object.entries(grouped);
    if (targetSection) {
        // Find if targetSection exists in entries and move it to the front
        const targetIndex = entries.findIndex(([cat]) => cat === targetSection || (targetSection === 'Praias' && cat === 'Praias & Ilhas'));
        if (targetIndex > -1) {
            const [targetEntry] = entries.splice(targetIndex, 1);
            entries.unshift(targetEntry);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {entries.map(([cat, items], index) => {
                const meta = SECTION_METADATA[cat] || { icon: MapPinned, subtitle: 'Explorar os melhores resultados', color: 'badge-blue' };
                const isTarget = targetSection && index === 0;
                
                return (
                    <React.Fragment key={cat}>
                        <SectionWrapper 
                            title={cat} 
                            subtitle={meta.subtitle} 
                            icon={meta.icon} 
                            badgeColor={meta.color} 
                            sectionId={`search-${cat}`}
                            isSearchAllView={true}
                            onViewMore={() => onTabChange(INTENT_TO_TAB_ID[cat] || 'all')}
                        >
                            {items.map(item => (
                                <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item }})} />
                            ))}
                        </SectionWrapper>
                        
                        {isTarget && index === 0 && entries.length > 1 && (
                            <div className="results-separator" style={{ textAlign: 'center', padding: '16px 0', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                                {aiAnalysis.crossCategoryDividerText || `Outros locais incríveis`}
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

const HomeScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Search State
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTabLoading, setIsTabLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [results, setResults] = useState([]);

    // Country & Province State
    const [selectedCountry, setSelectedCountry] = useState({ code: 'MZ', flag: '🇲🇿', name: 'MOÇAMBIQUE' });
    const [selectedProvince, setSelectedProvince] = useState('TODAS PROVÍNCIAS');
    const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
    const [isProvinceMenuOpen, setIsProvinceMenuOpen] = useState(false);

    const countryData = {
        'MZ': { 
            type: 'PROVÍNCIA', 
            default: 'TODAS PROVÍNCIAS',
            list: ['TODAS PROVÍNCIAS', 'MAPUTO', 'GAZA', 'INHAMBANE', 'SOFALA', 'MANICA', 'TETE', 'ZAMBÉZIA', 'NAMPULA', 'NIASSA', 'CABO DELGADO']
        },
        'BR': { 
            type: 'ESTADO', 
            default: 'TODOS OS ESTADOS',
            list: ['TODOS OS ESTADOS', 'SÃO PAULO', 'RIO DE JANEIRO', 'BAHIA', 'MINAS GERAIS', 'PARANÁ', 'AMAZONAS']
        },
        'PT': { 
            type: 'DISTRITO', 
            default: 'TODOS OS DISTRITOS',
            list: ['TODOS OS DISTRITOS', 'LISBOA', 'PORTO', 'BRAGA', 'FARO', 'SETÚBAL']
        },
        'ZA': { 
            type: 'PROVÍNCIA', 
            default: 'TODAS PROVÍNCIAS',
            list: ['TODAS PROVÍNCIAS', 'GAUTENG', 'KWAZULU-NATAL', 'WESTERN CAPE', 'MPUMALANGA']
        }
    };

    const currentCountryData = countryData[selectedCountry.code] || countryData['MZ'];

    const countries = [
        { code: 'MZ', flag: '🇲🇿', name: 'MOÇAMBIQUE' },
        { code: 'ZA', flag: '🇿🇦', name: 'ÁFRICA DO SUL' },
        { code: 'PT', flag: '🇵🇹', name: 'PORTUGAL' },
        { code: 'BR', flag: '🇧🇷', name: 'BRASIL' }
    ];

    const [activePlannerSegment, setActivePlannerSegment] = useState(null);
    const [plannerWhere, setPlannerWhere] = useState('');
    const [plannerWhen, setPlannerWhen] = useState('');
    const [plannerWho, setPlannerWho] = useState('');

    // Progressive data loading with caching
    const homeData = useHomeData(selectedCountry.code);

    // Bypassing React state for Scroll to avoid 1-frame jitter/glitches during rapid scrolling
    const homeRef = React.useRef(null);
    const scrollStateRef = React.useRef({ hideChips: false, morphSearch: false });

    React.useEffect(() => {
        let lastScrollY = window.scrollY;
        let isScrollingUp = false;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const scrollDelta = currentY - lastScrollY;
            
            // Determine scroll direction
            if (Math.abs(scrollDelta) > 5) {
                isScrollingUp = scrollDelta < 0;
            }

            // Deterministic thresholds
            const searchMorphThreshold = 140;

            let shouldHideChips = false;
            
            if (currentY <= 50) {
                shouldHideChips = false; // Always show at the top
            } else {
                shouldHideChips = !isScrollingUp; // Hide when scrolling down, show when scrolling up
            }

            const shouldMorphSearch = currentY > searchMorphThreshold;

            const currentState = scrollStateRef.current;

            if (currentState.hideChips !== shouldHideChips || currentState.morphSearch !== shouldMorphSearch) {
                scrollStateRef.current = { hideChips: shouldHideChips, morphSearch: shouldMorphSearch };
                
                // Directly update the DOM for synchronous 60fps tearing-free response
                if (homeRef.current) {
                    if (shouldHideChips) {
                        homeRef.current.classList.add('scrolled-hide-chips');
                    } else {
                        homeRef.current.classList.remove('scrolled-hide-chips');
                    }
                    
                    if (shouldMorphSearch) {
                        homeRef.current.classList.add('search-morphed');
                    } else {
                        homeRef.current.classList.remove('search-morphed');
                    }
                }
            }

            lastScrollY = currentY > 0 ? currentY : 0;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Call once to set initial state correctly on mount
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (query, aiData = null) => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setSearchQuery(query);
        setAiAnalysis(aiData);
        setIsSearching(true);
        if (aiData && aiData.intentCategory && aiData.intentCategory !== 'all') {
            setActiveTab(aiData.intentCategory);
        } else {
            setActiveTab('all');
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsTabLoading(true);
        setTimeout(() => {
            setIsTabLoading(false);
        }, 4000);
    };

    const handleLogoClick = () => {
        setIsSearching(false);
        setSearchQuery('');
        setAiAnalysis(null);
        setResults([]);
        setActiveTab('all');
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Helpert function to simulate AI filters strictly on mock MOCK_ datasets
    const applyAiFilters = (dataset) => {
        if (!aiAnalysis) return dataset;
        return dataset.filter(item => {
            // Apply budget filtering if found
            if (aiAnalysis.maxPrice) {
                // simple hacky number extraction from mock string prices
                const priceStr = item.price || item.priceRange || '';
                const match = priceStr.match(/(\d+)/);
                if (match) {
                    const val = parseInt(match[1]);
                    if (val > aiAnalysis.maxPrice) return false;
                }
            }
            return true;
        });
    };

    // Helper to get formatted results based on activeTab
    const getFilteredResults = () => {
        let items = [];
        const addToItems = (arr, category) => {
            if (arr) items = items.concat(applyAiFilters(arr).map(item => ({ ...item, sectionCategory: category })));
        };

        if (activeTab === 'all') {
            addToItems(MOCK_HOTELS, 'Hotéis');
            addToItems(MOCK_RESTAURANTS, 'Restaurantes');
            addToItems(MOCK_EXPERIENCES, 'Experiências');
            addToItems(MOCK_ACTIVITIES, 'Atividades');
            addToItems(MOCK_EVENTS, 'Eventos');
            addToItems(MOCK_CULTURE, 'Cultura');
            addToItems(MOCK_BEACHES, 'Praias');
            addToItems(MOCK_NIGHTLIFE, 'Vida Noturna');
            addToItems(MOCK_TRANSPORT, 'Transportes');
            addToItems(MOCK_CARRENTAL, 'Aluguer');
            addToItems(MOCK_FLIGHTS, 'Voos');
            addToItems(MOCK_SHOPPING, 'Compras');
        } else if (activeTab === 'hotels' || activeTab === 'apartments' || activeTab === 'resorts' || activeTab === 'guesthouses' || activeTab === 'hostels' || activeTab === 'villas' || activeTab === 'lodges') {
            addToItems(MOCK_HOTELS, 'Alojamentos');
        } else if (activeTab === 'restaurants') {
            addToItems(MOCK_RESTAURANTS, 'Restaurantes');
        } else if (activeTab === 'experiences' || activeTab === 'tours') {
            addToItems(MOCK_EXPERIENCES, 'Experiências');
        } else if (activeTab === 'activities') {
            addToItems(MOCK_ACTIVITIES, 'Atividades');
        } else if (activeTab === 'events') {
            addToItems(MOCK_EVENTS, 'Eventos');
        } else if (activeTab === 'culture') {
            addToItems(MOCK_CULTURE, 'Cultura');
        } else if (activeTab === 'beaches') {
            addToItems(MOCK_BEACHES, 'Praias');
        } else if (activeTab === 'nightlife') {
            addToItems(MOCK_NIGHTLIFE, 'Vida Noturna');
        } else if (activeTab === 'transport') {
            addToItems(MOCK_TRANSPORT, 'Transportes');
        } else if (activeTab === 'carrental') {
            addToItems(MOCK_CARRENTAL, 'Aluguer de Carros');
        } else if (activeTab === 'flights') {
            addToItems(MOCK_FLIGHTS, 'Voos Nacionais');
        } else if (activeTab === 'shopping' || activeTab === 'services') {
            addToItems(MOCK_SHOPPING, 'Compras & Serviços');
        }

        if (activeTab === 'all') {
            items = items.sort(() => 0.5 - Math.random());
        }

        return items;
    };

    const currentResults = getFilteredResults();

    return (
        <div 
            ref={homeRef} 
            className={`home-page ${isSearching ? 'is-searching' : ''}`}
        >
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Sticky Header */}
            <div className="home-fixed-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={handleLogoClick}
                    isDrawerOpen={isDrawerOpen}
                    isSearching={isSearching}
                    searchQuery={searchQuery}
                    onSearchClick={() => {
                        // re-open the search bar when user clicks mini bar
                        setIsSearching(false);
                        setTimeout(() => setIsSearching(true), 10);
                    }}
                />

                <div className="desktop-search-nav-row">
                    <div className="desktop-header-selectors">
                            {/* Country Selector */}
                            <div className="premium-selector-wrapper">
                                <button 
                                    className="premium-selector-item"
                                    onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                                >
                                    <ChevronDown size={14} className="selector-triangle" />
                                    <img 
                                        src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
                                        alt="" 
                                        className="selector-flag-img" 
                                    />
                                    <span className="selector-label">{selectedCountry.name}</span>
                                </button>
                                
                                {isCountryMenuOpen && (
                                    <div className="premium-dropdown-menu">
                                        {countries.map(c => (
                                            <button 
                                                key={c.code} 
                                                className="dropdown-option"
                                                onClick={() => {
                                                    const country = c;
                                                    setSelectedCountry(country);
                                                    setSelectedProvince(countryData[country.code]?.default || 'TODAS PROVÍNCIAS');
                                                    setIsCountryMenuOpen(false);
                                                }}
                                            >
                                                <img 
                                                    src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} 
                                                    alt="" 
                                                    className="opt-flag-img" 
                                                />
                                                <span className="opt-label">{c.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Province Selector */}
                            <div className="premium-selector-wrapper">
                                <button 
                                    className="premium-selector-item"
                                    onClick={() => setIsProvinceMenuOpen(!isProvinceMenuOpen)}
                                >
                                    <ChevronDown size={14} className="selector-triangle" />
                                    <span className="selector-label">{selectedProvince}</span>
                                </button>

                                {isProvinceMenuOpen && (
                                    <div className="premium-dropdown-menu">
                                        {currentCountryData.list.map(p => (
                                            <button 
                                                key={p} 
                                                className="dropdown-option"
                                                onClick={() => {
                                                    setSelectedProvince(p);
                                                    setIsProvinceMenuOpen(false);
                                                }}
                                            >
                                                <span className="opt-label">{p}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <SearchBarAI
                            onSearch={handleSearch}
                            isSearching={isSearching}
                            isLoading={isLoading}
                            isSkeleton={homeData.searchBar.isLoading}
                            selectedCountry={selectedCountry}
                            onCountryChange={setSelectedCountry}
                        />
                    </div>
                {/* When searching, show the Travel Planner */}
                {isSearching && (
                    <div className="travel-planner-bar">
                        <button
                            className={`tp-segment ${activePlannerSegment === 'where' ? 'tp-active' : ''}`}
                            onClick={() => setActivePlannerSegment(activePlannerSegment === 'where' ? null : 'where')}
                        >
                            <MapPin size={14} className="tp-seg-icon" />
                            <div className="tp-seg-content">
                                <span className="tp-seg-label">Onde</span>
                                <span className="tp-seg-value">{plannerWhere || 'Destino ou local'}</span>
                            </div>
                        </button>

                        <div className="tp-divider" />

                        <button
                            className={`tp-segment ${activePlannerSegment === 'when' ? 'tp-active' : ''}`}
                            onClick={() => setActivePlannerSegment(activePlannerSegment === 'when' ? null : 'when')}
                        >
                            <CalendarRange size={14} className="tp-seg-icon" />
                            <div className="tp-seg-content">
                                <span className="tp-seg-label">Quando</span>
                                <span className="tp-seg-value">{plannerWhen || 'Adicionar datas'}</span>
                            </div>
                        </button>

                        <div className="tp-divider" />

                        <button
                            className={`tp-segment ${activePlannerSegment === 'who' ? 'tp-active' : ''}`}
                            onClick={() => setActivePlannerSegment(activePlannerSegment === 'who' ? null : 'who')}
                        >
                            <Users size={14} className="tp-seg-icon" />
                            <div className="tp-seg-content">
                                <span className="tp-seg-label">Viajantes</span>
                                <span className="tp-seg-value">{plannerWho || 'Hóspedes'}</span>
                            </div>
                        </button>

                        <button className="tp-search-btn" aria-label="Pesquisar">
                            <Search size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                )}

                <div className="content-fade-in">
                    {!isSearching ? (
                        <FilterChipsRow isSkeleton={homeData.chips.isLoading} />
                    ) : (
                        <SearchResultsTabsHorizontal
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    )}
                </div>
            </div>

            <div className="home-scroll-content">
                {!isSearching ? (
                    <>
                        {/* Category Sections — ordered by filter chips, Hotels first */}
                        {homeData.categories.isLoading ? (
                            <>
                                <SkeletonStandardSection />
                                <SkeletonStandardSection />
                                <SkeletonStandardSection />
                            </>
                        ) : (
                            <div className="content-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <HotelsSection />
                                <NearYouSection />
                                <ApartmentsSection />
                                <ResortsSection />
                                <GuesthouseSection />
                                <HostelsSection />
                                <VillasSection />
                                <LodgesSection />
                                <RestaurantsSection />
                                <ExperiencesSection />
                                <BeachesSection />
                                <CultureSection />
                                <EventsSection />
                                <NightlifeSection />
                                <ShoppingServicesSection />
                                <TransportSection />
                                <CarRentalSection />
                                <FlightsSection />
                                <ExploreCTA />
                                <FooterSection />
                            </div>
                        )}
                    </>
                ) : (
                    /* Search Results View */
                    <div className="search-results-section">
                        <div className="search-results-header-row">
                            <h2 className="results-query-title">
                                Resultados: <span className="query-text">{searchQuery}</span>
                                {aiAnalysis && activeTab !== 'all' && activeTab !== aiAnalysis.intentCategory && (
                                    <span className="results-intent-label">
                                        ({INTENT_TO_SECTION[activeTab] || 'Selecionado'})
                                    </span>
                                )}
                            </h2>
                            <button className="premium-filter-btn" aria-label="Filtrar resultados">
                                <SlidersHorizontal size={18} strokeWidth={2.5} />
                                <span className="filter-btn-text">Filtrar</span>
                            </button>
                        </div>

                        {isTabLoading ? (
                            <div className="tab-loading-container">
                                <div className="gotour-preloader">
                                    <svg className="preloader-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <mask id="logoDrawMask">
                                                {/* Thick white strokes that act as a mask, revealing the image underneath */}
                                                <path className="mask-stroke mask-left" stroke="#ffffff" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 15 90 Q 40 40 50 10" />
                                                <path className="mask-stroke mask-right" stroke="#ffffff" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 50 10 Q 60 40 85 90" />
                                                <path className="mask-stroke mask-center" stroke="#ffffff" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 30 60 Q 50 50 70 60" />
                                            </mask>
                                        </defs>
                                        {/* The image is masked by the drawing paths above */}
                                        <image href={gotourLogo} width="100" height="100" preserveAspectRatio="xMidYMid meet" mask="url(#logoDrawMask)" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="search-results-content">
                                {activeTab === 'all' ? (
                                    <SearchAllCategories results={currentResults} navigate={navigate} aiAnalysis={aiAnalysis} onTabChange={handleTabChange} />
                                ) : (
                                    <div className="grid-results-container">
                                        {currentResults.length > 0 ? (
                                            currentResults.map(item => (
                                                <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                                                    <div className="hs-square-img-wrap" style={{ borderRadius: '12px' }}>
                                                        <img src={item.image} alt={item.name || item.route || item.company} className="hs-square-img" loading="lazy" />
                                                        {item.rating && <div className="hs-top-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>}
                                                    </div>
                                                
                                                <div className="hs-square-info">
                                                    <h3 className="hs-square-title">{item.name || `${item.company} - ${item.route}`}</h3>
                                                    
                                                    <p className="hs-square-subtitle" style={{ fontSize: '12px' }}>
                                                        <MapPin size={12}/> {item.location || item.duration || item.date}
                                                    </p>
                                                    
                                                    <div className="hs-info-row" style={{ fontSize: '11px', gap: '8px' }}>
                                                        <span style={{ fontWeight: 600, color: '#3b82f6' }}>{item.category || item.type || item.sectionCategory}</span>
                                                        {item.duration && <span>• <Clock size={10} style={{display:'inline', marginBottom:'-2px'}}/> {item.duration}</span>}
                                                    </div>

                                                    {item.highlights && item.highlights.length > 0 && (
                                                        <div className="hs-amenities" style={{ flexWrap: 'wrap', gap: '4px' }}>
                                                            {item.highlights.slice(0, 2).map(hl => (
                                                                <span key={hl} className="hs-amenity-pill" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '10px' }}>
                                                                    {hl}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    
                                                    <div className="hs-info-row" style={{ marginTop: '2px' }}>
                                                        <span className="hs-price-strong">{item.priceInfo || item.price || item.priceRange}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <EmptyResultsComponent query={searchQuery} />
                                    )}
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Spacer removed, footer sits flush */}
            </div>

            {/* Navigation elements hidden during search */}
            {!isSearching && (
                <>
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
                                className={`desktop-nav-item ${(location.pathname === item.path || (item.path === '/home' && location.pathname === '/')) ? 'active' : ''}`}
                                onClick={() => {
                                    if (item.id === 'profile') {
                                        setModalBackground(location);
                                    } else {
                                        setModalBackground(null);
                                    }
                                    navigate(item.path);
                                }}
                                aria-label={item.label}
                            >
                                <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.2 : 1.5} />
                            </button>
                        ))}
                    </nav>

                    <BottomNavBar />
                </>
            )}
        </div>
    );
};

export default HomeScreen;
