import React from 'react';
import './DesktopPreview.css';

/**
 * DesktopPreview — A pure CSS/JSX mock of the GO TOUR desktop dashboard.
 * Shown inside a sleek browser frame on the Welcome hero (desktop only).
 */
const DesktopPreview = () => {
    return (
        <div className="desktop-preview-wrapper">
            <div className="desktop-preview-frame">
                {/* ── Browser Toolbar ── */}
                <div className="preview-toolbar">
                    <div className="preview-toolbar-dots">
                        <span className="preview-toolbar-dot red"></span>
                        <span className="preview-toolbar-dot yellow"></span>
                        <span className="preview-toolbar-dot green"></span>
                    </div>
                    <div className="preview-toolbar-url">
                        <span className="preview-toolbar-url-lock">🔒</span>
                        <span className="preview-toolbar-url-text">app.gotour.com/dashboard</span>
                    </div>
                </div>

                {/* ── Dashboard Content ── */}
                <div className="preview-dashboard">
                    {/* Sidebar */}
                    <div className="preview-sidebar">
                        <div className="preview-sidebar-brand">
                            <div className="preview-sidebar-logo">GT</div>
                            <span className="preview-sidebar-name">GO TOUR</span>
                        </div>

                        <div className="preview-sidebar-nav">
                            <div className="preview-nav-item active">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="10" r="3" />
                                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                </svg>
                                <span>Explorar</span>
                            </div>
                            <div className="preview-nav-item">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>Reservas</span>
                            </div>
                            <div className="preview-nav-item">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" />
                                    <line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                                <span>Mapa</span>
                            </div>
                            <div className="preview-nav-item">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                <span>Comunidade</span>
                            </div>
                        </div>

                        <div className="preview-sidebar-divider"></div>
                        <div className="preview-sidebar-section-label">Ferramentas</div>

                        <div className="preview-sidebar-nav">
                            <div className="preview-nav-item">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>Mensagens</span>
                            </div>
                            <div className="preview-nav-item">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>Guardados</span>
                            </div>
                            <div className="preview-nav-item">
                                <svg className="preview-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                <span>Definições</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="preview-main">
                        {/* Top bar */}
                        <div className="preview-topbar">
                            <span className="preview-topbar-title">Mapa de Destinos</span>
                            <div className="preview-topbar-actions">
                                <div className="preview-search-input">
                                    <span>⌕</span>
                                    <span>Pesquisar destinos...</span>
                                </div>
                                <div className="preview-notification-dot"></div>
                                <div className="preview-avatar">MS</div>
                            </div>
                        </div>

                        {/* Map area */}
                        <div className="preview-map-area">
                            <div className="preview-map-grid"></div>

                            {/* SVG route paths */}
                            <svg className="preview-map-path" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 470" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="routeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                                    </linearGradient>
                                    <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
                                    </linearGradient>
                                </defs>
                                <path d="M120,350 C200,280 350,200 500,220 S700,100 800,150"
                                    fill="none" stroke="url(#routeGrad1)" strokeWidth="2" strokeDasharray="6 4" />
                                <path d="M80,120 C180,180 300,350 480,300 S650,250 760,350"
                                    fill="none" stroke="url(#routeGrad2)" strokeWidth="1.5" strokeDasharray="4 6" />
                            </svg>

                            {/* Destination pins */}
                            <div className="preview-pin" style={{ top: '22%', left: '15%' }}>
                                <div className="preview-pin-marker teal"></div>
                                <span className="preview-pin-label">Lisboa</span>
                            </div>
                            <div className="preview-pin" style={{ top: '18%', left: '38%' }}>
                                <div className="preview-pin-marker blue"></div>
                                <span className="preview-pin-label">Paris</span>
                            </div>
                            <div className="preview-pin" style={{ top: '55%', left: '55%' }}>
                                <div className="preview-pin-marker purple"></div>
                                <span className="preview-pin-label">Dubai</span>
                            </div>
                            <div className="preview-pin" style={{ top: '30%', left: '75%' }}>
                                <div className="preview-pin-marker amber"></div>
                                <span className="preview-pin-label">Tokyo</span>
                            </div>
                            <div className="preview-pin" style={{ top: '65%', left: '25%' }}>
                                <div className="preview-pin-marker rose"></div>
                                <span className="preview-pin-label">Rio de Janeiro</span>
                            </div>

                            {/* Floating destination cards */}
                            <div className="preview-dest-card" style={{ top: '12%', right: '8%' }}>
                                <div className="preview-dest-thumb" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&h=100&fit=crop')" }}></div>
                                <div className="preview-dest-info">
                                    <span className="preview-dest-name">Paris, França</span>
                                    <span className="preview-dest-meta">Desde $1,200 · <span className="preview-dest-rating">★ 4.8</span></span>
                                </div>
                            </div>
                            <div className="preview-dest-card" style={{ bottom: '18%', left: '5%' }}>
                                <div className="preview-dest-thumb" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=100&h=100&fit=crop')" }}></div>
                                <div className="preview-dest-info">
                                    <span className="preview-dest-name">Lisboa, Portugal</span>
                                    <span className="preview-dest-meta">Desde $800 · <span className="preview-dest-rating">★ 4.9</span></span>
                                </div>
                            </div>

                            {/* Gradient overlays */}
                            <div className="preview-map-overlay-bottom"></div>
                            <div className="preview-map-overlay-right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopPreview;
