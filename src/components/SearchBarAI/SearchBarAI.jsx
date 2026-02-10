import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import './SearchBarAI.css';

const CountrySelector = ({ selectedCountry, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const countries = [
        { code: 'MZ', flag: '🇲🇿', name: 'Moçambique' },
        { code: 'ZA', flag: '🇿🇦', name: 'África do Sul' },
        { code: 'PT', flag: '🇵🇹', name: 'Portugal' },
        { code: 'BR', flag: '🇧🇷', name: 'Brasil' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (country) => {
        onSelect(country);
        setIsOpen(false);
    };

    return (
        <div className="country-selector-container" ref={dropdownRef}>
            <button className="country-flag-btn" onClick={() => setIsOpen(!isOpen)}>
                <span className="flag-icon">{selectedCountry.flag}</span>
                <ChevronDown size={14} className="dropdown-chevron" />
            </button>

            {isOpen && (
                <div className="country-dropdown">
                    {countries.map((country) => (
                        <button
                            key={country.code}
                            className="country-option"
                            onClick={() => handleSelect(country)}
                        >
                            <span className="flag-icon">{country.flag}</span>
                            <span className="country-name">{country.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const SearchBarAI = ({ onSearch, isSearching, isLoading, selectedCountry, onCountryChange }) => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Neon effect mirrors isLoading
    const showNeon = isLoading;

    const handleSearchClick = () => {
        if (searchText.trim()) {
            onSearch(searchText);
            // Revert to normal view after search, but keep processing
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            setIsFocused(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className={`search-bar-container ${isFocused ? 'search-focused-sticky' : ''}`}>
            <div className="search-row">
                {/* Country Selector - Hidden when focused if we strictly follow "Filter Option + Lupa" on left */}
                {!isFocused && <CountrySelector selectedCountry={selectedCountry} onSelect={onCountryChange} />}

                {/* Filter Icon (Only visible when focused as "Filter Option") */}
                {isFocused && (
                    <div className="focused-left-ions">
                        <div className="icon-badge">
                            <SlidersHorizontal size={20} color="#1e293b" />
                        </div>
                    </div>
                )}

                {/* Search Bar with Neon Border */}
                <div className={`neon-wrapper ${showNeon ? 'active-neon' : ''}`}>
                    <div className="search-bar">
                        {/* Lupa (Search Icon) - Acts as the second icon on left when focused */}
                        <Search className="search-icon-inner" size={18} />

                        <input
                            type="text"
                            placeholder={isFocused ? "Pesquisar..." : "Pesquisar destinos, hotéis..."}
                            className="search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                // Optional: delay blur to allow clicks
                                // setTimeout(() => setIsFocused(false), 200);
                            }}
                        />

                        {/* Cancel button when focused? User said "text goes back", implying revert. 
                             Or maybe just the right button transforms? */}
                        <button
                            className={`search-button-inner ${isLoading ? 'loading' : ''}`}
                            onClick={handleSearchClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="spinner-icon" size={18} />
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Backdrop for focused mode */}
            {isFocused && <div className="search-focused-backdrop" onClick={() => setIsFocused(false)}></div>}
        </div>
    );
};

export default SearchBarAI;
