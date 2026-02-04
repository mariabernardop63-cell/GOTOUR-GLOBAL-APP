import React from 'react';
import { Bed, Utensils, Ticket, MapPin, Landmark } from 'lucide-react';
import './FilterChipsRow.css';

const filters = [
    { id: 'hotels', label: 'Hotéis', icon: Bed },
    { id: 'restaurants', label: 'Restaurantes', icon: Utensils },
    { id: 'activities', label: 'Atividades', icon: Ticket },
    { id: 'experiences', label: 'Experiências', icon: MapPin },
    { id: 'culture', label: 'Cultura', icon: Landmark },
];

const FilterChipsRow = () => {
    return (
        <div className="filter-chips-container">
            {filters.map((filter) => (
                <div key={filter.id} className="chip">
                    <filter.icon className="chip-icon" size={18} />
                    <span className="chip-text">{filter.label}</span>
                </div>
            ))}
        </div>
    );
};

export default FilterChipsRow;
