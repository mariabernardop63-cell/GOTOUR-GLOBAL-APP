import React from 'react';
import './AboutSection.css';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { Plane, Map, Compass, ShieldCheck, Heart, Navigation, Smartphone } from 'lucide-react';
import gotourIcon from '../../../assets/images/gotour_icon.png';

const RevealBlock = ({ children, className = '', delay = 0 }) => {
    const [ref, isVisible] = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`reveal-wrapper ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const AboutSection = () => {
    const features = [
        {
            icon: <Compass size={24} />,
            title: "Descoberta Inteligente",
            desc: "Encontre os destinos perfeitos baseados nas suas preferências e histórico."
        },
        {
            icon: <Heart size={24} />,
            title: "Experiências Autênticas",
            desc: "Conecte-se com guias locais e viva a cultura de forma genuína."
        },
        {
            icon: <Navigation size={24} />,
            title: "Planeamento Simples",
            desc: "Crie e edite itinerários completos com poucos cliques."
        },
        {
            icon: <Map size={24} />,
            title: "Exploração Global",
            desc: "Milhares de destinos curados em todos os continentes."
        },
        {
            icon: <Smartphone size={24} />,
            title: "Interface Intuitiva",
            desc: "Design moderno e elegante para a melhor experiência de uso."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Segurança Total",
            desc: "Reservas protegidas e suporte dedicado 24h por dia."
        }
    ];

    return (
        <section id="sobre" className="about-section">
            <div className="about-container">

                {/* Header */}
                <RevealBlock className="about-header">
                    <div className="about-header-icon">
                        <img src={gotourIcon} alt="GO TOUR" />
                    </div>
                    <h2>Sobre a GO TOUR</h2>
                    <p className="about-subtitle">
                        GO TOUR é uma plataforma digital de turismo criada para ajudar viajantes a descobrir destinos incríveis, explorar experiências autênticas e planear viagens de forma simples, inteligente e inspiradora.
                    </p>
                </RevealBlock>

                {/* History Block */}
                <RevealBlock className="about-history" delay={100}>
                    <div className="history-content">
                        <h3>Como nasceu a GO TOUR</h3>
                        <p>
                            A GO TOUR foi idealizada para transformar a forma como as pessoas descobrem e exploram o mundo. Acreditamos que viajar deve ser mais do que apenas visitar lugares — deve ser sobre conexões, descobertas autênticas e memórias inesquecíveis.
                        </p>
                    </div>
                    <div className="history-visual">
                        <div className="visual-graphic">
                            <Plane className="visual-icon floating" size={48} />
                            <div className="visual-line"></div>
                            <Map className="visual-icon" size={48} />
                        </div>
                    </div>
                </RevealBlock>

                {/* Mission & Vision Cards */}
                <div className="mission-vision-grid">
                    <RevealBlock className="mv-card" delay={100}>
                        <div className="mv-icon-wrapper">
                            <Compass size={28} />
                        </div>
                        <h3>A Nossa Missão</h3>
                        <p>
                            Nossa missão é tornar a descoberta de destinos e experiências turísticas mais simples, acessível e inspiradora para viajantes em qualquer lugar do mundo.
                        </p>
                    </RevealBlock>

                    <RevealBlock className="mv-card" delay={200}>
                        <div className="mv-icon-wrapper">
                            <Navigation size={28} />
                        </div>
                        <h3>A Nossa Visão</h3>
                        <p>
                            Ser uma das plataformas digitais de turismo mais inovadoras, conectando pessoas a destinos, culturas e experiências inesquecíveis de forma sustentável e imersiva.
                        </p>
                    </RevealBlock>
                </div>

                {/* Features Grid */}
                <RevealBlock className="features-section" delay={100}>
                    <h3 className="section-label">O que torna a GO TOUR especial</h3>
                    <div className="features-grid">
                        {features.map((feature, idx) => (
                            <RevealBlock key={idx} className="feature-card" delay={idx * 100}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h4>{feature.title}</h4>
                                <p>{feature.desc}</p>
                            </RevealBlock>
                        ))}
                    </div>
                </RevealBlock>

                {/* UX App Block */}
                <RevealBlock className="ux-block" delay={200}>
                    <div className="ux-content">
                        <h3>Experiência de Excelência</h3>
                        <p>
                            A GO TOUR foi desenhada para proporcionar uma experiência intuitiva, elegante e inspiradora, permitindo que viajantes descubram novos lugares, planeiem aventuras e explorem o mundo com absoluta facilidade.
                        </p>
                    </div>
                </RevealBlock>
            </div>

            {/* Inspiring Banner Footer */}
            <div className="inspiring-banner">
                <RevealBlock className="banner-content" delay={100}>
                    <h2>Descubra o mundo com a GO TOUR</h2>
                    <p>Cada viagem começa com uma descoberta.</p>
                </RevealBlock>
                <div className="particles-layer"></div>
            </div>

            {/* Section Footer */}
            <footer className="about-footer">
                <div className="about-footer-links">
                    <a href="/privacy-policy">Política de Privacidade</a>
                    <span className="footer-dot">·</span>
                    <a href="/terms-of-service">Termos de Serviço</a>
                    <span className="footer-dot">·</span>
                    <a href="mailto:support@gotour.app">Contacto</a>
                </div>
                <p className="copyright">© 2026 GO TOUR — Plataforma Digital de Turismo</p>
            </footer>
        </section>
    );
};

export default AboutSection;
