import React, { useState } from 'react';
import { Building2, UtensilsCrossed, Sparkles, Bus, Headphones, Compass, Route, Church } from 'lucide-react';
import './FilterChipsRow.css';

const filters = [
    { id: 'hotels', label: 'Hotéis', icon: Building2 },
    { id: 'restaurants', label: 'Restaurantes', icon: UtensilsCrossed },
    { id: 'activities', label: 'Atividades', icon: Sparkles },
    { id: 'transport', label: 'Transportes', icon: Bus },
    { id: 'services', label: 'Serviços', icon: Headphones },
    { id: 'experiences', label: 'Experiências', icon: Compass },
    { id: 'tours', label: 'Tours', icon: Route },
    { id: 'culture', label: 'Cultura', icon: Church },
];

const FilterChipsRow = () => {
    const [activeChip, setActiveChip] = useState(null);

    return (
        <div className="filter-chips-container">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    className={`chip ${activeChip === filter.id ? 'chip-active' : ''}`}
                    onClick={() => setActiveChip(activeChip === filter.id ? null : filter.id)}
                >
                    <filter.icon className="chip-icon" size={16} strokeWidth={1.8} />
                    <span className="chip-text">{filter.label}</span>
                </button>
            ))}
        </div>
    );
};

export default FilterChipsRow;
