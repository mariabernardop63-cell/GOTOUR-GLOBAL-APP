import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Star } from 'lucide-react';
import './NearYouSection.css';

const NEAR_PLACES = [
    {
        id: 1,
        name: 'Praia de Macaneta',
        category: 'Praia',
        rating: '4.6',
        distance: '2.1 km',
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Costa do Sol',
        category: 'Restaurante',
        rating: '4.8',
        distance: '1.4 km',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Hotel Polana',
        category: 'Hotel',
        rating: '4.7',
        distance: '3.2 km',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Museu Natural',
        category: 'Cultura',
        rating: '4.5',
        distance: '0.9 km',
        image: 'https://images.unsplash.com/photo-1566127444979-b3a2b0d6ccb7?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Feira Artesanal',
        category: 'Compras',
        rating: '4.4',
        distance: '2.7 km',
        image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2026&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Jardim Tunduru',
        category: 'Natureza',
        rating: '4.6',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2032&auto=format&fit=crop'
    },
    {
        id: 7,
        name: 'Ponta Vermelha',
        category: 'Experiência',
        rating: '4.7',
        distance: '2.2 km',
        image: 'https://images.unsplash.com/photo-1533929736472-1119e71dc8b6?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 8,
        name: 'Fortaleza',
        category: 'História',
        rating: '4.5',
        distance: '3.0 km',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop'
    },
    {
        id: 9,
        name: 'Café Central',
        category: 'Café',
        rating: '4.6',
        distance: '0.7 km',
        image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop'
    },
    {
        id: 10,
        name: 'Mercado Central',
        category: 'Mercado',
        rating: '4.3',
        distance: '1.6 km',
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2070&auto=format&fit=crop'
    }
];

const NearYouSection = () => {
    const navigate = useNavigate();

    const handleCardClick = (place) => {
        navigate('/destino-detalhes', {
            state: {
                name: place.name,
                location: place.category, // Using category as subtitle for details
                distance: place.distance,
                rating: place.rating,
                image: place.image
            }
        });
    };

    return (
        <div className="near-you-section near-anim">
            <div className="near-you-header">
                <div>
                    <h2 className="near-you-title">📍 Perto de Ti</h2>
                    <span className="near-you-subtitle">Descubra lugares incríveis ao seu redor</span>
                </div>
                <button className="near-you-link" onClick={() => navigate('/map')}>
                    Ver no mapa <Map size={14} />
                </button>
            </div>

            <div className="near-you-scroll-container">
                {NEAR_PLACES.map((place) => (
                    <div
                        key={place.id}
                        className="near-you-card"
                        onClick={() => handleCardClick(place)}
                    >
                        <div className="near-img-wrapper">
                            <img src={place.image} alt={place.name} className="near-img" loading="lazy" />
                        </div>

                        <div className="near-info">
                            <h3 className="near-name">{place.name}</h3>
                            <span className="near-category">{place.category}</span>

                            <div className="near-meta-row">
                                <div className="near-stats">
                                    <span className="near-rating">
                                        <Star size={10} fill="#facc15" stroke="none" /> {place.rating}
                                    </span>
                                    <span>• {place.distance}</span>
                                </div>
                                {/* <button className="near-btn-sm">Ver</button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NearYouSection;
