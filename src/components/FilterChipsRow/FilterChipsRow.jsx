import React, { useState, useRef, useEffect } from 'react';
import {
    BedDouble, UtensilsCrossed, Sparkles, Route, Compass, Umbrella,
    Church, CalendarDays, Moon, ShoppingBag, Bus, Car, Plane, Headphones,
    Hotel, Building, TreePalm, Home, Users, Castle, ChevronDown
} from 'lucide-react';
import './FilterChipsRowStyles.css';

const filters = [
    {
        id: 'hospedagem',
        label: 'Hospedagem',
        icon: BedDouble,
        hasDropdown: true,
        subcategories: [
            { id: 'hoteis', label: 'Hotéis', icon: Hotel },
            { id: 'apartamentos', label: 'Apartamentos', icon: Building },
            { id: 'resorts', label: 'Resorts', icon: TreePalm },
            { id: 'guesthouses', label: 'Guest Houses', icon: Home },
            { id: 'hostels', label: 'Hostels', icon: Users },
            { id: 'villas', label: 'Villas / Casas', icon: Castle },
            { id: 'lodges', label: 'Lodges (Turismo Natureza)', icon: Compass },
        ],
    },
    { id: 'restaurantes', label: 'Restaurantes', icon: UtensilsCrossed },
    { id: 'atividades', label: 'Atividades', icon: Sparkles },
    { id: 'tours', label: 'Tours', icon: Route },
    { id: 'experiencias', label: 'Experiências', icon: Compass },
    { id: 'praias', label: 'Praias', icon: Umbrella },
    { id: 'cultura', label: 'Cultura', icon: Church },
    { id: 'eventos', label: 'Eventos', icon: CalendarDays },
    { id: 'vidanoturna', label: 'Vida Noturna', icon: Moon },
    { id: 'compras', label: 'Compras', icon: ShoppingBag },
    { id: 'transportes', label: 'Transportes', icon: Bus },
    { id: 'aluguercarros', label: 'Aluguer de Carros', icon: Car },
    { id: 'voos', label: 'Voos', icon: Plane },
    { id: 'servicos', label: 'Serviços', icon: Headphones },
];

const FilterChipsRow = () => {
    const [activeChip, setActiveChip] = useState(null);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChipClick = (filter) => {
        if (filter.hasDropdown) {
            setIsDropdownOpen(!isDropdownOpen);
            setActiveChip(filter.id);
        } else {
            setActiveChip(activeChip === filter.id ? null : filter.id);
            setActiveSubcategory(null);
            setIsDropdownOpen(false);
        }
    };

    const handleSubcategoryClick = (subId) => {
        setActiveSubcategory(activeSubcategory === subId ? null : subId);
        setIsDropdownOpen(false);
    };

    return (
        <div className="filter-chips-container">
            {filters.map((filter) => (
                <div
                    key={filter.id}
                    className="chip-wrapper"
                    ref={filter.hasDropdown ? dropdownRef : null}
                >
                    <button
                        className={`chip ${activeChip === filter.id ? 'chip-active' : ''}`}
                        onClick={() => handleChipClick(filter)}
                    >
                        <filter.icon className="chip-icon" size={16} strokeWidth={1.8} />
                        <span className="chip-text">{filter.label}</span>
                        {filter.hasDropdown && (
                            <ChevronDown
                                className={`chip-chevron ${isDropdownOpen && activeChip === filter.id ? 'open' : ''}`}
                                size={14}
                            />
                        )}
                    </button>

                    {/* Hospedagem Dropdown */}
                    {filter.hasDropdown && isDropdownOpen && activeChip === filter.id && (
                        <div className="chip-dropdown">
                            {filter.subcategories.map((sub) => (
                                <button
                                    key={sub.id}
                                    className={`chip-dropdown-item ${activeSubcategory === sub.id ? 'active' : ''}`}
                                    onClick={() => handleSubcategoryClick(sub.id)}
                                >
                                    <sub.icon size={16} strokeWidth={1.6} />
                                    <span>{sub.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilterChipsRow;
