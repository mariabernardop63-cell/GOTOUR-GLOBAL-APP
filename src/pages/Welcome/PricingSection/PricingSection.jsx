import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';
import './PricingSection.css';

const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <section id="planos" className="framer-pricing-section">
            <div className="framer-pricing-container">

                {/* Header matching Framer's clean typography */}
                <div className="framer-pricing-header">
                    <h1 className="framer-pricing-title">Find the perfect plan for your travels.</h1>
                    <p className="framer-pricing-subtitle">Start for free, upgrade when you need more power and global reach.</p>
                </div>

                {/* Billing Toggle (Framer style) */}
                <div className="framer-billing-toggle">
                    <button
                        className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle('yearly')}
                    >
                        Yearly <span className="discount-badge">Save 20%</span>
                    </button>
                </div>

                {/* Pricing Cards Grid */}
                <div className="framer-pricing-grid">

                    {/* PLAN 1: Explorador */}
                    <div className="framer-card">
                        <div className="card-top">
                            <h3 className="plan-name">Explorador</h3>
                            <div className="plan-price-block">
                                <span className="currency">€</span>
                                <span className="price">{billingCycle === 'monthly' ? '4.99' : '4'}</span>
                                <span className="period">/mo</span>
                            </div>
                            <p className="plan-description">
                                Plano ideal para quem quer começar a explorar o mundo com a GoTour e ter acesso às funcionalidades essenciais de viagem, descoberta e socialização.
                            </p>
                            <button className="framer-btn outline-btn">Começar Grátis</button>
                        </div>
                        <div className="card-features-list">
                            <h4 className="features-heading">Tudo que está incluído:</h4>
                            <ul>
                                <li><Check size={16} /> Assistente Turístico Inteligente – Sasha IA (Modelo 2.3)</li>
                                <li><Check size={16} /> Mapa Inteligente</li>
                                <li><Check size={16} /> Coleção de Memórias – 3GB (Cloud Storage)</li>
                                <li><Check size={16} /> Sistema Social básico (até 50 amigos)</li>
                                <li><Check size={16} /> Planeador de Viagens</li>
                                <li><Check size={16} /> Recomendações Inteligentes</li>
                                <li><Check size={16} /> Serviços Locais (pagamentos básicos para farmácias, táxis e serviços do país)</li>
                                <li><Check size={16} /> Experiências (conteúdos de viajantes e experiências oficiais GoTour)</li>
                                <li><Check size={16} /> Grupos & Comunidades (criar ou participar mediante aprovação)</li>
                                <li><Check size={16} /> Reservas (voos e serviços locais)</li>
                                <li><Check size={16} /> Vlogs até 10 minutos</li>
                                <li><Check size={16} /> Anúncios reduzidos</li>
                                <li><Check size={16} /> Acesso a mais de 70 países</li>
                            </ul>
                        </div>
                    </div>

                    {/* PLAN 2: Pro+ (Highlighted) */}
                    <div className="framer-card highlighted-card">
                        <div className="card-badge">⭐ Mais Popular</div>
                        <div className="card-top">
                            <h3 className="plan-name">Pro+</h3>
                            <div className="plan-price-block">
                                <span className="currency">€</span>
                                <span className="price">{billingCycle === 'monthly' ? '9.99' : '8'}</span>
                                <span className="period">/mo</span>
                            </div>
                            <p className="plan-description">
                                Plano ideal para viajantes que querem mais liberdade, mais funcionalidades e uma experiência mais completa dentro da GoTour.
                            </p>
                            <button className="framer-btn solid-btn">Assinar Pro+</button>
                        </div>
                        <div className="card-features-list">
                            <h4 className="features-heading">Tudo no Explorador, mais:</h4>
                            <ul>
                                <li><Check size={16} /> Assistente Turístico Inteligente – Sasha IA (Modelo 3.5)</li>
                                <li><Check size={16} /> Mapa Inteligente com Sasha IA integrada</li>
                                <li><Check size={16} /> Coleção de Memórias – 7GB (Cloud Storage)</li>
                                <li><Check size={16} /> Sistema Social Avançado (até 1000 amigos)</li>
                                <li><Check size={16} /> Recomendações Inteligentes Avançadas</li>
                                <li><Check size={16} /> Serviços Locais com suporte</li>
                                <li><Check size={16} /> Experiências completas e conteúdos exclusivos</li>
                                <li><Check size={16} /> Grupos & Comunidades sem restrições</li>
                                <li><Check size={16} /> Planeador de Viagens avançado</li>
                                <li><Check size={16} /> Estatísticas de Viagem</li>
                                <li><Check size={16} /> Reservas de voos e serviços locais</li>
                                <li><Check size={16} /> Vlogs até 1 hora</li>
                                <li><Check size={16} /> Suporte direto com a equipa GoTour</li>
                                <li><Check size={16} /> Sem anúncios</li>
                                <li><Check size={16} /> Acesso a mais de 120 países</li>
                            </ul>
                        </div>
                    </div>

                    {/* PLAN 3: Avançado (VIP) */}
                    <div className="framer-card vip-card">
                        <div className="card-badge vip-badge">👑 Experiência VIP</div>
                        <div className="card-top">
                            <h3 className="plan-name">Avançado</h3>
                            <div className="plan-price-block">
                                <span className="currency">€</span>
                                <span className="price">{billingCycle === 'monthly' ? '20' : '16'}</span>
                                <span className="period">/mo</span>
                            </div>
                            <p className="plan-description">
                                Plano premium para viajantes exigentes que querem a experiência mais completa e inteligente da GoTour.
                            </p>
                            <button className="framer-btn solid-btn black-btn">Assinar Avançado</button>
                        </div>
                        <div className="card-features-list">
                            <h4 className="features-heading">Tudo no Pro+, mais:</h4>
                            <ul>
                                <li><Check size={16} /> Assistente Turístico Inteligente – Sasha IA (Modelo 5)</li>
                                <li><Check size={16} /> Mapa Inteligente Premium com Sasha IA integrada</li>
                                <li><Check size={16} /> Coleção de Memórias – 15GB (Cloud Storage)</li>
                                <li><Check size={16} /> Sistema Social VIP (até 5000 amigos)</li>
                                <li><Check size={16} /> Recomendações Inteligentes integradas com Sasha IA 5</li>
                                <li><Check size={16} /> Serviços Locais com suporte 24h</li>
                                <li><Check size={16} /> Experiências exclusivas e conteúdos premium</li>
                                <li><Check size={16} /> Grupos & Comunidades VIP</li>
                                <li><Check size={16} /> Planeador de Viagens VIP com sugestões automáticas</li>
                                <li><Check size={16} /> Estatísticas avançadas de viagem</li>
                                <li><Check size={16} /> Reservas premium (voos, hotéis e serviços locais)</li>
                                <li><Check size={16} /> Vlogs até 2 horas com ferramentas avançadas</li>
                                <li><Check size={16} /> Suporte prioritário GoTour</li>
                                <li><Check size={16} /> Concierge de viagem 24/7</li>
                                <li><Check size={16} /> Alertas inteligentes (promoções, eventos, clima, segurança)</li>
                                <li><Check size={16} /> Eventos e networking exclusivos</li>
                                <li><Check size={16} /> Descontos com parceiros GoTour</li>
                                <li><Check size={16} /> Modo offline (mapas e roteiros)</li>
                                <li><Check size={16} /> Integração com dispositivos de viagem</li>
                                <li><Check size={16} /> Sem anúncios</li>
                                <li><Check size={16} /> Acesso global a mais de 200 países</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Comprehensive Feature Compare Table mirroring the cards */}
                <div className="framer-compare-section">
                    <h2 className="compare-heading">Compare todos os planos em detalhe</h2>
                    <div className="table-responsive-wrapper">
                        <table className="framer-compare-table">
                            <thead>
                                <tr>
                                    <th>Funcionalidade</th>
                                    <th>Explorador</th>
                                    <th className="highlight-col">Pro+</th>
                                    <th>Avançado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-category"><td colSpan="4">Inteligência Artificial & Mapa</td></tr>
                                <tr>
                                    <td>Assistente Sasha IA <Info size={14} className="info-icon" /></td>
                                    <td>Modelo 2.3</td>
                                    <td className="highlight-col">Modelo 3.5</td>
                                    <td>Modelo 5.0</td>
                                </tr>
                                <tr>
                                    <td>Mapa Inteligente</td>
                                    <td>Básico</td>
                                    <td className="highlight-col">Com Sasha IA</td>
                                    <td>Premium com Sasha IA</td>
                                </tr>
                                <tr>
                                    <td>Planeador de Viagens</td>
                                    <td>Básico</td>
                                    <td className="highlight-col">Avançado</td>
                                    <td>VIP Automático</td>
                                </tr>
                                <tr>
                                    <td>Recomendações Inteligentes</td>
                                    <td>Básicas</td>
                                    <td className="highlight-col">Avançadas</td>
                                    <td>Integradas c/ Sasha 5</td>
                                </tr>
                                <tr>
                                    <td>Alertas inteligentes (clima, eventos)</td>
                                    <td>—</td>
                                    <td className="highlight-col">—</td>
                                    <td>Sim</td>
                                </tr>

                                <tr className="table-category"><td colSpan="4">Conteúdo & Armazenamento</td></tr>
                                <tr>
                                    <td>Coleção de Memórias (Cloud)</td>
                                    <td>3GB</td>
                                    <td className="highlight-col">7GB</td>
                                    <td>15GB</td>
                                </tr>
                                <tr>
                                    <td>Vlogs</td>
                                    <td>Até 10 min</td>
                                    <td className="highlight-col">Até 1 hora</td>
                                    <td>Até 2 horas + Ferramentas</td>
                                </tr>
                                <tr>
                                    <td>Experiências</td>
                                    <td>Básico</td>
                                    <td className="highlight-col">Completas & Exclusivos</td>
                                    <td>Exclusivas Premium</td>
                                </tr>
                                <tr>
                                    <td>Modo offline</td>
                                    <td>—</td>
                                    <td className="highlight-col">—</td>
                                    <td>Mapas e roteiros</td>
                                </tr>

                                <tr className="table-category"><td colSpan="4">Social & Comunidade</td></tr>
                                <tr>
                                    <td>Sistema Social (Amigos)</td>
                                    <td>Lim. a 50</td>
                                    <td className="highlight-col">Lim. a 1000</td>
                                    <td>VIP (Lim. a 5000)</td>
                                </tr>
                                <tr>
                                    <td>Grupos & Comunidades</td>
                                    <td>C/ Aprovação</td>
                                    <td className="highlight-col">Sem restrições</td>
                                    <td>VIP</td>
                                </tr>
                                <tr>
                                    <td>Eventos e networking</td>
                                    <td>—</td>
                                    <td className="highlight-col">—</td>
                                    <td>Exclusivos</td>
                                </tr>

                                <tr className="table-category"><td colSpan="4">Serviços & Suporte</td></tr>
                                <tr>
                                    <td>Serviços Locais</td>
                                    <td>Básico</td>
                                    <td className="highlight-col">Com suporte</td>
                                    <td>Com suporte 24h</td>
                                </tr>
                                <tr>
                                    <td>Reservas</td>
                                    <td>Voos / Serviços</td>
                                    <td className="highlight-col">Voos / Serviços</td>
                                    <td>Premium (Hotéis inc.)</td>
                                </tr>
                                <tr>
                                    <td>Suporte GoTour</td>
                                    <td>Comunitário</td>
                                    <td className="highlight-col">Direto</td>
                                    <td>Prioritário + Concierge 24/7</td>
                                </tr>
                                <tr>
                                    <td>Acesso Global</td>
                                    <td>+70 países</td>
                                    <td className="highlight-col">+120 países</td>
                                    <td>+200 países</td>
                                </tr>
                                <tr>
                                    <td>Anúncios</td>
                                    <td>Reduzidos</td>
                                    <td className="highlight-col">Sem anúncios</td>
                                    <td>Sem anúncios</td>
                                </tr>
                                <tr>
                                    <td>Descontos com Parceiros</td>
                                    <td>—</td>
                                    <td className="highlight-col">—</td>
                                    <td>Sim</td>
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
