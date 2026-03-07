import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, Sparkles, BrainCircuit, Navigation, Shield, Zap, TrendingUp, Compass, ArrowRight } from 'lucide-react';
import './AboutSection.css';

// Intersection Observer Hook for fade-ins
const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('prem-reveal');
                }
            });
        }, { threshold: 0.1, ...options });

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

// Animated Counter Hook
const useAnimatedCounter = (end, duration = 2000) => {
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

    return { count, countRef };
};

const AnimatedStat = ({ end, suffix, label }) => {
    const { count, countRef } = useAnimatedCounter(end);
    return (
        <div className="premium-stat-card" ref={countRef}>
            <div className="prem-stat-num">{count}{suffix}</div>
            <div className="prem-stat-label">{label}</div>
        </div>
    )
}

const AboutSection = () => {
    const navigate = useNavigate();
    const setRef = useIntersectionObserver();
    const bentoGridRef = useRef(null);

    // Mouse tracking for glowing cards (Vercel/Stripe style)
    const handleMouseMove = (e) => {
        if (!bentoGridRef.current) return;
        const cards = bentoGridRef.current.getElementsByClassName('bento-card');
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <section id="sobre" className="premium-about-section">

            {/* Ambient Animated Aurora Background */}
            <div className="aurora-bg">
                <div className="aurora-blob a-blob-1"></div>
                <div className="aurora-blob a-blob-2"></div>
                <div className="aurora-blob a-blob-3"></div>
                <div className="aurora-noise"></div>
            </div>

            <div className="prem-about-container">

                {/* 1. HERO - MONOLITHIC */}
                <div className="prem-hero" ref={setRef}>
                    <div className="prem-badge prem-hidden delay-0">
                        <Sparkles size={14} className="badge-icon" />
                        <span>A Nova Era do Turismo</span>
                    </div>
                    <h1 className="prem-title prem-hidden delay-1">
                        O Mundo,<br /><span className="text-gradient">Redefinido.</span>
                    </h1>
                    <p className="prem-subtitle prem-hidden delay-2">
                        A GoTour funde inteligência artificial nativa, exploração imersiva e uma comunidade global vibrante. Não planeamos apenas viagens, reengenheiramos a forma como a humanidade descobre o planeta.
                    </p>

                    <div className="prem-hero-visual prem-hidden delay-3">
                        <div className="glass-video-player">
                            <div className="glass-play-btn">
                                <div className="play-triangle"></div>
                            </div>
                            <div className="glass-video-text">
                                <span className="video-maintext">Conheça a Visão GoTour</span>
                                <span className="video-subtext">Manifesto 2024 • 1:45</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. STORY - STICKY TEXT FADES */}
                <div className="prem-story">
                    <div className="story-layout">
                        <div className="story-content">
                            <h2 className="story-heading prem-hidden" ref={setRef}>Uma visão ousada.</h2>
                            <p className="story-text prem-hidden delay-1" ref={setRef}>
                                Num mundo fragmentado por dezenas de aplicações de viagens isoladas, percebemos que a verdadeira exploração estava a perder-se em processos burocráticos e pesquisas intermináveis.
                            </p>
                            <p className="story-text-highlight pl-4 border-l-2 border-primary prem-hidden delay-2" ref={setRef}>
                                Construímos a GoTour para ser o sistema operacional do viajante global. Uma única plataforma unificada onde o mapa não é apenas uma interface ilustrativa, mas uma inteligência de descoberta em tempo real.
                            </p>
                        </div>
                        <div className="story-visual-container prem-hidden delay-2" ref={setRef}>
                            <div className="glowing-orb-container">
                                <div className="orb-ring r1"></div>
                                <div className="orb-ring r2"></div>
                                <div className="orb-core"></div>
                                <Globe2 size={64} className="orb-icon" strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TECHNOLOGY - REACTIVE BENTO GRID */}
                <div className="prem-tech" ref={setRef}>
                    <div className="tech-intro prem-hidden">
                        <h2 className="tech-title">O motor <br />que move a descoberta.</h2>
                        <p className="tech-sub">Apresentando Sasha IA 5. O cérebro invisível de cada jornada.</p>
                    </div>

                    <div className="bento-grid" ref={bentoGridRef} onMouseMove={handleMouseMove}>

                        {/* Huge Main Card */}
                        <div className="bento-card b-large prem-hidden delay-1">
                            <div className="b-icon-box"><BrainCircuit size={24} /></div>
                            <h3 className="b-card-title">Inteligência Absoluta</h3>
                            <p className="b-card-text">
                                A Sasha IA não é um chatbot. É um agente autónomo capaz de cruzar milhões de pontos de dados de voos, legislação local, meteorologia, eventos obscuros e preferências pessoais para construir o roteiro perfeito em 3 segundos.
                            </p>
                            <div className="abstract-ai-visual">
                                <div className="ai-line l1"></div>
                                <div className="ai-line l2"></div>
                                <div className="ai-line l3"></div>
                                <div className="ai-node"></div>
                            </div>
                        </div>

                        {/* Medium Card 1 */}
                        <div className="bento-card b-medium prem-hidden delay-2">
                            <div className="b-icon-box"><Compass size={24} /></div>
                            <h3 className="b-card-title">Mapa Sensorial</h3>
                            <p className="b-card-text">Camadas de dados dinâmicas que revelam locais secretos à medida que você se aproxima, em tempo real.</p>
                        </div>

                        {/* Medium Card 2 */}
                        <div className="bento-card b-medium prem-hidden delay-3">
                            <div className="b-icon-box"><Zap size={24} /></div>
                            <h3 className="b-card-title">Respostas em milissegundos</h3>
                            <p className="b-card-text">Dúvidas sobre o visto? Moeda? Transporte? A Sasha IA está sempre ao seu lado via voz ou chat.</p>
                        </div>

                        {/* Long Footer Card */}
                        <div className="bento-card b-wide prem-hidden delay-4">
                            <div className="b-wide-content">
                                <div>
                                    <h3 className="b-card-title">Planeamento Offline Dinâmico</h3>
                                    <p className="b-card-text">Mesmo no meio do deserto sem sinal, os seus roteiros adaptam-se localmente usando micro-modelos carregados no dispositivo.</p>
                                </div>
                                <div className="b-icon-box transparent"><Shield size={28} /></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. MONOLITHIC STATS */}
                <div className="prem-stats" ref={setRef}>
                    <h2 className="stats-main-heading prem-hidden">Uma plataforma de escala planetária.</h2>
                    <div className="stats-row prem-hidden delay-1">
                        <AnimatedStat end={75} suffix="+" label="Países Habilitados" />
                        <div className="stat-divider"></div>
                        <AnimatedStat end={12} suffix="M" label="Roteiros Gerados" />
                        <div className="stat-divider"></div>
                        <AnimatedStat end={99} suffix="%" label="Precisão da Sasha IA" />
                    </div>
                </div>

                {/* 5. FINAL CALL */}
                <div className="prem-cta" ref={setRef}>
                    <div className="cta-glass-box prem-hidden">
                        <div className="cta-icon-float">
                            <Globe2 size={40} className="text-primary opacity-50" />
                        </div>
                        <h2 className="cta-huge-title">Abandone o antigo.<br />Abrace a exploração.</h2>
                        <div className="cta-actions">
                            <button className="prem-btn-primary" onClick={() => navigate('/login')}>
                                Aceder à GoTour <ArrowRight size={18} className="ml-2 inline" />
                            </button>
                            <button className="prem-btn-outline" onClick={() => navigate('/signup')}>
                                Criar conta
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
