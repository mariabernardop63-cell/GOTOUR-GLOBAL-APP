import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe, Sparkles, MessageCircle, TrendingUp, LayoutGrid,
    Plane, Map as MapIcon, Route, Compass, Star, Heart,
    Bookmark, Send, ChevronRight, Wifi, Battery, Signal,
    Navigation, Layers, Clock, Home, Search,
    PlusSquare, Camera, MoreHorizontal, ShieldCheck, ShoppingBag,
    Wallet, SplitSquareHorizontal, Users, AlertTriangle, FileCheck, Briefcase,
    GlobeLock, PlaneTakeoff, Store, Bot, Gem, Coins, UserPlus, Siren, TicketCheck, BadgeDollarSign, Aperture, Activity
} from 'lucide-react';
import './FeaturesSection.css';
import { useNavigate } from 'react-router-dom';
import sashaIcon from '../../../assets/images/sasha_icon.png';

const STRIPE_FEATURES = [
    {
        id: 'assistant', icon: GlobeLock, grad: 'blue',
        title: 'Assistente Inteligente',
        desc: 'Vistos em tempo real, câmbio, operadoras, clima, alertas de segurança, tomadas e vacinas vacinas num só lugar.',
        microUI: <button className="sfc-micro-btn">O que preciso para entrar?</button>
    },
    {
        id: 'flights', icon: PlaneTakeoff, grad: 'sky',
        title: 'Reservas de Voos',
        desc: 'Comparador inteligente, previsões de preço, rotas alternativas e sugestão da melhor altura para comprar.',
    },
    {
        id: 'market', icon: Store, grad: 'emerald',
        title: 'Marketplace Local',
        desc: 'Farmácias, restaurantes, guias e alugueres. Pague online antecipadamente e receba tudo diretamente.',
    },
    {
        id: 'planner', icon: Bot, grad: 'purple',
        title: 'Planeador IA',
        desc: 'Diga o que procura. A Sasha IA cria o roteiro completo, controla custos e sugere transporte em segundos.',
    },
    {
        id: 'wallet', icon: Gem, grad: 'indigo',
        title: 'Carteira Global',
        desc: 'Carteira virtual com pagamento internacional. Acabaram-se os problemas e burocracias de pagamento em África.',
        microUI: <div className="sfc-micro-pill">1 EUR = 68.5 MZN</div>
    },
    {
        id: 'split', icon: Coins, grad: 'rose',
        title: 'Divisor de Despesas',
        desc: 'O seu Splitwise de turismo. Divida custos da viagem com os seus amigos com conversão automática de moeda.',
    },
    {
        id: 'offline', icon: Navigation, grad: 'teal',
        title: 'Navegação Offline',
        desc: 'Descarregue mapas hiper-detalhados, locais guardados e rotas passo a passo sem precisar de acesso à internet.',
    },
    {
        id: 'match', icon: UserPlus, grad: 'pink',
        title: 'Companheiros de Viagem',
        desc: 'Encontre companheiros no mesmo destino de forma segura, cruze roteiros e partilhe custos (perfis verificados).',
    },
    {
        id: 'emergency', icon: Siren, grad: 'red',
        title: 'Emergência Global',
        desc: 'Ligação direta e imediata a polícias locais, localização de hospitais próximos e partilha de coordenadas num toque.',
    },
    {
        id: 'checkin', icon: TicketCheck, grad: 'cyan',
        title: 'Gestão de Reservas',
        desc: 'Organize e faça check-in de todos os bilhetes, vouchers, reservas e documentos num cofre digital incrivelmente seguro.',
    },
    {
        id: 'work', icon: BadgeDollarSign, grad: 'amber',
        title: 'Renda para Locais',
        desc: 'Uma plataforma dedicada para residentes locais oferecerem serviços e conectarem com milhares de turistas.',
    },
    {
        id: 'photo', icon: Aperture, grad: 'fuchsia',
        title: 'Spots "Instagramáveis"',
        desc: 'Descubra os locais ocultos da cidade para as melhores fotos, com indicação exata de ângulos e iluminação ideal.',
    }
];

const SLIDE_DURATIONS = [14000, 13000, 12000, 11000, 15000];

/* ─── Hotel Detail ──────────────────────────────────────────── */
const HotelDetail = ({ hotel, onClose }) => (
    <motion.div className="fs-hotel-detail"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}>
        <div className="fs-hd-img-wrap">
            <img src={hotel.img} alt={hotel.name} className="fs-hd-img"/>
            <div className="fs-hd-back" onClick={onClose}>← Voltar</div>
            <span className="fs-hd-tag">{hotel.tag}</span>
        </div>
        <div className="fs-hd-body">
            <div className="fs-hd-row">
                <div>
                    <div className="fs-hd-name">{hotel.name}</div>
                    <div className="fs-hd-loc"><MapIcon size={10}/> {hotel.location}</div>
                </div>
                <div className="fs-hd-rating"><Star size={11} fill="#F59E0B" stroke="none"/> {hotel.rating}</div>
            </div>
            <div className="fs-hd-amenities">
                {['Wi-Fi', 'Piscina', 'Spa', 'Restaurante'].map(a => (
                    <span key={a} className="fs-hd-amenity">{a}</span>
                ))}
            </div>
            <div className="fs-hd-price-row">
                <div><span className="fs-hd-price">{hotel.price}</span><span className="fs-hd-per">/noite</span></div>
                <button className="fs-hd-book">Confirmar Reserva</button>
            </div>
        </div>
    </motion.div>
);

/* ─── Slide 0: Hotels (3-column grid of vertical cards) ─────── */
const SlideHotels = () => {
    const [detail, setDetail] = useState(null);
    const hotels = [
        { name: 'Grand Horizon', location: 'Nova Iorque', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', price: '$450', rating: 4.9, tag: 'Luxury' },
        { name: 'Oceanic Retreat', location: 'Bali', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80', price: '$220', rating: 4.8, tag: 'Beach' },
        { name: 'Château Lumière', location: 'Paris', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', price: '$1.200', rating: 5.0, tag: 'Heritage' },
        { name: 'Desert Oasis', location: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', price: '$780', rating: 4.7, tag: 'Resort' },
        { name: 'Alpine Lodge', location: 'Suíça', img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', price: '$340', rating: 4.8, tag: 'Mountain' },
        { name: 'Villa Toscana', location: 'Itália', img: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&q=80', price: '$520', rating: 4.9, tag: 'Villa' },
    ];
    return (
        <div className="fs-phone-shell">
            <div className="fs-phone-status"><span>GoTour Hotels</span><div className="fs-status-icons"><Wifi size={10}/><Signal size={10}/><Battery size={12}/></div></div>
            <div className="fs-hotels-header">
                <div className="fs-hotels-title">Alojamentos Selecionados</div>
                <div className="fs-hotels-subtitle">Curados pela Sasha IA</div>
                <div className="fs-hotels-filter-row">
                    {['Todos','Hotéis','Vilas','Resorts'].map((f,i)=>(
                        <span key={f} className={`fs-filter-chip ${i===0?'active':''}`}>{f}</span>
                    ))}
                </div>
            </div>
            <div className="fs-hotels-scroll">
                <AnimatePresence mode="wait">
                    {detail ? (
                        <HotelDetail key="detail" hotel={detail} onClose={()=>setDetail(null)}/>
                    ) : (
                        <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                            <div className="fs-hotels-grid">
                                {hotels.map((h,i)=>(
                                    <motion.div key={h.name} className="fs-hotel-grid-card"
                                        initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                                        transition={{ delay: i*0.12+0.1, duration:0.4, ease:[0.16,1,0.3,1] }}>
                                        <div className="fs-hgc-img-wrap">
                                            <img src={h.img} alt={h.name} className="fs-hgc-img"/>
                                            <span className="fs-hgc-tag">{h.tag}</span>
                                            <span className="fs-hgc-save"><Bookmark size={9}/></span>
                                        </div>
                                        <div className="fs-hgc-body">
                                            <div className="fs-hgc-name">{h.name}</div>
                                            <div className="fs-hgc-loc"><MapIcon size={8}/> {h.location}</div>
                                            <div className="fs-hgc-row">
                                                <div className="fs-hgc-rating"><Star size={9} fill="#F59E0B" stroke="none"/> {h.rating}</div>
                                                <div className="fs-hgc-price">{h.price}<span>/nt</span></div>
                                            </div>
                                            <button className="fs-hgc-btn" onClick={()=>setDetail(h)}>Reservar</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="fs-hotels-see-more">
                                <button className="fs-see-more-btn">Ver mais</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ─── Slide 1: Map ──────────────────────────────────────────── */
const SlideMap = () => {
    const [showCard, setShowCard] = useState(false);
    useEffect(()=>{ const t=setTimeout(()=>setShowCard(true),2000); return()=>clearTimeout(t); },[]);
    return (
        <div className="fs-phone-shell fs-map-shell">
            <div className="fs-map-bg">
                <svg className="fs-map-grid" viewBox="0 0 320 500" preserveAspectRatio="none">
                    <rect width="320" height="500" fill="#F2EFE9"/>
                    <rect x="15" y="60" width="70" height="55" fill="#C8E6C9" rx="3"/>
                    <rect x="230" y="200" width="75" height="65" fill="#C8E6C9" rx="3"/>
                    {[[100,40,55,45],[170,30,60,50],[10,140,65,70],[85,145,50,60],[145,140,70,65],[230,140,60,50],[10,240,55,80],[80,250,60,70],[150,240,65,75],[225,290,75,55]].map(([x,y,w,h],i)=>(
                        <rect key={i} x={x} y={y} width={w} height={h} fill="#E8E0D5" rx="2" stroke="#D4C9BC" strokeWidth="0.5"/>
                    ))}
                    <rect x="0" y="125" width="320" height="14" fill="#FFFFFF"/>
                    <rect x="0" y="230" width="320" height="14" fill="#FFFFFF"/>
                    <rect x="95" y="0" width="14" height="500" fill="#FFFFFF"/>
                    <rect x="215" y="0" width="14" height="500" fill="#FFFFFF"/>
                    <rect x="0" y="195" width="320" height="7" fill="#F9F6EF"/>
                    <rect x="155" y="0" width="7" height="500" fill="#F9F6EF"/>
                    <text x="20" y="122" fontSize="6" fill="#888" fontFamily="sans-serif">Av. da Liberdade</text>
                    <text x="20" y="226" fontSize="6" fill="#888" fontFamily="sans-serif">Rua do Ouro</text>
                    <path d="M0,440 Q80,420 160,445 Q240,470 320,445 L320,500 L0,500Z" fill="#AED9F2" opacity="0.7"/>
                    <text x="100" y="480" fontSize="7" fill="#5B9DC7" fontFamily="sans-serif">Rio Tejo</text>
                    <path d="M155,420 Q158,340 160,230 Q162,185 200,132 Q220,115 250,100" stroke="rgba(66,133,244,0.2)" strokeWidth="12" fill="none" strokeLinecap="round"/>
                    <path d="M155,420 Q158,340 160,230 Q162,185 200,132 Q220,115 250,100" stroke="#4285F4" strokeWidth="5" fill="none" strokeLinecap="round" className="fs-map-route"/>
                </svg>
                <div className="fs-map-pin fs-pin-start" style={{ bottom:'18%', left:'46%' }}>
                    <div className="fs-pin-pulse"/><div className="fs-pin-dot"/>
                    <div className="fs-pin-label">Lisboa</div>
                </div>
                <div className="fs-map-pin" style={{ top:'17%', left:'73%' }}>
                    <div className="fs-pin-dest-icon"><Navigation size={12} color="#fff"/></div>
                    <div className="fs-pin-label" style={{ background:'#4285F4' }}>Belém</div>
                </div>
                {[{top:'35%',left:'52%',icon:<Home size={9}/>,delay:1.5},{top:'55%',left:'35%',icon:<Search size={9}/>,delay:2},{top:'28%',left:'70%',icon:<Layers size={9}/>,delay:2.5}].map((p,i)=>(
                    <motion.div key={i} className="fs-map-poi-icon" style={{ top:p.top, left:p.left }}
                        initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:p.delay, type:'spring' }}>
                        {p.icon}
                    </motion.div>
                ))}
            </div>
            <div className="fs-map-topbar">
                <div className="fs-map-search"><Compass size={13} style={{ color:'#4285F4' }}/><span>Lisboa → Belém</span></div>
                <div className="fs-map-topbar-icon"><Layers size={13} style={{ color:'#fff' }}/></div>
            </div>
            <AnimatePresence>
                {showCard && (
                    <motion.div className="fs-map-info-card" initial={{ y:100, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:100 }} transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}>
                        <div className="fs-map-route-header">
                            <div className="fs-map-route-title">Rota SASHA · Lisboa Centro</div>
                            <span className="fs-map-badge"><Navigation size={8}/> Otimizada</span>
                        </div>
                        <div className="fs-map-route-stats">
                            <div className="fs-map-stat"><span>6.2 km</span><small>Distância</small></div>
                            <div className="fs-map-stat-div"/>
                            <div className="fs-map-stat"><span>18 min</span><small>Carro</small></div>
                            <div className="fs-map-stat-div"/>
                            <div className="fs-map-stat"><span>24°C</span><small>Clima</small></div>
                        </div>
                        <div className="fs-map-waypoints">
                            {['Marquês de Pombal','Praça do Comércio','Torre de Belém'].map((wp,i)=>(
                                <motion.div key={wp} className="fs-waypoint" initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.3 }}>
                                    <div className="fs-waypoint-dot"/><span>{wp}</span>
                                    <ChevronRight size={9} style={{ marginLeft:'auto', color:'#94A3B8' }}/>
                                </motion.div>
                            ))}
                        </div>
                        <button className="fs-map-start-btn"><Navigation size={12}/> Iniciar Navegação</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Slide 2: Community ────────────────────────────────────── */
const SlideCommunity = () => {
    const [phase, setPhase] = useState('typing');
    useEffect(()=>{
        const t1=setTimeout(()=>setPhase('message'),3000);
        const t2=setTimeout(()=>setPhase('emojiPicker'),6000);
        const t3=setTimeout(()=>setPhase('reacted'),7200);
        return()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    },[]);
    return (
        <div className="fs-phone-shell">
            <div className="fs-chat-topbar">
                <div className="fs-chat-avatar-group">
                    {['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80','https://i.pravatar.cc/100?img=12'].map((s,i)=><img key={i} src={s} alt="u"/>)}
                </div>
                <div className="fs-chat-topbar-info">
                    <div className="fs-chat-topbar-name">Viajantes pelo Mundo</div>
                    <div className="fs-chat-topbar-status">142 online · 1.2k membros</div>
                </div>
            </div>
            <div className="fs-chat-body">
                <div className="fs-chat-date">Hoje</div>
                <motion.div className="fs-msg fs-msg-in" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" className="fs-msg-avatar" alt="Teresa"/>
                    <div><div className="fs-msg-name">Teresa R.</div>
                    <div className="fs-msg-bubble fs-bubble-in">Alguém esteve em Quioto no Outono? Dicas de templos menos turísticos? 🍁</div>
                    <div className="fs-msg-time">10:42</div></div>
                </motion.div>
                <motion.div className="fs-msg fs-msg-out" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8 }}>
                    <div><div className="fs-msg-bubble fs-bubble-out">Aconselho o Templo Otagi Nenbutsu-ji! Incrivelmente sereno 🙏</div>
                    <div className="fs-msg-time" style={{ textAlign:'right' }}>10:45 <span className="fs-read-tick">✓✓</span></div></div>
                </motion.div>
                <div className="fs-msg fs-msg-in">
                    <img src="https://i.pravatar.cc/100?img=12" className="fs-msg-avatar" alt="Miguel"/>
                    <div><div className="fs-msg-name">Miguel F.</div>
                        <AnimatePresence mode="wait">
                            {phase==='typing' ? (
                                <motion.div key="typing" className="fs-msg-bubble fs-bubble-in" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}>
                                    <div className="fs-typing-dots"><span/><span/><span/></div>
                                </motion.div>
                            ) : (
                                <motion.div key="msg" className="fs-msg-bubble fs-bubble-in" style={{ position:'relative' }} initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }}>
                                    Fui em Novembro — as cores das folhas são de outro mundo 🍂
                                    <AnimatePresence>
                                        {phase==='emojiPicker' && (
                                            <motion.div className="fs-emoji-picker" initial={{ scale:0, opacity:0, y:10 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0, opacity:0 }}>
                                                {['👍','❤️','😂','😮','😢','🔥'].map((e,i)=>(
                                                    <motion.span key={e} className={`fs-emoji-opt ${e==='❤️'?'fs-emoji-selected':''}`} initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:i*0.05 }}>{e}</motion.span>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {phase==='reacted' && <motion.div className="fs-msg-reaction" initial={{ scale:0 }} animate={{ scale:1 }}>❤️</motion.div>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {phase!=='typing' && <div className="fs-msg-time">10:48</div>}
                    </div>
                </div>
                <AnimatePresence>
                    {phase==='reacted' && (
                        <motion.div className="fs-reaction-toast" initial={{ opacity:0, y:8, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0 }}>
                            <Heart size={12} fill="#EF4444" stroke="none"/><span>Teresa R. reagiu à sua mensagem</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="fs-chat-input-bar">
                <div className="fs-chat-input-wrap">
                    <span className="fs-chat-placeholder">Mensagem...</span>
                    <div className="fs-chat-send"><Send size={13}/></div>
                </div>
            </div>
        </div>
    );
};

/* ─── Slide 3: Feed ─────────────────────────────────────────── */
const SlideFeed = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(()=>{ const t=setTimeout(()=>setScrolled(true),3500); return()=>clearTimeout(t); },[]);
    const Post = ({ avatar, ring, name, loc, img, likes, caption, cta, ctaColor }) => (
        <div className="fs-post-card">
            <div className="fs-post-header">
                <div className="fs-post-author">
                    <div className="fs-story-ring" style={{ background:ring }}>
                        <img src={avatar} className="fs-author-avatar" alt={name}/>
                    </div>
                    <div><div className="fs-author-name">{name} <span className="fs-verified">✓</span></div><div className="fs-author-loc">{loc}</div></div>
                </div>
                <MoreHorizontal size={16} color="#888"/>
            </div>
            <div className="fs-post-media">
                <img src={img} alt="post" className="fs-post-img"/>
                <div className="fs-post-location-tag"><div className="fs-tag-dot"/><span>{loc}</span></div>
            </div>
            <div className="fs-post-actions">
                <div className="fs-post-actions-left">
                    <Heart size={20} className="fs-act-icon"/><MessageCircle size={20} className="fs-act-icon"/><Send size={19} className="fs-act-icon"/>
                </div>
                <Bookmark size={20} className="fs-act-icon"/>
            </div>
            <div className="fs-post-footer">
                <div className="fs-post-likes"><Heart size={12} fill="#EF4444" stroke="none"/> <strong>{likes} gostos</strong></div>
                <div className="fs-post-caption"><strong>{name.split('.')[0]}</strong> {caption}</div>
                {cta && <button className="fs-post-book-btn" style={{ background:ctaColor||'linear-gradient(135deg,#3d3df5,#0db9f2)' }}>{cta}</button>}
            </div>
        </div>
    );
    return (
        <div className="fs-phone-shell fs-feed-shell">
            <div className="fs-feed-topbar"><span className="fs-feed-logo">GoTour</span><div className="fs-feed-topbar-icons"><Heart size={18}/><Send size={18}/></div></div>
            <div className="fs-feed-viewport">
                <motion.div animate={{ y:scrolled?-310:0 }} transition={{ duration:1.1, ease:[0.76,0,0.24,1] }}>
                    <Post avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                        ring="linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)"
                        name="carolina.travels" loc="Santorini, Grécia"
                        img="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80"
                        likes="8.492" caption="A luz dourada de Santorini é incomparável ✨" cta="Reservar Esta Experiência"/>
                    <Post avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80"
                        ring="linear-gradient(45deg,#00D4FF,#3d3df5)"
                        name="lucas.nomad" loc="Kyoto, Japão"
                        img="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"
                        likes="5.231" caption="Quioto no Outono é poesia pura 🍂" cta="Ver Roteiro Completo" ctaColor="linear-gradient(135deg,#3d3df5,#00D4FF)"/>
                </motion.div>
            </div>
            <div className="fs-feed-bottombar">
                <Home size={22} className="fs-bb-icon active"/><Search size={22} className="fs-bb-icon"/>
                <PlusSquare size={22} className="fs-bb-icon"/><Camera size={22} className="fs-bb-icon"/>
            </div>
        </div>
    );
};

/* ─── Slide 4: Sasha AI ─────────────────────────────────────── */
const SlideSasha = () => {
    const [phase, setPhase] = useState('idle');
    useEffect(()=>{
        const t1=setTimeout(()=>setPhase('sending'),800);
        const t2=setTimeout(()=>setPhase('thinking'),1800);
        const t3=setTimeout(()=>setPhase('streaming'),3800);
        const t4=setTimeout(()=>setPhase('done'),8500);
        return()=>{ clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    },[]);
    return (
        <div className="fs-phone-shell fs-sasha-shell">
            <div className="fs-sasha-header">
                <div className="fs-sasha-avatar-wrap"><img src={sashaIcon} alt="Sasha" className="fs-sasha-logo"/><div className="fs-sasha-status-dot"/></div>
                <div><div className="fs-sasha-name">Sasha IA</div><div className="fs-sasha-tagline">Guia de Viagem Inteligente</div></div>
                <div className="fs-sasha-version-badge">3.1</div>
            </div>
            <div className="fs-sasha-chat">
                <motion.div className="fs-sasha-msg fs-sasha-ai" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                    <img src={sashaIcon} className="fs-sasha-msg-avatar" alt="Sasha"/>
                    <div className="fs-sasha-bubble fs-bubble-ai">Olá! Sou a Sasha. Como posso planear a sua próxima aventura? ✨</div>
                </motion.div>
                <motion.div className="fs-sasha-chips" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}>
                    {['Roteiro em Tóquio','Hotéis em Paris','Melhores praias'].map(c=><div key={c} className="fs-sasha-chip">{c}</div>)}
                </motion.div>
                <AnimatePresence>
                    {phase!=='idle' && (
                        <motion.div className="fs-sasha-msg fs-sasha-user" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                            <div className="fs-sasha-bubble fs-bubble-user">Sasha, quero 3 dias em Tóquio — cultura geek e gastronomia, orçamento médio.</div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {phase==='thinking' && (
                        <motion.div className="fs-sasha-msg fs-sasha-ai" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}>
                            <img src={sashaIcon} className="fs-sasha-msg-avatar" alt="Sasha"/>
                            <div className="fs-sasha-bubble fs-bubble-ai fs-thinking-bubble">
                                <div className="fs-thinking-bar"><div className="fs-thinking-fill"/></div>
                                <span className="fs-thinking-label">Sasha a analisar preferências...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {(phase==='streaming'||phase==='done') && (
                        <motion.div className="fs-sasha-msg fs-sasha-ai" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                            <img src={sashaIcon} className="fs-sasha-msg-avatar" alt="Sasha"/>
                            <div className="fs-sasha-bubble fs-bubble-ai">
                                <div className="fs-ai-text">Tracei o <strong>Roteiro Neon & Sushi</strong> (3 Dias){phase==='streaming'&&<span className="fs-cursor">|</span>}</div>
                                <AnimatePresence>
                                    {phase==='done' && (
                                        <motion.div className="fs-itinerary-card" initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
                                            <div className="fs-itin-day"><Clock size={10}/> Dia 1 — Akihabara & Shibuya</div>
                                            {[['10:00','Lojas retro de Akihabara'],['13:00','Ramen Tonkotsu (Sasha pick)'],['20:00','Cruzamento de Shibuya']].map(([t,a])=>(
                                                <div key={t} className="fs-itin-item"><span className="fs-itin-time">{t}</span><span>{a}</span></div>
                                            ))}
                                            <div className="fs-itin-footer"><Sparkles size={10}/> Mesa reservada no Izakaya secreto às 20h.</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="fs-sasha-input-bar">
                <div className="fs-sasha-input-wrap">
                    <img src={sashaIcon} className="fs-sasha-input-icon" alt=""/>
                    <span className="fs-sasha-input-placeholder">Perguntar à Sasha...</span>
                    <button className="fs-sasha-send"><Send size={13}/></button>
                </div>
            </div>
        </div>
    );
};

/* ─── Desktop Mock Frame (behind mobile) ────────────────────── */
const DesktopMockFrame = ({ slideKey }) => (
    <div className="fs-desktop-frame">
        {/* Browser chrome */}
        <div className="fs-desktop-chrome">
            <div className="fs-dc-dots"><span/><span/><span/></div>
            <div className="fs-dc-bar">gotour.app — {slideKey === 'hotels' ? 'Alojamentos' : slideKey === 'map' ? 'Mapa Interativo' : slideKey === 'community' ? 'Comunidade' : slideKey === 'feed' ? 'Feed Global' : 'Sasha IA'}</div>
        </div>
        {/* Desktop content */}
        <div className="fs-desktop-body">
            {/* Sidebar */}
            <div className="fs-desktop-sidebar">
                <div className="fs-ds-logo">GoTour</div>
                {[{ icon: <Home size={13}/>, label:'Início' },{ icon: <MapIcon size={13}/>, label:'Mapa' },{ icon: <MessageCircle size={13}/>, label:'Comunidade' },{ icon: <TrendingUp size={13}/>, label:'Feed' },{ icon: <Sparkles size={13}/>, label:'Sasha IA' }].map((it, i) => (
                    <div key={it.label} className={`fs-ds-item ${i === 0 ? 'active' : ''}`}>{it.icon}<span>{it.label}</span></div>
                ))}
            </div>
            {/* Main area */}
            <div className="fs-desktop-main">
                <div className="fs-dm-header">
                    <div className="fs-dm-title">
                        {slideKey === 'hotels' ? 'Alojamentos Selecionados' : slideKey === 'map' ? 'Mapa Inteligente' : slideKey === 'community' ? 'Comunidade de Viajantes' : slideKey === 'feed' ? 'Feed Global' : 'Sasha IA Assistant'}
                    </div>
                    <div className="fs-dm-search"><Search size={10}/><span>Pesquisar...</span></div>
                </div>
                {/* Hotel-specific desktop grid */}
                {slideKey === 'hotels' && (
                    <div className="fs-dm-hotel-grid">
                        {[{img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=60',name:'Grand Horizon',loc:'Nova Iorque',price:'$450'},{img:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&q=60',name:'Oceanic Retreat',loc:'Bali',price:'$220'},{img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=60',name:'Château Lumière',loc:'Paris',price:'$1.200'}].map(h=>(
                            <div key={h.name} className="fs-dm-hotel-card">
                                <img src={h.img} className="fs-dm-hotel-img" alt={h.name}/>
                                <div className="fs-dm-hotel-info"><div className="fs-dm-hotel-name">{h.name}</div><div className="fs-dm-hotel-loc">{h.loc}</div><div className="fs-dm-hotel-price">{h.price}/noite</div></div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Map slide desktop */}
                {slideKey === 'map' && (
                    <div className="fs-dm-map-preview">
                        <div className="fs-dm-map-tile"/>
                        <div className="fs-dm-map-route-chip"><Navigation size={9}/> Rota: 6.2 km · 18 min</div>
                    </div>
                )}
                {/* Community desktop */}
                {slideKey === 'community' && (
                    <div className="fs-dm-chat-preview">
                        <div className="fs-dm-chat-msg"><div className="fs-dm-msg-dot in"/><span>Teresa R.: Alguém esteve em Quioto...?</span></div>
                        <div className="fs-dm-chat-msg"><div className="fs-dm-msg-dot out"/><span>Você: Aconselho o Templo Otagi...</span></div>
                        <div className="fs-dm-chat-msg"><div className="fs-dm-msg-dot in"/><span>Miguel F.: As cores de Novembro são...</span></div>
                    </div>
                )}
                {/* Feed desktop */}
                {slideKey === 'feed' && (
                    <div className="fs-dm-feed-preview">
                        <div className="fs-dm-feed-item"><div className="fs-dm-feed-dot"/><span>carolina.travels · Santorini, Grécia</span><Heart size={8} fill="#EF4444" stroke="none"/></div>
                        <div className="fs-dm-feed-item"><div className="fs-dm-feed-dot"/><span>lucas.nomad · Kyoto, Japão</span><Heart size={8} style={{ color:'#ccc' }}/></div>
                    </div>
                )}
                {/* Sasha desktop */}
                {slideKey === 'sasha' && (
                    <div className="fs-dm-sasha-preview">
                        <div className="fs-dm-sasha-item"><img src={sashaIcon} className="fs-dm-sasha-icon" alt=""/><span>Roteiro Neon & Sushi — Tóquio</span></div>
                        <div className="fs-dm-sasha-bar"><div className="fs-dm-sasha-fill"/></div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

/* ─── Main FeaturesSection ──────────────────────────────────── */
const SLIDES_DATA = [
    { key:'hotels', headline:'Reserve o Alojamento', grad:'Perfeito para Si.', sub:'Hotéis exclusivos curados pela Sasha IA em +120 países, com preços transparentes e reserva instantânea.' },
    { key:'map',    headline:'Mapa Inteligente,', grad:'Percursos Reais.', sub:'Navegação otimizada com análise de tráfego, clima e trilhos panorâmicos em tempo real.' },
    { key:'community', headline:'A Sua Nova', grad:'Comunidade.', sub:'Partilhe roteiros, descubra dicas locais e explore com viajantes de todo o mundo.' },
    { key:'feed',   headline:'Inspire. Crie.', grad:'Rentabilize.', sub:'Partilhe viagens no Feed Global e ganhe comissões quando os seus seguidores reservam.' },
    { key:'sasha',  headline:'SASHA 3.1 IA.', grad:'Cérebro da Viagem.', sub:'A copiloto hiper-inteligente que planeia rotas, resolve imprevistos e personaliza cada detalhe.' },
];

const slideVariants = {
    enter: { opacity:0, x:50, filter:'blur(6px)' },
    center: { opacity:1, x:0, filter:'blur(0px)' },
    exit: { opacity:0, x:-50, filter:'blur(6px)' },
};

const FeaturesSection = () => {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
    const timerRef = React.useRef(null);

    useEffect(()=>{
        timerRef.current = setTimeout(()=>setActiveSlide(prev=>(prev+1)%SLIDES_DATA.length), SLIDE_DURATIONS[activeSlide]);
        return()=>clearTimeout(timerRef.current);
    },[activeSlide]);

    const s = SLIDES_DATA[activeSlide];
    const CTA1 = ['Explorar Hotéis','Ver Mapa','Juntar-se','Partilhar','Falar com Sasha'];
    const CTA2_ICONS = [<Route size={16}/>,<Navigation size={16}/>,<MessageCircle size={16}/>,<TrendingUp size={16}/>,<Sparkles size={16}/>];

    return (
        <section id="funcionalidades" className="feat-immersive-section">
            <div className="feat-immersive-container">
                <div className="immersive-showcase">
                    <AnimatePresence mode="wait">
                        <motion.div key={s.key} className="showcase-inner-wrap showcase-inner-spaced"
                            variants={slideVariants} initial="enter" animate="center" exit="exit"
                            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>
                            {/* LEFT TEXT */}
                            <div className="showcase-content showcase-content-left">
                                <h1 className="showcase-headline fs-playfair">
                                    {s.headline}<br/><span className="showcase-grad-text">{s.grad}</span>
                                </h1>
                                <p className="showcase-subtext">{s.sub}</p>
                                <div className="showcase-actions">
                                    <button className="btn-immersive-primary" onClick={()=>navigate('/signup')}>{CTA1[activeSlide]}</button>
                                    <button className="btn-immersive-secondary" onClick={()=>navigate('/signup')}>{CTA2_ICONS[activeSlide]} Ver Demo</button>
                                </div>
                            </div>
                            {/* RIGHT GRAPHIC — desktop frame behind, mobile in front */}
                            <div className="showcase-graphic showcase-graphic-layered">
                                {/* Desktop frame (behind) */}
                                <div className="fs-desktop-layer">
                                    <DesktopMockFrame slideKey={s.key}/>
                                </div>
                                {/* Mobile phone (front, shifted right) */}
                                <div className="fs-mobile-layer">
                                    {activeSlide===0 && <SlideHotels/>}
                                    {activeSlide===1 && <SlideMap/>}
                                    {activeSlide===2 && <SlideCommunity/>}
                                    {activeSlide===3 && <SlideFeed/>}
                                    {activeSlide===4 && <SlideSasha/>}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    {/* Dots */}
                    <div className="fs-slide-dots">
                        {SLIDES_DATA.map((sl,i)=>(
                            <button key={sl.key} className={`fs-dot ${i===activeSlide?'active':''}`} onClick={()=>setActiveSlide(i)}/>
                        ))}
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="feat-immersive-header">
                    <h2 className="feat-immersive-title fs-playfair">Tudo o que precisa,<br/>perfeitamente integrado.</h2>
                    <p className="feat-immersive-desc">Viaje com inteligência — o ecossistema GoTour reúne funcionalidades premium num único lugar.</p>
                </div>
                <div className="stripe-features-grid">
                    {STRIPE_FEATURES.map((feat) => (
                        <div key={feat.id} className="stripe-feature-card anim-fade-in-up">
                            <div className="sfc-top">
                                <div className={`sfc-icon-wrapper grad-${feat.grad}`}>
                                    <feat.icon size={22} className="sfc-icon" />
                                </div>
                                <h3 className="sfc-title">{feat.title}</h3>
                            </div>
                            <p className="sfc-desc">{feat.desc}</p>
                            {feat.microUI && (
                                <div className="sfc-micro-container">
                                    {feat.microUI}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
