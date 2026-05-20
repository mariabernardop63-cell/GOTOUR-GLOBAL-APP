import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BedDouble, Star, Wifi, Droplets, Wind, Users, Bath, Building, Home, ChevronRight, Coffee } from 'lucide-react';
import CarouselArrows from '../CarouselArrows/CarouselArrows';
import './HomeSectionsStyles.css';

export const MOCK_APARTMENTS = [
    { id: 'ap1', title: 'Ocean View Penthouse', type: 'Apartamento Inteiro', location: 'Maputo', rating: '4.9', price: '$85/noite', bedrooms: 3, baths: 2, guests: 6, amenities: ['Wifi', 'Piscina', 'AC'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 'ap2', title: 'Flat Moderno Polana', type: 'Estúdio Inteiro', location: 'Maputo', rating: '4.6', price: '$45/noite', bedrooms: 1, baths: 1, guests: 2, amenities: ['Wifi', 'AC'], image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?q=80&w=600&auto=format&fit=crop' },
    { id: 'ap3', title: 'Tofo Beach Apartment', type: 'Apartamento Inteiro', location: 'Inhambane', rating: '4.8', price: '$60/noite', bedrooms: 2, baths: 1, guests: 4, amenities: ['Wifi', 'Cozinha'], image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop' },
    { id: 'ap4', title: 'Vilankulo Sunset', type: 'Duplex Inteiro', location: 'Inhambane', rating: '5.0', price: '$120/noite', bedrooms: 2, baths: 2, guests: 5, amenities: ['Wifi', 'Piscina'], image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' },
    { id: 'ap5', title: 'Macuti Comfort', type: 'Apartamento Interno', location: 'Beira', rating: '4.3', price: '$35/noite', bedrooms: 1, baths: 1, guests: 2, amenities: ['AC'], image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop' },
    { id: 'ap6', title: 'Cozy Studio Maputo', type: 'Estúdio Inteiro', location: 'Maputo', rating: '4.7', price: '$40/noite', bedrooms: 1, baths: 1, guests: 2, amenities: ['Wifi'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop' },
    { id: 'ap7', title: 'Zambi Horizon View', type: 'Apartamento Premium', location: 'Maputo', rating: '5.0', price: '$110/noite', bedrooms: 2, baths: 2, guests: 4, amenities: ['Piscina', 'AC'], image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop' }
];

export const MOCK_RESORTS = [
    { id: 'rs1', name: 'White Pearl Resorts', level: 'Ultra Luxo', experience: 'Romântico / Praia', benefits: 'Pequeno-almoço e Spa inclusos', location: 'Ponta do Ouro', rating: '4.9', price: 'R$2500/noite', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop' },
    { id: 'rs2', name: 'Bazaruto Island Resort', level: 'Luxo Premium', experience: 'All-Inclusive', benefits: 'Refeições & Mergulho', location: 'Vilankulo', rating: '5.0', price: 'R$3200/noite', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=600&auto=format&fit=crop' },
    { id: 'rs3', name: 'San Martinho Beach', level: 'Conforto', experience: 'Familiar', benefits: 'Piscinas e Atividades Náuticas', location: 'Bilene', rating: '4.6', price: 'R$800/noite', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop' },
    { id: 'rs4', name: 'Sentidos Beach', level: 'Luxo', experience: 'Boutique / Surf', benefits: 'Spa & Jantares Gourmet', location: 'Tofo', rating: '4.8', price: 'R$1200/noite', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop' },
    { id: 'rs5', name: 'Gorongosa Wild', level: 'Conforto', experience: 'Safari & Imersão', benefits: 'Guia e Meia-pensão', location: 'Sofala', rating: '4.7', price: 'R$900/noite', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop' },
    { id: 'rs6', name: 'Coral Lodge', level: 'Luxo', experience: 'Histórico & Eco', benefits: 'Mergulho Exclusivo', location: 'Ilha de Moçambique', rating: '4.9', price: 'R$2100/noite', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 'rs7', name: 'Dugong Beach', level: 'Ultra Luxo', experience: 'Isolamento Beach', benefits: 'Safaris Marinhos', location: 'Vilankulo', rating: '5.0', price: 'R$4000/noite', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' }
];

export const MOCK_GUESTHOUSES = [
    { id: 'gh1', name: 'Casa da Nandi', type: 'Guest House', experience: 'Familiar & Local', focus: 'Acolhedor', location: 'Maputo', rating: '4.8', beds: '1 Quarto Privado', guests: 2, price: '$20/noite', image: 'https://images.unsplash.com/photo-1595521262070-0713ba24b8df?q=80&w=600&auto=format&fit=crop' },
    { id: 'gh2', name: 'Mundo\'s Home', type: 'Bed & Breakfast', experience: 'Social', focus: 'Acessível', location: 'Maputo', rating: '4.5', beds: 'Quarto Partilhado', guests: 1, price: '$15/noite', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 'gh3', name: 'Baobab Beach', type: 'Guest House', experience: 'Tranquilo', focus: 'Frente ao Mar', location: 'Vilankulo', rating: '4.7', beds: 'Cabana Inteira', guests: 3, price: '$35/noite', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 'gh4', name: 'Kuti Roots', type: 'Guest House', experience: 'Ecológico', focus: 'Desconexão', location: 'Zambézia', rating: '4.6', beds: '2 Quartos', guests: 4, price: '$25/noite', image: 'https://images.unsplash.com/photo-1542314831-c6a4203251a3?q=80&w=600&auto=format&fit=crop' },
    { id: 'gh5', name: 'Ilha Blue', type: 'Bed & Breakfast', experience: 'Histórico & Local', focus: 'Cultura', location: 'Nampula - Ilha', rating: '4.9', beds: '1 Quarto Privado', guests: 2, price: '$30/noite', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' },
    { id: 'gh6', name: 'Palmeiras', type: 'Guest House', experience: 'Familiar', focus: 'Piscina & Sol', location: 'Maputo', rating: '4.7', beds: '1 Quarto', guests: 2, price: '$22/noite', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop' },
    { id: 'gh7', name: 'Sommerschield B&B', type: 'Bed & Breakfast', experience: 'Executivo', focus: 'Tranquilo', location: 'Maputo', rating: '4.8', beds: 'Suite Privada', guests: 2, price: '$40/noite', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop' }
];

export const ApartmentsSection = () => {
    const navigate = useNavigate();
    return (
        <section className="hs-section" id="section-apartamentos">
            <div className="hs-header">
                <div className="hs-titles">
                    <h2 className="hs-title">
                        <div className="hs-title-badge badge-blue">
                            <BedDouble size={16} strokeWidth={2.5} />
                        </div>
                        Apartamentos
                    </h2>
                    <span className="hs-subtitle">Estadias privadas com todo o conforto de casa</span>
                </div>
                <CarouselArrows />
            </div>
            <div className="hs-scroll-container">
                {MOCK_APARTMENTS.map(item => (
                    <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                        <div className="hs-square-img-wrap">
                            <img src={item.image} alt={item.title} className="hs-square-img" loading="lazy" />
                            <div className="hs-top-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>
                        </div>
                        <div className="hs-square-info">
                            <h3 className="hs-square-title" style={{ fontSize: '14px' }}>{item.title}</h3>
                            <p className="hs-square-subtitle" style={{ fontSize: '12px' }}>{item.type} · {item.location}</p>
                            
                            <div className="hs-info-row" style={{ fontSize: '11px', gap: '8px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600, color: '#3b82f6' }}><BedDouble size={12}/> {item.bedrooms}q</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600, color: '#3b82f6' }}><Bath size={12}/> {item.baths}wc</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600, color: '#3b82f6' }}><Users size={12}/> {item.guests}h</span>
                            </div>
                            
                            {item.amenities && (
                                <div className="hs-amenities">
                                    {item.amenities.map(am => (
                                        <span key={am} className="hs-amenity-pill">
                                            {am === 'Wifi' && <Wifi size={10} />}
                                            {am === 'Piscina' && <Droplets size={10} />}
                                            {am === 'AC' && <Wind size={10} />}
                                            {am}
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            <div className="hs-info-row" style={{ marginTop: '4px' }}>
                                <span className="hs-price-strong">{item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const ResortsSection = () => {
    const navigate = useNavigate();
    return (
        <section className="hs-section" id="section-resorts">
            <div className="hs-header">
                <div className="hs-titles">
                    <h2 className="hs-title">
                        <div className="hs-title-badge badge-rose">
                            <Star size={16} strokeWidth={2.5} />
                        </div>
                        Resorts
                    </h2>
                    <span className="hs-subtitle">Férias all-inclusive ou luxo botique à beira-mar</span>
                </div>
                <CarouselArrows />
            </div>
            <div className="hs-scroll-container">
                {MOCK_RESORTS.map(item => (
                    <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                        <div className="hs-square-img-wrap">
                            <img src={item.image} alt={item.name} className="hs-square-img" loading="lazy" />
                            <div className="hs-top-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>
                            {/* Special Top Left Badge for Resort Level */}
                            <div className="hs-top-left-badge" style={{ padding: '4px 8px', fontSize: '10px' }}>{item.level}</div>
                        </div>
                        <div className="hs-square-info">
                            <h3 className="hs-square-title">{item.name}</h3>
                            <p className="hs-square-subtitle">{item.location} · {item.experience}</p>
                            <p className="hs-info-row" style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600 }}>{item.benefits}</p>
                            <div className="hs-info-row" style={{ marginTop: '2px' }}>
                                <span className="hs-price-strong">{item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const GuesthouseSection = () => {
    const navigate = useNavigate();
    return (
        <section className="hs-section" id="section-guesthouses">
            <div className="hs-header">
                <div className="hs-titles">
                    <h2 className="hs-title">
                        <div className="hs-title-badge badge-amber">
                            <Coffee size={16} strokeWidth={2.5} />
                        </div>
                        Guest Houses & B&B
                    </h2>
                    <span className="hs-subtitle">Acolhimento local e um ambiente super tranquilo</span>
                </div>
                <CarouselArrows />
            </div>
            <div className="hs-scroll-container">
                {MOCK_GUESTHOUSES.map(item => (
                    <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                        <div className="hs-square-img-wrap">
                            <img src={item.image} alt={item.name} className="hs-square-img" loading="lazy" />
                            <div className="hs-top-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>
                            <div className="hs-top-left-badge" style={{ background: 'rgba(245, 158, 11, 0.8)', border: 'none', padding: '4px 8px', fontSize: '10px' }}>{item.focus}</div>
                        </div>
                        <div className="hs-square-info">
                            <h3 className="hs-square-title">{item.name} - {item.type}</h3>
                            <p className="hs-square-subtitle">{item.location} · {item.experience}</p>
                            
                            <div className="hs-info-row" style={{ fontSize: '12px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#3b82f6' }}>
                                    <BedDouble size={14}/> {item.beds}
                                </span>
                                <span style={{ color: '#3b82f6', fontWeight: 600 }}>•</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#3b82f6' }}>
                                    <Users size={14}/> {item.guests} Hosp.
                                </span>
                            </div>
                            
                            <div className="hs-info-row" style={{ marginTop: '4px' }}>
                                <span className="hs-price-strong">{item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
