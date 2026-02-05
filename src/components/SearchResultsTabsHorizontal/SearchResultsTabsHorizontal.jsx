import React, { useRef } from 'react';
import './SearchResultsTabsHorizontal.css';

const TABS = [
    { id: 'all', label: 'Tudo' },
    { id: 'hotels', label: 'Hotéis' },
    { id: 'restaurants', label: 'Restaurantes' },
    { id: 'beaches', label: 'Praias' },
    { id: 'activities', label: 'Atividades' },
    { id: 'experiences', label: 'Experiências' },
    { id: 'services', label: 'Serviços' },
    { id: 'transport', label: 'Transportes' },
    { id: 'rentals', label: 'Aluguer' },
    { id: 'events', label: 'Eventos' },
    { id: 'culture', label: 'Cultura' },
    { id: 'photos', label: 'Fotos' },
    { id: 'posts', label: 'Publicações' },
    { id: 'map', label: 'Mapa' },
];

const SearchResultsTabsHorizontal = ({ activeTab, onTabChange }) => {
    const scrollContainerRef = useRef(null);

    return (
        <div className="search-tabs-container">
            <div className="search-tabs-scroll" ref={scrollContainerRef}>
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`search-tab-chip ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchResultsTabsHorizontal;
