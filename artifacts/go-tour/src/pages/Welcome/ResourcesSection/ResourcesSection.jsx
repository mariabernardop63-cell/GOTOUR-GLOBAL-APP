import React from 'react';
import './ResourcesSection.css';

/* ── Brand logos with SVG icons ── */
const BRAND_LOGOS = [
    { name: 'Marriott', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z"/><path d="M12 6.5L7 9v6l5 2.5L17 15V9l-5-2.5z" opacity=".4"/></svg> },
    { name: 'Emirates', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12c0 0 4-6 10-6s10 6 10 6-4 6-10 6S2 12 2 12z" opacity=".3"/><path d="M3 12l9-5 9 5-9 5-9-5z"/><circle cx="12" cy="12" r="2"/></svg> },
    { name: 'Hilton', svg: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="16" rx="2" opacity=".2"/><rect x="6" y="7" width="4" height="4" rx=".5" opacity=".5"/><rect x="14" y="7" width="4" height="4" rx=".5" opacity=".5"/><rect x="6" y="13" width="4" height="4" rx=".5" opacity=".5"/><rect x="14" y="13" width="4" height="4" rx=".5" opacity=".5"/><rect x="10" y="16" width="4" height="4" rx=".5"/></svg> },
    { name: 'TAP Air', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16l-9-14L3 16h18z" opacity=".2"/><path d="M12 5l7 11H5l7-11z" opacity=".5"/><circle cx="12" cy="13" r="2"/></svg> },
    { name: 'Accor', svg: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" opacity=".15"/><circle cx="12" cy="12" r="6" opacity=".3"/><circle cx="12" cy="12" r="3"/></svg> },
    { name: 'Lufthansa', svg: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".15"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3l3 4h-6l3-4zm-5 6h10l-5 7-5-7z" opacity=".5"/></svg> },
    { name: 'Four Seasons', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8L8 14 2 9.2h7.6L12 2z" opacity=".4"/></svg> },
    { name: 'Qatar Airways', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 14l10-10 10 10" opacity=".2"/><path d="M4 14l8-8 8 8" opacity=".4"/><path d="M7 14l5-5 5 5" opacity=".7"/></svg> },
    { name: 'Nobu', svg: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8" opacity=".15"/><path d="M12 4v16M4 12h16" opacity=".3" strokeWidth="1" stroke="currentColor"/><circle cx="12" cy="12" r="4" opacity=".4"/></svg> },
    { name: 'Hyatt', svg: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="6" width="16" height="12" rx="2" opacity=".15"/><path d="M8 6v12M16 6v12M4 12h16" opacity=".4" strokeWidth=".8" stroke="currentColor" fill="none"/></svg> },
    { name: 'Turkish Airlines', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 12c0-5 4-9 9-9s9 4 9 9" opacity=".2"/><path d="M12 6l6 6H6l6-6z" opacity=".5"/><circle cx="12" cy="15" r="2.5" opacity=".4"/></svg> },
    { name: 'Ritz-Carlton', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2 4h4l-3 3 1 5-4-2-4 2 1-5-3-3h4l2-4z" opacity=".5"/><circle cx="12" cy="17" r="3" opacity=".2"/></svg> },
    { name: 'KLM', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 17l10-13 10 13H2z" opacity=".3"/><path d="M7 17l5-7 5 7H7z" opacity=".5"/></svg> },
    { name: 'Zuma', svg: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="7" opacity=".15"/><path d="M8 8h8v8H8z" opacity=".3" rx="1"/><path d="M10 10h4v4h-4z" opacity=".6"/></svg> },
    { name: 'IHG', svg: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="8" width="18" height="8" rx="4" opacity=".2"/><circle cx="8" cy="12" r="2" opacity=".5"/><circle cx="16" cy="12" r="2" opacity=".5"/></svg> },
    { name: 'British Airways', svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12h20M12 5l5 7-5 7M12 5l-5 7 5 7" opacity=".4" strokeWidth=".8" stroke="currentColor" fill="none"/></svg> },
];

const ResourcesSection = () => {
    return (
        <section id="recursos" className="resources-section">

            {/* ── Brand Logos Marquee ── */}
            <div className="resources-marquee-wrapper">
                <div className="resources-marquee-track">
                    {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                        <div key={i} className="resources-brand-item">
                            <span className="brand-icon">{brand.svg}</span>
                            <span className="brand-name">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main Title ── */}
            <div className="resources-title-block">
                <p className="resources-big-text">
                    <strong>O futuro do turismo digital.</strong>{' '}
                    +120 países, mapa inteligente, comunidades globais, Sasha IA 
                    e armazenamento gratuito na nuvem — tudo numa só plataforma.
                </p>
            </div>

            {/* ── Feature Items (open layout, vertical bar dividers) ── */}
            <div className="resources-features-marquee">
                <div className="resources-features-track">

                    {/* Feature 1: 120 Countries */}
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* City skyline + mountain */}
                                <rect x="10" y="60" width="16" height="36" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                                <rect x="13" y="66" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="19" y="66" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="13" y="74" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="19" y="74" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="13" y="82" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="19" y="82" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="32" y="46" width="20" height="50" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                                <rect x="36" y="52" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="44" y="52" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="36" y="60" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="44" y="60" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="36" y="68" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="44" y="68" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="36" y="76" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="44" y="76" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="39" y="86" width="6" height="10" rx="1" fill="rgba(255,255,255,0.08)"/>
                                <polygon points="65,55 82,30 99,55" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                                <polygon points="80,55 92,38 104,55" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
                                <line x1="82" y1="30" x2="82" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                                <circle cx="88" cy="20" r="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
                                <line x1="86" y1="20" x2="90" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
                                <line x1="88" y1="18" x2="88" y2="22" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
                                <line x1="0" y1="96" x2="120" y2="96" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">+120 Países</h4>
                        <p className="resources-feature-desc">
                            Explore destinos globais com guias locais e experiências autênticas em cada região.
                        </p>
                    </div>

                    <div className="resources-feature-divider"></div>

                    {/* Feature 2: Intelligent Map */}
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 22L40 12L80 28L105 18V98L80 108L40 92L15 102V22Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                                <line x1="40" y1="12" x2="40" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
                                <line x1="80" y1="28" x2="80" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
                                <circle cx="55" cy="48" r="8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
                                <circle cx="55" cy="48" r="3" fill="rgba(255,255,255,0.25)"/>
                                <path d="M55 56C55 56 65 68 65 76" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3 2"/>
                                <circle cx="88" cy="60" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
                                <circle cx="88" cy="60" r="2" fill="rgba(255,255,255,0.1)"/>
                                <circle cx="28" cy="65" r="4" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none"/>
                                <circle cx="28" cy="65" r="1.5" fill="rgba(255,255,255,0.1)"/>
                                <circle cx="70" cy="80" r="3.5" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Mapa Inteligente</h4>
                        <p className="resources-feature-desc">
                            Mapa interativo com rotas otimizadas e sugestões personalizadas pela IA.
                        </p>
                    </div>

                    <div className="resources-feature-divider"></div>

                    {/* Feature 3: Communities */}
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="42" cy="32" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                                <path d="M22 72C22 58 30 50 42 50C54 50 62 58 62 72" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                                <circle cx="78" cy="28" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" fill="none"/>
                                <path d="M62 66C62 54 68 48 78 48C88 48 94 54 94 66" stroke="rgba(255,255,255,0.2)" strokeWidth="1.3" fill="none"/>
                                <rect x="28" y="80" width="36" height="16" rx="3" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none"/>
                                <line x1="34" y1="86" x2="56" y2="86" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeLinecap="round"/>
                                <line x1="34" y1="91" x2="48" y2="91" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round"/>
                                <circle cx="102" cy="40" r="5" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
                                <path d="M96 52C96 47 98 44 102 44C106 44 108 47 108 52" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Comunidades</h4>
                        <p className="resources-feature-desc">
                            Grupos de viajantes para trocar ideias, partilhar experiências e conectar.
                        </p>
                    </div>

                    <div className="resources-feature-divider"></div>

                    {/* Feature 4: Sasha AI */}
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="60" cy="50" r="24" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                                <circle cx="60" cy="50" r="14" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none"/>
                                <circle cx="60" cy="50" r="5" fill="rgba(255,255,255,0.2)"/>
                                <line x1="60" y1="26" x2="60" y2="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                                <line x1="78" y1="32" x2="86" y2="24" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="84" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="78" y1="68" x2="86" y2="76" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="42" y1="32" x2="34" y2="24" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="36" y1="50" x2="24" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="42" y1="68" x2="34" y2="76" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <circle cx="60" cy="16" r="3.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
                                <circle cx="86" cy="24" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <circle cx="96" cy="50" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <circle cx="86" cy="76" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <circle cx="34" cy="24" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <circle cx="24" cy="50" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <circle cx="34" cy="76" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <path d="M48 88L54 78H66L72 88" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                                <text x="50" y="100" fill="rgba(255,255,255,0.15)" fontSize="12" fontFamily="Inter" fontWeight="700">IA</text>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Sasha IA</h4>
                        <p className="resources-feature-desc">
                            Assistente inteligente especializada em turismo que planeia, sugere e acompanha.
                        </p>
                    </div>

                    <div className="resources-feature-divider"></div>

                    {/* Feature 5: Cloud Collection */}
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 68C18 68 10 60 10 50C10 40 18 32 28 32C30 18 40 8 54 8C68 8 78 18 80 32C88 32 96 38 96 50C96 60 88 68 78 66" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                                <line x1="54" y1="56" x2="54" y2="76" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="3 2"/>
                                <polygon points="48,60 54,50 60,60" fill="rgba(255,255,255,0.15)"/>
                                <rect x="30" y="80" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none"/>
                                <line x1="34" y1="86" x2="46" y2="86" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeLinecap="round"/>
                                <line x1="34" y1="90" x2="42" y2="90" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round"/>
                                <rect x="56" y="78" width="22" height="16" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none"/>
                                <polygon points="62,83 62,90 69,86.5" fill="rgba(255,255,255,0.12)"/>
                                <rect x="84" y="82" width="16" height="12" rx="2" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
                                <circle cx="92" cy="86" r="2" fill="rgba(255,255,255,0.08)"/>
                                <line x1="86" y1="90" x2="98" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Coleção na Nuvem</h4>
                        <p className="resources-feature-desc">
                            Guarde fotos, vídeos e memórias na nuvem gratuitamente. Aceda em qualquer lugar.
                        </p>
                    </div>

                    <div className="resources-feature-divider"></div>

                    {/* ── Duplicate set for loop ── */}
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="60" width="16" height="36" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                                <rect x="13" y="66" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="19" y="66" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="13" y="74" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="19" y="74" width="3.5" height="3.5" rx="0.5" fill="rgba(255,255,255,0.15)"/>
                                <rect x="32" y="46" width="20" height="50" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                                <rect x="36" y="52" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="44" y="52" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="36" y="60" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <rect x="44" y="60" width="4" height="4" rx="0.6" fill="rgba(255,255,255,0.18)"/>
                                <polygon points="65,55 82,30 99,55" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                                <polygon points="80,55 92,38 104,55" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
                                <line x1="82" y1="30" x2="82" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                                <circle cx="88" cy="20" r="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
                                <line x1="0" y1="96" x2="120" y2="96" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">+120 Países</h4>
                        <p className="resources-feature-desc">Explore destinos globais com guias locais e experiências autênticas em cada região.</p>
                    </div>
                    <div className="resources-feature-divider"></div>
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 22L40 12L80 28L105 18V98L80 108L40 92L15 102V22Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                                <line x1="40" y1="12" x2="40" y2="92" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
                                <line x1="80" y1="28" x2="80" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
                                <circle cx="55" cy="48" r="8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
                                <circle cx="55" cy="48" r="3" fill="rgba(255,255,255,0.25)"/>
                                <circle cx="88" cy="60" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
                                <circle cx="28" cy="65" r="4" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Mapa Inteligente</h4>
                        <p className="resources-feature-desc">Mapa interativo com rotas otimizadas e sugestões personalizadas pela IA.</p>
                    </div>
                    <div className="resources-feature-divider"></div>
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="42" cy="32" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                                <path d="M22 72C22 58 30 50 42 50C54 50 62 58 62 72" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                                <circle cx="78" cy="28" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3" fill="none"/>
                                <path d="M62 66C62 54 68 48 78 48C88 48 94 54 94 66" stroke="rgba(255,255,255,0.2)" strokeWidth="1.3" fill="none"/>
                                <rect x="28" y="80" width="36" height="16" rx="3" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none"/>
                                <line x1="34" y1="86" x2="56" y2="86" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Comunidades</h4>
                        <p className="resources-feature-desc">Grupos de viajantes para trocar ideias, partilhar experiências e conectar.</p>
                    </div>
                    <div className="resources-feature-divider"></div>
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="60" cy="50" r="24" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                                <circle cx="60" cy="50" r="14" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none"/>
                                <circle cx="60" cy="50" r="5" fill="rgba(255,255,255,0.2)"/>
                                <line x1="60" y1="26" x2="60" y2="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
                                <line x1="78" y1="32" x2="86" y2="24" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="84" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="42" y1="32" x2="34" y2="24" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <line x1="36" y1="50" x2="24" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                                <circle cx="60" cy="16" r="3.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
                                <circle cx="86" cy="24" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <circle cx="96" cy="50" r="3" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
                                <text x="50" y="100" fill="rgba(255,255,255,0.15)" fontSize="12" fontFamily="Inter" fontWeight="700">IA</text>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Sasha IA</h4>
                        <p className="resources-feature-desc">Assistente inteligente especializada em turismo que planeia, sugere e acompanha.</p>
                    </div>
                    <div className="resources-feature-divider"></div>
                    <div className="resources-feature-item">
                        <div className="resources-feature-icon">
                            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 68C18 68 10 60 10 50C10 40 18 32 28 32C30 18 40 8 54 8C68 8 78 18 80 32C88 32 96 38 96 50C96 60 88 68 78 66" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                                <line x1="54" y1="56" x2="54" y2="76" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="3 2"/>
                                <polygon points="48,60 54,50 60,60" fill="rgba(255,255,255,0.15)"/>
                                <rect x="30" y="80" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none"/>
                                <rect x="56" y="78" width="22" height="16" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none"/>
                                <polygon points="62,83 62,90 69,86.5" fill="rgba(255,255,255,0.12)"/>
                            </svg>
                        </div>
                        <h4 className="resources-feature-title">Coleção na Nuvem</h4>
                        <p className="resources-feature-desc">Guarde fotos, vídeos e memórias na nuvem gratuitamente. Aceda em qualquer lugar.</p>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default ResourcesSection;
