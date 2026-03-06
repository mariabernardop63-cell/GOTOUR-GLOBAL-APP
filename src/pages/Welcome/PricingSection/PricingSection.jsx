import React from 'react';
import { Check, X, Star, Crown } from 'lucide-react';
import './PricingSection.css';

const PricingSection = () => {
    return (
        <section id="planos" className="pricing-section">
            <div className="pricing-container">
                {/* Header */}
                <div className="pricing-header">
                    <span className="pricing-eyebrow">Planos Flexíveis</span>
                    <h2 className="pricing-title">Encontre o plano ideal para as suas viagens.</h2>
                    <p className="pricing-subtitle">
                        Comece de forma simples ou desbloqueie ferramentas avançadas e assistência VIP
                        para experiências inesquecíveis pelo mundo.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="pricing-grid">
                    {/* Explorador */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3 className="plan-name">Explorador</h3>
                            <div className="plan-price-wrap">
                                <span className="plan-price">4.99€</span>
                                <span className="plan-period">/ mês</span>
                            </div>
                            <p className="plan-desc">
                                Plano ideal para quem quer começar a explorar o mundo com as funcionalidades essenciais.
                            </p>
                        </div>
                        <button className="card-cta cta-default">Começar Grátis</button>
                        <div className="card-features">
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Assistente Sasha IA (Mod 2.3)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Mapa Inteligente e Planeador</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Coleção de Memórias (3GB)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Sistema Social (50 amigos)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Recomendações Inteligentes</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Pagamentos e reservas básicos</span></div>
                        </div>
                    </div>

                    {/* Pro+ */}
                    <div className="pricing-card card-popular">
                        <div className="card-badge badge-popular">
                            <Star size={14} fill="currentColor" />
                            Mais Popular
                        </div>
                        <div className="card-header">
                            <h3 className="plan-name">Pro+</h3>
                            <div className="plan-price-wrap">
                                <span className="plan-price">9.99€</span>
                                <span className="plan-period">/ mês</span>
                            </div>
                            <p className="plan-desc">
                                Para viajantes que querem liberdade, mais funcionalidades e uma experiência completa.
                            </p>
                        </div>
                        <button className="card-cta cta-popular">Assinar Pro+</button>
                        <div className="card-features">
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Assistente Sasha IA (Mod 3.5)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Sasha AI integrada no Mapa</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Coleção de Memórias (7GB)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Social Avançado (1000 amigos)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Suporte direto GoTour</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Zero anúncios</span></div>
                        </div>
                    </div>

                    {/* Avançado */}
                    <div className="pricing-card card-vip">
                        <div className="card-badge badge-vip">
                            <Crown size={14} fill="currentColor" />
                            Experiência VIP
                        </div>
                        <div className="card-header">
                            <h3 className="plan-name">Avançado</h3>
                            <div className="plan-price-wrap">
                                <span className="plan-price">20€</span>
                                <span className="plan-period">/ mês</span>
                            </div>
                            <p className="plan-desc">
                                Premium para exigentes que querem a experiência mais completa e inteligente.
                            </p>
                        </div>
                        <button className="card-cta cta-vip">Assinar VIP</button>
                        <div className="card-features">
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Assistente Sasha IA (Mod 5.0)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Concierge de viagem 24/7</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Coleção de Memórias (15GB)</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Eventos reais & Descontos</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Alertas de segurança e clima</span></div>
                            <div className="feature-item"><Check size={20} className="feature-icon check" /><span className="feature-text">Modo Offline e Integração IoT</span></div>
                        </div>
                    </div>
                </div>

                {/* Compare Table */}
                <div className="compare-section">
                    <div className="compare-header">
                        <h2 className="compare-title">Comparar todas as funcionalidades</h2>
                    </div>
                    <div className="compare-table-wrapper">
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Funcionalidade</th>
                                    <th>Explorador</th>
                                    <th className="best-value-col">Pro+</th>
                                    <th>Avançado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td colSpan="4" className="row-header">Inteligência Artificial & Mapa</td></tr>
                                <tr>
                                    <td>Assistente Sasha IA</td>
                                    <td>Modelo 2.3</td>
                                    <td className="td-value best-value-col">Modelo 3.5</td>
                                    <td className="td-value">Modelo 5.0</td>
                                </tr>
                                <tr>
                                    <td>Integração Sasha no Mapa</td>
                                    <td><X size={20} className="feature-icon cross" /></td>
                                    <td className="best-value-col"><span className="td-check"><Check size={20} /></span></td>
                                    <td><span className="td-check"><Check size={20} /></span></td>
                                </tr>
                                <tr>
                                    <td>Planeador de Viagens</td>
                                    <td>Básico</td>
                                    <td className="td-value best-value-col">Avançado</td>
                                    <td className="td-value">VIP Automation</td>
                                </tr>
                                <tr>
                                    <td>Alertas Inteligentes</td>
                                    <td><X size={20} className="feature-icon cross" /></td>
                                    <td className="best-value-col"><X size={20} className="feature-icon cross" /></td>
                                    <td><span className="td-check"><Check size={20} /></span></td>
                                </tr>
                                <tr><td colSpan="4" className="row-header">Social & Conteúdos</td></tr>
                                <tr>
                                    <td>Cloud Storage (Memórias)</td>
                                    <td>3GB</td>
                                    <td className="td-value best-value-col">7GB</td>
                                    <td className="td-value">15GB</td>
                                </tr>
                                <tr>
                                    <td>Limite de Amigos</td>
                                    <td>50</td>
                                    <td className="td-value best-value-col">1000</td>
                                    <td className="td-value">5000</td>
                                </tr>
                                <tr>
                                    <td>Duração Máxima Vlogs</td>
                                    <td>10 min</td>
                                    <td className="td-value best-value-col">1 hora</td>
                                    <td className="td-value">2 horas (Ferramentas Pro)</td>
                                </tr>
                                <tr>
                                    <td>Sem Anúncios</td>
                                    <td>Reduzidos</td>
                                    <td className="best-value-col"><span className="td-check"><Check size={20} /></span></td>
                                    <td><span className="td-check"><Check size={20} /></span></td>
                                </tr>
                                <tr><td colSpan="4" className="row-header">Serviços e Acesso</td></tr>
                                <tr>
                                    <td>Serviços Locais & Reservas</td>
                                    <td>Básico</td>
                                    <td className="td-value best-value-col">Com Suporte</td>
                                    <td className="td-value">Premium VIP</td>
                                </tr>
                                <tr>
                                    <td>Suporte e Assistência</td>
                                    <td>Comunitário</td>
                                    <td className="td-value best-value-col">Direto com a Equipa</td>
                                    <td className="td-value">Concierge 24/7</td>
                                </tr>
                                <tr>
                                    <td>Descontos e Eventos</td>
                                    <td><X size={20} className="feature-icon cross" /></td>
                                    <td className="best-value-col"><X size={20} className="feature-icon cross" /></td>
                                    <td><span className="td-check"><Check size={20} /></span></td>
                                </tr>
                                <tr>
                                    <td>Modo Offline</td>
                                    <td><X size={20} className="feature-icon cross" /></td>
                                    <td className="best-value-col"><X size={20} className="feature-icon cross" /></td>
                                    <td><span className="td-check"><Check size={20} /></span></td>
                                </tr>
                                <tr>
                                    <td>Cobertura Global</td>
                                    <td>+70 países</td>
                                    <td className="td-value best-value-col">+120 países</td>
                                    <td className="td-value">+200 países</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
