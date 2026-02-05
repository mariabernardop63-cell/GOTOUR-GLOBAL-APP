import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import './SearchBarAI.css';

const CountrySelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: 'MZ', flag: '🇲🇿', name: 'Moçambique' });
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
        setSelectedCountry(country);
        setIsOpen(false);
    };

    return (
        <div className="country-selector-container" ref={dropdownRef}>
            <button className="country-flag-btn" onClick={() => setIsOpen(!isOpen)}>
                <span className="flag-icon">{selectedCountry.flag}</span>
                <div className="dropdown-arrow"></div>
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

const SearchBarAI = ({ onSearch, isSearching, isLoading }) => {
    const [searchText, setSearchText] = useState('');
    const [showNeon, setShowNeon] = useState(false);

    useEffect(() => {
        let neonTimer;
        if (isSearching && !isLoading) {
            // Start Neon effect when search finishes loading
            setShowNeon(true);
            neonTimer = setTimeout(() => {
                setShowNeon(false);
            }, 5000); // 3-5 seconds duration (chose 5s)
        } else {
            setShowNeon(false);
        }
        return () => clearTimeout(neonTimer);
    }, [isSearching, isLoading]);

    const handleSearchClick = () => {
        if (searchText.trim()) {
            onSearch(searchText);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className="search-bar-container">
            <div className="search-row">
                {/* Country Selector */}
                <CountrySelector />

                {/* Search Bar with Neon Border */}
                <div className={`neon-wrapper ${showNeon ? 'active-neon' : ''}`}>
                    <div className="search-bar">
                        <Search className="search-icon-inner" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar destinos, hotéis..."
                            className="search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
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

            {!isSearching && <div className="header-separator"></div>}
        </div>
    );
};

export default SearchBarAI;
