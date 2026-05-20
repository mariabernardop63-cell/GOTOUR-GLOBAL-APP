import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ConciergeBell, Utensils, Star, ChevronRight } from 'lucide-react';
import './HomeSectionsStyles.css';

export const MOCK_RECOMMENDED = [
    { id: 'r1', name: 'Reserva Especial', type: 'Safari', location: 'Maputo', rating: '4.8', priceInfo: 'Desde R$150', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop' },
    { id: 'r2', name: 'Baía de Pemba', type: 'Praia', location: 'Cabo Delgado', rating: '4.9', priceInfo: 'Livre acesso', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop' },
    { id: 'r3', name: 'Ilha do Ibo', type: 'Histórico', location: 'Quirimbas', rating: '4.7', priceInfo: 'Tour R$80', image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=600&auto=format&fit=crop' },
    { id: 'r4', name: 'Machangulo', type: 'Relaxamento', location: 'Maputo', rating: '4.9', priceInfo: 'Diárias R$800', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop' },
    { id: 'r5', name: 'Mercado Central', type: 'Aventura Urbana', location: 'Maputo', rating: '4.6', priceInfo: 'Custo variável', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=600&auto=format&fit=crop' },
    { id: 'r6', name: 'Gorongosa', type: 'Ecoturismo', location: 'Sofala', rating: '5.0', priceInfo: 'Pacotes R$1200', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop' },
    { id: 'r7', name: 'Monte Binga', type: 'Escalada', location: 'Manica', rating: '4.9', priceInfo: 'Guias R$80', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 'r8', name: 'Praia do Tofo', type: 'Mergulho', location: 'Inhambane', rating: '4.8', priceInfo: 'Batismo R$150', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=600&auto=format&fit=crop' },
    { id: 'r9', name: 'Cahora Bassa', type: 'Barragem / Passeio', location: 'Tete', rating: '4.7', priceInfo: 'Cruzeiro R$100', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' }
];

export const MOCK_HOTELS = [
    { id: 'h1', name: 'Southern Sun', type: 'Hotel', location: 'Maputo', neighborhood: 'Avenida da Marginal', rating: '4.7', priceInfo: 'Diárias R$850', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d58fa7?q=80&w=600&auto=format&fit=crop' },
    { id: 'h2', name: 'Hotel Cardos', type: 'Hotel', location: 'Maputo', neighborhood: 'Museu', rating: '4.5', priceInfo: 'Diárias R$700', image: 'https://images.unsplash.com/photo-1522798514397-e04f03a62ae5?q=80&w=600&auto=format&fit=crop' },
    { id: 'h3', name: 'Vila das Mangas', type: 'Boutique', location: 'Maputo', neighborhood: 'Sommerschield', rating: '4.8', priceInfo: 'Diárias R$500', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 'h4', name: 'Milange Hotel', type: 'Hotel', location: 'Zambézia', neighborhood: 'Milange Centro', rating: '4.2', priceInfo: 'Diárias R$300', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop' },
    { id: 'h5', name: 'Pemba Beach Hotel', type: 'Resort', location: 'Cabo Delgado', neighborhood: 'Wimbe', rating: '4.9', priceInfo: 'Diárias R$1200', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop' },
    { id: 'h6', name: 'Hotel VIP', type: 'Hotel', location: 'Beira', neighborhood: 'Ponta Gêa', rating: '4.4', priceInfo: 'Diárias R$650', image: 'https://images.unsplash.com/photo-1542314831-c6a4203251a3?q=80&w=600&auto=format&fit=crop' },
    { id: 'h7', name: 'Radisson Blu', type: 'Hotel 5*', location: 'Maputo', neighborhood: 'Marginal', rating: '4.8', priceInfo: 'Diárias R$1000', image: 'https://images.unsplash.com/photo-1620023640274-1db0a2130e56?q=80&w=600&auto=format&fit=crop' },
    { id: 'h8', name: 'Sentidos Beach', type: 'Resort', location: 'Inhambane', neighborhood: 'Praia da Barra', rating: '4.9', priceInfo: 'Diárias R$1400', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' }
];

export const MOCK_RESTAURANTS = [
    { id: 'rest1', name: 'Restaurante Zambi', cuisine: 'Gourmet / Marisco', location: 'Maputo', rating: '4.8', priceInfo: 'Custo Médio R$150', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest2', name: 'Sagres Shellfish', cuisine: 'Marisco', location: 'Maputo', rating: '4.7', priceInfo: 'Custo Médio R$120', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest3', name: 'Dhow Cafe', cuisine: 'Mediterrânea / Café', location: 'Maputo', rating: '4.6', priceInfo: 'Custo Médio R$80', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest4', name: 'O Piri', cuisine: 'Moçambicana', location: 'Nampula', rating: '4.5', priceInfo: 'Custo Médio R$50', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest5', name: 'Restaurante Lucas', cuisine: 'Churrasco', location: 'Beira', rating: '4.3', priceInfo: 'Custo Médio R$60', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest6', name: 'Kalu\'s Esplanada', cuisine: 'Snacks / Bebidas', location: 'Inhambane', rating: '4.4', priceInfo: 'Custo Médio R$40', image: 'https://images.unsplash.com/photo-1544025162-8316c026b9a8?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest7', name: 'Mundo\'s', cuisine: 'Pub / Grelhados', location: 'Maputo', rating: '4.5', priceInfo: 'Custo Médio R$70', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop' },
    { id: 'rest8', name: 'Nautilus', cuisine: 'Café / Pastelaria', location: 'Maputo', rating: '4.6', priceInfo: 'Custo Médio R$35', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop' }
];

// Helper to render "Square Image Top" style cards
const SquareCardRow = ({ items, sectionCategory }) => {
    const navigate = useNavigate();
    return (
        <div className="hs-scroll-container">
            {items.map(item => (
                <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory }})}>
                    <div className="hs-square-img-wrap">
                        <img src={item.image} alt={item.name} className="hs-square-img" loading="lazy" />
                        <div className="hs-top-badge">
                            <Star size={10} fill="#fff" stroke="none" />
                            {item.rating}
                        </div>
                    </div>
                    
                    <div className="hs-square-info">
                        <h3 className="hs-square-title">{item.name}</h3>
                        <p className="hs-square-subtitle">
                            {item.neighborhood ? `${item.location} • ${item.neighborhood}` : `${item.type || item.cuisine} · ${item.location}`}
                        </p>
                        <div className="hs-info-row">
                            <span className="hs-price-strong">{item.priceInfo}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const RecommendedSection = () => (
    <section className="hs-section">
        <div className="hs-header">
            <div className="hs-titles">
                <h2 className="hs-title">
                    <div className="hs-title-badge badge-rose">
                        <ThumbsUp size={16} strokeWidth={2.5} />
                    </div>
                    Recomendado para si
                </h2>
                <span className="hs-subtitle">Descubra lugares que combinam com o seu perfil atual</span>
            </div>
            <button className="hs-section-arrow" aria-label="Ver mais">
                <ChevronRight size={22} strokeWidth={2} />
            </button>
        </div>
        <SquareCardRow items={MOCK_RECOMMENDED} sectionCategory="Recomendados" />
    </section>
);

export const HotelsSection = () => (
    <section className="hs-section" id="section-hoteis">
        <div className="hs-header">
            <div className="hs-titles">
                <h2 className="hs-title">
                    <div className="hs-title-badge badge-indigo">
                        <ConciergeBell size={16} strokeWidth={2.5} />
                    </div>
                    Hotéis
                </h2>
                <span className="hs-subtitle">As melhores estadias para todos os padrões de excelência</span>
            </div>
            <button className="hs-section-arrow" aria-label="Ver mais">
                <ChevronRight size={22} strokeWidth={2} />
            </button>
        </div>
        <SquareCardRow items={MOCK_HOTELS} sectionCategory="Alojamentos" />
    </section>
);

export const RestaurantsSection = () => (
    <section className="hs-section" id="section-restaurantes">
        <div className="hs-header">
            <div className="hs-titles">
                <h2 className="hs-title">
                    <div className="hs-title-badge badge-amber">
                        <Utensils size={16} strokeWidth={2.5} />
                    </div>
                    Restaurantes
                </h2>
                <span className="hs-subtitle">Sabores inesquecíveis, da comida local a jantares gourmet</span>
            </div>
            <button className="hs-section-arrow" aria-label="Ver mais">
                <ChevronRight size={22} strokeWidth={2} />
            </button>
        </div>
        <SquareCardRow items={MOCK_RESTAURANTS} sectionCategory="Restaurantes" />
    </section>
);
