import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigation } from '../../App';
import Button from '../../components/Button/Button';
import './SelectCountryScreen.css';

const countriesByContinent = {
    "África": [
        { name: "África do Sul", code: "ZA", flag: "🇿🇦" },
        { name: "Angola", code: "AO", flag: "🇦🇴" },
        { name: "Egito", code: "EG", flag: "🇪🇬" },
        { name: "Moçambique", code: "MZ", flag: "🇲🇿" },
        { name: "Nigéria", code: "NG", flag: "🇳🇬" },
        { name: "Quénia", code: "KE", flag: "🇰🇪" }
    ],
    "Américas": [
        { name: "Argentina", code: "AR", flag: "🇦🇷" },
        { name: "Brasil", code: "BR", flag: "🇧🇷" },
        { name: "Canadá", code: "CA", flag: "🇨🇦" },
        { name: "Estados Unidos", code: "US", flag: "🇺🇸" },
        { name: "México", code: "MX", flag: "🇲🇽" }
    ],
    "Europa": [
        { name: "Alemanha", code: "DE", flag: "🇩🇪" },
        { name: "Espanha", code: "ES", flag: "🇪🇸" },
        { name: "França", code: "FR", flag: "🇫🇷" },
        { name: "Portugal", code: "PT", flag: "🇵🇹" },
        { name: "Reino Unido", code: "GB", flag: "🇬🇧" }
    ],
    "Ásia": [
        { name: "China", code: "CN", flag: "🇨🇳" },
        { name: "Coreia do Sul", code: "KR", flag: "🇰🇷" },
        { name: "Emirados Árabes Unidos", code: "AE", flag: "🇦🇪" },
        { name: "Índia", code: "IN", flag: "🇮🇳" },
        { name: "Japão", code: "JP", flag: "🇯🇵" }
    ],
    "Oceania": [
        { name: "Austrália", code: "AU", flag: "🇦🇺" },
        { name: "Nova Zelândia", code: "NZ", flag: "🇳🇿" }
    ]
};

const SelectCountryScreen = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const { setExploreCountry, exploreCountry } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const filteredCountries = useMemo(() => {
        if (!searchQuery) return countriesByContinent;

        const filtered = {};
        Object.keys(countriesByContinent).forEach(continent => {
            const matches = countriesByContinent[continent].filter(country =>
                country.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (matches.length > 0) {
                filtered[continent] = matches;
            }
        });
        return filtered;
    }, [searchQuery]);

    const handleSelectCountry = (country) => {
        if (isSelecting) return;

        setSelectedCountry(country);
        setIsSelecting(true);
        setExploreCountry(country.name);

        // Auto-navigate after 2 seconds
        setTimeout(() => {
            navigateForward('/home');
        }, 2000);
    };

    return (
        <div className="select-country-page">
            <div className="select-country-container fade-in">
                <div className="select-country-header">
                    <h1>Escolha o país que deseja explorar</h1>
                    <p>Pode alterar esta opção mais tarde nas definições.</p>

                    {/* Search Bar - Matching SearchBarAI Style */}
                    <div className={`search-bar-wrapper-ai ${isFocused ? 'focused' : ''}`}>
                        <div className="search-bar-glass-inner">
                            <Search className="search-icon-glass" size={18} />
                            <input
                                type="text"
                                placeholder="Pesquisar país..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                disabled={isSelecting}
                            />
                        </div>
                    </div>
                </div>

                <div className="country-list-scroll">
                    {Object.keys(filteredCountries).map((continent) => (
                        <div key={continent} className="continent-block">
                            <h2 className="continent-title">{continent}</h2>
                            <div className="countries-list-vertical">
                                {filteredCountries[continent].map((country) => {
                                    const isThisSelected = selectedCountry?.code === country.code;
                                    return (
                                        <div
                                            key={country.code}
                                            className={`country-item-row ${isThisSelected ? 'selected' : ''} ${isThisSelected && isSelecting ? 'is-processing' : ''}`}
                                            onClick={() => handleSelectCountry(country)}
                                        >
                                            <div className="country-left-info">
                                                <span className="country-flag-emoji">{country.flag}</span>
                                                <span className="country-name-text">{country.name}</span>
                                            </div>
                                            {isThisSelected ? (
                                                isSelecting ? (
                                                    <div className="processing-spinner" />
                                                ) : (
                                                    <Check className="check-icon-active" size={18} />
                                                )
                                            ) : (
                                                <div className="selection-circle" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {Object.keys(filteredCountries).length === 0 && (
                        <div className="no-results-found">
                            Nenhum país encontrado para "{searchQuery}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectCountryScreen;
