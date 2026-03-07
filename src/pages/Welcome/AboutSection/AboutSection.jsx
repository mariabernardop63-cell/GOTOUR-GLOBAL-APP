import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, MapPin, Search, MessageCircle, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import Button from '../../components/Button/Button';
import './AboutSection.css';

// Hook for scroll animations
const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once visible
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, ...options });

        elements.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => {
            elements.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, [elements, options]);

    const setRef = (el) => {
        if (el && !elements.includes(el)) {
            setElements(prev => [...prev, el]);
        }
    };

    return setRef;
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        // easeOutQuart
                        const easeOut = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(easeOut * end));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <span ref={countRef} className="stat-number">
            {count}{suffix}
        </span>
    );
};

const AboutSection = () => {
    const navigate = useNavigate();
    const setRef = useIntersectionObserver();

    return (
        <section id="sobre" className="about-section">
            <div className="about-container">

                {/* 1. HERO SECTION */}
                <div className="about-hero" ref={setRef}>
                    <div className="hero-content fade-up">
                        <span className="about-eyebrow">Sobre a GoTour</span>
                        <h1 className="about-title">Descubra o mundo de uma forma completamente nova.</h1>
                        <p className="about-subtitle">
                            A GoTour combina tecnologia, inteligência artificial e comunidade global para transformar cada viagem numa experiência inteligente, social e inesquecível.
                        </p>
                        <div className="hero-actions">
                            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>Explorar a Plataforma</Button>
                        </div>
                    </div>

                    {/* Placeholder for future Video */}
                    <div className="video-placeholder fade-up delay-1">
                        <div className="video-inner">
                            <div className="play-button-mock">
                                <div className="play-icon"></div>
                            </div>
                            <p className="video-hint">Ver Vídeo Manifesto</p>
                        </div>
                    </div>
                </div>

                {/* 2. STORYTELLING */}
                <div className="about-story" ref={setRef}>
                    <div className="story-grid fade-up">
                        <div className="story-text">
                            <h2 className="section-heading">Nascida com uma visão.</h2>
                            <p className="story-paragraph">
                                Num mundo onde viajar se tornou mais fácil, ainda faltava uma plataforma capaz de unir tecnologia, descoberta e comunidade num único ecossistema focado no viajante.
                            </p>
                            <p className="story-paragraph">
                                Foi assim que nasceu a GoTour — criada para ajudar exploradores a descobrir destinos, partilhar experiências e conectar-se com o planeta, suportados pela mais avançada inteligência artificial.
                            </p>
                            <p className="story-paragraph highlight-paragraph">
                                Hoje, conectamos viajantes, experiências e serviços locais num ecossistema global que cresce a cada segundo.
                            </p>
                        </div>
                        <div className="story-visual">
                            {/* Abstract global nodes graphic */}
                            <div className="abstract-nodes">
                                <div className="node n1"></div>
                                <div className="node n2"></div>
                                <div className="node n3"></div>
                                <div className="node n4"></div>
                                <div className="connecting-line l1"></div>
                                <div className="connecting-line l2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TECHNOLOGY - SASHA IA */}
                <div className="about-tech" ref={setRef}>
                    <div className="tech-header fade-up">
                        <span className="tech-badge"><Sparkles size={16} /> Powered by Sasha IA</span>
                        <h2 className="section-heading">A inteligência por trás da sua viagem.</h2>
                        <p className="tech-desc">
                            No centro da GoTour está a Sasha IA, o assistente turístico inteligente que redefine como planeia e vive as suas viagens em qualquer parte do mundo.
                        </p>
                    </div>

                    <div className="tech-grid fade-up delay-1">
                        <div className="tech-card">
                            <div className="tech-icon-wrapper"><MapPin size={24} /></div>
                            <h3 className="tech-card-title">Recomenda Destinos</h3>
                            <p className="tech-card-desc">Sugestões personalizadas baseadas no seu perfil e histórico de viagens.</p>
                        </div>
                        <div className="tech-card">
                            <div className="tech-icon-wrapper"><Navigation size={24} /></div>
                            <h3 className="tech-card-title">Cria Roteiros</h3>
                            <p className="tech-card-desc">Itinerários gerados segundo a segundo otimizando tempo, orçamento e interesses.</p>
                        </div>
                        <div className="tech-card">
                            <div className="tech-icon-wrapper"><Search size={24} /></div>
                            <h3 className="tech-card-title">Descobre Experiências</h3>
                            <p className="tech-card-desc">Localiza pérolas escondidas e experiências autênticas que escapam aos guias comuns.</p>
                        </div>
                        <div className="tech-card">
                            <div className="tech-icon-wrapper"><MessageCircle size={24} /></div>
                            <h3 className="tech-card-title">Assistência 24/7</h3>
                            <p className="tech-card-desc">Responde a questões sobre a cultura, leis, idioma e serviços do destino em tempo real.</p>
                        </div>
                    </div>
                </div>

                {/* 4. GLOBAL INTERACTIVE MAP */}
                <div className="about-map" ref={setRef}>
                    <div className="map-content fade-up">
                        <h2 className="section-heading">O mundo ao seu alcance.</h2>
                        <p className="map-desc">
                            A GoTour conecta viajantes em dezenas de países e continua a expandir a sua presença global todos os dias.
                        </p>

                        <div className="map-visual-container">
                            <div className="map-bg-glow"></div>
                            <Globe2 className="abstract-globe-icon" size={320} strokeWidth={0.5} />

                            {/* Animated Map Pings */}
                            <div className="map-ping ping-1"></div>
                            <div className="map-ping ping-2"></div>
                            <div className="map-ping ping-3"></div>
                            <div className="map-ping ping-4"></div>
                            <div className="map-ping ping-5"></div>

                            <div className="map-overlay-text">
                                Explore destinos fascinantes.
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. COMMUNITY STATS */}
                <div className="about-stats" ref={setRef}>
                    <div className="stats-grid fade-up">
                        <div className="stat-card">
                            <AnimatedCounter end={70} suffix="+" />
                            <span className="stat-label">Países Disponíveis</span>
                        </div>
                        <div className="stat-card">
                            <AnimatedCounter end={100} suffix="k+" />
                            <span className="stat-label">Experiências Partilhadas</span>
                        </div>
                        <div className="stat-card">
                            <AnimatedCounter end={500} suffix="k" />
                            <span className="stat-label">Viajantes Conectados</span>
                        </div>
                        <div className="stat-card">
                            <AnimatedCounter end={2500} suffix="+" />
                            <span className="stat-label">Destinos Explorados</span>
                        </div>
                    </div>
                </div>

                {/* 6. VISION & FUTURE */}
                <div className="about-vision" ref={setRef}>
                    <div className="vision-box fade-up">
                        <ShieldCheck size={40} className="vision-icon" />
                        <h2 className="vision-title">O futuro da exploração começa aqui.</h2>
                        <p className="vision-text">
                            A missão da GoTour é redefinir a forma como a humanidade explora o mundo.
                            Com inteligência artificial nativa, tecnologia cloud moderna e uma comunidade global apaixonada,
                            estamos a construir a próxima geração de experiências de viagem.
                        </p>
                    </div>
                </div>

                {/* 7. FINAL CTA */}
                <div className="about-cta" ref={setRef}>
                    <div className="cta-content fade-up">
                        <h2 className="cta-title">Pronto para explorar o mundo?</h2>
                        <p className="cta-subtitle">
                            Junte-se à GoTour e descubra destinos, experiências luxuosas e comunidades de viajantes como nunca antes.
                        </p>
                        <div className="cta-buttons">
                            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>Explorar a Plataforma</Button>
                            <Button variant="outline" size="lg" onClick={() => navigate('/signup')} className="outline-cta-btn">Criar conta grátis</Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
