import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CountryCodeDropdown.css';
import { countries } from '../../data/countries';

const CountryCodeDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const selectedOption = countries.find(opt => opt.dialCode === value) || countries[0]; // Default to first if not found

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sort countries alphabetically
    const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

    const filteredOptions = sortedCountries.filter(opt =>
        opt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        opt.dialCode.includes(searchTerm)
    );

    const handleSelect = (code) => {
        onChange(code);
        setIsOpen(false);
        setSearchTerm('');
    };

    const renderFlag = (opt) => {
        if (opt.flagUrl) {
            return <img src={opt.flagUrl} alt={opt.code} className="cc-flag-img" />;
        }
        return <span className="cc-flag-emoji">{opt.code}</span>;
    };

    return (
        <div className="cc-dropdown-container" ref={dropdownRef}>
            <div
                className="ds-country-selector"
                onClick={() => setIsOpen(!isOpen)}
            >
                {renderFlag(selectedOption)}
                <span className="ds-country-code">{selectedOption.dialCode || '+00'}</span>
                <ChevronDown size={14} className={`ds-country-arrow ${isOpen ? 'rotated' : ''}`} />
            </div>

            {isOpen && (
                <div className="cc-dropdown-body fade-in-up-fast">
                    <div className="cc-dropdown-search">
                        <input
                            type="text"
                            placeholder="Pesquisar país ou código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    <ul className="cc-dropdown-list">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(opt => (
                                <li
                                    key={opt.code}
                                    className={`cc-dropdown-item ${value === opt.dialCode ? 'selected' : ''}`}
                                    onClick={() => handleSelect(opt.dialCode)}
                                >
                                    {renderFlag(opt)}
                                    <span className="cc-item-code-name">
                                        <span className="cc-item-name">{opt.name}</span>
                                        <span className="cc-item-iso">- {opt.code}</span>
                                    </span>
                                    <span className="cc-item-dialcode">{opt.dialCode}</span>
                                </li>
                            ))
                        ) : (
                            <li className="cc-dropdown-empty">Nenhum país encontrado.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CountryCodeDropdown;
