import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Home, ConciergeBell, BedDouble, Star, Tent, Route,
    Camera, Utensils, Palmtree, Landmark, Ticket, Moon,
    ShoppingBag, Navigation2, Car, Plane, Headphones, Key,
    Coffee, Users
} from 'lucide-react';
import './FilterChipsRowStyles.css';

const filters = [
    { id: 'inicio', label: 'Início', icon: Home, scrollTarget: 'top' },
    { id: 'hoteis', label: 'Hotéis', icon: ConciergeBell, scrollTarget: 'section-hoteis' },
    { id: 'apartamentos', label: 'Apartamentos', icon: BedDouble, scrollTarget: 'section-apartamentos' },
    { id: 'resorts', label: 'Resorts', icon: Star, scrollTarget: 'section-resorts' },
    { id: 'guesthouses', label: 'Guest Houses', icon: Coffee, scrollTarget: 'section-guesthouses' },
    { id: 'hostels', label: 'Hostels', icon: Users, scrollTarget: 'section-hostels' },
    { id: 'villas', label: 'Villas / Casas', icon: Key, scrollTarget: 'section-villas' },
    { id: 'lodges', label: 'Lodges', icon: Tent, scrollTarget: 'section-lodges' },
    { id: 'restaurantes', label: 'Restaurantes', icon: Utensils, scrollTarget: 'section-restaurantes' },
    { id: 'experiencias', label: 'Experiências', icon: Camera, scrollTarget: 'section-experiencias' },
    { id: 'praias', label: 'Praias & Ilhas', icon: Palmtree, scrollTarget: 'section-praias' },
    { id: 'cultura', label: 'Cultura', icon: Landmark, scrollTarget: 'section-cultura' },
    { id: 'eventos', label: 'Eventos', icon: Ticket, scrollTarget: 'section-eventos' },
    { id: 'vidanoturna', label: 'Vida Noturna', icon: Moon, scrollTarget: 'section-vidanoturna' },
    { id: 'compras', label: 'Compras', icon: ShoppingBag, scrollTarget: 'section-compras' },
    { id: 'transportes', label: 'Transportes', icon: Navigation2, scrollTarget: 'section-transportes' },
    { id: 'aluguercarros', label: 'Aluguer de Carros', icon: Car, scrollTarget: 'section-aluguercarros' },
    { id: 'voos', label: 'Voos', icon: Plane, scrollTarget: 'section-voos' },
    { id: 'servicos', label: 'Serviços', icon: Headphones, scrollTarget: 'section-servicos' },
    { id: 'tours', label: 'Tours', icon: Route, scrollTarget: 'section-tours' },
];

// Height of the fixed header (logo + search + chips) to offset scroll
const HEADER_OFFSET = 230;

const FilterChipsRow = ({ isSkeleton }) => {
    const [activeChip, setActiveChip] = useState(null);
    const containerRef = useRef(null);
    const indicatorRef = useRef(null);
    const chipRefs = useRef({});

    // Animate the bottom indicator bar to the active chip
    const updateIndicator = useCallback(() => {
        if (!activeChip || !indicatorRef.current || !containerRef.current) {
            if (indicatorRef.current) {
                indicatorRef.current.style.opacity = '0';
                indicatorRef.current.style.width = '0px';
            }
            return;
        }
        const chipEl = chipRefs.current[activeChip];
        if (!chipEl) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const chipRect = chipEl.getBoundingClientRect();

        const left = chipRect.left - containerRect.left + containerRef.current.scrollLeft;
        const width = chipRect.width;

        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.opacity = '1';
    }, [activeChip]);

    useEffect(() => {
        updateIndicator();
    }, [activeChip, updateIndicator]);

    // Handle scroll of the container to update indicator position
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleScroll = () => updateIndicator();
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [updateIndicator]);

    const scrollToSection = (targetId) => {
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleChipClick = (filter) => {
        setActiveChip(activeChip === filter.id ? null : filter.id);

        // Scroll the chip into view within the horizontal container
        const chipEl = chipRefs.current[filter.id];
        if (chipEl && containerRef.current) {
            chipEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        
        // Scroll to the section
        if (filter.scrollTarget) {
            setTimeout(() => {
                scrollToSection(filter.scrollTarget);
            }, 80);
        }
    };

    return (
        <div className="filter-chips-container" ref={containerRef}>
            {/* Animated indicator bar */}
            <div className="chip-indicator" ref={indicatorRef} />

            {filters.map((filter) => (
                <div
                    key={filter.id}
                    className="chip-wrapper"
                >
                    {isSkeleton ? (
                        <div className="skeleton-chip-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 0 10px 0' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e0e0e0' }} />
                            <div style={{ width: filter.label.length * 8 + 'px', height: '12px', borderRadius: '4px', background: '#e0e0e0' }} />
                        </div>
                    ) : (
                        <button
                            className={`chip ${activeChip === filter.id ? 'chip-active' : ''}`}
                            onClick={() => handleChipClick(filter)}
                            ref={el => chipRefs.current[filter.id] = el}
                        >
                            <filter.icon className="chip-icon" size={16} strokeWidth={2} />
                            <span className="chip-text">{filter.label}</span>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilterChipsRow;
