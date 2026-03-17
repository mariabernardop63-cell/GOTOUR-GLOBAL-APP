import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Sparkles, MessageCircle, TrendingUp, LayoutGrid, PlayCircle, Plane, Map as MapIcon, Route, Compass } from 'lucide-react';
import './FeaturesSection.css';
import { useNavigate } from 'react-router-dom';
import sashaIcon from '../../../assets/images/sasha_icon.png';

const FeaturesSection = () => {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % 5);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: { opacity: 0, x: 40, filter: 'blur(8px)' },
        center: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: -40, filter: 'blur(8px)' }
    };
    return (
        <section id="funcionalidades" className="feat-immersive-section">
            <div className="feat-immersive-container">
                
                {/* ── 1. Top Showcase (Hero Elements from Stitch) ── */}
                <div className="immersive-showcase" style={{ position: 'relative', overflow: 'hidden', minHeight: '450px' }}>
                    <AnimatePresence mode="wait">
                        {activeSlide === 0 && (
                            <motion.div 
                                key="slide0"
                                className="showcase-inner-wrap"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Left: Text Content */}
                                <div className="showcase-content">
                                    <h1 className="showcase-headline">
                                        Explore o Mundo,<br />
                                        <span className="showcase-grad-text">Sem Limites.</span>
                                    </h1>
                                    <p className="showcase-subtext">
                                        Planeie a sua viagem ideal com a GoTour. Aceda a mais de 120 países, reserve hospedagens exclusivas e consolide a sua exploração global num único ecossistema premium.
                                    </p>
                                    <div className="showcase-actions">
                                        <button className="btn-immersive-primary" onClick={() => navigate('/signup')}>Explorar</button>
                                        <button className="btn-immersive-secondary" onClick={() => navigate('/signup')}>
                                            <PlayCircle size={20} />
                                            See how it works
                                        </button>
                                    </div>
                                </div>

                                {/* Right: 3D Mockup Graphic */}
                                <div className="showcase-graphic">
                                    <div className="frame-3d">
                                        <div className="frame-3d-toolbar">
                                            <div className="toolbar-dot red"></div>
                                            <div className="toolbar-dot yellow"></div>
                                            <div className="toolbar-dot green"></div>
                                        </div>
                                        
                                        <div className="frame-3d-content">
                                            <div className="abstract-bar"></div>
                                            <div className="abstract-split">
                                                <div className="split-box-large">
                                                    <div className="mock-hotel-row">
                                                        <div className="mock-hotel-image-card">
                                                            <div className="mock-hotel-img-wrap">
                                                                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Resort" className="hotel-mock-img" />
                                                            </div>
                                                            <div className="mock-hotel-card-body">
                                                                <div className="mock-hotel-name">The Grand Horizon</div>
                                                                <div className="mock-hotel-loc">1.2 km • Nova Iorque, EUA</div>
                                                                <div className="mock-hotel-price">
                                                                    <div className="mock-hotel-val">$450/noite</div>
                                                                    <div className="mock-hotel-rating">★ 4.9</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mock-hotel-image-card">
                                                            <div className="mock-hotel-img-wrap">
                                                                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Resort" className="hotel-mock-img" />
                                                            </div>
                                                            <div className="mock-hotel-card-body">
                                                                <div className="mock-hotel-name">Oceanic Retreat</div>
                                                                <div className="mock-hotel-loc">Beira-mar • Bali, Indonésia</div>
                                                                <div className="mock-hotel-price">
                                                                    <div className="mock-hotel-val">$220/noite</div>
                                                                    <div className="mock-hotel-rating">★ 4.8</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="split-box-small"></div>
                                            </div>
                                            <div className="abstract-lines">
                                                <div className="abstract-line" style={{ width: '100%' }}></div>
                                                <div className="abstract-line" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating 3D Card overlay */}
                                    <div className="floating-card-3d">
                                        <div className="float-header">
                                            <div className="float-icon">
                                                <Plane size={20} />
                                            </div>
                                            <div>
                                                <div className="float-title">Tokyo, JP</div>
                                                <div className="float-sub">SASHA Routed</div>
                                            </div>
                                        </div>
                                        <div className="float-bar-grp">
                                            <div className="float-bar" style={{ width: '70%', background: '#3d3df5' }}></div>
                                            <div className="float-bar" style={{ width: '30%', background: '#EDF2F7' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSlide === 1 && (
                            <motion.div 
                                key="slide1"
                                className="showcase-inner-wrap"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Left: Text Content 2 */}
                                <div className="showcase-content">
                                    <h1 className="showcase-headline">
                                        Mapa Inteligente,<br />
                                        <span className="showcase-grad-text">Percursos Reais.</span>
                                    </h1>
                                    <p className="showcase-subtext">
                                        O nosso ecossistema de navegação analisa tráfego, clima local e os trilhos mais deslumbrantes para lhe oferecer a rota perfeita em tempo real. Perca-se apenas se for essa a intenção.
                                    </p>
                                    <div className="showcase-actions">
                                        <button className="btn-immersive-primary" onClick={() => navigate('/signup')}>Ver Mapa Interativo</button>
                                        <button className="btn-immersive-secondary" onClick={() => navigate('/signup')}>
                                            <Route size={20} />
                                            Explorar Rotas
                                        </button>
                                    </div>
                                </div>

                                {/* Right: 3D Map Mockup Graphic */}
                                <div className="showcase-graphic">
                                    <div className="frame-3d map-variant">
                                        <div className="frame-3d-toolbar">
                                            <div className="toolbar-dot red"></div>
                                            <div className="toolbar-dot yellow"></div>
                                            <div className="toolbar-dot green"></div>
                                        </div>
                                        <div className="mock-map-canvas">
                                            {/* decorative lines to simulate streets */}
                                            <svg className="mock-map-streets" viewBox="0 0 400 300" preserveAspectRatio="none">
                                                <path d="M0,50 L100,80 L200,60 L350,150 L400,120" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                                                <path d="M50,300 L120,200 L150,180 L250,50" stroke="#E2E8F0" strokeWidth="6" strokeDasharray="10 5" fill="none" />
                                                <path d="M200,300 L250,220 L380,240 L400,200" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                                                
                                                {/* SASHA optimal route line */}
                                                <path d="M100,80 L150,180 L250,220 L380,240" stroke="#3d3df5" strokeWidth="6" fill="none" className="mock-map-route-line" />
                                            </svg>
                                            
                                            {/* Location Pins */}
                                            <div className="mock-map-pin" style={{ top: '22%', left: '22%' }}>
                                                <div className="pin-pulse"></div>
                                                <div className="pin-core"></div>
                                            </div>
                                            <div className="mock-map-pin pin-dest" style={{ top: '75%', left: '92%' }}>
                                                <MapIcon size={14} color="#fff" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating 3D Card overlay (Map Info) */}
                                    <div className="floating-card-3d">
                                        <div className="float-header">
                                            <div className="float-icon" style={{ background: '#0db9f2', color: '#fff' }}>
                                                <Compass size={20} />
                                            </div>
                                            <div>
                                                <div className="float-title">Rota Panorâmica</div>
                                                <div className="float-sub">45 min • Trânsito Leve</div>
                                            </div>
                                        </div>
                                        <div className="float-weather">
                                            <span className="weather-icon">☀️</span> 
                                            <span className="weather-text">24°C • Céu Limpo</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSlide === 2 && (
                            <motion.div 
                                key="slide2"
                                className="showcase-inner-wrap"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Left: Text Content 3 */}
                                <div className="showcase-content">
                                    <h1 className="showcase-headline">
                                        A Sua Nova,<br />
                                        <span className="showcase-grad-text">Comunidade.</span>
                                    </h1>
                                    <p className="showcase-subtext">
                                        Conecte-se com exploradores apaixonados na "Comunidade de Viajantes pelo Mundo". Partilhe roteiros exclusivos, descubra segredos locais em tempo real e expanda as suas fronteiras através de conexões autênticas.
                                    </p>
                                    <div className="showcase-actions">
                                        <button className="btn-immersive-primary" onClick={() => navigate('/signup')}>Juntar-se à Comunidade</button>
                                        <button className="btn-immersive-secondary" onClick={() => navigate('/signup')}>
                                            <MessageCircle size={20} />
                                            Explorar Grupos
                                        </button>
                                    </div>
                                </div>

                                {/* Right: 3D Chat Mockup Graphic */}
                                <div className="showcase-graphic">
                                    <div className="frame-3d chat-variant">
                                        <div className="frame-3d-toolbar">
                                            <div className="toolbar-dot red"></div>
                                            <div className="toolbar-dot yellow"></div>
                                            <div className="toolbar-dot green"></div>
                                        </div>
                                        <div className="mock-chat-canvas">
                                            <div className="mock-chat-header">
                                                <div className="mock-chat-avatar-group">
                                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80" alt="User 1" />
                                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80" alt="User 2" />
                                                </div>
                                                <div className="mock-chat-info">
                                                    <div className="mock-chat-title">Viajantes pelo Mundo 🌍</div>
                                                    <div className="mock-chat-status">142 online • 1.2k membros</div>
                                                </div>
                                            </div>
                                            
                                            <div className="mock-chat-body">
                                                <div className="mock-msg incoming">
                                                    <div className="mock-msg-name">Teresa</div>
                                                    <div className="mock-msg-bubble">Alguém já esteve em Quioto no Outono? Tem dicas de templos menos turísticos? 🍁</div>
                                                    <div className="mock-msg-time">10:42</div>
                                                </div>
                                                <div className="mock-msg outgoing">
                                                    <div className="mock-msg-bubble">Aconselho muito o Templo Otagi Nenbutsu-ji. Fica em Arashiyama e é incrivelmente sereno!</div>
                                                    <div className="mock-msg-time">10:45 <span className="mock-msg-read">✓✓</span></div>
                                                </div>
                                                <div className="mock-msg incoming delay-anim">
                                                    <div className="mock-msg-name">Miguel</div>
                                                    <div className="mock-msg-bubble">
                                                        <div className="mock-typing-dots"><span></span><span></span><span></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating 3D Card overlay (Chat Notification) */}
                                    <div className="floating-card-3d chat-float">
                                        <div className="float-header">
                                            <div className="float-icon" style={{ background: '#10B981', color: '#fff' }}>
                                                <MessageCircle size={20} />
                                            </div>
                                            <div>
                                                <div className="float-title">Novo Itinerário Partilhado</div>
                                                <div className="float-sub">"7 Dias na Toscânia"</div>
                                            </div>
                                        </div>
                                        <div className="float-bar-grp mt-3">
                                            <div className="mock-avatar-small float-left mr-2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80')"}}></div>
                                            <div style={{fontSize: '0.7rem', color: '#64748b'}}>Por Lucas F. • 4.9 ★</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSlide === 3 && (
                            <motion.div 
                                key="slide3"
                                className="showcase-inner-wrap"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Left: Text Content 4 */}
                                <div className="showcase-content">
                                    <h1 className="showcase-headline">
                                        Inspire. Crie.<br />
                                        <span className="showcase-grad-text">Rentabilize.</span>
                                    </h1>
                                    <p className="showcase-subtext">
                                        Partilhe as suas viagens no Feed Global. Imortalize momentos, crie <strong>Live Tours</strong> envolventes e ganhe comissões automáticas sempre que os seus seguidores reservarem roteiros baseados no seu conteúdo.
                                    </p>
                                    <div className="showcase-actions">
                                        <button className="btn-immersive-primary" onClick={() => navigate('/signup')}>Partilhar Experiência</button>
                                        <button className="btn-immersive-secondary" onClick={() => navigate('/signup')}>
                                            <TrendingUp size={20} />
                                            Ver Monetização
                                        </button>
                                    </div>
                                </div>

                                {/* Right: 3D Social Feed Mockup Graphic */}
                                <div className="showcase-graphic">
                                    <div className="frame-3d feed-variant">
                                        <div className="frame-3d-toolbar">
                                            <div className="toolbar-dot red"></div>
                                            <div className="toolbar-dot yellow"></div>
                                            <div className="toolbar-dot green"></div>
                                        </div>
                                        
                                        <div className="mock-feed-canvas premium-ig-style">
                                            {/* Instagram-style Post Card */}
                                            <div className="mock-post-card">
                                                {/* Meta Header */}
                                                <div className="mock-post-header">
                                                    <div className="mock-post-author">
                                                        <div className="mock-author-avatar-wrap">
                                                            <div className="ig-story-ring">
                                                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80" alt="Creator Profile" className="mock-author-avatar" />
                                                            </div>
                                                        </div>
                                                        <div className="mock-author-info">
                                                            <div className="mock-author-name">
                                                                carolina.travels <span className="verified-badge">✓</span>
                                                            </div>
                                                            <div className="mock-author-location">📍 Santarém, Portugal</div>
                                                        </div>
                                                    </div>
                                                    <div className="mock-post-options">•••</div>
                                                </div>
                                                
                                                {/* Hero Media */}
                                                <div className="mock-post-media">
                                                    <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Luxury Villa with Pool" className="mock-media-img" />

                                                    {/* In-Image Tagging UI */}
                                                    <div className="ig-product-tag anim-fade-in-up">
                                                        <span className="tag-dot"></span>
                                                        <span className="tag-label">Tour Enológico</span>
                                                    </div>
                                                </div>

                                                {/* Interaction Bar */}
                                                <div className="mock-post-actions-bar">
                                                    <div className="action-icons-left">
                                                        <div className="action-icon heart-anim"><span className="heart-fill">❤️</span></div>
                                                        <div className="action-icon stroke-icon">💬</div>
                                                        <div className="action-icon stroke-icon">✈️</div>
                                                    </div>
                                                    <div className="action-icons-right">
                                                        <div className="action-icon stroke-icon">🔖</div>
                                                    </div>
                                                </div>

                                                {/* Post Footer/Caption */}
                                                <div className="mock-post-footer">
                                                    <div className="mock-post-likes">
                                                        <div className="like-avatars">
                                                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" alt="Like 1"/>
                                                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="Like 2"/>
                                                        </div>
                                                        Gostos: <strong>joao_m</strong> e <strong>outras 8.492 pessoas</strong>
                                                    </div>
                                                    
                                                    <div className="mock-post-caption">
                                                        <strong>carolina.travels</strong> A luz do fim de tarde nas vinhas é pura magia. ✨ Juntem-se à Tour Enológica deste fim de semana, comissões ativas no link da bio! 🍷🍇
                                                    </div>
                                                    
                                                    <div className="mock-post-comments">Ver todos os 142 comentários</div>
                                                    
                                                    {/* GoTour specific CTA baked into the feed concept */}
                                                    <div className="mock-gotour-cta">
                                                        <button className="book-tour-btn">Reservar Esta Experiência</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating 3D Card overlay (Commission Notification) */}
                                    <div className="floating-card-3d feed-float">
                                        <div className="float-header">
                                            <div className="float-icon" style={{ background: '#F59E0B', color: '#fff' }}>
                                                <TrendingUp size={20} />
                                            </div>
                                            <div>
                                                <div className="float-title">Nova Comissão Gerada!</div>
                                                <div className="float-sub">Via GoTour Creator Fund</div>
                                            </div>
                                        </div>
                                        <div className="float-earning mt-3">
                                            <span className="earning-value">+$45.00</span> 
                                            <span className="earning-desc">Reserva no Hotel Duomo</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeSlide === 4 && (
                            <motion.div 
                                key="slide4"
                                className="showcase-inner-wrap"
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Left: Text Content 5 */}
                                <div className="showcase-content">
                                    <h1 className="showcase-headline ai-headline">
                                        SASHA 3.1 AI.<br />
                                        <span className="showcase-grad-text">Cérebro da Viagem.</span>
                                    </h1>
                                    <p className="showcase-subtext">
                                        Conheça a <strong>Sasha IA</strong>: a sua copiloto de exploração hiper-inteligente. Planeie rotas complexas, resolva imprevistos em tempo real e receba recomendações preditivas que se moldam ao seu humor e orçamento.
                                    </p>
                                    <div className="showcase-actions">
                                        <button className="btn-immersive-primary" onClick={() => navigate('/signup')}>Falar com Sasha</button>
                                        <button className="btn-immersive-secondary" onClick={() => navigate('/signup')}>
                                            <Sparkles size={18} className="mr-2" style={{ color: '#F59E0B' }} />
                                            Ver Capacidades
                                        </button>
                                    </div>
                                </div>

                                {/* Right: 3D AI Chat Mockup Graphic */}
                                <div className="showcase-graphic">
                                    <div className="frame-3d ai-variant">
                                        <div className="frame-3d-toolbar">
                                            <div className="toolbar-dot red"></div>
                                            <div className="toolbar-dot yellow"></div>
                                            <div className="toolbar-dot green"></div>
                                        </div>
                                        
                                        <div className="mock-ai-canvas">
                                            {/* ChatGPT-style Layout */}
                                            <div className="ai-chat-sidebar">
                                                <div className="ai-sidebar-new">+ Nova Conversa</div>
                                                <div className="ai-sidebar-history">
                                                    <div className="ai-history-item active">✨ Tour em Roma</div>
                                                    <div className="ai-history-item">☕ Cafés de Paris</div>
                                                    <div className="ai-history-item">🌴 Bali Essentials</div>
                                                </div>
                                            </div>

                                            <div className="ai-chat-main">
                                                <div className="ai-chat-header">
                                                    <img src={sashaIcon} alt="Sasha" className="ai-header-logo" />
                                                    <span className="ai-header-name">Sasha 3.1</span>
                                                </div>

                                                <div className="ai-chat-body">
                                                    {/* User Message */}
                                                    <div className="ai-msg user">
                                                        <div className="ai-msg-bubble">
                                                            Sasha, preciso de um roteiro de 3 dias para Tóquio focado em cultura geek e gastronomia local, com orçamento médio.
                                                        </div>
                                                    </div>

                                                    {/* Sasha Response */}
                                                    <div className="ai-msg sasha">
                                                        <div className="ai-msg-avatar">
                                                            <img src={sashaIcon} alt="Sasha Logo" />
                                                        </div>
                                                        <div className="ai-msg-bubble anim-fade-in">
                                                            <div className="ai-typing-effect">
                                                                Claro! Analisei os teus gostos e tracei o <strong>Roteiro Neon & Sushi (3 Dias)</strong>.<span className="ai-cursor"></span>
                                                            </div>
                                                            <div className="ai-itinerary-card mt-3">
                                                                <div className="ai-card-title">Dia 1: Akihabara & Kappabashi</div>
                                                                <ul>
                                                                    <li><strong>10:00</strong> - Explorar lojas retro de Akihabara (Super Potato).</li>
                                                                    <li><strong>13:00</strong> - Almoço: Ramen de Tonkotsu (vagueado por Sasha).</li>
                                                                    <li><strong>15:00</strong> - Visita a Kappabashi (Rua das Facas e Street Food).</li>
                                                                </ul>
                                                            </div>
                                                            <div className="ai-spark-footer">
                                                                💡 <em>Dica: Reservei mesa no Izakaya secreto em Shinjuku para as 20h. Confirmar?</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ai-chat-input-bar">
                                                    <div className="ai-input-wrap">
                                                        <span>Falar com Sasha AI...</span>
                                                        <button className="ai-send-btn">➔</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating 3D Interaction overlay (AI prompt chip) */}
                                    <div className="floating-card-3d ai-float">
                                        <div className="float-header">
                                            <div className="float-icon" style={{ background: '#00D4FF', color: '#fff' }}>
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <div className="float-title">Sasha IA Otimizou!</div>
                                                <div className="float-sub">Poupança de $120 detetada</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── 2. Bento Grid Section ── */}
                <div className="feat-immersive-header">
                    <h2 className="feat-immersive-title">
                        Everything you need,<br />
                        perfectly integrated.
                    </h2>
                    <p className="feat-immersive-desc">
                        Experience seamless travel logistics with our intelligent bento grid features.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="immersive-grid">

                    {/* Card 1: Global Reach */}
                    <div className="bento-card">
                        <div className="card-icon-box icon-box-primary">
                            <Globe size={28} />
                        </div>

                        <div className="bento-illustration globe-illustration">
                            <div className="globe-mesh">
                                <svg className="globe-svg" viewBox="0 0 200 200" fill="none">
                                    <circle cx="100" cy="100" r="80" stroke="rgba(61, 61, 245, 0.15)" strokeWidth="2"/>
                                    <ellipse cx="100" cy="100" rx="40" ry="80" stroke="rgba(61, 61, 245, 0.15)" strokeWidth="2"/>
                                    <path d="M20,100 Q100,20 180,100 Q100,180 20,100" stroke="rgba(61, 61, 245, 0.15)" strokeWidth="2" fill="none"/>
                                    <path d="M100,20 L100,180" stroke="rgba(61, 61, 245, 0.1)" strokeWidth="1"/>
                                    <path d="M20,100 L180,100" stroke="rgba(61, 61, 245, 0.1)" strokeWidth="1"/>
                                </svg>
                                <div className="location-node node-1"></div>
                                <div className="location-node node-2"></div>
                                <div className="location-node node-3"></div>
                            </div>
                        </div>
                        <div className="card-content-bottom">
                            <h3 className="card-title-immersive">Global Reach</h3>
                            <p className="card-desc-immersive">
                                Access curated itineraries across 129 countries with localized insights.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: SASHA AI (Spans 2 columns on medium+) */}
                    <div className="bento-card card-sasha">
                        {/* Detailed Animated Map Background Container */}
                        <div className="sasha-map-bg">
                            <svg className="sasha-map-lines" viewBox="0 0 400 400" preserveAspectRatio="none">
                                <path d="M50,150 L120,220 L180,190 L280,310 L360,240" stroke="rgba(255,255,255,0.35)" strokeWidth="4" fill="none" className="bento-map-route" />
                                <path d="M100,80 L180,190 L250,160 M280,310 L300,120" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" strokeDasharray="8 4" />
                            </svg>
                            <div className="sasha-map-pin pin-a" style={{ top: '35%', left: '30%' }}>
                                <div className="map-pin-badge">NYC</div>
                                <div className="map-pin-dot"></div>
                            </div>
                            <div className="sasha-map-pin pin-b" style={{ top: '75%', left: '70%' }}>
                                <div className="map-pin-badge">ROME</div>
                                <div className="map-pin-dot"></div>
                            </div>
                        </div>

                        <div className="sasha-badge">
                            <span className="badge-dot"></span>
                            Powered by SASHA 3.1
                        </div>
                        
                        <div className="sasha-content">
                            <h3 className="card-title-immersive" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
                                Intelligent Mapping
                            </h3>
                            <p className="card-desc-immersive" style={{ fontSize: '1rem' }}>
                                Predictive travel insights and real-time optimal routing based on global flight data and personal preferences.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Global Community */}
                    <div className="bento-card">
                        <div className="card-icon-box icon-box-primary">
                            <MessageCircle size={28} />
                        </div>
                        
                        <div className="premium-community-mock">
                            <div className="chat-item anim-fade-in-up">
                                <div className="chat-bubble bubble-left">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64" alt="Avatar" className="chat-avatar" />
                                    <div className="chat-body">
                                        <span className="chat-user">Sofia R.</span>
                                        <p className="chat-msg">Alguém para explorar o Coliseu amanhã? 🏛️</p>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-item anim-fade-in-up delay-1">
                                <div className="chat-bubble bubble-right">
                                    <div className="chat-body">
                                        <p className="chat-msg">Eu alinho! Encontramo-nos às 10h? 🙌</p>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1507003200747-5267b7857c2e?w=64" alt="Avatar" className="chat-avatar" />
                                </div>
                            </div>
                        </div>

                        <div className="card-content-bottom">
                            <h3 className="card-title-immersive">Global Community</h3>
                            <p className="card-desc-immersive">
                                Connect with elite traveler networks, share high-res itineraries, and verify reviews.
                            </p>
                        </div>
                    </div>

                    {/* Card 4: Country Intelligence */}
                    <div className="bento-card">
                        <div className="card-icon-box icon-box-primary">
                            <TrendingUp size={28} />
                        </div>

                        <div className="premium-intel-mock">
                            <div className="intel-item anim-fade-in-up">
                                <div className="intel-header">
                                    <span className="intel-title">Exigência de Vistos</span>
                                    <span className="intel-status status-success">Fácil</span>
                                </div>
                                <div className="intel-progress"><div className="intel-progress-bar bar-green" style={{ width: '85%' }}></div></div>
                            </div>
                            <div className="intel-item anim-fade-in-up delay-1">
                                <div className="intel-header">
                                    <span className="intel-title">Câmbio (EUR/USD)</span>
                                    <span className="intel-status status-neutral">1.09</span>
                                </div>
                                <div className="intel-progress"><div className="intel-progress-bar bar-blue" style={{ width: '60%' }}></div></div>
                            </div>
                            <div className="intel-item anim-fade-in-up delay-2">
                                <div className="intel-header">
                                    <span className="intel-title">Clima Local</span>
                                    <span className="intel-status">24°C ☀️</span>
                                </div>
                                <div className="intel-progress"><div className="intel-progress-bar bar-orange" style={{ width: '45%' }}></div></div>
                            </div>
                        </div>

                        <div className="card-content-bottom">
                            <h3 className="card-title-immersive">Country Intelligence</h3>
                            <p className="card-desc-immersive">
                                High-density data views for specific countries, accessible in elegant floating panels.
                            </p>
                        </div>
                    </div>

                    {/* Card 5: Command Center */}
                    <div className="bento-card">
                        <div className="card-icon-box icon-box-primary">
                            <LayoutGrid size={28} />
                        </div>
                        <div className="premium-command-mock">
                            <div className="cmd-item anim-fade-in-up">
                                <div className="cmd-icon-wrap"><Plane size={16} /></div>
                                <div className="cmd-details">
                                    <span className="cmd-title">Voo AF224 (Paris CDG)</span>
                                    <span className="cmd-status status-success">Embarque</span>
                                </div>
                            </div>
                            <div className="cmd-item anim-fade-in-up delay-1">
                                <div className="cmd-icon-wrap"><MessageCircle size={16} /></div>
                                <div className="cmd-details">
                                    <span className="cmd-title">Concierge Privado</span>
                                    <span className="cmd-status">Sasha: "Motorista à espera"</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-content-bottom">
                            <h3 className="card-title-immersive">Command Center</h3>
                            <p className="card-desc-immersive">
                                Your traveler dashboard consolidates active bookings and concierge services.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
