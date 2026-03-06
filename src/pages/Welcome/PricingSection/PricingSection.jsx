import React, { useState } from 'react';
import {
    Bot, Map, Cloud, Users, MapPin, Sparkles, CreditCard,
    Ticket, MessageSquare, CalendarCheck, Video, EyeOff,
    Globe, RotateCcw, Shield, Database, ArrowUpRight,
    BarChart3, Headphones, BellRing, Percent, WifiOff, Smartphone
} from 'lucide-react';
import './PricingSection.css';

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="planos" className="dark-pricing-section">
            <div className="dark-pricing-container">

                {/* Global Header (Optional but good for context) */}
                <div className="dark-pricing-header">
                    <h2 className="dark-pricing-title">Planos de Subscrição</h2>
                    <p className="dark-pricing-subtitle">Escolha o plano ideal para a sua jornada.</p>
                </div>

                <div className="dark-pricing-grid">

                    {/* --- BASIC (Explorador) --- */}
                    <div className="dark-card basic-card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">Explorador</h3>
                                <p className="card-subtitle">Viagens ocasionais e descobertas</p>
                            </div>
                            <div className="card-annual-toggle" onClick={() => setIsAnnual(!isAnnual)}>
                                <span className="toggle-text">ANNUAL</span>
                                <div className={`toggle-switch ${isAnnual ? 'on' : 'off'}`}>
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>
                        </div>

                        <div className="card-price-block">
                            <span className="price-val">{isAnnual ? '4€' : '4.99€'}</span>
                            <span className="price-per"> / mês</span>
                        </div>

                        <div className="card-features">
                            <ul className="feature-list">
                                <li><Bot size={16} /> <span>Sasha IA <strong>(Mod 2.3)</strong></span></li>
                                <li><Map size={16} /> <span>Mapa Inteligente</span></li>
                                <li><Cloud size={16} /> <span>Memórias <strong>(3GB Cloud)</strong></span></li>
                                <li><Users size={16} /> <span>Social básico <strong>(até 50 amigos)</strong></span></li>
                                <li><MapPin size={16} /> <span>Planeador de Viagens</span></li>
                                <li><Sparkles size={16} /> <span>Recomendações Inteligentes</span></li>
                                <li><CreditCard size={16} /> <span>Serviços Locais básicos</span></li>
                                <li><Ticket size={16} /> <span>Experiências de viajantes</span></li>
                                <li><MessageSquare size={16} /> <span>Grupos <strong>(mediante aprovação)</strong></span></li>
                                <li><CalendarCheck size={16} /> <span>Reservas de voos e locais</span></li>
                                <li><Video size={16} /> <span>Vlogs <strong>(até 10 minutos)</strong></span></li>
                                <li><EyeOff size={16} /> <span>Anúncios reduzidos</span></li>
                                <li><Globe size={16} /> <span>Acesso a +70 países</span></li>
                            </ul>
                        </div>

                        <div className="card-footer-action">
                            <button className="dark-btn btn-gray">Start with Explorador</button>
                            <p className="footer-note">
                                Ideal para quem está a começar. <a href="#">Saber mais</a>
                            </p>
                        </div>
                    </div>

                    {/* --- PRO+ --- */}
                    <div className="dark-card pro-card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">Pro+</h3>
                                <p className="card-subtitle">Para viajantes frequentes</p>
                            </div>
                            <div className="card-annual-toggle" onClick={() => setIsAnnual(!isAnnual)}>
                                <span className="toggle-text">ANNUAL</span>
                                <div className={`toggle-switch pro-switch ${isAnnual ? 'on' : 'off'}`}>
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>
                        </div>

                        <div className="card-price-block">
                            <span className="price-val">{isAnnual ? '8€' : '9.99€'}</span>
                            <span className="price-per"> / mês</span>
                        </div>

                        <div className="card-features">
                            <p className="feature-intro">Tudo no Explorador, mais:</p>
                            <ul className="feature-list">
                                <li><RotateCcw size={16} /> <span>Sasha IA <strong>(Mod 3.5)</strong></span></li>
                                <li><Database size={16} /> <span>Sasha IA no Mapa Inteligente</span></li>
                                <li><Cloud size={16} /> <span>Memórias <strong>(7GB Cloud)</strong></span></li>
                                <li><ArrowUpRight size={16} /> <span>Social Avançado <strong>(1000 amigos)</strong></span></li>
                                <li><Sparkles size={16} /> <span>Recomendações Avançadas</span></li>
                                <li><Shield size={16} /> <span>Serviços Locais com suporte</span></li>
                                <li><Ticket size={16} /> <span>Experiências exclusivas</span></li>
                                <li><MessageSquare size={16} /> <span>Grupos sem restrições</span></li>
                                <li><MapPin size={16} /> <span>Planeador avançado</span></li>
                                <li><BarChart3 size={16} /> <span>Estatísticas de Viagem</span></li>
                                <li><Video size={16} /> <span>Vlogs <strong>(até 1 hora)</strong></span></li>
                                <li><Headphones size={16} /> <span>Suporte direto GoTour</span></li>
                                <li><EyeOff size={16} /> <span>Sem anúncios</span></li>
                                <li><Globe size={16} /> <span>Acesso a +120 países</span></li>
                            </ul>
                        </div>

                        <div className="card-footer-action">
                            <button className="dark-btn btn-blue">Start with Pro+</button>
                            <p className="footer-note">
                                A experiência mais popular. <a href="#">Saber mais</a>
                            </p>
                        </div>
                    </div>

                    {/* --- SCALE (Avançado/VIP) --- */}
                    <div className="dark-card scale-card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">Avançado</h3>
                                <p className="card-subtitle">Experiência VIP global máxima</p>
                            </div>
                            <div className="card-annual-toggle disabled">
                                <span className="toggle-text">ANNUAL ONLY</span>
                            </div>
                        </div>

                        <div className="card-price-block">
                            <span className="price-val">20€</span>
                            <span className="price-per"> / mês</span>
                        </div>

                        <div className="card-features">
                            <p className="feature-intro">Tudo no Pro+, mais:</p>
                            <ul className="feature-list">
                                <li><MapPin size={16} /> <span>Sasha IA <strong>(Mod 5)</strong></span></li>
                                <li><BarChart3 size={16} /> <span>Mapa Premium c/ Sasha</span></li>
                                <li><Cloud size={16} /> <span>Memórias <strong>(15GB Cloud)</strong></span></li>
                                <li><Users size={16} /> <span>Social VIP <strong>(5000 amigos)</strong></span></li>
                                <li><Sparkles size={16} /> <span>Recomendações Sasha 5</span></li>
                                <li><Shield size={16} /> <span>Serviços Locais suporte 24h</span></li>
                                <li><Ticket size={16} /> <span>Conteúdos premium</span></li>
                                <li><MessageSquare size={16} /> <span>Grupos VIP</span></li>
                                <li><CalendarCheck size={16} /> <span>Planeador Automático VIP</span></li>
                                <li><BarChart3 size={16} /> <span>Estatísticas avançadas</span></li>
                                <li><CreditCard size={16} /> <span>Reservas Premium <strong>(+Hotéis)</strong></span></li>
                                <li><Video size={16} /> <span>Vlogs <strong>(até 2 horas)</strong></span></li>
                                <li><Headphones size={16} /> <span>Concierge 24/7 & Prioridade</span></li>
                                <li><BellRing size={16} /> <span>Alertas Inteligentes</span></li>
                                <li><Users size={16} /> <span>Networking VIP</span></li>
                                <li><Percent size={16} /> <span>Descontos Parceiros</span></li>
                                <li><WifiOff size={16} /> <span>Modo Offline <strong>(Mapas/Roteiros)</strong></span></li>
                                <li><Smartphone size={16} /> <span>Integração Dispositivos</span></li>
                                <li><Globe size={16} /> <span>Acesso Global <strong>(+200 países)</strong></span></li>
                            </ul>
                        </div>

                        <div className="card-footer-action">
                            <button className="dark-btn btn-gray">Start with Avançado</button>
                            <p className="footer-note">
                                Para viajantes de elite. <a href="#">Saber mais</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PricingSection;
