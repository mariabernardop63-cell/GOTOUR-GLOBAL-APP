import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Diamond, MapPin, ChevronRight, Award } from 'lucide-react';
import CarouselArrows from '../CarouselArrows/CarouselArrows';
import './HomeSectionsStyles.css';

// Mocks Data Limit: 6 per row as planned

const MOCK_VALUE = [
    { id: 'v1', name: 'Baía de Zavala', location: 'Inhambane', costLabel: 'Acesso', price: 'Gratuito', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600&auto=format&fit=crop', type: 'Praia' },
    { id: 'v2', name: 'Macuti Housing', location: 'Sofala • Beira', costLabel: 'Diária', price: '~R$55', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop', type: 'Guesthouse' },
    { id: 'v3', name: 'Pousada do Sol', location: 'Gaza • Bilene', costLabel: 'Estadia', price: '~R$80', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop', type: 'Pousada' },
    { id: 'v4', name: 'Feira de Artesanato', location: 'Maputo', costLabel: 'Passeio', price: 'Livre', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=600&auto=format&fit=crop', type: 'Mercado' },
    { id: 'v5', name: 'Restaurante O Piri', location: 'Nampula', costLabel: 'Refeição desde', price: 'R$40', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop', type: 'Comida Local' },
    { id: 'v6', name: 'Reserva Especial', location: 'Maputo', costLabel: 'Entrada base', price: 'R$150', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop', type: 'Reserva' },
    { id: 'v7', name: 'Ilha de Moçambique', location: 'Nampula', costLabel: 'Tour Museu', price: 'R$200', image: 'https://images.unsplash.com/photo-1542314831-c6a4203251a3?q=80&w=600&auto=format&fit=crop', type: 'Cultural' },
    { id: 'v8', name: 'Praia do Tofo', location: 'Inhambane', costLabel: 'Acesso', price: 'Gratuito', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', type: 'Praia' }
];

const MOCK_LUXURY = [
    { id: 'lx1', name: 'Azura Benguerra', location: 'Vilankulo', costLabel: 'Villa / Noite', price: 'R$3,500', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop', type: 'Ultra Luxo' },
    { id: 'lx2', name: 'Polana Serena', location: 'Maputo', costLabel: 'Suíte Océano', price: 'R$2,100', image: 'https://images.unsplash.com/photo-1542314831-c6a4203251a3?q=80&w=600&auto=format&fit=crop', type: 'Hotel Histórico' },
    { id: 'lx3', name: 'Sussurro Retreat', location: 'Inhambane', costLabel: 'Estadia', price: 'R$1,800', image: 'https://images.unsplash.com/photo-1620023640274-1db0a2130e56?q=80&w=600&auto=format&fit=crop', type: 'Boutique' },
    { id: 'lx4', name: 'Machangulo Beach', location: 'Maputo', costLabel: 'Diárias desde', price: 'R$1,500', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop', type: 'Resort Premium' },
    { id: 'lx5', name: 'White Pearl', location: 'Ponta do Ouro', costLabel: 'Pool Suite', price: 'R$2,600', image: 'https://images.unsplash.com/photo-1522798514397-e04f03a62ae5?q=80&w=600&auto=format&fit=crop', type: 'Resort de Praia' },
    { id: 'lx6', name: 'Cruzeiro Quirimbas', location: 'Cabo Delgado', costLabel: 'Yatch Diario', price: 'R$5,000', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=600&auto=format&fit=crop', type: 'Cruzeiro' },
    { id: 'lx7', name: 'Sanctuary Retreat', location: 'Bazaruto', costLabel: 'Lodge/Noite', price: 'R$4,200', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop', type: 'Retiro Safari' },
    { id: 'lx8', name: 'Anantara Medjumbe', location: 'Quirimbas', costLabel: 'All-inclusive', price: 'R$6,000', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop', type: 'Ilha Privada' }
];

// Helper to render "Full Cover" style cards
const FullCoverCardRow = ({ items, pillClass }) => {
    const navigate = useNavigate();
    return (
        <div className="hs-scroll-container">
            {items.map(item => (
                <div key={item.id} className="hs-card-cover" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                    <img src={item.image} alt={item.name} className="hs-card-bg-image" loading="lazy" />
                    <div className="hs-gradient-overlay"></div>
                    
                    <div className="hs-top-left-badge">{item.type}</div>

                    <div className="hs-card-content">
                        <h3 className="hs-card-name">{item.name}</h3>
                        <span className="hs-card-meta"><MapPin size={12} /> {item.location}</span>
                        <div className={`hs-pill-cover ${pillClass}`}>
                            <span>{item.costLabel} <span style={{ opacity: 0.8, fontWeight: 400 }}>|</span> {item.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ValueSection = () => (
    <section className="hs-section">
        <div className="hs-header">
            <div className="hs-titles">
                <h2 className="hs-title">
                    <div className="hs-title-badge badge-blue">
                        <Award size={16} strokeWidth={2.5} />
                    </div>
                    Melhor custo benefício
                </h2>
                <span className="hs-subtitle">Viagens incríveis que cabem no bolso</span>
            </div>
            <CarouselArrows />
        </div>
        <FullCoverCardRow items={MOCK_VALUE} pillClass="pill-emerald" />
    </section>
);

export const LuxurySection = () => (
    <section className="hs-section">
        <div className="hs-header">
            <div className="hs-titles">
                <h2 className="hs-title">
                    <div className="hs-title-badge badge-amber">
                        <Diamond size={16} strokeWidth={2.5} />
                    </div>
                    Experiências de luxo
                </h2>
                <span className="hs-subtitle">Para quem procura o auge do conforto e exclusividade</span>
            </div>
            <CarouselArrows />
        </div>
        <FullCoverCardRow items={MOCK_LUXURY} pillClass="pill-amber" />
    </section>
);
