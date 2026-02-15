import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Check, Search as SearchIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/Button/Button';
import './SelectCountryScreen.css';

const countriesByContinent = {
    "África": [
        { name: "Angola", code: "AO" },
        { name: "África do Sul", code: "ZA" },
        { name: "Egito", code: "EG" },
        { name: "Moçambique", code: "MZ" },
        { name: "Nigéria", code: "NG" },
        { name: "Quénia", code: "KE" }
    ],
    "Europa": [
        { name: "Alemanha", code: "DE" },
        { name: "Espanha", code: "ES" },
        { name: "França", code: "FR" },
        { name: "Portugal", code: "PT" },
        { name: "Reino Unido", code: "GB" }
    ],
    "Américas": [
        { name: "Argentina", code: "AR" },
        { name: "Brasil", code: "BR" },
        { name: "Canadá", code: "CA" },
        { name: "Estados Unidos", code: "US" },
        { name: "México", code: "MX" }
    ],
    "Ásia": [
        { name: "China", code: "CN" },
        { name: "Coreia do Sul", code: "KR" },
        { name: "Emirados Árabes Unidos", code: "AE" },
        { name: "Índia", code: "IN" },
        { name: "Japão", code: "JP" }
    ],
    "Oceania": [
        { name: "Austrália", code: "AU" },
        { name: "Nova Zelândia", code: "NZ" }
    ]
};

const SelectCountryScreen = () => {
    const navigate = useNavigate();
    const { setExploreCountry, exploreCountry } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Auto-skip if country already selected
    React.useEffect(() => {
        if (exploreCountry) {
            navigate('/home');
        }
    }, [exploreCountry, navigate]);

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
        setSelectedCountry(country);
    };

    const handleContinue = () => {
        if (selectedCountry) {
            setIsLoading(true);
            // Salvar no contexto/localStorage
            setExploreCountry(selectedCountry.name);

            setTimeout(() => {
                setIsLoading(false);
                navigate('/home');
            }, 1000);
        }
    };

    return (
        <div className="select-country-container fade-in">
            <div className="select-country-header">
                <h1>Escolha o país que deseja explorar</h1>
                <p>Pode alterar esta opção mais tarde nas definições.</p>

                <div className="search-bar-wrapper">
                    <SearchIcon className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Pesquisar país..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="country-list-scroll">
                {Object.keys(filteredCountries).map((continent) => (
                    <div key={continent} className="continent-block">
                        <h2 className="continent-title">{continent}</h2>
                        <div className="countries-grid">
                            {filteredCountries[continent].map((country) => (
                                <div
                                    key={country.code}
                                    className={`country-card ${selectedCountry?.code === country.code ? 'selected' : ''}`}
                                    onClick={() => handleSelectCountry(country)}
                                >
                                    <span className="country-name">{country.name}</span>
                                    {selectedCountry?.code === country.code && <Check className="check-icon" size={18} />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {Object.keys(filteredCountries).length === 0 && (
                    <div className="no-results">
                        Nenhum país encontrado para "{searchQuery}"
                    </div>
                )}
            </div>

            <div className="select-country-footer">
                <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    disabled={!selectedCountry}
                    isLoading={isLoading}
                    onClick={handleContinue}
                >
                    Continuar
                </Button>
            </div>
        </div>
    );
};

export default SelectCountryScreen;
