import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Camera, Palmtree, Ticket, Landmark, Waves, Moon, Bus, Navigation2, Car, Plane, ShoppingBag,
    Star, MapPin, Clock, Tag, Briefcase, Zap, Check, Users, ChevronRight
} from 'lucide-react';
import './HomeSectionsStyles.css';

// ----------------------
// MOCK DATA
// ----------------------
export const MOCK_EXPERIENCES = [
    { id: 'exp1', name: 'Mergulho com Tubarões Baleia', category: 'Aventura', duration: '4 horas', location: 'Tofo, Inhambane', rating: '5.0', price: 'R$150/pax', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=600&auto=format&fit=crop', badge: 'Experiência única', highlights: ['Equipamento', 'Guia Local', 'Fotos'] },
    { id: 'exp2', name: 'Jantar Gastronômico no Dhow', category: 'Gastronômica', duration: '3 horas', location: 'Baía de Maputo', rating: '4.8', price: 'R$80/pax', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop', badge: 'Mais reservado', highlights: ['Música', 'Bebidas inls.', 'Pôr do sol'] },
    { id: 'exp3', name: 'Tribal Cultural Tour', category: 'Cultural', duration: 'Dia Todo', location: 'Ilha de Moçambique', rating: '4.9', price: 'R$45/pax', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop', badge: 'Imersão cultural', highlights: ['Transporte', 'Refeição local'] },
    { id: 'exp4', name: 'Workshop de Culinária Local', category: 'Gastronômica', duration: '4 horas', location: 'Maputo', rating: '4.7', price: 'R$60/pax', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop', badge: '', highlights: ['Ingredientes', 'Prática'] },
    { id: 'exp5', name: 'Trilha nas Montanhas Binga', category: 'Natureza', duration: '2 Dias', location: 'Manica', rating: '4.9', price: 'R$250/pax', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop', badge: 'Top Escolha', highlights: ['Acampamento', 'Guias Oficiais'] }
];

export const MOCK_ACTIVITIES = [
    { id: 'act1', name: 'Quadbike nas Dunas', category: 'Aventura', duration: '2 horas', location: 'Ponta do Ouro', rating: '4.6', price: 'R$40/pax', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop', badge: 'Mais popular', highlights: ['Guia incluído', 'Equip.'] },
    { id: 'act2', name: 'Safari Fotográfico', category: 'Natureza', duration: 'Dia Todo', location: 'Gorongosa, Sofala', rating: '5.0', price: 'R$120/pax', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop', badge: 'Top escolha', highlights: ['Jeep 4x4', 'Segurança'] },
    { id: 'act3', name: 'Passeio a Cavalo na Praia', category: 'Relaxamento', duration: '1 hora', location: 'Vilankulo', rating: '4.8', price: 'R$35/pax', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', badge: '', highlights: ['Para iniciantes', 'Fotos'] },
    { id: 'act4', name: 'Kitesurf Basics', category: 'Esportes', duration: '3 horas', location: 'Bilene, Gaza', rating: '4.7', price: 'R$80/pax', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop', badge: 'Radical', highlights: ['Instrutor', 'Equip. completo'] },
    { id: 'act5', name: 'Sunset Cruise', category: 'Natureza', duration: '2 horas', location: 'Baía de Maputo', rating: '4.9', price: 'R$60/pax', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=600&auto=format&fit=crop', badge: 'Imperdível', highlights: ['Drinks', 'DJs'] }
];

export const MOCK_EVENTS = [
    { id: 'evt1', name: 'Azgo Festival', date: '25 Maio, 14:00', location: 'Maputo', type: 'Musical', highlights: ['Vendas Rápidas', 'Palco Principal'], price: 'R$25', rating: '4.9', image: 'https://images.unsplash.com/photo-1470229722913-7c092bb21356?q=80&w=600&auto=format&fit=crop', badge: 'Mais aguardado' },
    { id: 'evt2', name: 'Feira Gastronômica FINA', date: 'Sábados, 10:00', location: 'Praça da Independência', type: 'Gastronômico', highlights: ['Entrada Gratuita', 'Foodtrucks'], price: 'Grátis', rating: '4.7', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop', badge: 'Família' },
    { id: 'evt3', name: 'Maratona de Maputo', date: '10 Out, 06:00', location: 'Marginal, Maputo', type: 'Esportivo', highlights: ['Inscrição Antecipada', 'Medalha'], price: 'R$40', rating: '4.8', image: 'https://images.unsplash.com/photo-1552674605-1a80c98e1dba?q=80&w=600&auto=format&fit=crop', badge: 'Evento Oficial' },
    { id: 'evt4', name: 'Exposição de Arte Contemporânea', date: 'Ter a Dom', location: 'Museu Nacional de Arte', type: 'Cultural', highlights: ['Guia Interativo', 'Edição Limitada'], price: 'R$5', rating: '4.6', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&auto=format&fit=crop', badge: '' },
    { id: 'evt5', name: 'Festival do Marisco', date: 'Fim de Semana', location: 'Pemba, Cabo Delgado', type: 'Gastronômico', highlights: ['All-You-Can-Eat', 'Música ao Vivo'], price: 'R$80', rating: '4.9', image: 'https://images.unsplash.com/photo-1565557618413-eb12dfbbcf5b?q=80&w=600&auto=format&fit=crop', badge: 'Imperdível' }
];

export const MOCK_CULTURE = [
    { id: 'cul1', name: 'Fortaleza de Maputo', location: 'Baixa de Maputo', type: 'Patrimônio Histórico', price: 'R$2 / Grátis Estudantes', rating: '4.6', highlights: ['Guias', 'Vistas'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop', badge: 'Mais visitado' },
    { id: 'cul2', name: 'Mercado de Artesanato (FEIMA)', location: 'Parque dos Continuadores', type: 'Mercado/Feira', price: 'Entrada Grátis', rating: '4.8', highlights: ['Artesanato autêntico', 'Comidas'], image: 'https://images.unsplash.com/photo-1516089852277-2e113fa09632?q=80&w=600&auto=format&fit=crop', badge: 'Top compras' },
    { id: 'cul3', name: 'Museu de História Natural', location: 'Praça da Travessia', type: 'Museu', price: 'R$5', rating: '4.7', highlights: ['Taxidermia', 'Jardins'], image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600&auto=format&fit=crop', badge: '' },
    { id: 'cul4', name: 'Fundação Fernando Leite Couto', location: 'Polana', type: 'Arte/Galeria', price: 'Grátis', rating: '4.9', highlights: ['Eventos semanais', 'Livraria'], image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=600&auto=format&fit=crop', badge: 'Experiência única' },
    { id: 'cul5', name: 'Capela de Nossa Senhora do Baluarte', location: 'Ilha de Moçambique', type: 'Patrimônio', price: 'R$10 Tour incl.', rating: '4.8', highlights: ['História de 1522', 'De frente pro mar'], image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&auto=format&fit=crop', badge: 'Mais Antigo' }
];

export const MOCK_BEACHES = [
    { id: 'bch1', sectionCategory: 'Praias & Ilhas', name: 'Praia do Tofo', location: 'Inhambane', type: 'Surf & Pop', highlights: ['Point de Surf', 'Bares', 'Areia Fina'], price: 'Grátis', rating: '4.8', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', badge: 'Top Praia' },
    { id: 'bch2', sectionCategory: 'Praias & Ilhas', name: 'Ponta de Ouro', location: 'Matutuíne, Sul', type: 'Popular / Selvagem', highlights: ['Golfinhos', 'Mergulho', 'Família'], price: 'Grátis', rating: '4.9', image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=600&auto=format&fit=crop', badge: 'Mais visitada' },
    { id: 'bch3', sectionCategory: 'Praias & Ilhas', name: 'Praia do Wimbe', location: 'Pemba', type: 'Urbana', highlights: ['Polo Turístico', 'Água Quente', 'Vida Noturna'], price: 'Grátis', rating: '4.6', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop', badge: '' },
    { id: 'bch4', sectionCategory: 'Praias & Ilhas', name: 'Magaruque Island', location: 'Bazaruto', type: 'Isolada / Exótica', highlights: ['Água Cristalina', 'Recifes', 'Piqueniques'], price: 'MT$ 50', rating: '5.0', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop', badge: 'Exclusiva' },
    { id: 'bch5', sectionCategory: 'Praias & Ilhas', name: 'Zálala', location: 'Zambézia', type: 'Selvagem / Gigante', highlights: ['Florezinhas de casuarinas', 'Moto 4'], price: 'Grátis', rating: '4.5', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop', badge: 'Pérola Norte' }
];

export const MOCK_NIGHTLIFE = [
    { id: 'nl1', name: 'Coconuts Live', type: 'Clube', location: 'Marginal, Maputo', hours: '22:00 - 05:00', priceRange: '800', rating: '4.7', highlights: ['DJs Intrc.', 'VIP Lounge'], image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop', badge: 'Mais popular' },
    { id: 'nl2', name: 'Sky Bar - Meliá', type: 'Rooftop Lounge', location: 'Maputo', hours: '17:00 - 01:00', priceRange: '1200', rating: '4.8', highlights: ['Pôr do sol', 'Cocktails Exclusivos'], image: 'https://images.unsplash.com/photo-1572116469696-fb9d7ab7d727?q=80&w=600&auto=format&fit=crop', badge: 'Top Spot' },
    { id: 'nl3', name: 'Gil Vicente Café', type: 'Bar & Cultura', location: 'Baixa de Maputo', hours: '18:00 - 02:00', priceRange: '350', rating: '4.8', highlights: ['Música ao vivo', 'Jam Sessions'], image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600&auto=format&fit=crop', badge: 'Clássico' },
    { id: 'nl4', name: 'Tofo Tofo', type: 'Bar com Música', location: 'Tofo Beach', hours: '19:00 - LATE', priceRange: '500', rating: '4.6', highlights: ['Vibe Praiana', 'Turismo Jovem'], image: 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=600&auto=format&fit=crop', badge: 'Pé na areia' },
    { id: 'nl5', name: 'Txhova Txhova Bar', type: 'Boteco Premium', location: 'Bairro Museu, Maputo', hours: '16:00 - 23:00', priceRange: '250', rating: '4.5', highlights: ['Gin Local', 'Petiscos'], image: 'https://images.unsplash.com/photo-1575037614876-c3853d9f6ec3?q=80&w=600&auto=format&fit=crop', badge: 'Chillout' }
];

export const MOCK_TRANSPORT = [
    { id: 'tr1', name: 'Go Vibe Executivo', route: 'Maputo ↔ Aeroporto', type: 'Transfer VIP', price: 'Desde R$15', rating: '4.9', image: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=600&auto=format&fit=crop', badge: 'Mais confiável' },
    { id: 'tr2', name: 'Fatimatch Intercity', route: 'Maputo ↔ Inhambane', type: 'Autocarro Premium', price: 'R$25 / Viagem', rating: '4.6', image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=600&auto=format&fit=crop', badge: 'Conforto' },
    { id: 'tr3', name: 'Chapa/Táxi Expresso', route: 'Baixa ↔ Polana', type: 'Mobilidade Urbana', price: 'R$1 - R$5', rating: '4.2', image: 'https://images.unsplash.com/photo-1555026903-85f099c27b0c?q=80&w=600&auto=format&fit=crop', badge: 'Rápido' },
    { id: 'tr4', name: 'Barco Rápido p/ Ilha', route: 'Vilankulo ↔ Bazaruto', type: 'Ferry/Lancha', price: 'R$40 ida/volta', rating: '4.8', image: 'https://images.unsplash.com/photo-1544085444-245bd032fb77?q=80&w=600&auto=format&fit=crop', badge: 'Agendado' },
    { id: 'tr5', name: 'Trains Caminhos de Ferro', route: 'Nampula ↔ Cuamba', type: 'Trem / Comboio', price: 'R$15 1ª Classe', rating: '4.4', image: 'https://images.unsplash.com/photo-1442115594966-22485c292158?q=80&w=600&auto=format&fit=crop', badge: 'Econômico' }
];

export const MOCK_CARRENTAL = [
    { id: 'cr1', name: 'Toyota Hilux 4x4', type: 'Pick-up Offroad', location: 'Todos os Aeroportos', price: 'R$110/dia', rating: '4.9', highlights: ['Camper ready', 'GPS', 'Manual'], image: 'https://images.unsplash.com/photo-1533473359331-01f148ffced2?q=80&w=600&auto=format&fit=crop', badge: 'Mais procurado' },
    { id: 'cr2', name: 'Haval H6 HEV', type: 'SUV Premium', location: 'Maputo', price: 'R$85/dia', rating: '4.8', highlights: ['Automático', 'Banco de Couro', 'Seguro Full'], image: 'https://images.unsplash.com/photo-1629897034825-703666d93699?q=80&w=600&auto=format&fit=crop', badge: 'Elegante' },
    { id: 'cr3', name: 'Suzuki Jimny', type: 'Mini SUV Clássico', location: 'Tofo & Vilankulo', price: 'R$60/dia', rating: '4.7', highlights: ['4x4 Praia', 'Econômico', 'Manual'], image: 'https://images.unsplash.com/photo-1583267746897-eaaa15d482cc?q=80&w=600&auto=format&fit=crop', badge: 'Aventura' },
    { id: 'cr4', name: 'VW Polo Hatch', type: 'Econômico Compacto', location: 'Maputo City', price: 'R$35/dia', rating: '4.5', highlights: ['Automático', 'AC', 'Chave Presencial'], image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop', badge: 'Urbano' },
    { id: 'cr5', name: 'Ford Everest', type: 'SUV Grande Familiar', location: 'Beira', price: 'R$150/dia', rating: '4.9', highlights: ['7 Lugares', 'Seguro Incluído', 'Diesel'], image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?q=80&w=600&auto=format&fit=crop', badge: 'Famílias' }
];

export const MOCK_FLIGHTS = [
    { id: 'fl1', company: 'LAM', route: 'Maputo (MPM) → Pemba (POL)', date: 'Seg, Qua, Sex - 08:30', duration: '2h 45m', price: 'R$250', rating: '3.8', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop', badge: 'Voo Direto' },
    { id: 'fl2', company: 'Airlink', route: 'Maputo (MPM) → JHB (JNB)', date: 'Diário Múltiplos Vôos', duration: '1h 05m', price: 'R$180', rating: '4.6', image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=600&auto=format&fit=crop', badge: 'Rotas Internacionais' },
    { id: 'fl3', company: 'Fastjet', route: 'Maputo (MPM) → Nampula', date: 'Múltiplos Vôos', duration: '2h 15m', price: 'Desde R$120', rating: '4.1', image: 'https://images.unsplash.com/photo-1569305244585-64903328e8d8?q=80&w=600&auto=format&fit=crop', badge: 'Melhor Preço' },
    { id: 'fl4', company: 'LAM Linhas', route: 'Vilankulo (VNX) → Maputo', date: 'Diário 14:00', duration: '1h 20m', price: 'R$160', rating: '4.0', image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600&auto=format&fit=crop', badge: 'Rota Tursítica' }
];

export const MOCK_SHOPPING = [
    { id: 'sh1', name: 'Baía Mall', type: 'Shopping Premium', location: 'Marginal, Maputo', rating: '4.8', highlights: ['Restaurantes', 'Cinema', 'Boutiques'], image: 'https://images.unsplash.com/photo-1519567281799-9189fb7f0be4?q=80&w=600&auto=format&fit=crop', badge: 'Mais luxuoso' },
    { id: 'sh2', name: 'Maputo Shopping Center', type: 'Shopping Central', location: 'Baixa de Maputo', rating: '4.5', highlights: ['Parque Subt.', 'Supermercado'], image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop', badge: 'Central' },
    { id: 'sh3', name: 'Mercado do Pau', type: 'Souvenirs Especiais', location: 'Praça 25 Junho', rating: '4.7', highlights: ['Esculturas', 'Capulanas'], image: 'https://images.unsplash.com/photo-1605330364402-23fce6007b8a?q=80&w=600&auto=format&fit=crop', badge: 'Regional' },
    { id: 'sh4', name: 'Supermercado Spar', type: 'Supermercados & Farmácia', location: 'Várias Cidades', rating: '4.6', highlights: ['Aberto até 22h', 'Produtos Frescos'], image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop', badge: 'Utilidade' },
    { id: 'sh5', name: 'Centro de Serviços 24h', type: 'Câmbios & ATMs', location: 'Aeroportos e Shoppings', rating: '4.8', highlights: ['Segurança', 'Casas de moedas'], image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop', badge: 'Essencial' }
];

// ----------------------
// COMPONENTS
// ----------------------
export const SectionWrapper = ({ title, subtitle, icon: Icon, badgeColor, sectionId, children, isSearchAllView, onViewMore }) => (
    <section className="hs-section" id={sectionId}>
        <div className="hs-header">
            <div className="hs-titles">
                <h2 className="hs-title">
                    <div className={`hs-title-badge ${badgeColor}`}>
                        <Icon size={16} strokeWidth={2.5} />
                    </div>
                    {title}
                </h2>
                <span className="hs-subtitle">{subtitle}</span>
            </div>
            {isSearchAllView ? (
                <button 
                    style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', fontSize: '13px', cursor: 'pointer', padding: '4px 8px' }}
                    onClick={onViewMore}
                >
                    Ver mais
                </button>
            ) : (
                <button className="hs-section-arrow" aria-label="Ver mais">
                    <ChevronRight size={22} strokeWidth={2} />
                </button>
            )}
        </div>
        <div className="hs-scroll-container">
            {children}
        </div>
    </section>
);

export const UniversalCard = ({ item, imgClasses, onClick }) => (
    <div className="hs-card-square" onClick={onClick}>
        <div className="hs-square-img-wrap" style={{ borderRadius: imgClasses || '12px' }}>
            <img src={item.image} alt={item.name || item.route || item.company} className="hs-square-img" loading="lazy" />
            {item.rating && <div className="hs-top-badge"><Star size={10} fill="#fff" stroke="none" />{item.rating}</div>}
        </div>
        
        <div className="hs-square-info">
            <h3 className="hs-square-title">{item.name || `${item.company} - ${item.route}`}</h3>
            
            <p className="hs-square-subtitle" style={{ fontSize: '12px' }}>
                <MapPin size={12}/> {item.location || item.duration || item.date}
            </p>
            
            <div className="hs-info-row" style={{ fontSize: '11px', gap: '8px' }}>
                <span style={{ fontWeight: 600, color: '#3b82f6' }}>{item.category || item.type}</span>
                {item.duration && <span>• <Clock size={10} style={{display:'inline', marginBottom:'-2px'}}/> {item.duration}</span>}
                {item.hours && <span>• {item.hours}</span>}
            </div>

            {item.highlights && item.highlights.length > 0 && (
                <div className="hs-amenities" style={{ flexWrap: 'wrap', gap: '4px' }}>
                    {item.highlights.map(hl => (
                        <span key={hl} className="hs-amenity-pill" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '10px' }}>
                            {hl}
                        </span>
                    ))}
                </div>
            )}
            
            <div className="hs-info-row" style={{ marginTop: '2px' }}>
                <span className="hs-price-strong">{item.price || item.priceRange}</span>
            </div>
        </div>
    </div>
);

export const ExperiencesSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Experiências" subtitle="Viva momentos que ficam na memória" icon={Camera} badgeColor="badge-rose" sectionId="section-experiencias">
            {MOCK_EXPERIENCES.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Experiências' }})} />)}
        </SectionWrapper>
    );
};

export const ActivitiesSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Atividades" subtitle="Ação e aventuras ao ar livre" icon={Zap} badgeColor="badge-gold" sectionId="section-atividades">
            {MOCK_ACTIVITIES.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Atividades' }})} />)}
        </SectionWrapper>
    );
};

export const EventsSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Eventos" subtitle="Concertos musicais, festivais e grandes feiras" icon={Ticket} badgeColor="badge-blue" sectionId="section-eventos">
            {MOCK_EVENTS.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Eventos' }})} />)}
        </SectionWrapper>
    );
};

export const CultureSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Cultura" subtitle="Descubra a riqueza histórica e da arte nacional" icon={Landmark} badgeColor="badge-gold" sectionId="section-cultura">
            {MOCK_CULTURE.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Culturas' }})} />)}
        </SectionWrapper>
    );
};

export const BeachesSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Praias & Ilhas" subtitle="As melhores extensões costeiras de África" icon={Palmtree} badgeColor="badge-emerald" sectionId="section-praias">
            {MOCK_BEACHES.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Praias & Ilhas' }})} />)}
        </SectionWrapper>
    );
};

export const NightlifeSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Vida Noturna" subtitle="Diversão garantida quando o sol se põe" icon={Moon} badgeColor="badge-rose" sectionId="section-vidanoturna">
            {MOCK_NIGHTLIFE.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Vida Noturna' }})} />)}
        </SectionWrapper>
    );
};

export const TransportSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Transporte" subtitle="Mova-se entre distritos e cidades com facilidade" icon={Navigation2} badgeColor="badge-slate" sectionId="section-transportes">
            {MOCK_TRANSPORT.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Transporte' }})} />)}
        </SectionWrapper>
    );
};

export const CarRentalSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Aluguer de Veículos" subtitle="A estrada é sua, viaje no seu ritmo" icon={Car} badgeColor="badge-amber" sectionId="section-aluguercarros">
            {MOCK_CARRENTAL.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Aluguer de Veículos' }})} />)}
        </SectionWrapper>
    );
};

export const FlightsSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Voos Nacionais" subtitle="Encurte a viagem até ao seu paraíso" icon={Plane} badgeColor="badge-blue" sectionId="section-voos">
            {MOCK_FLIGHTS.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Voos Nacionais' }})} />)}
        </SectionWrapper>
    );
};

export const ShoppingServicesSection = () => {
    const navigate = useNavigate();
    return (
        <SectionWrapper title="Compras & Serviços" subtitle="Tudo o que lhe faz falta durante a estadia" icon={ShoppingBag} badgeColor="badge-rose" sectionId="section-compras">
            {MOCK_SHOPPING.map(item => <UniversalCard key={item.id} item={item} onClick={() => navigate('/destino-detalhes', { state: { ...item, sectionCategory: 'Compras & Serviços' }})} />)}
        </SectionWrapper>
    );
};
