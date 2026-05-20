import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Search, MapPin, Droplets, Wind, ThermometerSun,
    HelpCircle, ChevronDown, CheckCircle2, ChevronRight
} from 'lucide-react';
import maputoCity from '../../assets/images/maputo_city.png';
import vectorMap from '../../assets/images/clean_vector_map.png';
import './RadarMeteorologicoScreen.css';

// Dados meteorológicos mock
const WEATHER_DATA = {
    'MAPUTO': {
        temp: '31°', humidity: '78%', wind: '14 km/h',
        condition: 'Parcialmente Nublado', visibility: '12 km',
        address: 'Maputo, Província de Maputo, Moçambique',
        coords: 'S 25.9692° · E 32.5732°',
        visitors: '10,742', age: '5Y',
        lat: 60, lng: 30, // Percentage based for static map placement
    },
    // Adding Beira for interaction
    'BEIRA': {
        temp: '29°', humidity: '82%', wind: '18 km/h',
        condition: 'Chuva Leve', visibility: '8 km',
        address: 'Beira, Província de Sofala, Moçambique',
        coords: 'S 19.8436° · E 34.8389°',
        lat: 40, lng: 55,
    }
};

const SUGGESTED_LOCATIONS = [
    { name: 'Maputo', temp: '31°', color: '#f59e0b' },
    { name: 'Beira', temp: '29°', color: '#0ea5e9' },
    { name: 'Nampula', temp: '27°', color: '#22c55e' },
    { name: 'Inhambane', temp: '30°', color: '#f97316' },
    { name: 'Pemba', temp: '28°', color: '#8b5cf6' },
];

const PROVINCES = [
    'MAPUTO', 'GAZA', 'INHAMBANE', 'SOFALA', 'MANICA',
    'TETE', 'ZAMBÉZIA', 'NAMPULA', 'NIASSA', 'CABO DELGADO'
];

const DISTRICTS = [
    'TODOS', 'CENTRAL', 'NORTE', 'SUL', 'LITORAL', 'INTERIOR'
];

const COUNTRIES = ['MOÇAMBIQUE', 'ÁFRICA DO SUL', 'PORTUGAL'];

const RadarMeteorologicoScreen = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState('MAPUTO');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('MOÇAMBIQUE');
    const [selectedProvince, setSelectedProvince] = useState('MAPUTO');
    const [selectedDistrict, setSelectedDistrict] = useState('TODOS');

    const weather = WEATHER_DATA[selectedCity] || WEATHER_DATA['MAPUTO'];

    return (
        <div className="radar-premium-wrapper">
            {/* Background Map Layer */}
            <div className="radar-bg-layer">
                <img src={vectorMap} alt="Map Background" className="radar-bg-img" />
                
                {/* Map Markers (Orange Dots with halo) */}
                <div className={`radar-map-dot ${selectedCity === 'MAPUTO' ? 'active' : ''}`} style={{ top: '60%', left: '30%' }} onClick={() => setSelectedCity('MAPUTO')}></div>
                <div className={`radar-map-dot ${selectedCity === 'BEIRA' ? 'active' : ''}`} style={{ top: '40%', left: '55%' }} onClick={() => setSelectedCity('BEIRA')}></div>
                <div className="radar-map-dot" style={{ top: '30%', left: '70%' }}></div>
                <div className="radar-map-dot" style={{ top: '75%', left: '80%' }}></div>
                <div className="radar-map-dot" style={{ top: '25%', left: '20%' }}></div>
            </div>

            {/* Top Floating Action Bar */}
            <div className="radar-top-floating-bar">
                <button className="radar-back-action" onClick={() => navigate('/categories')} aria-label="Voltar">
                    <ChevronLeft size={24} color="#1e293b" />
                </button>

                <div className="radar-selectors-group">
                    <div className="radar-select-wrapper">
                        <span className="select-label">PAÍS</span>
                        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} className="select-chevron" />
                    </div>
                    
                    <div className="radar-select-divider"></div>

                    <div className="radar-select-wrapper">
                        <span className="select-label">ESTADO / PROVÍNCIA</span>
                        <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
                            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <ChevronDown size={14} className="select-chevron" />
                    </div>

                    <div className="radar-select-divider"></div>

                    <div className="radar-select-wrapper">
                        <span className="select-label">DISTRITO</span>
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <ChevronDown size={14} className="select-chevron" />
                    </div>
                </div>
            </div>

            {/* Help Button Floating */}
            <button className="radar-help-fab">
                <HelpCircle size={24} color="#ffffff" />
            </button>

            {/* Bottom Floating Cards Container */}
            <div className="radar-bottom-cards-container">
                
                {/* CARD 1: Location & Metrology */}
                <div className="radar-card radar-location-card">
                    <div className="radar-loc-header">
                        <div>
                            <h2 className="radar-loc-title">Location</h2>
                            <p className="radar-loc-address">{weather.address}</p>
                            <p className="radar-loc-coords">{weather.coords}</p>
                        </div>
                        <div className="radar-heart-btn">
                            <MapPin size={20} fill="#f59e0b" color="#f59e0b" />
                        </div>
                    </div>
                    
                    <div className="radar-loc-date">
                        31 Jan 2025
                    </div>

                    <div className="radar-metrology-stats">
                        <div className="radar-stat-box">
                            <div className="radar-stat-icon-wrap">
                                <ThermometerSun size={18} strokeWidth={2.5} />
                            </div>
                            <div className="radar-stat-info">
                                <span className="stat-name">Temperatura</span>
                                <span className="stat-value">{weather.temp}<span className="stat-unit">C</span></span>
                            </div>
                        </div>
                        
                        <div className="radar-stat-box">
                            <div className="radar-stat-icon-wrap">
                                <Droplets size={18} strokeWidth={2.5} />
                            </div>
                            <div className="radar-stat-info">
                                <span className="stat-name">Humidade</span>
                                <span className="stat-value">{weather.humidity}</span>
                            </div>
                        </div>

                        <div className="radar-stat-box">
                            <div className="radar-stat-icon-wrap">
                                <Wind size={18} strokeWidth={2.5} />
                            </div>
                            <div className="radar-stat-info">
                                <span className="stat-name">Vento</span>
                                <span className="stat-value">{weather.wind}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARD 2: City Photo */}
                <div className="radar-card radar-photo-card">
                    <img src={maputoCity} alt="City View" className="radar-city-img" />
                    <div className="radar-photo-overlay">
                        <span className="photo-tag">{selectedCity}</span>
                    </div>
                </div>

                {/* CARD 3: Suggested Locations */}
                <div className="radar-card radar-suggested-card">
                    <div className="radar-suggested-header">
                        <h2 className="radar-suggested-title">Locais Sugeridos</h2>
                        <p className="radar-suggested-desc">Informação meteorológica de locais recomendados em Moçambique.</p>
                    </div>

                    <div className="radar-suggested-list">
                        {SUGGESTED_LOCATIONS.map((loc) => (
                            <div 
                                key={loc.name} 
                                className={`radar-suggested-item ${selectedCity === loc.name.toUpperCase() ? 'active' : ''}`}
                                onClick={() => setSelectedCity(loc.name.toUpperCase())}
                            >
                                <div className="radar-suggested-left">
                                    <div className="radar-dot" style={{ backgroundColor: loc.color }}></div>
                                    <span className="radar-loc-name">{loc.name}</span>
                                </div>
                                <div className="radar-suggested-right">
                                    <span className="radar-loc-temp">{loc.temp}C</span>
                                    <ChevronRight size={16} color="#cbd5e1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RadarMeteorologicoScreen;
