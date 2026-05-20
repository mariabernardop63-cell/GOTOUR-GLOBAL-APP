import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Star } from 'lucide-react';
import CarouselArrows from '../CarouselArrows/CarouselArrows';
import './MostSearchedSection.css';

const MOCK_MOST_SEARCHED = [
    {
        id: 'ms-1',
        name: 'Sentidos Beach Resort',
        type: 'Hotel',
        location: 'Inhambane • Tofo',
        rating: '4.9',
        priceLabel: 'Diárias desde',
        priceValue: 'R$450',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop'
    },
    {
        id: 'ms-2',
        name: 'Restaurante Zambi',
        type: 'Restaurante',
        location: 'Maputo',
        rating: '4.8',
        priceLabel: 'Preço médio',
        priceValue: 'R$120',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'ms-3',
        name: 'Praia do Wimbe',
        type: 'Praia',
        location: 'Cabo Delgado • Pemba',
        rating: '4.7',
        priceLabel: 'Acesso',
        priceValue: 'Gratuito',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
    },
    {
        id: 'ms-4',
        name: 'Coral Lodge',
        type: 'Lodge',
        location: 'Nampula • Ilha',
        rating: '4.9',
        priceLabel: 'Diárias desde',
        priceValue: 'R$800',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'ms-5',
        name: 'Dhow Sunset Cruise',
        type: 'Experiência',
        location: 'Maputo',
        rating: '4.6',
        priceLabel: 'Por pessoa',
        priceValue: 'R$150',
        image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 'ms-6',
        name: 'Mercado Central',
        type: 'Ponto Turístico',
        location: 'Maputo',
        rating: '4.5',
        priceLabel: 'Entrada',
        priceValue: 'Livre',
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2070&auto=format&fit=crop'
    }
];

const MostSearchedSection = () => {
    const navigate = useNavigate();

    const handleCardClick = (item) => {
        // Mock navigation to details
        navigate('/destino-detalhes', {
            state: {
                name: item.name,
                location: item.location,
                rating: item.rating,
                image: item.image,
                type: item.type
            }
        });
    };

    return (
        <div className="most-searched-section">
            <div className="ms-header">
                <div className="ms-titles">
                    <h2 className="ms-title">
                        <div className="ms-title-badge">
                            <TrendingUp size={18} strokeWidth={2.5} />
                        </div>
                        Os mais procurados
                    </h2>
                    <span className="ms-subtitle">Os lugares mais procurados hoje</span>
                </div>
                <CarouselArrows />
            </div>

            <div className="ms-scroll-container">
                {MOCK_MOST_SEARCHED.map((item) => (
                    <div
                        key={item.id}
                        className="ms-card"
                        onClick={() => handleCardClick(item)}
                    >
                        <div className="ms-image-wrapper">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="ms-image"
                                loading="lazy"
                            />
                            <div className="ms-badge">
                                <Star size={10} fill="#fff" stroke="none" />
                                {item.rating}
                            </div>
                        </div>
                        
                        <div className="ms-info">
                            <h3 className="ms-name">{item.name}</h3>
                            <p className="ms-meta">{item.type} · {item.location}</p>
                            <div className="ms-price-row">
                                {item.priceLabel} <span className="ms-price-strong">{item.priceValue}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostSearchedSection;
