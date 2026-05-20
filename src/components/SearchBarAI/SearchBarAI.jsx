import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Loader2, User, ChevronDown, ChevronLeft, Clock, Trash2 } from 'lucide-react';
import { useNavigation } from '../../App';
import { extractSearchIntent } from '../../services/aiSearchService';
import './SearchBarAIStyles.css';

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

const SearchBarAI = ({ onSearch, isSearching, isLoading, isSkeleton, selectedCountry, onCountryChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground } = useNavigation();
    
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([
        'Praias em Inhambane',
        'Hotéis baratos na Beira',
        'Aluguer de carros',
        'Restaurantes de marisco maputo'
    ]);
    const containerRef = useRef(null);

    const showNeon = isLoading || localLoading;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchClick = async (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (searchText.trim() && !localLoading && !isLoading) {
            // Add to history without duplicates
            setSearchHistory(prev => {
                const filtered = prev.filter(item => item !== searchText.trim());
                return [searchText.trim(), ...filtered].slice(0, 8); // Keep up to 8
            });

            // Stage 1: Spin for loading and move to focus mode
            setLocalLoading(true);
            setIsFocused(true);

            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            // Call to Gemini AI service for semantic parsing
            const aiAnalysis = await extractSearchIntent(searchText.trim());

            // Add an artificial small visual delay just for UI premium feel
            setTimeout(() => {
                setLocalLoading(false);
                setIsFocused(false);
                onSearch(searchText.trim(), aiAnalysis);
            }, 800);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick(e);
        }
    };

    return (
        <div
            className={`search-bar-container ${isFocused ? 'search-focused-sticky' : ''}`}
            ref={containerRef}
        >
            <div className="search-row-glass">
                {/* Removed duplicate user profile icon from SearchBarAI as requested */}

                {/* Back Icon when focused */}
                {isFocused && (
                    <div className="focused-left-icons">
                        <button className="icon-badge-glass" onClick={() => setIsFocused(false)} aria-label="Voltar">
                            <ChevronLeft size={24} color="#1e293b" />
                        </button>
                    </div>
                )}

                {/* Glassmorphism Search Bar */}
                <div className={`glass-wrapper ${showNeon ? 'active-neon' : ''} ${isFocused ? 'wrapper-focused' : ''}`}>
                    <div className="search-bar-glass">
                        {isSkeleton ? (
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end', paddingRight: '4px' }}>
                                <div className="skeleton-search-icon-round shimmer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ececec' }} />
                            </div>
                        ) : (
                            <>
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
                                    className={`search-circle-btn ${isLoading || localLoading ? 'loading' : ''}`}
                                    onClick={handleSearchClick}
                                    disabled={isLoading || localLoading}
                                    aria-label="Search"
                                >
                                    {isLoading || localLoading ? (
                                        <Loader2 className="spinner-icon" size={18} />
                                    ) : (
                                        <Search size={18} strokeWidth={2.2} />
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Searches Dropdown */}
            {isFocused && (
                <div className="recent-searches-dropdown">
                    <div className="recent-searches-header">
                        <span className="recent-searches-title">Pesquisas recentes</span>
                    </div>
                    
                    {searchHistory.length > 0 ? (
                        <div className="recent-searches-list">
                            {searchHistory.slice(0, 5).map((item, index) => (
                                <div key={index} className="recent-search-item">
                                    <div 
                                        className="recent-search-content"
                                        onClick={async () => {
                                            if (localLoading || isLoading) return;
                                            setSearchText(item);
                                            
                                            // Handle history click exactly with AI parsing
                                            setLocalLoading(true);
                                            setIsFocused(true);
                                            
                                            const aiAnalysis = await extractSearchIntent(item);
                                            
                                            setTimeout(() => {
                                                setLocalLoading(false);
                                                setIsFocused(false);
                                                onSearch(item, aiAnalysis);
                                            }, 800);
                                        }}
                                    >
                                        <Clock size={20} color="#94a3b8" className="recent-icon" />
                                        <span className="recent-text">{item}</span>
                                    </div>
                                    <button 
                                        className="recent-delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSearchHistory(prev => prev.filter(h => h !== item));
                                        }}
                                        aria-label="Remover pesquisa"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {searchHistory.length > 5 && (
                                <button className="recent-view-more-btn">
                                    Ver mais
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="recent-searches-empty">
                            Nenhuma pesquisa recente.
                        </div>
                    )}
                </div>
            )}

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
