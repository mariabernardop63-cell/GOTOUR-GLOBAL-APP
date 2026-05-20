import React, { useRef } from 'react';
import {
    Home, Building2, BedDouble, Star, Tent, Route,
    Camera, Utensils, Waves, Landmark, Ticket, Moon,
    ShoppingBag, Bus, Car, Plane, Headphones, Key,
    Images, FileText, Map, Coffee, Users
} from 'lucide-react';
import '../FilterChipsRow/FilterChipsRowStyles.css';

const TABS = [
    { id: 'all', label: 'Tudo', icon: Home },
    { id: 'hotels', label: 'Hotéis', icon: Building2 },
    { id: 'apartments', label: 'Apartamentos', icon: BedDouble },
    { id: 'resorts', label: 'Resorts', icon: Star },
    { id: 'guesthouses', label: 'Guest Houses', icon: Coffee },
    { id: 'hostels', label: 'Hostels', icon: Users },
    { id: 'villas', label: 'Villas / Casas', icon: Key },
    { id: 'lodges', label: 'Lodges', icon: Tent },
    { id: 'restaurants', label: 'Restaurantes', icon: Utensils },
    { id: 'events', label: 'Eventos', icon: Ticket },
    { id: 'culture', label: 'Cultura', icon: Landmark },
    { id: 'nightlife', label: 'Vida Noturna', icon: Moon },
    { id: 'beaches', label: 'Praias & Ilhas', icon: Waves },
    { id: 'experiences', label: 'Experiências', icon: Camera },
    { id: 'tours', label: 'Tours', icon: Route },
    { id: 'services', label: 'Serviços', icon: Headphones },
    { id: 'shopping', label: 'Compras', icon: ShoppingBag },
    { id: 'transport', label: 'Transportes', icon: Bus },
    { id: 'carrental', label: 'Aluguer de Carros', icon: Car },
    { id: 'flights', label: 'Voos', icon: Plane },
    { id: 'photos', label: 'Fotos', icon: Images },
    { id: 'posts', label: 'Publicações', icon: FileText },
    { id: 'map', label: 'Mapa', icon: Map },
];

const SearchResultsTabsHorizontal = ({ activeTab, onTabChange }) => {
    const indicatorRef = useRef(null);
    const containerRef = useRef(null);
    const chipRefs = useRef({});

    // Animate the bottom indicator bar to the active tab
    const updateIndicator = () => {
        if (!activeTab || !indicatorRef.current || !containerRef.current) {
            if (indicatorRef.current) {
                indicatorRef.current.style.opacity = '0';
                indicatorRef.current.style.width = '0px';
            }
            return;
        }
        const chipEl = chipRefs.current[activeTab];
        if (!chipEl) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const chipRect = chipEl.getBoundingClientRect();

        const left = chipRect.left - containerRect.left + containerRef.current.scrollLeft;
        const width = chipRect.width;

        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.opacity = '1';
    };

    React.useEffect(() => {
        updateIndicator();
    }, [activeTab]);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleScroll = () => updateIndicator();
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTabClick = (tabId) => {
        onTabChange(tabId);
        const chipEl = chipRefs.current[tabId];
        if (chipEl && containerRef.current) {
            chipEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    };

    return (
        <div className="filter-chips-container" ref={containerRef}>
            <div className="chip-indicator" ref={indicatorRef} />
            {TABS.map((tab) => (
                <div key={tab.id} className="chip-wrapper">
                    <button
                        className={`chip ${activeTab === tab.id ? 'chip-active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                        ref={el => chipRefs.current[tab.id] = el}
                    >
                        <tab.icon className="chip-icon" size={16} strokeWidth={2} />
                        <span className="chip-text">{tab.label}</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsTabsHorizontal;
