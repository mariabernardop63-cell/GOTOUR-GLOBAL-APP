import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, MapPin } from 'lucide-react';
import CarouselArrows from '../CarouselArrows/CarouselArrows';
import './BudgetDestinationsSection.css';

const MOCK_BUDGET_PLACES = [
    {
        id: 'bd-1',
        name: 'Baía de Pemba',
        type: 'Praia',
        location: 'Cabo Delgado • Pemba',
        costLabel: 'Livre acesso',
        price: 'R$0',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop'
    },
    {
        id: 'bd-2',
        name: 'Fátima\'s Nest',
        type: 'Hostel',
        location: 'Inhambane • Tofo',
        costLabel: 'Diária acessível',
        price: '~R$60',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop'
    },
    {
        id: 'bd-3',
        name: 'Mercado do Peixe',
        type: 'Restaurante',
        location: 'Maputo',
        costLabel: 'Refeição desde',
        price: 'R$45',
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'bd-4',
        name: 'Casa Barry Lodge',
        type: 'Lodge',
        location: 'Inhambane • Tofo',
        costLabel: 'Diária económica',
        price: '~R$120',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'bd-5',
        name: 'Jardim dos Namorados',
        type: 'Parque',
        location: 'Maputo',
        costLabel: 'Acesso Público',
        price: 'R$0',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'bd-6',
        name: 'Mundos Restaurante',
        type: 'Restaurante',
        location: 'Maputo',
        costLabel: 'Refeição desde',
        price: 'R$80',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'bd-7',
        name: 'Snooze Hostel',
        type: 'Hostel',
        location: 'Maputo',
        costLabel: 'Cama/Dormitório',
        price: 'R$35',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 'bd-8',
        name: 'Quiosque Marginal',
        type: 'Lanche',
        location: 'Maputo',
        costLabel: 'Custo Baixo',
        price: 'R$25',
        image: 'https://images.unsplash.com/photo-1544025162-8316c026b9a8?q=80&w=600&auto=format&fit=crop'
    }
];

const BudgetDestinationsSection = () => {
    const navigate = useNavigate();

    const handleCardClick = (item) => {
        // Mock navigation to details
        navigate('/destino-detalhes', {
            state: {
                name: item.name,
                location: item.location,
                image: item.image,
                type: item.type
            }
        });
    };

    return (
        <section className="budget-dest-section">
            <div className="budget-header">
                <div className="budget-titles">
                    <h2 className="budget-title">
                        <div className="budget-title-badge">
                            <Wallet size={16} strokeWidth={2.5} />
                        </div>
                        Destinos Económicos
                    </h2>
                    <span className="budget-subtitle">Os melhores destinos com baixo custos</span>
                </div>
                <CarouselArrows />
            </div>

            <div className="budget-scroll-container">
                {MOCK_BUDGET_PLACES.map((item) => (
                    <div 
                        key={item.id} 
                        className="bd-card-premium"
                        onClick={() => handleCardClick(item)}
                    >
                        {/* Background Image */}
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="bd-bg-image" 
                            loading="lazy"
                        />
                        
                        <div className="bd-gradient-overlay"></div>
                        
                        {/* Type Badge */}
                        <div className="bd-top-badges">
                            <div className="bd-type-badge">
                                {item.type}
                            </div>
                        </div>

                        {/* Bottom Content */}
                        <div className="bd-content">
                            <h3 className="bd-name">{item.name}</h3>
                            <span className="bd-location"><MapPin size={12} /> {item.location}</span>
                            
                            <div className="bd-cost-pill">
                                <span>{item.costLabel} <span style={{ opacity: 0.8, fontWeight: 400 }}>|</span> {item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BudgetDestinationsSection;
