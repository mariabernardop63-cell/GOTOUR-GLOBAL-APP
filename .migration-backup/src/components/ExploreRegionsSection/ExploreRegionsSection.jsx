import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Star, DollarSign, ArrowRight, Compass } from 'lucide-react';
import CarouselArrows from '../CarouselArrows/CarouselArrows';
import './ExploreRegionsSection.css';

const REGIONS = [
    {
        id: 'maputo',
        name: 'Maputo',
        zone: 'Zona Sul • Capital',
        costLevel: 'Alto custo',
        dailyCost: '~$80/dia',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1596423736528-727b1022de64?q=80&w=2070&auto=format&fit=crop' // Reusing some nice images or mock Maputo
    },
    {
        id: 'gaza',
        name: 'Gaza',
        zone: 'Zona Sul',
        costLevel: 'Custo médio',
        dailyCost: '~$50/dia',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=1974&auto=format&fit=crop' // Beaches/resorts
    },
    {
        id: 'inhambane',
        name: 'Inhambane',
        zone: 'Zona Sul',
        costLevel: 'Custo médio',
        dailyCost: '~$55/dia',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1932&auto=format&fit=crop' // Tofo/Bazaruto vibes
    },
    {
        id: 'sofala',
        name: 'Sofala',
        zone: 'Zona Centro',
        costLevel: 'Custo médio',
        dailyCost: '~$45/dia',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop' // Gorongosa
    },
    {
        id: 'manica',
        name: 'Manica',
        zone: 'Zona Centro',
        costLevel: 'Baixo custo',
        dailyCost: '~$30/dia',
        rating: '4.4',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop' // Mountains
    },
    {
        id: 'tete',
        name: 'Tete',
        zone: 'Zona Centro',
        costLevel: 'Alto custo',
        dailyCost: '~$70/dia',
        rating: '4.3',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=2070&auto=format&fit=crop' // River/Heat
    },
    {
        id: 'zambezia',
        name: 'Zambézia',
        zone: 'Zona Centro',
        costLevel: 'Baixo custo',
        dailyCost: '~$25/dia',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop' // Tea plantations
    },
    {
        id: 'nampula',
        name: 'Nampula',
        zone: 'Zona Norte',
        costLevel: 'Custo médio',
        dailyCost: '~$40/dia',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' // Ilha de Mocambique
    },
    {
        id: 'niassa',
        name: 'Niassa',
        zone: 'Zona Norte',
        costLevel: 'Baixo custo',
        dailyCost: '~$35/dia',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop' // Lake Niassa
    },
    {
        id: 'cabo_delgado',
        name: 'Cabo Delgado',
        zone: 'Zona Norte',
        costLevel: 'Alto custo',
        dailyCost: '~$85/dia',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1935&auto=format&fit=crop' // Quirimbas
    }
];

const ExploreRegionsSection = () => {
    const navigate = useNavigate();

    const handleRegionClick = (region) => {
        // We can route to a region details view or search results pre-filtered
        navigate('/categories', { state: { region: region.name } });
    };

    return (
        <section className="explore-regions-section">
            <div className="explore-regions-header">
                <div className="explore-regions-titles" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h2 className="explore-regions-title" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                        <div className="premium-title-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '50%', color: '#0284c7', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                            <Compass size={18} strokeWidth={2.5} />
                        </div>
                        Explorar Regiões
                    </h2>
                    <p className="explore-regions-subtitle" style={{ margin: 0 }}>Descubra o melhor de cada parte do país</p>
                </div>
                <CarouselArrows />
            </div>

            <div className="explore-regions-container">
                {REGIONS.map((region) => (
                    <div 
                        key={region.id} 
                        className="region-card-premium"
                        onClick={() => handleRegionClick(region)}
                    >
                        {/* Background Image */}
                        <img 
                            src={region.image} 
                            alt={`O melhor de ${region.name}`} 
                            className="region-bg-image" 
                            loading="lazy"
                        />
                        
                        <div className="region-gradient-overlay"></div>
                        
                        {/* Rating Badge */}
                        <div className="region-top-badges">
                            <div className="region-rating-badge">
                                <Star size={14} className="region-rating-star" fill="currentColor" />
                                {region.rating}
                            </div>
                        </div>

                        {/* Bottom Content */}
                        <div className="region-content">
                            <span className="region-zone-label">{region.zone}</span>
                            
                            <h3 className="region-name">{region.name}</h3>
                            
                            <div className="region-meta-info">
                                <div className="region-cost-pill">
                                    <div className="region-cost-icon">
                                        <DollarSign size={14} strokeWidth={3} />
                                    </div>
                                    <span>{region.costLevel} <span style={{ opacity: 0.8, fontWeight: 400 }}>|</span> {region.dailyCost}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Explore All Regions Card */}
                <div 
                    className="region-explore-card" 
                    onClick={() => navigate('/map')}
                >
                    <div className="region-explore-icon-circle">
                        <ArrowRight size={24} />
                    </div>
                    <span className="region-explore-text">Ver no Mapa</span>
                    <span className="region-explore-sub">Navegue livremente</span>
                </div>
            </div>
        </section>
    );
};

export default ExploreRegionsSection;
