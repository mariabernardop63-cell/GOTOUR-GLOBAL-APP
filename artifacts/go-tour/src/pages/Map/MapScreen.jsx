import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Star, MapPin, Compass, Plus, Minus, Search, 
    Layers, Navigation, X, Info, Route, Landmark, 
    Utensils, Palmtree, Hotel, Heart, Share2, 
    CloudSun, Compass as CompassIcon, Sparkles, 
    ChevronRight, Phone, Clock, Globe, Bookmark,
    User, ListFilter
} from 'lucide-react';

import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import { useNavigation } from '../../context/NavigationContext';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './MapScreenStyles.css';

// Import Real Local Tourism Images
import primeiraFoto from '../../assets/images/Primeira foto.jpg';
import segundaFoto from '../../assets/images/Segunda Foto.jpg';
import terceiraFoto from '../../assets/images/Terceira foto.jpg';
import quartaFoto from '../../assets/images/quarta foto.jpg';
import exploreMundo from '../../assets/images/explore_mundo.jpg';
import maputoCity from '../../assets/images/maputo_city.png';

// Rich Mock Data for Map Pins (Airbnb/Google Maps style price tag info included)
const MAP_PLACES = [
    { 
        id: 'h1', 
        name: 'Southern Sun Maputo', 
        category: 'Hotel', 
        location: 'Avenida da Marginal, Maputo', 
        rating: '4.7', 
        reviews: '238',
        priceInfo: 'R$850', 
        image: primeiraFoto,
        gallery: [primeiraFoto, segundaFoto, terceiraFoto],
        description: 'Um hotel icônico à beira-mar que combina a arquitetura clássica portuguesa com instalações modernas. Oferece piscina infinita à beira-mar, centro de fitness de última geração e culinária moçambicana autêntica.',
        hours: 'Aberto 24 horas',
        phone: '+258 21 495 050',
        website: 'southernsun.co.mz',
        pinClass: 'tag-hotel',
        icon: Hotel,
        x: 820, 
        y: 480 
    },
    { 
        id: 'h7', 
        name: 'Radisson Blu Hotel', 
        category: 'Hotel', 
        location: 'Avenida da Marginal, Maputo', 
        rating: '4.8', 
        reviews: '512',
        priceInfo: 'R$1000', 
        image: segundaFoto,
        gallery: [segundaFoto, terceiraFoto, quartaFoto],
        description: 'Localização excelente com design escandinavo contemporâneo. Todos os quartos possuem varandas privadas com vista deslumbrante para a Baía de Maputo. Perfeito para viajantes exigentes.',
        hours: 'Aberto 24 horas',
        phone: '+258 21 242 400',
        website: 'radissonblu.com/maputo',
        pinClass: 'tag-hotel',
        icon: Hotel,
        x: 960, 
        y: 410 
    },
    { 
        id: 'rest1', 
        name: 'Restaurante Zambi', 
        category: 'Restaurante', 
        location: 'Avenida 10 de Novembro, Maputo', 
        rating: '4.8', 
        reviews: '419',
        priceInfo: 'R$150', 
        image: terceiraFoto,
        gallery: [terceiraFoto, quartaFoto, primeiraFoto],
        description: 'Considerado uma lenda gastronómica em Maputo. O Zambi é famoso pelo seu marisco fresco grelhado à perfeição, serviço de classe mundial e um terraço deslumbrante virado para o mar.',
        hours: '12:00 - 23:30',
        phone: '+258 21 301 020',
        website: 'zambi-restaurante.com',
        pinClass: 'tag-restaurant',
        icon: Utensils,
        x: 620, 
        y: 750 
    },
    { 
        id: 'rest3', 
        name: 'Dhow Cafe & Art', 
        category: 'Restaurante', 
        location: 'Rua do Sol, Sommerschield, Maputo', 
        rating: '4.6', 
        reviews: '185',
        priceInfo: 'R$80', 
        image: quartaFoto,
        gallery: [quartaFoto, primeiraFoto, segundaFoto],
        description: 'Um espaço único que mistura galeria de arte com café gourmet. Situado no topo de uma colina com vista panorâmica para o estuário, oferece tapas excelentes, mocktails e pôr do sol inesquecível.',
        hours: '10:00 - 22:00',
        phone: '+258 84 410 090',
        website: 'dhowmaputo.com',
        pinClass: 'tag-restaurant',
        icon: Utensils,
        x: 520, 
        y: 600 
    },
    { 
        id: 'bch1', 
        name: 'Praia do Tofo', 
        category: 'Praia', 
        location: 'Inhambane, Moçambique', 
        rating: '4.8', 
        reviews: '1.2k',
        priceInfo: 'Grátis', 
        image: exploreMundo,
        gallery: [exploreMundo, maputoCity, primeiraFoto],
        description: 'Um verdadeiro santuário ecológico e destino global de mergulho. Famoso pelas suas águas cristalinas, praias de areia branca infindáveis e encontros amigáveis constantes com raias-manta e tubarões-baleia.',
        hours: 'Acesso Livre',
        phone: 'Não aplicável',
        website: 'turismoinhambane.gov.mz',
        pinClass: 'tag-beach',
        icon: Palmtree,
        x: 1220, 
        y: 380 
    },
    { 
        id: 'bch2', 
        name: 'Ponta do Ouro', 
        category: 'Praia', 
        location: 'Matutuíne, Sul de Moçambique', 
        rating: '4.9', 
        reviews: '920',
        priceInfo: 'Grátis', 
        image: maputoCity,
        gallery: [maputoCity, exploreMundo, segundaFoto],
        description: 'Localizada perto da fronteira com a África do Sul, a Ponta do Ouro oferece praias imaculadas, florestas dunares ricas, nado com golfinhos selvagens monitorados e ótimas opções de surf e mergulho.',
        hours: 'Acesso Livre',
        phone: 'Não aplicável',
        website: 'pontadoouro.info',
        pinClass: 'tag-beach',
        icon: Palmtree,
        x: 1450, 
        y: 690 
    },
    { 
        id: 'cul1', 
        name: 'Fortaleza de Maputo', 
        category: 'Cultura', 
        location: 'Praça 25 de Junho, Baixa, Maputo', 
        rating: '4.6', 
        reviews: '304',
        priceInfo: 'R$2', 
        image: primeiraFoto,
        gallery: [primeiraFoto, segundaFoto, terceiraFoto],
        description: 'Um dos monumentos mais antigos e significativos de Maputo. Construída pelos portugueses, guarda relíquias históricas militares importantes e abriga um tranquilo museu no seu interior arborizado.',
        hours: '09:00 - 17:00',
        phone: '+258 21 320 011',
        website: 'museu-fortaleza.gov.mz',
        pinClass: 'tag-culture',
        icon: Landmark,
        x: 450, 
        y: 840 
    },
    { 
        id: 'cul2', 
        name: 'Feira de Artesanato (FEIMA)', 
        category: 'Cultura', 
        location: 'Parque dos Continuadores, Maputo', 
        rating: '4.8', 
        reviews: '674',
        priceInfo: 'Grátis', 
        image: segundaFoto,
        gallery: [segundaFoto, terceiraFoto, quartaFoto],
        description: 'O coração do artesanato e souvenirs em Maputo. Um mercado ao ar livre arborizado onde pintores, carpinteiros e costureiros locais exibem joias, estátuas de ébano e roupas de capulana de alta qualidade.',
        hours: '08:00 - 18:00',
        phone: 'Não aplicável',
        website: 'feimamaputo.com',
        pinClass: 'tag-culture',
        icon: Landmark,
        x: 710, 
        y: 620 
    }
];

// Preset Tourist Routes (Connecting coordinates with SVG path animations)
const TOURIST_ROUTES = [
    {
        id: 'history',
        name: 'Roteiro Histórico',
        color: '#db2777', // Rose/pink color
        dotColor: 'bg-pink-500',
        pathD: 'M 450 840 Q 580 730 710 620 Q 660 680 620 750', // Fortaleza -> FEIMA -> Zambi
        places: ['cul1', 'cul2', 'rest1']
    },
    {
        id: 'beaches',
        name: 'Tour das Praias',
        color: '#059669', // Emerald/green color
        dotColor: 'bg-emerald-500',
        pathD: 'M 820 480 Q 1020 430 1220 380 Q 1335 535 1450 690', // Southern Sun -> Tofo -> Ponta do Ouro
        places: ['h1', 'bch1', 'bch2']
    }
];

const MapScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground } = useNavigation();

    // UI Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Filter and Search states
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [selectedRoute, setSelectedRoute] = useState(null); // active tourist route

    // Map Interactive Engine states
    const [zoom, setZoom] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: -450, y: -380 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [mapTheme, setMapTheme] = useState('classic'); // classic | dark | satellite
    const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

    // Selected Pin detail sidebar (Right panel)
    const [activePlace, setActivePlace] = useState(null);
    const [activeCoverImage, setActiveCoverImage] = useState('');
    const [favorites, setFavorites] = useState([]); // bookmark lists

    // Zooming boundaries
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 2.5;

    // Viewport reference
    const viewportRef = useRef(null);
    const layerMenuRef = useRef(null);

    // Handle Close Layer Switcher on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (layerMenuRef.current && !layerMenuRef.current.contains(event.target)) {
                setIsLayerMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update cover image when place changes
    useEffect(() => {
        if (activePlace) {
            setActiveCoverImage(activePlace.image);
        }
    }, [activePlace]);

    // Drag handlers (Mouse)
    const handleMouseDown = (e) => {
        if (e.target.closest('.map-control-btn') || e.target.closest('.map-marker') || e.target.closest('.map-details-sidebar') || e.target.closest('.map-routes-selector') || e.target.closest('.map-discover-panel')) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPanOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Drag handlers (Touch/Mobile)
    const handleTouchStart = (e) => {
        if (e.target.closest('.map-control-btn') || e.target.closest('.map-marker') || e.target.closest('.map-details-sidebar') || e.target.closest('.map-routes-selector') || e.target.closest('.map-discover-panel')) return;
        if (e.touches.length === 1) {
            setIsDragging(true);
            const touch = e.touches[0];
            setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            setPanOffset({
                x: touch.clientX - dragStart.x,
                y: touch.clientY - dragStart.y
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Zoom Actions
    const handleZoomIn = () => {
        setZoom(prev => Math.min(MAX_ZOOM, prev + 0.25));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(MIN_ZOOM, prev - 0.25));
    };

    // Focus viewport on specific coordinates
    const focusOnCoords = (x, y, customZoom = 1.2) => {
        if (viewportRef.current) {
            const width = viewportRef.current.clientWidth;
            const height = viewportRef.current.clientHeight;
            setZoom(customZoom);
            setPanOffset({
                x: (width / 2) - x * customZoom,
                y: (height / 2) - y * customZoom
            });
        }
    };

    // Recenter map on user current location
    const handleRecenter = () => {
        focusOnCoords(680, 580, 1.2);
        const feima = MAP_PLACES.find(p => p.id === 'cul2');
        if (feima) {
            setActivePlace(feima);
        }
    };

    // Reset Compass rotation/offset
    const handleResetCompass = () => {
        setZoom(1.0);
        setPanOffset({ x: -450, y: -380 });
    };

    // Handle Route Selection
    const handleRouteToggle = (route) => {
        if (selectedRoute && selectedRoute.id === route.id) {
            setSelectedRoute(null);
        } else {
            setSelectedRoute(route);
            const firstPlace = MAP_PLACES.find(p => p.id === route.places[0]);
            if (firstPlace) {
                focusOnCoords(firstPlace.x, firstPlace.y, 1.0);
                setActivePlace(firstPlace);
            }
        }
    };

    // Toggle Bookmarking Favorite
    const toggleFavorite = (id) => {
        setFavorites(prev => {
            if (prev.includes(id)) {
                return prev.filter(fId => fId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Fallback placeholder image handler if unsplash is blocked or offline
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%231e293b'/><stop offset='100%25' stop-color='%230f172a'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Outfit, sans-serif' font-weight='bold' font-size='22' fill='%233b82f6'>GoTour Premium</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' font-family='Outfit, sans-serif' font-size='14' fill='%2364748b'>Imagem Local</text></svg>";
    };

    // Filter pins by category and query
    const filteredPlaces = MAP_PLACES.filter(place => {
        const matchesCategory = activeFilter === 'Todos' || place.category === activeFilter;
        const matchesQuery = searchQuery === '' || 
            place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    const categories = [
        { label: 'Todos', icon: Compass },
        { label: 'Hotel', icon: Hotel },
        { label: 'Restaurante', icon: Utensils },
        { label: 'Praia', icon: Palmtree },
        { label: 'Cultura', icon: Landmark }
    ];

    // Popular Discover Cards (Airbnb sidebar style list)
    const discoverPlaces = MAP_PLACES.slice(0, 4);

    return (
        <div className="map-screen-container">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Header Overlay */}
            <div className="map-header-overlay">
                <header className="map-home-header">
                    <button className="logo-button" onClick={() => navigate('/home')} aria-label="Go to Home">
                        <img src={gotourLogo} alt="GoTour" className="home-header-logo" />
                    </button>
                    
                    {/* Middle Section: Search & Filters */}
                    <div className="map-header-middle">
                        <div className="map-search-bar">
                            <Search size={18} className="map-search-icon" />
                            <input 
                                type="text" 
                                placeholder="Pesquise hotéis, praias..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        <div className="map-filter-chips">
                            {categories.map((cat) => {
                                const IconComponent = cat.icon;
                                return (
                                    <button
                                        key={cat.label}
                                        className={`map-chip ${activeFilter === cat.label ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveFilter(cat.label);
                                            setActivePlace(null);
                                        }}
                                    >
                                        <span className="map-chip-icon">
                                            <IconComponent size={14} />
                                        </span>
                                        <span>{cat.label === 'Todos' ? 'Todos' : cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Section: Profile & Drawer */}
                    <div className="map-header-right">
                        <button 
                            onClick={() => {
                                setModalBackground(location);
                                navigate('/profile');
                            }} 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label="Ir para o Perfil"
                        >
                            <User size={24} strokeWidth={2} color="#475569" />
                        </button>
                        <button className="menu-pill-button" onClick={() => setIsDrawerOpen(!isDrawerOpen)} aria-label="Toggle menu">
                            <ListFilter size={24} strokeWidth={2.5} color="#0e172a" />
                        </button>
                    </div>
                </header>
            </div>

            {/* Map Interactive Viewport */}
            <div 
                ref={viewportRef}
                className="map-viewport"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    className="map-canvas-wrapper"
                    style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                    }}
                >
                    {/* SVG Vector Map Layer */}
                    <svg className={`map-vector-base map-theme-${mapTheme}`} viewBox="0 0 2000 2000" width="2000" height="2000" xmlns="http://www.w3.org/2000/svg">
                        {/* Ocean */}
                        <rect width="2000" height="2000" className="map-ocean" />

                        {/* Coastline / Land */}
                        <path d="M 0 0 L 1100 0 Q 1050 300 800 500 Q 700 650 650 900 T 500 1300 Q 400 1500 350 2000 L 0 2000 Z" className="map-land" />

                        {/* Forest / Green Parks */}
                        <path d="M 150 120 Q 280 180 300 320 T 100 500 Z" className="map-forest" />
                        <path d="M 450 600 Q 550 620 580 720 T 400 850 Z" className="map-forest" />
                        <path d="M 680 480 Q 750 490 770 560 T 650 680 Z" className="map-forest" />

                        {/* River */}
                        <path d="M 0 1600 C 200 1600, 300 1650, 380 1720 S 400 1900, 380 2000" fill="none" stroke="#aad3df" strokeWidth="48" strokeLinecap="round" />

                        {/* Standard City Roads / Streets Grid */}
                        {/* Horizontal Streets */}
                        <line x1="0" y1="150" x2="1050" y2="150" className="map-road" strokeWidth="12" />
                        <line x1="0" y1="350" x2="950" y2="350" className="map-road" strokeWidth="10" />
                        <line x1="0" y1="550" x2="800" y2="550" className="map-road" strokeWidth="10" />
                        <line x1="0" y1="750" x2="680" y2="750" className="map-road" strokeWidth="12" />
                        <line x1="0" y1="950" x2="630" y2="950" className="map-road" strokeWidth="8" />
                        <line x1="0" y1="1200" x2="520" y2="1200" className="map-road" strokeWidth="8" />

                        {/* Vertical Streets */}
                        <line x1="200" y1="0" x2="200" y2="1600" className="map-road" strokeWidth="10" />
                        <line x1="450" y1="0" x2="450" y2="1350" className="map-road" strokeWidth="12" />
                        <line x1="700" y1="0" x2="700" y2="600" className="map-road" strokeWidth="10" />
                        <line x1="900" y1="0" x2="900" y2="380" className="map-road" strokeWidth="8" />

                        {/* Coastal Highway - Avenida da Marginal */}
                        <path d="M 1100 0 Q 1050 300 800 500 Q 700 650 650 900 T 500 1300 Q 400 1500 350 2000" fill="none" className="map-highway" strokeWidth="20" />

                        {/* Dynamic Path for Selected Tourist Route */}
                        {selectedRoute && (
                            <path 
                                d={selectedRoute.pathD}
                                className="map-route-line"
                                stroke={selectedRoute.color}
                                strokeWidth="6"
                            />
                        )}

                        {/* Labels */}
                        <text x="300" y="250" className="map-label">SOMMERSCHIELD</text>
                        <text x="600" y="420" className="map-label">POLANA CIMENTO</text>
                        <text x="320" y="700" className="map-label">BAIXA DE MAPUTO</text>
                        <text x="790" y="980" className="map-label" transform="rotate(22 790 980)">AV. DA MARGINAL</text>
                        <text x="1350" y="300" className="map-label" style={{ fontSize: '18px', fill: 'rgba(255,255,255,0.7)', letterSpacing: '4px' }}>BAÍA DE MAPUTO</text>
                    </svg>

                    {/* Satellite details pattern overlay */}
                    {mapTheme === 'satellite' && <div className="map-theme-satellite-overlay" />}

                    {/* Current User Location Pulsing Ring */}
                    <div className="user-pulse-marker" style={{ left: 680, top: 580 }}>
                        <div className="user-pulse-wave" />
                        <div className="user-pulse-core" />
                    </div>

                    {/* Dynamic Airbnb-Style Price-Tag Markers */}
                    {filteredPlaces.map((place) => {
                        const PinIcon = place.icon;
                        const isActive = activePlace && activePlace.id === place.id;
                        
                        return (
                            <div 
                                key={place.id}
                                className={`map-marker ${isActive ? 'active' : ''}`}
                                style={{
                                    left: place.x,
                                    top: place.y
                                }}
                                onClick={() => setActivePlace(place)}
                            >
                                <div className="map-price-tag">
                                    <div className={`map-price-tag-icon ${place.pinClass}`}>
                                        <PinIcon size={11} />
                                    </div>
                                    <span>{place.priceInfo}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Weather Overlay Widget */}
            <div className="map-weather-widget">
                <div className="weather-icon-wrap">
                    <CloudSun size={24} />
                </div>
                <div className="weather-info">
                    <span className="weather-city">Maputo</span>
                    <span className="weather-temp">28°C Sol</span>
                </div>
            </div>

            {/* Tourist Routes Selector Panel */}
            <div className="map-routes-selector">
                <span className="routes-title">Roteiros Sugeridos</span>
                {TOURIST_ROUTES.map((route) => (
                    <button
                        key={route.id}
                        className={`route-option-btn ${selectedRoute && selectedRoute.id === route.id ? 'active' : ''}`}
                        onClick={() => handleRouteToggle(route)}
                    >
                        <div className={`route-dot`} style={{ backgroundColor: route.color }} />
                        <span>{route.name}</span>
                    </button>
                ))}
            </div>

            {/* Discover Sidebar (List Side Panel) */}
            <div className="map-discover-panel">
                <div className="discover-header-row">
                    <span className="discover-title">
                        <Compass size={16} className="discover-title-icon" />
                        <span>Perto de ti</span>
                    </span>
                </div>
                <div className="discover-list">
                    {discoverPlaces.map((place) => (
                        <div 
                            key={place.id}
                            className="discover-card"
                            onClick={() => {
                                focusOnCoords(place.x, place.y, 1.2);
                                setActivePlace(place);
                            }}
                        >
                            <img 
                                src={place.image} 
                                alt={place.name} 
                                className="discover-card-img" 
                                onError={handleImageError}
                            />
                            <div className="discover-card-info">
                                <h4 className="discover-card-title">{place.name}</h4>
                                <p className="discover-card-sub">{place.category}</p>
                                <div className="discover-card-rating">
                                    <Star size={12} fill="#f59e0b" stroke="none" />
                                    <span>{place.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Controls Sidebar Widget */}
            <div className="map-floating-controls">
                {/* Compass Control */}
                <button className="map-control-btn" onClick={handleResetCompass} title="Recentrar Norte">
                    <Compass size={22} strokeWidth={2} />
                </button>

                {/* My Location Tracker Control */}
                <button className="map-control-btn" onClick={handleRecenter} title="Minha Localização">
                    <Navigation size={20} strokeWidth={2.2} style={{ transform: 'rotate(45deg)' }} />
                </button>

                {/* Layer Map Type Selector Control */}
                <div className="layer-menu-container" ref={layerMenuRef}>
                    <button 
                        className="map-control-btn" 
                        onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
                        title="Camadas de Mapa"
                    >
                        <Layers size={20} strokeWidth={2} />
                    </button>
                    {isLayerMenuOpen && (
                        <div className="layer-dropdown-menu">
                            <button 
                                className={`layer-opt ${mapTheme === 'classic' ? 'active' : ''}`}
                                onClick={() => { setMapTheme('classic'); setIsLayerMenuOpen(false); }}
                            >
                                <span className="layer-opt-icon"><Layers size={14} /></span>
                                <span>Vetor Clássico</span>
                            </button>
                            <button 
                                className={`layer-opt ${mapTheme === 'dark' ? 'active' : ''}`}
                                onClick={() => { setMapTheme('dark'); setIsLayerMenuOpen(false); }}
                            >
                                <span className="layer-opt-icon"><Layers size={14} /></span>
                                <span>Modo Escuro</span>
                            </button>
                            <button 
                                className={`layer-opt ${mapTheme === 'satellite' ? 'active' : ''}`}
                                onClick={() => { setMapTheme('satellite'); setIsLayerMenuOpen(false); }}
                            >
                                <span className="layer-opt-icon"><Layers size={14} /></span>
                                <span>Satélite Híbrido</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Zooming Controls */}
                <button className="map-control-btn" onClick={handleZoomIn} title="Zoom +">
                    <Plus size={22} strokeWidth={2.2} />
                </button>
                <button className="map-control-btn" onClick={handleZoomOut} title="Zoom -">
                    <Minus size={22} strokeWidth={2.2} />
                </button>
            </div>

            {/* NEW: PREMIUM VERTICAL DETAILS SIDEBAR (Right Panel) */}
            <div className={`map-details-sidebar ${activePlace ? 'visible' : ''}`}>
                {activePlace && (
                    <>
                        <button className="sidebar-close-btn" onClick={() => setActivePlace(null)} aria-label="Fechar">
                            <X size={20} />
                        </button>
                        
                        <div className="sidebar-scroll-content">
                            {/* Gallery Carousel */}
                            <div className="sidebar-image-gallery">
                                <img 
                                    src={activeCoverImage} 
                                    alt={activePlace.name} 
                                    className="sidebar-cover-img" 
                                    onError={handleImageError}
                                />
                                
                                {/* Thumbnails to switch cover */}
                                <div className="sidebar-gallery-thumbnails">
                                    {activePlace.gallery?.map((imgUrl, idx) => (
                                        <img 
                                            key={idx}
                                            src={imgUrl} 
                                            alt="Miniatura" 
                                            className={`sidebar-thumb ${activeCoverImage === imgUrl ? 'active' : ''}`}
                                            onClick={() => setActiveCoverImage(imgUrl)}
                                            onError={handleImageError}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Main Info */}
                            <div className="sidebar-main-info">
                                <div className="sidebar-category-tag">
                                    {React.createElement(activePlace.icon, { size: 12 })}
                                    <span>{activePlace.category}</span>
                                </div>
                                
                                <div className="sidebar-title-row">
                                    <h2>{activePlace.name}</h2>
                                    <button 
                                        className={`sidebar-action-pill-btn ${favorites.includes(activePlace.id) ? 'active' : ''}`}
                                        onClick={() => toggleFavorite(activePlace.id)}
                                        title="Favoritar local"
                                    >
                                        <Heart size={22} fill={favorites.includes(activePlace.id) ? '#ef4444' : 'none'} />
                                    </button>
                                </div>
                                
                                <div className="sidebar-rating-block">
                                    <Star size={14} fill="#f59e0b" stroke="none" />
                                    <span>{activePlace.rating}</span>
                                    <span>({activePlace.reviews} avaliações)</span>
                                </div>
                            </div>
                            
                            {/* Detailed Info Blocks */}
                            <div className="sidebar-details-section">
                                <p className="sidebar-description-p">
                                    {activePlace.description}
                                </p>
                                
                                <div className="sidebar-info-item">
                                    <div className="sidebar-info-icon-wrap">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="sidebar-info-text">
                                        <span className="sidebar-info-label">Endereço</span>
                                        <span className="sidebar-info-val">{activePlace.location}</span>
                                    </div>
                                </div>

                                <div className="sidebar-info-item">
                                    <div className="sidebar-info-icon-wrap">
                                        <Clock size={18} />
                                    </div>
                                    <div className="sidebar-info-text">
                                        <span className="sidebar-info-label">Horário</span>
                                        <span className="sidebar-info-val">{activePlace.hours}</span>
                                    </div>
                                </div>

                                <div className="sidebar-info-item">
                                    <div className="sidebar-info-icon-wrap">
                                        <Phone size={18} />
                                    </div>
                                    <div className="sidebar-info-text">
                                        <span className="sidebar-info-label">Telefone</span>
                                        <span className="sidebar-info-val">{activePlace.phone}</span>
                                    </div>
                                </div>

                                <div className="sidebar-info-item">
                                    <div className="sidebar-info-icon-wrap">
                                        <Globe size={18} />
                                    </div>
                                    <div className="sidebar-info-text">
                                        <span className="sidebar-info-label">Website</span>
                                        <span className="sidebar-info-val">{activePlace.website}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className="sidebar-sticky-footer">
                            <button 
                                className="sidebar-btn sidebar-btn--primary"
                                onClick={() => navigate('/destino-detalhes', { state: { ...activePlace } })}
                            >
                                <Info size={16} />
                                <span>Reservar</span>
                            </button>
                            
                            <button 
                                className="sidebar-btn sidebar-btn--outline"
                                onClick={() => alert(`Simulando trajeto em tempo real para: ${activePlace.name}`)}
                            >
                                <Route size={16} />
                                <span>Direções</span>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Bottom Navigation Menu */}
            {!activePlace && <BottomNavBar />}
        </div>
    );
};

export default MapScreen;
