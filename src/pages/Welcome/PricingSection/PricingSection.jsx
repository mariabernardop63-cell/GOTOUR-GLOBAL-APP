import React, { useState } from 'react';
import { Check } from 'lucide-react';
import './PricingSection.css';

const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState('Mensal');

    return (
        <section id="planos" className="pricing-section-wrapper">
            <div className="pricing-content-max">

                {/* Header matching Stitch/Framer layout */}
                <header className="stitch-pricing-header">
                    <h1 className="stitch-pricing-title">Planos para todos os viajantes.</h1>
                    <p className="stitch-pricing-subtitle"> Escolha o plano perfeito para a sua próxima aventura. Simples, transparente e sem surpresas. </p>

                    {/* Billing Toggle (Pill shape) */}
                    <div className="stitch-toggle-container">
                        <button
                            className={`stitch-toggle-label ${billingCycle === 'Mensal' ? 'active' : ''}`}
                            onClick={() => setBillingCycle('Mensal')}
                        >
                            Mensal
                        </button>
                        <button
                            className={`stitch-toggle-label ${billingCycle === 'Anual' ? 'active' : ''}`}
                            onClick={() => setBillingCycle('Anual')}
                        >
                            Anual
                            <span className="stitch-toggle-badge">Economize 20%</span>
                        </button>
                    </div>
                </header>

                {/* 3-Column Grid */}
                <div className="stitch-pricing-grid">

                    {/* PLAN 1: Explorador (Left Column) */}
                    <div className="stitch-card stitch-card-basic">
                        <h3 className="s-plan-name text-sec">Explorador</h3>
                        <div className="s-price-wrap">
                            <span className="s-price-val">{billingCycle === 'Mensal' ? '4.99€' : '4€'}</span>
                            <span className="s-price-per">/mês</span>
                        </div>
                        <p className="s-plan-desc">Perfeito para viagens ocasionais e planeamento básico e exploração.</p>

                        <button className="s-btn s-btn-outline">Começar agora</button>

                        <div className="s-features-list">
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Assistente Turístico Inteligente – Sasha IA (Modelo 2.3)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Mapa Inteligente</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Coleção de Memórias – 3GB (Cloud Storage)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Sistema Social básico (até 50 amigos)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Planeador de Viagens</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Recomendações Inteligentes</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Serviços Locais (pagamentos básicos para farmácias, táxis e serviços do país)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Experiências (conteúdos de viajantes e experiências oficiais GoTour)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Grupos & Comunidades (criar ou participar mediante aprovação)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Reservas (voos e serviços locais)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Vlogs até 10 minutos</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Anúncios reduzidos</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Acesso a mais de 70 países</span></div>
                        </div>
                    </div>

                    {/* PLAN 2: Pro+ (Center Highlighted Column) */}
                    <div className="stitch-card stitch-card-pro">
                        <div className="stitch-badge-popular">Mais Popular ⭐</div>
                        <h3 className="s-plan-name text-pri mt-2">Pro+</h3>
                        <div className="s-price-wrap">
                            <span className="s-price-val">{billingCycle === 'Mensal' ? '9.99€' : '8€'}</span>
                            <span className="s-price-per">/mês</span>
                        </div>
                        <p className="s-plan-desc">A melhor experiência para viajantes frequentes e aventureiros sem fronteiras.</p>

                        <button className="s-btn s-btn-solid">Escolher Pro+</button>

                        <div className="s-features-list">
                            <div className="s-feature-item highlight-text text-pri">
                                <Check size={18} className="s-icon s-icon-pri" />
                                <span>Tudo do Explorador, mais:</span>
                            </div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Assistente Turístico Inteligente – Sasha IA (Modelo 3.5)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Mapa Inteligente com Sasha IA integrada</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Coleção de Memórias – 7GB (Cloud Storage)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Sistema Social Avançado (até 1000 amigos)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Recomendações Inteligentes Avançadas</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Serviços Locais com suporte</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Experiências completas e conteúdos exclusivos</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Grupos & Comunidades sem restrições</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Planeador de Viagens avançado</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Estatísticas de Viagem</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Reservas de voos e serviços locais</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Vlogs até 1 hora</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Suporte direto com a equipa GoTour</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Sem anúncios</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-pri" /><span className="s-feat-text">Acesso a mais de 120 países</span></div>
                        </div>
                    </div>

                    {/* PLAN 3: Avançado (Right Column) */}
                    <div className="stitch-card stitch-card-vip">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="s-plan-name text-sec">Avançado</h3>
                            <span className="stitch-badge-vip"> VIP <span className="text-sm">👑</span> </span>
                        </div>
                        <div className="s-price-wrap">
                            <span className="s-price-val">{billingCycle === 'Mensal' ? '20€' : '16€'}</span>
                            <span className="s-price-per">/mês</span>
                        </div>
                        <p className="s-plan-desc">Para agências, nómadas Premium e quem exige o máximo 24 horas por dia.</p>

                        <button className="s-btn s-btn-solid" style={{ backgroundColor: '#ffffff', color: '#0d1b1a', border: '1px solid #E5E7EB' }}>Contactar Vendas</button>

                        <div className="s-features-list">
                            <div className="s-feature-item highlight-text">
                                <Check size={18} className="s-icon s-icon-gray" />
                                <span>Tudo do Pro+, mais:</span>
                            </div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Assistente Turístico Inteligente – Sasha IA (Modelo 5)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Mapa Inteligente Premium com Sasha IA integrada</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Coleção de Memórias – 15GB (Cloud Storage)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Sistema Social VIP (até 5000 amigos)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Recomendações Inteligentes integradas com Sasha IA 5</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Serviços Locais com suporte 24h</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Experiências exclusivas e conteúdos premium</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Grupos & Comunidades VIP</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Planeador de Viagens VIP com sugestões automáticas</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Estatísticas avançadas de viagem</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Reservas premium (voos, hotéis e serviços locais)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Vlogs até 2 horas com ferramentas avançadas</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Suporte prioritário GoTour</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Concierge de viagem 24/7</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Alertas inteligentes (promoções, eventos, clima, segurança)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Eventos e networking exclusivos</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Descontos com parceiros GoTour</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Modo offline (mapas e roteiros)</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Integração com dispositivos de viagem</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Sem anúncios</span></div>
                            <div className="s-feature-item"><Check size={18} className="s-icon s-icon-gray" /><span className="s-feat-text-dark">Acesso global a mais de 200 países</span></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PricingSection;
