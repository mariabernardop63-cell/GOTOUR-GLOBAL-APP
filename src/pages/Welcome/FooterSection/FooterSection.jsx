import React from 'react';
import './FooterSection.css';
import gotourIcon from '../../../assets/images/gotour_icon.png';

const FooterSection = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">

            {/* ── Top CTA Banner ── */}
            <div className="footer-cta-banner">
                <div className="footer-cta-inner">
                    <div className="footer-cta-text">
                        <h3 className="footer-cta-title">Obtenha 7 dias grátis do plano pro da GO TOUR</h3>
                        <p className="footer-cta-sub">
                            Junte-se a milhares de viajantes. Disponível gratuitamente.
                        </p>
                    </div>
                    <div className="footer-cta-actions">
                        <button className="footer-cta-btn-primary">Obter</button>
                        <button className="footer-cta-btn-secondary">Falar com a equipa</button>
                    </div>
                </div>
            </div>

            <div className="footer-container">

                {/* ── Main Grid ── */}
                <div className="footer-grid">

                    {/* Col 1: Brand + description + social */}
                    <div className="footer-brand-col">
                        <div className="footer-logo">
                            <img src={gotourIcon} alt="GO TOUR" className="footer-logo-img" />
                            <span className="footer-logo-text">GO TOUR</span>
                        </div>
                        <p className="footer-brand-desc">
                            A plataforma de viagens inteligente que conecta viajantes, destinos e comunidades em mais de 120 países.
                        </p>

                        {/* Download Buttons */}
                        <div className="footer-downloads">
                            <a href="#" className="footer-download-btn" aria-label="Download on App Store">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                                <div className="footer-dl-text">
                                    <span className="footer-dl-small">Download na</span>
                                    <span className="footer-dl-store">App Store</span>
                                </div>
                            </a>
                            <a href="#" className="footer-download-btn" aria-label="Get it on Google Play">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M3.18 23.86c-.32-.17-.55-.47-.63-.82-.02-.09-.04-.19-.04-.29L2.5 1.28c0-.32.14-.62.38-.82L12.6 12 3.18 23.86zm1.45.7L14.1 13.4l2.65 2.65-12.12 8.51zm15.6-11.38c.55.3.77.88.5 1.34l-.04.07-2.48 1.73-3.03-3.03 3.03-3.03 2.02 1.42v.5zm-6.4-2.46L11.18 8.1 4.63.59l12.12 8.09 2.08 2.04z"/>
                                </svg>
                                <div className="footer-dl-text">
                                    <span className="footer-dl-small">Disponível no</span>
                                    <span className="footer-dl-store">Google Play</span>
                                </div>
                            </a>
                        </div>

                        {/* Social */}
                        <div className="footer-social">
                            <a href="#" className="footer-social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                            </a>
                            <a href="#" className="footer-social-link" aria-label="Twitter/X">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="#" className="footer-social-link" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="#" className="footer-social-link" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                            <a href="#" className="footer-social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Produto */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">Produto</h4>
                        <ul className="footer-link-list">
                            <li><a href="#recursos">Recursos</a></li>
                            <li><a href="#planos">Planos e preços</a></li>
                            <li><a href="#">Mapa inteligente</a></li>
                            <li><a href="#">Sasha IA</a></li>
                            <li><a href="#">Comunidades</a></li>
                            <li><a href="#">Coleção na nuvem</a></li>
                            <li><a href="#">Novidades</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Empresa */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">Empresa</h4>
                        <ul className="footer-link-list">
                            <li><a href="#sobre">Sobre nós</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Carreiras <span className="footer-badge">A recrutar</span></a></li>
                            <li><a href="#">Imprensa</a></li>
                            <li><a href="#">Parceiros</a></li>
                            <li><a href="#">Programa de afiliados</a></li>
                        </ul>
                    </div>

                    {/* Col 4: Suporte */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">Suporte</h4>
                        <ul className="footer-link-list">
                            <li><a href="#">Centro de ajuda</a></li>
                            <li><a href="#">Contactar suporte</a></li>
                            <li><a href="#">Comunidade</a></li>
                            <li><a href="#">Status do sistema</a></li>
                            <li><a href="#">Documentação API</a></li>
                            <li><a href="#">Reportar problema</a></li>
                        </ul>
                    </div>

                    {/* Col 5: Contacto */}
                    <div className="footer-links-col">
                        <h4 className="footer-col-title">Contacto</h4>
                        <ul className="footer-link-list footer-contact-list">
                            <li className="footer-contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>Av. Julius Nyerere, 1024<br/>Maputo, Moçambique</span>
                            </li>
                            <li className="footer-contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                <span>suporte@gotour.app</span>
                            </li>
                            <li className="footer-contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                <span>+258 84 000 0000</span>
                            </li>
                            <li className="footer-contact-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span>Seg–Sex: 08:00–18:00 CAT</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="footer-divider"></div>

                {/* ── Bottom Bar ── */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <span className="footer-copyright">© {currentYear} GO TOUR Global, Lda. Todos os direitos reservados.</span>
                    </div>
                    <div className="footer-bottom-right">
                        <a href="/privacy" className="footer-legal-link">Política de privacidade</a>
                        <span className="footer-legal-dot">·</span>
                        <a href="/terms" className="footer-legal-link">Termos de serviço</a>
                        <span className="footer-legal-dot">·</span>
                        <a href="#" className="footer-legal-link">Cookies</a>
                        <span className="footer-legal-dot">·</span>
                        <a href="#" className="footer-legal-link">Acessibilidade</a>
                    </div>
                </div>

                {/* ── Language / Region ── */}
                <div className="footer-region">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span>Português (Moçambique)</span>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
