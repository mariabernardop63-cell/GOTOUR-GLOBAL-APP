import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, MapPin, ArrowRight } from 'lucide-react';
import './MustSeeSection.css';

// Mocks (can be moved to a data file later)
const MUST_SEE_PLACES = [
    {
        id: 1,
        name: 'Praia do Tofo',
        province: 'Inhambane',
        district: 'Tofo',
        distance: '8.3 km',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop' // Beach placeholder
    },
    {
        id: 2,
        name: 'Ilha de Moçambique',
        province: 'Nampula',
        district: 'Ilha',
        distance: '3.1 km',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' // Island placeholder
    },
    {
        id: 3,
        name: 'Ponta do Ouro',
        province: 'Maputo',
        district: 'Matutuíne',
        distance: '18.2 km',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=1974&auto=format&fit=crop' // Coastal
    },
    {
        id: 4,
        name: 'Parque da Gorongosa',
        province: 'Sofala',
        district: 'Gorongosa',
        distance: '60 km',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop' // Safari
    },
    {
        id: 5,
        name: 'Bazaruto',
        province: 'Inhambane',
        district: 'Vilankulo',
        distance: '45 km',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1596423736528-727b1022de64?q=80&w=2070&auto=format&fit=crop' // Sand dunes
    },
    {
        id: 6,
        name: 'Praia de Macaneta',
        province: 'Maputo',
        district: 'Marracuene',
        distance: '22 km',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' // General Beach
    },
    {
        id: 7,
        name: 'Lago Niassa',
        province: 'Niassa',
        district: 'Metangula',
        distance: '120 km',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop' // Lake
    },
    {
        id: 8,
        name: 'Ilha do Ibo',
        province: 'Cabo Delgado',
        district: 'Quirimbas',
        distance: '75 km',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1935&auto=format&fit=crop' // Historic Island
    },
    {
        id: 9,
        name: 'Ponta Vermelha',
        province: 'Maputo',
        district: 'Cidade',
        distance: '2.1 km',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=2070&auto=format&fit=crop' // City View
    },
    {
        id: 10,
        name: 'Cataratas de Chinizua',
        province: 'Zambézia',
        district: 'Gurúè',
        distance: '34 km',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=2070&auto=format&fit=crop' // Waterfall
    }
];

const MustSeeSection = ({ countryName = 'Moçambique' }) => {
    const navigate = useNavigate();

    const handleCardClick = (place) => {
        // Navigate to details screen with place data
        navigate('/destino-detalhes', {
            state: {
                name: place.name,
                location: `${place.province} • ${place.district}`,
                distance: place.distance,
                rating: place.rating,
                image: place.image
            }
        });
    };

    const handleSeeAll = () => {
        navigate('/categories');
    };

    return (
        <div className="must-see-section must-see-anim">
            <div className="must-see-header">
                <div className="must-see-titles">
                    <h2 className="must-see-title">Lugares Imperdíveis em {countryName} <span style={{ fontSize: '16px' }}>⭐</span></h2>
                    <span className="must-see-subtitle">Os lugares mais incríveis que você vai ver em {countryName}</span>
                </div>
                <button className="must-see-link" onClick={handleSeeAll}>
                    Explorar mais
                </button>
            </div>

            <div className="must-see-scroll-container">
                {MUST_SEE_PLACES.map((place) => (
                    <div
                        key={place.id}
                        className="destination-card"
                        onClick={() => handleCardClick(place)}
                    >
                        <div className="dest-badge">
                            <Star size={10} fill="#fff" stroke="none" />
                            {place.rating}
                        </div>
                        <img
                            src={place.image}
                            alt={place.name}
                            className="destination-image"
                            loading="lazy"
                        />
                        <div className="destination-overlay">
                            <span className="dest-name">{place.name}</span>
                            <span className="dest-location-row">{place.province} • {place.district}</span>
                            <span className="dest-distance">{place.distance} • 🚗 15min</span>
                        </div>
                    </div>
                ))}

                {/* Final Card: Explore More */}
                <div className="explore-more-card" onClick={handleSeeAll}>
                    <div className="explore-icon-circle">
                        <ArrowRight size={24} />
                    </div>
                    <span className="explore-text">Explorar Mais</span>
                    <span className="explore-sub">Ver todos os destinos</span>
                </div>
            </div>
        </div>
    );
};

export default MustSeeSection;
