import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bot, Map, ThumbsUp, MessageCircle, Code2, Smartphone, Cloud, Rocket, Eye } from 'lucide-react';
import './AboutSection.css';
import Button from '../../../components/Button/Button';

const AboutSection = () => {
    const navigate = useNavigate();

    return (
        <section id="sobre" className="stitch-about-section">
            <div className="stitch-container">

                {/* 1. Hero Section */}
                <div className="s-hero-block">
                    <span className="s-badge">Premium Travel Tech</span>
                    <h1 className="s-title">Sobre a GoTour</h1>
                    <p className="s-subtitle">
                        Uma plataforma inovadora fundada em Moçambique para transformar a sua experiência de viagem global.
                    </p>
                    <button className="s-hero-btn" onClick={() => navigate('/signup')}>
                        Conheça nossa história
                        <ArrowRight size={20} />
                    </button>
                </div>

                {/* 2. Founder & History */}
                <div className="s-founder-block">
                    <div className="s-founder-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                            alt="Tiago J.B. Paqueliua"
                            className="s-founder-image"
                        />
                    </div>
                    <div className="s-founder-info">
                        <h3 className="s-founder-name">Tiago J.B. Paqueliua</h3>
                        <p className="s-founder-role">Fundador da GoTour, 2022</p>
                        <p className="s-founder-desc">
                            Nascida em Moçambique com a visão de conectar o continente ao mundo através de tecnologia de ponta e curadoria de viagens sem precedentes. A ideia da GoTour começou em 2021, durante uma série de viagens internacionais, buscando facilitar a vida de viajantes globais.
                        </p>
                    </div>
                </div>

                {/* 3. Sasha IA Section */}
                <div className="s-sasha-block">
                    <div className="s-sasha-header">
                        <div className="s-sasha-icon-box">
                            <Bot size={32} className="s-mint-icon" />
                        </div>
                        <h2 className="s-section-title">Conheça a Sasha IA</h2>
                    </div>
                    <p className="s-sasha-subtitle">O Coração da Plataforma. Sua assistente pessoal de viagem disponível 24/7. Evoluiu do Modelo 2.3 ao poderoso Modelo 5.</p>

                    <div className="s-sasha-features">
                        <div className="s-sasha-feature-card">
                            <Map size={24} className="s-mint-icon" />
                            <span>Roteiros Inteligentes</span>
                        </div>
                        <div className="s-sasha-feature-card">
                            <ThumbsUp size={24} className="s-mint-icon" />
                            <span>Recomendações Premium</span>
                        </div>
                        <div className="s-sasha-feature-card">
                            <MessageCircle size={24} className="s-mint-icon" />
                            <span>Tradução em Tempo Real</span>
                        </div>
                    </div>
                </div>

                {/* 4. Tech & Development */}
                <div className="s-tech-block">
                    <h3 className="s-tech-title">Stack Tecnológica</h3>
                    <div className="s-tech-grid">
                        <div className="s-tech-item">
                            <div className="s-tech-icon-box">
                                <Code2 size={32} className="s-blue-icon" />
                            </div>
                            <span className="s-tech-label">Node.js</span>
                        </div>
                        <div className="s-tech-item">
                            <div className="s-tech-icon-box">
                                <Smartphone size={32} className="s-blue-icon" />
                            </div>
                            <span className="s-tech-label">React Native</span>
                        </div>
                        <div className="s-tech-item">
                            <div className="s-tech-icon-box">
                                <Cloud size={32} className="s-blue-icon" />
                            </div>
                            <span className="s-tech-label">Cloud Native</span>
                        </div>
                    </div>
                </div>

                <div className="s-desktop-row">
                    {/* 5. Mission & Vision */}
                    <div className="s-mission-vision-wrapper">
                        <div className="s-mission-card">
                            <Rocket size={32} className="s-primary-icon" />
                            <h4 className="s-mv-title">Missão</h4>
                            <p className="s-mv-desc">Tornar a exploração do mundo mais inteligente, conectada e segura, oferecendo tecnologia avançada para todos os viajantes.</p>
                        </div>
                        <div className="s-vision-card">
                            <Eye size={32} className="s-primary-icon" />
                            <h4 className="s-mv-title">Visão</h4>
                            <p className="s-mv-desc">Criar a maior comunidade global de viajantes, integrando tecnologia, serviços locais e experiências autênticas.</p>
                        </div>
                    </div>

                    {/* 6. Global Impact */}
                    <div className="s-global-block">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                            alt="Mapa global"
                            className="s-global-bg"
                        />
                        <div className="s-global-overlay"></div>
                        <div className="s-global-content">
                            <h3 className="s-global-title">Impacto Global</h3>
                            <div className="s-global-stats">
                                <div className="s-stat">
                                    <p className="s-stat-num">120+</p>
                                    <p className="s-stat-label">Países Atendidos</p>
                                </div>
                                <div className="s-stat">
                                    <p className="s-stat-num">50k+</p>
                                    <p className="s-stat-label">Comunidade Unida</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
