import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CustomDropdown.css';

const CustomDropdown = ({ options, value, onChange, placeholder, mode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.code === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (code) => {
        onChange({ target: { name: 'nationality', value: code } });
        setIsOpen(false);
        setSearchTerm('');
    };

    const renderFlag = (opt) => {
        if (opt.flagUrl) {
            return <img src={opt.flagUrl} alt={opt.code} className="dropdown-flag-img" />;
        }
        return <span className="dropdown-flag-emoji">{opt.code}</span>;
    };

    return (
        <div className="custom-dropdown-container" ref={dropdownRef}>
            <div
                className={`custom-dropdown-header ${isOpen ? 'open' : ''} ${!selectedOption ? 'placeholder' : ''} ${mode === 'language' ? 'no-border' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? (
                    <div className="custom-dropdown-selected">
                        {renderFlag(selectedOption)}
                        <span className="dropdown-name">{selectedOption.name}</span>
                    </div>
                ) : (
                    <span className="dropdown-placeholder-text">{placeholder}</span>
                )}
                <ChevronDown size={20} color="#80868B" className={`custom-dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
            </div>

            {isOpen && (
                <div className="custom-dropdown-body">
                    <div className="custom-dropdown-search">
                        <input
                            type="text"
                            placeholder="Pesquisar país..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    <ul className="custom-dropdown-list">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(opt => (
                                <li
                                    key={opt.code}
                                    className={`custom-dropdown-item ${value === opt.code ? 'selected' : ''}`}
                                    onClick={() => handleSelect(opt.code)}
                                >
                                    {renderFlag(opt)}
                                    <span className="dropdown-item-name">{opt.name}</span>
                                    {mode !== 'language' && (
                                        <span className="dropdown-item-code">{opt.dialCode}</span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className="custom-dropdown-empty">Nenhum país encontrado.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;

