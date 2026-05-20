import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tent, Key, MapPin, Star, Bed, Users, ChevronRight, Backpack } from 'lucide-react';
import CarouselArrows from '../CarouselArrows/CarouselArrows';
import './HomeSectionsStyles.css';

const MOCK_HOSTELS = [
    { id: 'ho1', name: 'Fatima\'s Backpacker', location: 'Maputo', experience: 'Party / Social', rating: '4.4', room: 'Dormitório Mistro • 8 Camas', price: '$12/noite', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop' },
    { id: 'ho2', name: 'Tofo Scuba Hostel', location: 'Inhambane', experience: 'Chill / Surfers', rating: '4.8', room: 'Quarto Privado', price: '$25/noite', image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?q=80&w=600&auto=format&fit=crop' },
    { id: 'ho3', name: 'Baobab Beach', location: 'Vilankulo', experience: 'Nomadas Digitais', rating: '4.7', room: 'Dormitório Feminino • 4 Camas', price: '$15/noite', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 'ho4', name: 'Snooze', location: 'Maputo', experience: 'Social / Chill', rating: '4.6', room: 'Quarto Duplo Partilhado', price: '$20/noite', image: 'https://images.unsplash.com/photo-1595521262070-0713ba24b8df?q=80&w=600&auto=format&fit=crop' },
    { id: 'ho5', name: 'Ruby Backpacker', location: 'Nampula', experience: 'Aventura / Local', rating: '4.5', room: 'Dormitório Misto • 6 Camas', price: '$10/noite', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 'ho6', name: 'MozGuests Backpacker', location: 'Maputo', experience: 'Económico', rating: '4.3', room: 'Dormitório • 12 Camas', price: '$8/noite', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop' },
    { id: 'ho7', name: 'Liquid Dive', location: 'Tofo', experience: 'Surfers', rating: '4.8', room: 'Quarto Privado e Piscina', price: '$35/noite', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop' }
];

const MOCK_VILLAS = [
    { id: 'vi1', name: 'Villa Santorini', location: 'Vilankulo', capacity: 'Inteira • 4 Quartos', rating: '5.0', features: 'Piscina Infinita e Chef Privado', price: '$1200/noite', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' },
    { id: 'vi2', name: 'Casa do Mar', location: 'Ponta do Ouro', capacity: 'Inteira • 3 Quartos', rating: '4.8', features: 'Frente à praia e Terraço', price: '$400/noite', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop' },
    { id: 'vi3', name: 'Baía View Villa', location: 'Maputo', capacity: 'Inteira • 5 Quartos', rating: '4.9', features: 'Cinema e Piscina', price: '$850/noite', image: 'https://images.unsplash.com/photo-1620023640274-1db0a2130e56?q=80&w=600&auto=format&fit=crop' },
    { id: 'vi4', name: 'Tofo Beach House', location: 'Inhambane', capacity: 'Inteira • 2 Quartos', rating: '4.7', features: 'Churrasqueira e Varanda', price: '$220/noite', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop' },
    { id: 'vi5', name: 'Dunes Oasis', location: 'Cabo Delgado', capacity: 'Inteira • 6 Quartos', rating: '4.9', features: 'Exclusividade e Heliponto', price: '$2000/noite', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop' },
    { id: 'vi6', name: 'White Sands Villa', location: 'Bazaruto', capacity: 'Inteira • 3 Quartos', rating: '4.9', features: 'Praia Privada, Staff VIP', price: '$1500/noite', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop' },
    { id: 'vi7', name: 'Bilene Lagoon House', location: 'Gaza', capacity: 'Inteira • 5 Quartos', rating: '4.8', features: 'Lancha Inclusa e Jardim', price: '$600/noite', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' }
];

const MOCK_LODGES = [
    { id: 'ld1', name: 'Mavodze Eco Lodge', location: 'Limpopo', rating: '4.7', focus: 'Imersão Eco', info: 'Pensão Completa & Safari Guiado', price: '$350/noite', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop' },
    { id: 'ld2', name: 'Montebelo Gorongosa', location: 'Sofala', rating: '4.8', focus: 'Safari & Natureza', info: 'Pequeno-almoço e Game Drive', price: '$280/noite', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop' },
    { id: 'ld3', name: 'Nuarro Lodge', location: 'Nampula (Baía de Memba)', rating: '4.9', focus: 'Mergulho & Praia', info: 'Pensão Completa & Snorkeling', price: '$600/noite', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop' },
    { id: 'ld4', name: 'Anvil Bay', location: 'Maputo Special Reserve', rating: '5.0', focus: 'Natureza Selvagem', info: 'Pensão Completa e Pesca', price: '$850/noite', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop' },
    { id: 'ld5', name: 'Mussiro Lodge', location: 'Zambézia', rating: '4.6', focus: 'Retiro Espiritual', info: 'Pequeno-almoço Vegetariano', price: '$150/noite', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=600&auto=format&fit=crop' },
    { id: 'ld6', name: 'Kwitonda Lodge', location: 'Reserva Nacional', rating: '5.0', focus: 'Proteção Safari', info: 'Guia Biólogo, Pensão Completa', price: '$900/noite', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop' },
    { id: 'ld7', name: 'Ndoto Eco Village', location: 'Inhambane', rating: '4.5', focus: 'Cabanas Sustentáveis', info: 'Comida Tradicional e Tours', price: '$120/noite', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop' }
];

export const HostelsSection = () => {
    const navigate = useNavigate();
    return (
        <section className="hs-section" id="section-hostels">
            <div className="hs-header">
                <div className="hs-titles">
                    <h2 className="hs-title">
                        <div className="hs-title-badge badge-amber">
                            <Users size={16} strokeWidth={2.5} />
                        </div>
                        Hostels & Mochileiros
                    </h2>
                    <span className="hs-subtitle">Vibes sociais, festas ou focar no trabalho remoto</span>
                </div>
                <CarouselArrows />
            </div>
            <div className="hs-scroll-container">
                {MOCK_HOSTELS.map(item => (
                    <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                        <div className="hs-square-img-wrap">
                            <img src={item.image} alt={item.name} className="hs-square-img" loading="lazy" />
                            <div className="hs-top-left-badge" style={{ background: 'rgba(59, 130, 246, 0.8)', border: 'none', padding: '4px 8px', fontSize: '10px' }}>{item.experience}</div>
                            <div className="hs-bottom-left-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>
                        </div>
                        <div className="hs-square-info">
                            <h3 className="hs-square-title">{item.name}</h3>
                            <p className="hs-square-subtitle"><MapPin size={12}/> {item.location}</p>
                            
                            <div className="hs-info-row" style={{ marginTop: '2px', fontSize: '12px', color: '#64748b' }}>
                                <Bed size={12}/> {item.room}
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

export const VillasSection = () => {
    const navigate = useNavigate();
    return (
        <section className="hs-section" id="section-villas">
            <div className="hs-header">
                <div className="hs-titles">
                    <h2 className="hs-title">
                        <div className="hs-title-badge badge-rose">
                            <Key size={16} strokeWidth={2.5} />
                        </div>
                        Casas & Villas
                    </h2>
                    <span className="hs-subtitle">Hospedagem totalmente exclusiva para grandes encontros</span>
                </div>
                <CarouselArrows />
            </div>
            <div className="hs-scroll-container">
                {MOCK_VILLAS.map(item => (
                    <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                        <div className="hs-square-img-wrap">
                            <img src={item.image} alt={item.name} className="hs-square-img" loading="lazy" />
                            <div className="hs-top-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>
                        </div>
                        <div className="hs-square-info">
                            <h3 className="hs-square-title">{item.name}</h3>
                            <p className="hs-square-subtitle"><MapPin size={12}/> {item.location}</p>
                            
                            <div className="hs-info-row" style={{ fontSize: '12px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#3b82f6' }}>
                                    {item.capacity}
                                </span>
                            </div>
                            <p className="hs-info-row" style={{ fontSize: '11px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.features}
                            </p>
                            
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

export const LodgesSection = () => {
    const navigate = useNavigate();
    return (
        <section className="hs-section" id="section-lodges">
            <div className="hs-header">
                <div className="hs-titles">
                    <h2 className="hs-title">
                        <div className="hs-title-badge" style={{ background: '#ecfccb', color: '#65a30d', borderColor: '#d9f99d' }}>
                            <Tent size={16} strokeWidth={2.5} />
                        </div>
                        Lodges & Ecoturismo
                    </h2>
                    <span className="hs-subtitle">Imersão selvagem na melhor natureza intacta do país</span>
                </div>
                <CarouselArrows />
            </div>
            <div className="hs-scroll-container">
                {MOCK_LODGES.map(item => (
                    <div key={item.id} className="hs-card-square" onClick={() => navigate('/destino-detalhes', { state: { ...item }})}>
                        <div className="hs-square-img-wrap">
                            <img src={item.image} alt={item.name} className="hs-square-img" loading="lazy" />
                            <div className="hs-top-left-badge" style={{ background: 'rgba(101, 163, 13, 0.85)', border: 'none', padding: '4px 8px', fontSize: '10px' }}>{item.focus}</div>
                            <div className="hs-bottom-left-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>
                        </div>
                        <div className="hs-square-info">
                            <h3 className="hs-square-title">{item.name}</h3>
                            <p className="hs-square-subtitle"><MapPin size={12}/> {item.location}</p>
                            
                            <p className="hs-info-row" style={{ fontSize: '11px' }}>
                                {item.info}
                            </p>
                            
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
