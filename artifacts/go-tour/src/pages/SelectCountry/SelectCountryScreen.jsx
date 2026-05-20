import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigation } from '../../App';
import Button from '../../components/Button/Button';
import DesktopSelectCountry from './DesktopSelectCountry';
import './SelectCountryScreen.css';

const countriesByContinent = {
    "África": [
        { name: "África do Sul", code: "ZA", flag: "🇿🇦" },
        { name: "Angola", code: "AO", flag: "🇦🇴" },
        { name: "Argélia", code: "DZ", flag: "🇩🇿" },
        { name: "Benim", code: "BJ", flag: "🇧🇯" },
        { name: "Botsuana", code: "BW", flag: "🇧🇼" },
        { name: "Burquina Fasso", code: "BF", flag: "🇧🇫" },
        { name: "Burúndi", code: "BI", flag: "🇧🇮" },
        { name: "Cabo Verde", code: "CV", flag: "🇨🇻" },
        { name: "Camarões", code: "CM", flag: "🇨🇲" },
        { name: "Chade", code: "TD", flag: "🇹🇩" },
        { name: "Comores", code: "KM", flag: "🇰🇲" },
        { name: "Congo-Brazzaville", code: "CG", flag: "🇨🇬" },
        { name: "Congo-Kinshasa", code: "CD", flag: "🇨🇩" },
        { name: "Costa do Marfim", code: "CI", flag: "🇨🇮" },
        { name: "Djibuti", code: "DJ", flag: "🇩🇯" },
        { name: "Egito", code: "EG", flag: "🇪🇬" },
        { name: "Eritreia", code: "ER", flag: "🇪🇷" },
        { name: "Eswatini", code: "SZ", flag: "🇸🇿" },
        { name: "Etiópia", code: "ET", flag: "🇪🇹" },
        { name: "Gabão", code: "GA", flag: "🇬🇦" },
        { name: "Gâmbia", code: "GM", flag: "🇬🇲" },
        { name: "Gana", code: "GH", flag: "🇬🇭" },
        { name: "Guiné", code: "GN", flag: "🇬🇳" },
        { name: "Guiné Equatorial", code: "GQ", flag: "🇬🇶" },
        { name: "Guiné-Bissau", code: "GW", flag: "🇬🇼" },
        { name: "Lesoto", code: "LS", flag: "🇱🇸" },
        { name: "Libéria", code: "LR", flag: "🇱🇷" },
        { name: "Líbia", code: "LY", flag: "🇱🇾" },
        { name: "Madagáscar", code: "MG", flag: "🇲🇬" },
        { name: "Maláui", code: "MW", flag: "🇲🇼" },
        { name: "Mali", code: "ML", flag: "🇲🇱" },
        { name: "Marrocos", code: "MA", flag: "🇲🇦" },
        { name: "Maurícia", code: "MU", flag: "🇲🇺" },
        { name: "Mauritânia", code: "MR", flag: "🇲🇷" },
        { name: "Moçambique", code: "MZ", flag: "🇲🇿" },
        { name: "Namíbia", code: "NA", flag: "🇳🇦" },
        { name: "Níger", code: "NE", flag: "🇳🇪" },
        { name: "Nigéria", code: "NG", flag: "🇳🇬" },
        { name: "Quénia", code: "KE", flag: "🇰🇪" },
        { name: "República Centro-Africana", code: "CF", flag: "🇨🇫" },
        { name: "Ruanda", code: "RW", flag: "🇷🇼" },
        { name: "São Tomé e Príncipe", code: "ST", flag: "🇸🇹" },
        { name: "Senegal", code: "SN", flag: "🇸🇳" },
        { name: "Serra Leoa", code: "SL", flag: "🇸🇱" },
        { name: "Seicheles", code: "SC", flag: "🇸🇨" },
        { name: "Somália", code: "SO", flag: "🇸🇴" },
        { name: "Sudão", code: "SD", flag: "🇸🇩" },
        { name: "Sudão do Sul", code: "SS", flag: "🇸🇸" },
        { name: "Tanzânia", code: "TZ", flag: "🇹🇿" },
        { name: "Togo", code: "TG", flag: "🇹🇬" },
        { name: "Tunísia", code: "TN", flag: "🇹🇳" },
        { name: "Uganda", code: "UG", flag: "🇺🇬" },
        { name: "Zâmbia", code: "ZM", flag: "🇿🇲" },
        { name: "Zimbábue", code: "ZW", flag: "🇿🇼" }
    ],
    "Américas": [
        { name: "Antígua e Barbuda", code: "AG", flag: "🇦🇬" },
        { name: "Argentina", code: "AR", flag: "🇦🇷" },
        { name: "Bahamas", code: "BS", flag: "🇧🇸" },
        { name: "Barbados", code: "BB", flag: "🇧🇧" },
        { name: "Belize", code: "BZ", flag: "🇧🇿" },
        { name: "Bolívia", code: "BO", flag: "🇧🇴" },
        { name: "Brasil", code: "BR", flag: "🇧🇷" },
        { name: "Canadá", code: "CA", flag: "🇨🇦" },
        { name: "Chile", code: "CL", flag: "🇨🇱" },
        { name: "Colômbia", code: "CO", flag: "🇨🇴" },
        { name: "Costa Rica", code: "CR", flag: "🇨🇷" },
        { name: "Cuba", code: "CU", flag: "🇨🇺" },
        { name: "Dominica", code: "DM", flag: "🇩🇲" },
        { name: "El Salvador", code: "SV", flag: "🇸🇻" },
        { name: "Equador", code: "EC", flag: "🇪🇨" },
        { name: "Estados Unidos", code: "US", flag: "🇺🇸" },
        { name: "Granada", code: "GD", flag: "🇬🇩" },
        { name: "Guatemala", code: "GT", flag: "🇬🇹" },
        { name: "Guiana", code: "GY", flag: "🇬🇾" },
        { name: "Haiti", code: "HT", flag: "🇭🇹" },
        { name: "Honduras", code: "HN", flag: "🇭🇳" },
        { name: "Jamaica", code: "JM", flag: "🇯🇲" },
        { name: "México", code: "MX", flag: "🇲🇽" },
        { name: "Nicarágua", code: "NI", flag: "🇳🇮" },
        { name: "Panamá", code: "PA", flag: "🇵🇦" },
        { name: "Paraguai", code: "PY", flag: "🇵🇾" },
        { name: "Peru", code: "PE", flag: "🇵🇪" },
        { name: "República Dominicana", code: "DO", flag: "🇩🇴" },
        { name: "Santa Lúcia", code: "LC", flag: "🇱🇨" },
        { name: "São Cristóvão e Neves", code: "KN", flag: "🇰🇳" },
        { name: "São Vicente e Granadinas", code: "VC", flag: "🇻🇨" },
        { name: "Suriname", code: "SR", flag: "🇸🇷" },
        { name: "Trindade e Tobago", code: "TT", flag: "🇹🇹" },
        { name: "Uruguai", code: "UY", flag: "🇺🇾" },
        { name: "Venezuela", code: "VE", flag: "🇻🇪" }
    ],
    "Europa": [
        { name: "Albânia", code: "AL", flag: "🇦🇱" },
        { name: "Alemanha", code: "DE", flag: "🇩🇪" },
        { name: "Andorra", code: "AD", flag: "🇦🇩" },
        { name: "Arménia", code: "AM", flag: "🇦🇲" },
        { name: "Áustria", code: "AT", flag: "🇦🇹" },
        { name: "Azerbaijão", code: "AZ", flag: "🇦🇿" },
        { name: "Bélgica", code: "BE", flag: "🇧🇪" },
        { name: "Bielorrússia", code: "BY", flag: "🇧🇾" },
        { name: "Bósnia e Herzegovina", code: "BA", flag: "🇧🇦" },
        { name: "Bulgária", code: "BG", flag: "🇧🇬" },
        { name: "Cazaquistão", code: "KZ", flag: "🇰🇿" },
        { name: "Chipre", code: "CY", flag: "🇨🇾" },
        { name: "Croácia", code: "HR", flag: "🇭🇷" },
        { name: "Dinamarca", code: "DK", flag: "🇩🇰" },
        { name: "Eslováquia", code: "SK", flag: "🇸🇰" },
        { name: "Eslovénia", code: "SI", flag: "🇸🇮" },
        { name: "Espanha", code: "ES", flag: "🇪🇸" },
        { name: "Estónia", code: "EE", flag: "🇪🇪" },
        { name: "Finlândia", code: "FI", flag: "🇫🇮" },
        { name: "França", code: "FR", flag: "🇫🇷" },
        { name: "Geórgia", code: "GE", flag: "🇬🇪" },
        { name: "Grécia", code: "GR", flag: "🇬🇷" },
        { name: "Hungria", code: "HU", flag: "🇭🇺" },
        { name: "Irlanda", code: "IE", flag: "🇮🇪" },
        { name: "Islândia", code: "IS", flag: "🇮🇸" },
        { name: "Itália", code: "IT", flag: "🇮🇹" },
        { name: "Letónia", code: "LV", flag: "🇱🇻" },
        { name: "Liechtenstein", code: "LI", flag: "🇱🇮" },
        { name: "Lituânia", code: "LT", flag: "🇱🇹" },
        { name: "Luxemburgo", code: "LU", flag: "🇱🇺" },
        { name: "Macedónia do Norte", code: "MK", flag: "🇲🇰" },
        { name: "Malta", code: "MT", flag: "🇲🇹" },
        { name: "Moldávia", code: "MD", flag: "🇲🇩" },
        { name: "Mónaco", code: "MC", flag: "🇲🇨" },
        { name: "Montenegro", code: "ME", flag: "🇲🇪" },
        { name: "Noruega", code: "NO", flag: "🇳🇴" },
        { name: "Países Baixos", code: "NL", flag: "🇳🇱" },
        { name: "Polónia", code: "PL", flag: "🇵🇱" },
        { name: "Portugal", code: "PT", flag: "🇵🇹" },
        { name: "Reino Unido", code: "GB", flag: "🇬🇧" },
        { name: "República Checa", code: "CZ", flag: "🇨🇿" },
        { name: "Roménia", code: "RO", flag: "🇷🇴" },
        { name: "Rússia", code: "RU", flag: "🇷🇺" },
        { name: "San Marino", code: "SM", flag: "🇸🇲" },
        { name: "Sérvia", code: "RS", flag: "🇷🇸" },
        { name: "Suécia", code: "SE", flag: "🇸🇪" },
        { name: "Suíça", code: "CH", flag: "🇨🇭" },
        { name: "Turquia", code: "TR", flag: "🇹🇷" },
        { name: "Ucrânia", code: "UA", flag: "🇺🇦" },
        { name: "Vaticano", code: "VA", flag: "🇻🇦" }
    ],
    "Ásia": [
        { name: "Afeganistão", code: "AF", flag: "🇦🇫" },
        { name: "Arábia Saudita", code: "SA", flag: "🇸🇦" },
        { name: "Bangladexe", code: "BD", flag: "🇧🇩" },
        { name: "Barém", code: "BH", flag: "🇧🇭" },
        { name: "Brunei", code: "BN", flag: "🇧🇳" },
        { name: "Butão", code: "BT", flag: "🇧🇹" },
        { name: "Camboja", code: "KH", flag: "🇰🇭" },
        { name: "Catar", code: "QA", flag: "🇶🇦" },
        { name: "China", code: "CN", flag: "🇨🇳" },
        { name: "Coreia do Norte", code: "KP", flag: "🇰🇵" },
        { name: "Coreia do Sul", code: "KR", flag: "🇰🇷" },
        { name: "Emirados Árabes Unidos", code: "AE", flag: "🇦🇪" },
        { name: "Filipinas", code: "PH", flag: "🇵🇭" },
        { name: "Iémen", code: "YE", flag: "🇾🇪" },
        { name: "Índia", code: "IN", flag: "🇮🇳" },
        { name: "Indonésia", code: "ID", flag: "🇮🇩" },
        { name: "Irão", code: "IR", flag: "🇮🇷" },
        { name: "Iraque", code: "IQ", flag: "🇮🇶" },
        { name: "Israel", code: "IL", flag: "🇮🇱" },
        { name: "Japão", code: "JP", flag: "🇯🇵" },
        { name: "Jordânia", code: "JO", flag: "🇯🇴" },
        { name: "Koweit", code: "KW", flag: "🇰🇼" },
        { name: "Laos", code: "LA", flag: "🇱🇦" },
        { name: "Líbano", code: "LB", flag: "🇱🇧" },
        { name: "Malásia", code: "MY", flag: "🇲🇾" },
        { name: "Maldivas", code: "MV", flag: "🇲🇻" },
        { name: "Mianmar", code: "MM", flag: "🇲🇲" },
        { name: "Mongólia", code: "MN", flag: "🇲🇳" },
        { name: "Nepal", code: "NP", flag: "🇳🇵" },
        { name: "Omã", code: "OM", flag: "🇴🇲" },
        { name: "Paquistão", code: "PK", flag: "🇵🇰" },
        { name: "Quirguistão", code: "KG", flag: "🇰🇬" },
        { name: "Singapura", code: "SG", flag: "🇸🇬" },
        { name: "Síria", code: "SY", flag: "🇸🇾" },
        { name: "Sri Lanca", code: "LK", flag: "🇱🇰" },
        { name: "Tailândia", code: "TH", flag: "🇹🇭" },
        { name: "Tajiquistão", code: "TJ", flag: "🇹🇯" },
        { name: "Timor-Leste", code: "TL", flag: "🇹🇱" },
        { name: "Turquemenistão", code: "TM", flag: "🇹🇲" },
        { name: "Uzbequistão", code: "UZ", flag: "🇺🇿" },
        { name: "Vietname", code: "VN", flag: "🇻🇳" }
    ],
    "Oceania": [
        { name: "Austrália", code: "AU", flag: "🇦🇺" },
        { name: "Fiji", code: "FJ", flag: "🇫🇯" },
        { name: "Ilhas Marshall", code: "MH", flag: "🇲🇭" },
        { name: "Ilhas Salomão", code: "SB", flag: "🇸🇧" },
        { name: "Kiribati", code: "KI", flag: "🇰🇮" },
        { name: "Micronésia", code: "FM", flag: "🇫🇲" },
        { name: "Nauru", code: "NR", flag: "🇳🇷" },
        { name: "Nova Zelândia", code: "NZ", flag: "🇳🇿" },
        { name: "Palau", code: "PW", flag: "🇵🇼" },
        { name: "Papua Nova Guiné", code: "PG", flag: "🇵🇬" },
        { name: "Samoa", code: "WS", flag: "🇼🇸" },
        { name: "Tonga", code: "TO", flag: "🇹🇴" },
        { name: "Tuvalu", code: "TV", flag: "🇹🇻" },
        { name: "Vanuatu", code: "VU", flag: "🇻🇺" }
    ]
};

const SelectCountryScreen = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const { setExploreCountry, exploreCountry } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Responsive check
    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 1024);
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    if (!isMobile) {
        return <DesktopSelectCountry />;
    }

    return (
        <div className="select-country-page">
            <div className="select-country-container fade-in">
                <div className="select-country-header">
                    <h1 className="desktop-hidden">Escolha o país que deseja explorar</h1>
                    <h1 className="mobile-hidden desktop-title-centered">Selecione o seu destino e descubra mais</h1>
                    <p className="desktop-hidden">Pode alterar esta opção mais tarde nas definições.</p>

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
                    <div className="continents-grid-container">
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
                                                    <img
                                                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                                        alt={`Bandeira de ${country.name}`}
                                                        className="country-flag-img"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'inline-block';
                                                        }}
                                                    />
                                                    <span className="country-flag-fallback" style={{ display: 'none', fontSize: '24px' }}>{country.flag}</span>
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
                    </div>

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
