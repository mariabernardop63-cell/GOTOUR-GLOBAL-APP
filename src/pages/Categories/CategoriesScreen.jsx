import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './CategoriesScreen.css';

// Icons
import {
    Menu, CloudSun, Clock, Banknote, Languages, Wifi, Shield, Car, MapPin,
    Plane, Hotel, Calculator, CalendarCheck, CheckSquare, Map, Briefcase,
    Umbrella, Coffee, Bed, Crown, ShoppingBag, Stethoscope, Bus, Sparkles,
    ChevronDown, Star, AlertTriangle, ChevronRight, Plus
} from 'lucide-react';

const CategoriesScreen = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ name: 'Moçambique', flag: '🇲🇿', currency: 'MZN' });
    const [activeTab, setActiveTab] = useState('Praias');
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    // --- Mock Data ---
    const countryStats = [
        { icon: <CloudSun />, label: 'Clima agora', value: '28°C • Ensolarado' },
        { icon: <Clock />, label: 'Hora local', value: '23:10' },
        { icon: <Banknote />, label: 'Moeda', value: selectedCountry.currency },
        { icon: <Languages />, label: 'Idioma', value: 'Português' },
        { icon: <Wifi />, label: 'Internet', value: 'Boa (4G/5G)' },
        { icon: <Shield />, label: 'Segurança', value: 'Moderada' },
        { icon: <Car />, label: 'Transporte', value: 'Chapas / Táxi' },
        { icon: <MapPin />, label: 'Cidade Pop.', value: 'Maputo' },
    ];

    const planTripItems = [
        { icon: <Plane />, label: 'Voos' },
        { icon: <Hotel />, label: 'Reservas' },
        { icon: <Calculator />, label: 'Custos' },
        { icon: <Map />, label: 'Roteiro' },
        { icon: <CalendarCheck />, label: 'Eventos' },
        { icon: <CheckSquare />, label: 'Checklist' },
        { icon: <MapPin />, label: 'Rotas' },
        { icon: <Car />, label: 'Transporte' },
    ];

    const categoriesGroups = [
        {
            title: '🏖 Explorar',
            items: [
                { icon: '🏖', label: 'Praias' },
                { icon: '🌿', label: 'Natureza' },
                { icon: '⛰', label: 'Trilhas' },
                { icon: '🏝', label: 'Ilhas' },
                { icon: '🔭', label: 'Miradouros' },
            ]
        },
        {
            title: '🍽 Comer & Beber',
            items: [
                { icon: '🍤', label: 'Restaurantes' },
                { icon: '☕', label: 'Cafés' },
                { icon: '🍹', label: 'Bares' },
                { icon: '🍢', label: 'Street Food' },
            ]
        },
        {
            title: '🏨 Dormir',
            items: [
                { icon: '🏨', label: 'Hotéis' },
                { icon: '🛖', label: 'Resorts' },
                { icon: '🎒', label: 'Hostels' },
                { icon: '⛺', label: 'Campismo' },
            ]
        },
        {
            title: '🎭 Cultura & História',
            items: [
                { icon: '🗿', label: 'Museus' },
                { icon: '⛪', label: 'Monumentos' },
                { icon: '🎨', label: 'Arte' },
                { icon: '🏰', label: 'História' },
            ]
        },
    ];

    const trendingItems = [
        { icon: <Umbrella />, name: 'Praia do Tofo', sub: 'Mais visitada hoje' },
        { icon: <Coffee />, name: 'Zambi', sub: 'Restaurante #1' },
        { icon: <Sparkles />, name: 'Festival Azgo', sub: 'Em breve' },
    ];

    const top10Data = [
        { name: 'Ponta do Ouro', rating: '4.9', loc: 'Maputo' },
        { name: 'Bazaruto', rating: '5.0', loc: 'Inhambane' },
        { name: 'Ilha de Moçambique', rating: '4.8', loc: 'Nampula' },
        { name: 'Gorongosa', rating: '4.9', loc: 'Sofala' },
        { name: 'Praia do Bilene', rating: '4.7', loc: 'Gaza' },
    ];

    const faqs = [
        { q: 'Melhor época para visitar?', a: 'Entre Maio e Outubro (época seca).' },
        { q: 'Quanto custa viajar?', a: 'Média de 3000 MZN por dia (económico).' },
        { q: 'Preciso de visto?', a: 'Verifique a política atual para o seu país.' },
    ];

    const handleCategoryClick = (group, item) => {
        // Navigate to details (placeholder)
        console.log(`Open category: ${item.label} in ${selectedCountry.name}`);
    };

    return (
        <div className="categories-screen">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* 2) Header Fixo */}
            <header className="cat-header">
                <img src={gotourLogo} alt="GoTour" className="cat-header-logo" onClick={() => navigate('/home')} />
                <button className="cat-menu-btn" onClick={() => setIsDrawerOpen(true)}>
                    <div className="cat-hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </header>

            {/* 3) Seleção de País */}
            <div className="country-selector-strip">
                <div className="country-flag-large">{selectedCountry.flag}</div>
                <div className="country-info">
                    <span className="country-label">A explorar</span>
                    <div className="country-name-row">
                        <span className="country-name">{selectedCountry.name}</span>
                        <div className="dropdown-triangle"></div>
                    </div>
                </div>
            </div>

            <div className="cat-content">

                {/* 4) Dashboard Card (Resumo) */}
                <section className="dashboard-card cat-anim-enter">
                    <div className="section-title">
                        <Crown size={20} className="text-purple" />
                        Resumo do País
                    </div>
                    <div className="dashboard-grid">
                        {countryStats.map((stat, idx) => (
                            <div key={idx} className="info-item">
                                <div className="info-header">
                                    <span className="info-icon">{stat.icon}</span>
                                    {stat.label}
                                </div>
                                <div className="info-value">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5) Planear Viagem */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.1s' }}>
                    <div className="section-title">Planear Viagem</div>
                    <div className="horizontal-scroll-section">
                        <div className="scroll-container">
                            {planTripItems.map((item, idx) => (
                                <div key={idx} className="plan-btn-card">
                                    <div className="plan-icon">{item.icon}</div>
                                    <span className="plan-text">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6) Categorias Agrupadas */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.2s' }}>
                    <div className="section-title">Explorar Categorias</div>
                    {categoriesGroups.map((group, grpIdx) => (
                        <div key={grpIdx} className="category-group">
                            <div className="category-group-title">{group.title}</div>
                            <div className="horizontal-scroll-section">
                                <div className="scroll-container">
                                    {group.items.map((item, itmIdx) => (
                                        <div
                                            key={itmIdx}
                                            className="cat-card-item"
                                            onClick={() => handleCategoryClick(group.title, item)}
                                        >
                                            <div className="cat-card-icon">{item.icon}</div>
                                            <span className="cat-card-text">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* 7) Mapa Rápido */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.3s' }}>
                    <div className="section-title">Mapa de Lugares</div>
                    <div className="map-card">
                        <div className="map-overlay-content">
                            <p style={{ fontWeight: 600, marginBottom: 4 }}>Explore locais próximos</p>
                            <button className="map-btn" onClick={() => navigate('/map')}>Abrir Mapa Completo</button>
                        </div>
                    </div>
                </section>

                {/* 8) Em Alta */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.4s' }}>
                    <div className="section-title">Em Alta Agora 🔥</div>
                    <div className="horizontal-scroll-section">
                        <div className="scroll-container">
                            {trendingItems.map((item, idx) => (
                                <div key={idx} className="trend-card">
                                    <div className="trend-icon-box">{item.icon}</div>
                                    <div className="trend-info">
                                        <h4>{item.name}</h4>
                                        <p>{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9) Guias Prontos */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.5s' }}>
                    <div className="section-title">Guias Prontos</div>
                    <div className="horizontal-scroll-section">
                        <div className="scroll-container">
                            {['Moçambique em 3 dias', 'Roteiro Económico', 'Para Casal ❤️'].map((title, idx) => (
                                <div key={idx} className="guide-card">
                                    <div className="guide-card-bg" style={{ backgroundColor: idx % 2 === 0 ? '#4c1d95' : '#5b21b6' }}></div>
                                    <h3>{title}</h3>
                                    <span>Curadoria GoTour</span>
                                    <button className="guide-btn-sm">Ver Guia</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 10) Top 10 */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.6s' }}>
                    <div className="section-title">Top 10 do País ⭐</div>
                    <div className="tabs-container">
                        {['Praias', 'Hotéis', 'Restaurantes', 'Cultura'].map(tab => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="ranking-list">
                        {top10Data.map((place, idx) => (
                            <div key={idx} className="ranking-item">
                                <span className="rank-number">{idx + 1}</span>
                                <div className="rank-info">
                                    <span className="rank-name">{place.name}</span>
                                    <span className="rank-meta">
                                        <Star size={10} fill="#facc15" stroke="none" /> {place.rating} • {place.loc}
                                    </span>
                                </div>
                                <button className="rank-btn">Ver</button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 13) Dicas Importantes */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.7s' }}>
                    <div className="tips-alert-card">
                        <div className="tips-icon">⚠️</div>
                        <div className="tips-content">
                            <h3>Dicas Importantes</h3>
                            <p>• Evite andar sozinho em zonas isoladas à noite.</p>
                            <p>• Use transporte seguro e confirme preços antes.</p>
                        </div>
                    </div>
                </section>

                {/* 14) FAQ */}
                <section className="cat-anim-enter" style={{ animationDelay: '0.8s' }}>
                    <div className="section-title">Perguntas Frequentes</div>
                    <div className="faq-list">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="faq-item">
                                <div className="faq-header" onClick={() => toggleFaq(idx)}>
                                    <span>{faq.q}</span>
                                    {faqOpen === idx ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </div>
                                {faqOpen === idx && (
                                    <div className="faq-body">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Spacer for BottomNav */}
                <div style={{ height: '20px' }}></div>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default CategoriesScreen;
