import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import SearchBarAI from '../../components/SearchBarAI/SearchBarAI';
import { useNavigation } from '../../context/NavigationContext';

// Sections moved from Home
import MustSeeSection from '../../components/MustSeeSection/MustSeeSection';
import NearYouSection from '../../components/NearYouSection/NearYouSection';
import ExploreRegionsSection from '../../components/ExploreRegionsSection/ExploreRegionsSection';
import MostSearchedSection from '../../components/MostSearchedSection/MostSearchedSection';
import BudgetDestinationsSection from '../../components/BudgetDestinationsSection/BudgetDestinationsSection';
import { ValueSection, LuxurySection } from '../../components/HomeSections/ValueAndLuxurySections';
import { RecommendedSection } from '../../components/HomeSections/PlacesSections';
import FooterSection from '../../pages/Welcome/FooterSection/FooterSection';

import { 
    ChevronDown, ChevronLeft, User, ListFilter,
    CloudSun, Navigation, LineChart, Globe, ShieldCheck, Radio, Briefcase, Landmark, Map,
    Home, Building2, BedDouble, Star, Coffee, Users, Key, Tent, Utensils,
    Camera, Waves, Ticket, Moon, ShoppingBag, Bus, Car, Plane, Headphones, Route, LayoutGrid,
    Rss, MapPinned, MapPin, CalendarRange, Search
} from 'lucide-react';

import './CategoriesScreen.css';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';

// Data
const countryData = {
    'MZ': { type: 'PROVÍNCIA', default: 'TODAS PROVÍNCIAS', list: ['TODAS PROVÍNCIAS', 'MAPUTO', 'GAZA', 'INHAMBANE', 'SOFALA', 'MANICA', 'TETE', 'ZAMBÉZIA', 'NAMPULA', 'NIASSA', 'CABO DELGADO'] },
    'BR': { type: 'ESTADO', default: 'TODOS OS ESTADOS', list: ['TODOS OS ESTADOS', 'SÃO PAULO', 'RIO DE JANEIRO', 'BAHIA', 'MINAS GERAIS', 'PARANÁ', 'AMAZONAS'] },
    'PT': { type: 'DISTRITO', default: 'TODOS OS DISTRITOS', list: ['TODOS OS DISTRITOS', 'LISBOA', 'PORTO', 'BRAGA', 'FARO', 'SETÚBAL'] },
    'ZA': { type: 'PROVÍNCIA', default: 'TODAS PROVÍNCIAS', list: ['TODAS PROVÍNCIAS', 'GAUTENG', 'KWAZULU-NATAL', 'WESTERN CAPE', 'MPUMALANGA'] }
};

const countries = [
    { code: 'MZ', flag: '🇲🇿', name: 'MOÇAMBIQUE' },
    { code: 'ZA', flag: '🇿🇦', name: 'ÁFRICA DO SUL' },
    { code: 'PT', flag: '🇵🇹', name: 'PORTUGAL' },
    { code: 'BR', flag: '🇧🇷', name: 'BRASIL' }
];

const CATEGORIES_LIST = [
    { id: 'all', label: 'Todas as categorias', icon: LayoutGrid },
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'hoteis', label: 'Hotéis', icon: Building2 },
    { id: 'apartamentos', label: 'Apartamentos', icon: BedDouble },
    { id: 'resorts', label: 'Resorts', icon: Star },
    { id: 'guesthouses', label: 'Guest Houses', icon: Coffee },
    { id: 'hostels', label: 'Hostels', icon: Users },
    { id: 'villas', label: 'Villas / Casas', icon: Key },
    { id: 'lodges', label: 'Lodges', icon: Tent },
    { id: 'restaurantes', label: 'Restaurantes', icon: Utensils },
    { id: 'experiencias', label: 'Experiências', icon: Camera },
    { id: 'praias', label: 'Praias & Ilhas', icon: Waves },
    { id: 'cultura', label: 'Cultura', icon: Landmark },
    { id: 'eventos', label: 'Eventos', icon: Ticket },
    { id: 'vidanoturna', label: 'Vida Noturna', icon: Moon },
    { id: 'compras', label: 'Compras', icon: ShoppingBag },
    { id: 'transportes', label: 'Transportes', icon: Bus },
    { id: 'aluguercarros', label: 'Aluguer de Carros', icon: Car },
    { id: 'voos', label: 'Voos', icon: Plane },
    { id: 'servicos', label: 'Serviços', icon: Headphones },
    { id: 'tours', label: 'Tours', icon: Route },
];

const QUICK_ACTIONS = [
    { id: 'radar', label: 'Radar Meteorológico', icon: CloudSun, color: '#6366f1' },
    { id: 'mobilidade', label: 'Guia de Mobilidade', icon: Navigation, color: '#8b5cf6' },
    { id: 'cambio', label: 'Monitor de Câmbio', icon: LineChart, color: '#0ea5e9' },
    { id: 'fuso', label: 'Fuso Horário', icon: Globe, color: '#14b8a6' },
    { id: 'checkpoint', label: 'Check-point', icon: ShieldCheck, color: '#f59e0b' },
    { id: 'pulso', label: 'Pulso Local', icon: Radio, color: '#ec4899' },
    { id: 'hub', label: 'Hub Financeiro', icon: Briefcase, color: '#6366f1' },
];

const BAIRROS = [
    'CENTRAL', 'POLANA CIMENTO', 'SOMMERSCHIELD', 'ALTO MAÉ', 
    'COOP', 'COSTA DO SOL', 'BAIRRO TRIUNFO'
];

const CategoriesScreen = () => {
    const location = useLocation();
    const { setModalBackground, navigateFade } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [selectedProvince, setSelectedProvince] = useState('TODAS PROVÍNCIAS');
    const [selectedBairro, setSelectedBairro] = useState('TODOS OS LOCAIS');
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES_LIST[0]);
    
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isProvinceOpen, setIsProvinceOpen] = useState(false);
    const [isBairroOpen, setIsBairroOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const [activeAction, setActiveAction] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [activeDiffOption, setActiveDiffOption] = useState('planear');

    const currentCountryData = countryData[selectedCountry.code] || countryData['MZ'];

    const closeAll = () => {
        setIsCountryOpen(false);
        setIsProvinceOpen(false);
        setIsBairroOpen(false);
        setIsCategoryOpen(false);
    };

    // Shared inline styles
    const selectorWrapperStyle = { position: 'relative' };
    const selectorBtnStyle = {
        background: 'none', border: 'none', display: 'flex', alignItems: 'center',
        gap: '6px', cursor: 'pointer', padding: '6px 0', fontFamily: "'Inter', sans-serif",
    };
    const selectorLabelStyle = {
        fontSize: '13px', fontWeight: 500, color: '#1e293b',
        whiteSpace: 'nowrap', letterSpacing: '0.8px', textTransform: 'uppercase',
    };
    const chevronStyle = { color: '#94a3b8' };
    const flagStyle = { width: '22px', height: '16px', objectFit: 'cover', borderRadius: '2px' };
    const dropdownStyle = {
        position: 'absolute', top: '100%', left: 0, marginTop: '8px',
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)', zIndex: 1000,
        minWidth: '180px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '2px',
        maxHeight: '320px', overflowY: 'auto',
    };
    const dropOptionStyle = {
        background: 'none', border: 'none', padding: '10px 12px', borderRadius: '8px',
        display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
        textAlign: 'left', width: '100%', fontFamily: "'Inter', sans-serif",
    };
    const dropLabelStyle = {
        fontSize: '12px', fontWeight: 500, color: '#475569',
        textTransform: 'uppercase', letterSpacing: '0.5px',
    };
    const dropFlagStyle = { width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px' };
    const dividerStyle = { height: '1px', background: '#e2e8f0', margin: '4px 0' };

    const CategoryIcon = selectedCategory.icon;

    return (
        <div className="categories-screen" onClick={closeAll}>
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Custom Header — no bottom line */}
            <div className="home-fixed-header" style={{ borderBottom: 'none' }}>
                <style>{`.categories-screen .home-fixed-header::after { display: none !important; }`}</style>
                <header style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px 8px 20px', background: '#ffffff',
                }}>
                    {/* Left: Back icon */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                            onClick={() => navigateFade('/home')} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                            aria-label="Voltar"
                        >
                            <ChevronLeft size={28} color="#1e293b" />
                        </button>
                    </div>

                    {/* Right: Small Search + Profile + Menu */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Mini Search Bar */}
                        <div className="cat-mini-search-wrapper">
                            <SearchBarAI 
                                onSearch={() => { setIsSearching(true); }}
                                isSearching={isSearching}
                                onClear={() => { setIsSearching(false); }}
                            />
                        </div>

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
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }} onClick={() => setIsDrawerOpen(!isDrawerOpen)} aria-label="Toggle menu">
                            <ListFilter size={24} strokeWidth={2.5} color="#0e172a" />
                        </button>
                    </div>
                </header>
            </div>

            <main className="categories-scroll-container">

                {/* Travel Planner Bar & Differential Options Row */}
                <div className="cat-planner-row-wrapper" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: '40px',
                    padding: '8px 20px 6px 20px', 
                    width: '100%', 
                    margin: '0',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}>
                    <div className="travel-planner-bar" style={{ margin: 0, flexShrink: 0, width: '100%', maxWidth: '700px' }}>
                        <button
                            className={`tp-segment ${activeAction === 'where' ? 'tp-active' : ''}`}
                            onClick={() => setActiveAction(activeAction === 'where' ? null : 'where')}
                        >
                            <MapPin size={14} className="tp-seg-icon" />
                            <div className="tp-seg-content">
                                <span className="tp-seg-label">Onde</span>
                                <span className="tp-seg-value">Destino ou local</span>
                            </div>
                        </button>

                        <div className="tp-divider" />

                        <button
                            className={`tp-segment ${activeAction === 'when' ? 'tp-active' : ''}`}
                            onClick={() => setActiveAction(activeAction === 'when' ? null : 'when')}
                        >
                            <CalendarRange size={14} className="tp-seg-icon" />
                            <div className="tp-seg-content">
                                <span className="tp-seg-label">Quando</span>
                                <span className="tp-seg-value">Adicionar datas</span>
                            </div>
                        </button>

                        <div className="tp-divider" />

                        <button
                            className={`tp-segment ${activeAction === 'who' ? 'tp-active' : ''}`}
                            onClick={() => setActiveAction(activeAction === 'who' ? null : 'who')}
                        >
                            <Users size={14} className="tp-seg-icon" />
                            <div className="tp-seg-content">
                                <span className="tp-seg-label">Viajantes</span>
                                <span className="tp-seg-value">Hóspedes</span>
                            </div>
                        </button>

                        <button className="tp-search-btn" aria-label="Pesquisar">
                            <Search size={16} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Premium Differential Options */}
                    <div className="cat-differential-options" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                        <button 
                            className={`cat-diff-btn ${activeDiffOption === 'voos' ? 'highlight' : ''}`}
                            onClick={() => setActiveDiffOption('voos')}
                        >
                            <Plane size={16} strokeWidth={2.5} className="cat-diff-icon" />
                            <span>VOOS</span>
                        </button>
                        <button 
                            className={`cat-diff-btn ${activeDiffOption === 'servicos' ? 'highlight' : ''}`}
                            onClick={() => setActiveDiffOption('servicos')}
                        >
                            <Headphones size={16} strokeWidth={2.5} className="cat-diff-icon" />
                            <span>SERVIÇOS</span>
                        </button>
                        <button 
                            className={`cat-diff-btn ${activeDiffOption === 'planear' ? 'highlight' : ''}`}
                            onClick={() => setActiveDiffOption('planear')}
                        >
                            <Map size={16} strokeWidth={2.5} className="cat-diff-icon" />
                            <span>PLANEAR VIAGEM</span>
                        </button>
                    </div>
                </div>
                
                {/* Selectors Row: Country + Province + Bairro + Category */}
                <div style={{
                    display: 'flex', alignItems: 'center', padding: '6px 20px 8px 20px',
                    gap: '20px', width: '100%', background: '#ffffff',
                }} onClick={e => e.stopPropagation()}>
                    
                    {/* Country */}
                    <div style={selectorWrapperStyle}>
                        <button style={selectorBtnStyle} onClick={() => { closeAll(); setIsCountryOpen(!isCountryOpen); }}>
                            <ChevronDown size={14} style={chevronStyle} />
                            <img src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} alt="" style={flagStyle} />
                            <span style={selectorLabelStyle}>{selectedCountry.name}</span>
                        </button>
                        {isCountryOpen && (
                            <div style={dropdownStyle}>
                                {countries.map(c => (
                                    <button key={c.code} style={dropOptionStyle} onClick={() => { 
                                        setSelectedCountry(c); 
                                        setSelectedProvince(countryData[c.code]?.default || 'TODAS PROVÍNCIAS');
                                        setIsCountryOpen(false); 
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                    >
                                        <img src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} alt="" style={dropFlagStyle} />
                                        <span style={dropLabelStyle}>{c.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Province */}
                    <div style={selectorWrapperStyle}>
                        <button style={selectorBtnStyle} onClick={() => { closeAll(); setIsProvinceOpen(!isProvinceOpen); }}>
                            <ChevronDown size={14} style={chevronStyle} />
                            <span style={selectorLabelStyle}>{selectedProvince}</span>
                        </button>
                        {isProvinceOpen && (
                            <div style={dropdownStyle}>
                                <button style={dropOptionStyle} onClick={() => { setSelectedProvince('TODAS PROVÍNCIAS'); setIsProvinceOpen(false); }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                >
                                    <span style={dropLabelStyle}>TODAS PROVÍNCIAS</span>
                                </button>
                                <div style={dividerStyle}></div>
                                {currentCountryData.list.map(p => (
                                    <button key={p} style={dropOptionStyle} onClick={() => { setSelectedProvince(p); setIsProvinceOpen(false); }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                    >
                                        <span style={dropLabelStyle}>{p}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bairro */}
                    <div style={selectorWrapperStyle}>
                        <button style={selectorBtnStyle} onClick={() => { closeAll(); setIsBairroOpen(!isBairroOpen); }}>
                            <ChevronDown size={14} style={chevronStyle} />
                            <span style={selectorLabelStyle}>{selectedBairro}</span>
                        </button>
                        {isBairroOpen && (
                            <div style={dropdownStyle}>
                                <button style={dropOptionStyle} onClick={() => { setSelectedBairro('TODOS OS LOCAIS'); setIsBairroOpen(false); }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                >
                                    <span style={dropLabelStyle}>TODOS OS LOCAIS</span>
                                </button>
                                <div style={dividerStyle}></div>
                                {BAIRROS.map((b, idx) => (
                                    <button key={idx} style={dropOptionStyle} onClick={() => { setSelectedBairro(b); setIsBairroOpen(false); }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                    >
                                        <span style={dropLabelStyle}>{b}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Category Selector */}
                    <div style={selectorWrapperStyle}>
                        <button style={selectorBtnStyle} onClick={() => { closeAll(); setIsCategoryOpen(!isCategoryOpen); }}>
                            <ChevronDown size={14} style={chevronStyle} />
                            <CategoryIcon size={15} strokeWidth={2} color="#1e293b" />
                            <span style={selectorLabelStyle}>{selectedCategory.label}</span>
                        </button>
                        {isCategoryOpen && (
                            <div style={{...dropdownStyle, minWidth: '220px'}}>
                                {CATEGORIES_LIST.map(cat => {
                                    const CatIcon = cat.icon;
                                    return (
                                        <button key={cat.id} style={dropOptionStyle} onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                        >
                                            <CatIcon size={15} strokeWidth={2} color="#475569" />
                                            <span style={dropLabelStyle}>{cat.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Premium Quick Action Pills */}
                <div style={{
                    display: 'flex', gap: '16px', padding: '12px 20px 24px 20px',
                    overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
                }}>
                    {QUICK_ACTIONS.map(action => {
                        const IconEl = action.icon;
                        const isActive = activeAction === action.id;
                        return (
                            <button
                                key={action.id}
                                onClick={() => {
                                    if (action.id === 'radar') {
                                        navigateFade('/radar-meteorologico');
                                    } else if (action.id === 'cambio') {
                                        navigateFade('/monitor-cambio');
                                    } else if (action.id === 'fuso') {
                                        navigateFade('/fuso-horario');
                                    } else if (action.id === 'checkpoint') {
                                        navigateFade('/checkpoint');
                                    } else if (action.id === 'pulso') {
                                        navigateFade('/pulso-local');
                                    } else if (action.id === 'hub') {
                                        navigateFade('/hub-financeiro');
                                    } else {
                                        setActiveAction(action.id === activeAction ? null : action.id);
                                    }
                                }}
                                className={`cat-premium-chip ${isActive ? 'active' : ''}`}
                                style={isActive ? {} : { '--chip-accent': action.color }}
                            >
                                <IconEl size={18} strokeWidth={1.5} className="cat-chip-icon" />
                                <span className="cat-chip-label">{action.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* === SECTIONS === */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '40px' }}>
                    <MustSeeSection countryName={selectedCountry.name} />
                    <NearYouSection />
                    <ExploreRegionsSection />
                    <MostSearchedSection />
                    <BudgetDestinationsSection />
                    <ValueSection />
                    <LuxurySection />
                    <RecommendedSection />
                    <FooterSection />
                </div>

            </main>

            {/* Desktop floating nav strip — identical to Home */}
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

export default CategoriesScreen;
