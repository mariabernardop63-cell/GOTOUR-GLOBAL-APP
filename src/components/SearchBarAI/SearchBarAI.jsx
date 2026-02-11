import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, SlidersHorizontal, Globe, ChevronDown } from 'lucide-react';
import './SearchBarAI.css';

const CountryDropdown = ({ selectedCountry, onSelect, isOpen, onClose }) => {
    const countries = [
        { code: 'MZ', flag: '🇲🇿', name: 'Moçambique' },
        { code: 'ZA', flag: '🇿🇦', name: 'África do Sul' },
        { code: 'PT', flag: '🇵🇹', name: 'Portugal' },
        { code: 'BR', flag: '🇧🇷', name: 'Brasil' },
    ];

    if (!isOpen) return null;

    return (
        <div className="country-dropdown-glass">
            {countries.map((country) => (
                <button
                    key={country.code}
                    className={`country-option-glass ${selectedCountry.code === country.code ? 'active' : ''}`}
                    onClick={() => {
                        onSelect(country);
                        onClose();
                    }}
                >
                    <span className="country-flag">{country.flag}</span>
                    <span className="country-label">{country.name}</span>
                </button>
            ))}
        </div>
    );
};

const SearchBarAI = ({ onSearch, isSearching, isLoading, selectedCountry, onCountryChange }) => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const containerRef = useRef(null);

    const showNeon = isLoading;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsCountryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchClick = () => {
        if (searchText.trim()) {
            onSearch(searchText);
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
        <div
            className={`search-bar-container ${isFocused ? 'search-focused-sticky' : ''}`}
            ref={containerRef}
        >
            <div className="search-row-glass">
                {/* Globe Icon — Country Selector */}
                {!isFocused && (
                    <div className="globe-selector">
                        <button
                            className="globe-btn"
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                            aria-label="Select country"
                        >
                            <Globe size={20} strokeWidth={1.8} />
                        </button>
                        <CountryDropdown
                            selectedCountry={selectedCountry}
                            onSelect={onCountryChange}
                            isOpen={isCountryOpen}
                            onClose={() => setIsCountryOpen(false)}
                        />
                    </div>
                )}

                {/* Filter Icon when focused */}
                {isFocused && (
                    <div className="focused-left-icons">
                        <div className="icon-badge-glass">
                            <SlidersHorizontal size={20} color="#1e293b" />
                        </div>
                    </div>
                )}

                {/* Glassmorphism Search Bar */}
                <div className={`glass-wrapper ${showNeon ? 'active-neon' : ''}`}>
                    <div className="search-bar-glass">
                        <Search className="search-icon-glass" size={18} />

                        <input
                            type="text"
                            placeholder={isFocused ? "Pesquisar..." : "Pesquisar destinos, hotéis..."}
                            className="search-input-glass"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => { }}
                        />

                        {/* Circular Search Button */}
                        <button
                            className={`search-circle-btn ${isLoading ? 'loading' : ''}`}
                            onClick={handleSearchClick}
                            disabled={isLoading}
                            aria-label="Search"
                        >
                            {isLoading ? (
                                <Loader2 className="spinner-icon" size={18} />
                            ) : (
                                <Search size={18} strokeWidth={2.2} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Backdrop for focused mode */}
            {isFocused && (
                <div
                    className="search-focused-backdrop"
                    onClick={() => setIsFocused(false)}
                />
            )}
        </div>
    );
};

export default SearchBarAI;
