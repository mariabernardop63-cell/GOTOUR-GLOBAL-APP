import React, { useState, useMemo, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigation } from '../../App';
import { useApp } from '../../context/AppContext';
import { countries } from '../../data/countries';
import HomeScreen from '../Home/HomeScreen';
import './DesktopSelectCountry.css';

const DesktopSelectCountry = () => {
    const { navigateBack, navigateForward } = useNavigation();
    const { setExploreCountry } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState(null);

    // Escape listener to close the modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filter by name and sort a-z
    const filteredCountries = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        const sorted = [...countries].sort((a, b) => a.name.localeCompare(b.name));
        if (!query) return sorted;
        return sorted.filter(country => country.name.toLowerCase().includes(query));
    }, [searchQuery]);

    const handleClose = () => {
        setIsClosing(true);
        // Add a small delay to allow exit animations if we want, or just navigate back immediately
        navigateBack();
    };

    const handleSelectCountry = (country) => {
        if (selectedCountryCode) return; // Prevent multiple clicks

        setSelectedCountryCode(country.code);
        setExploreCountry(country.name);

        // Wait 3 seconds before navigating
        setTimeout(() => {
            setIsClosing(true);
            navigateForward('/home');
        }, 3000);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            {/* The underlying home screen, blurred and darkened */}
            <div className="dsc-home-layer">
                <HomeScreen />
            </div>

            {/* The overlay background that handles "Click outside to close" */}
            <div
                className="dsc-overlay-background"
                onClick={handleClose}
            >
                {/* The Modal */}
                <div
                    className="dsc-modal-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="dsc-title">Excolha o pais em que deseja esplorar.</h1>

                    <div className="dsc-search-wrapper">
                        <Search className="dsc-search-icon" size={20} />
                        <input
                            type="text"
                            className="dsc-search-input"
                            placeholder="Search your country"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="dsc-list-container">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <div
                                    key={country.code}
                                    className={`dsc-country-row ${selectedCountryCode === country.code ? 'is-selected' : ''}`}
                                    onClick={() => handleSelectCountry(country)}
                                >
                                    <div className="dsc-country-left-info">
                                        <img
                                            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                            alt={country.name}
                                            className="dsc-country-flag"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                        <span className="dsc-country-name">{country.name}</span>
                                    </div>
                                    <div className="dsc-country-right">
                                        {selectedCountryCode === country.code && (
                                            <Loader2 size={18} className="spinner-icon spin" color="#3B82F6" />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="dsc-empty-state">
                                No countries found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopSelectCountry;
