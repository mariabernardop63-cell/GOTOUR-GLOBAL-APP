import React, { useState, useEffect, useCallback } from 'react';
import {
    MapPin, Video, Map, Lightbulb, MessageCircle, Cloud,
    ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import './FeaturesSection.css';

/* Premium illustrations */
import slide1Img from '../../../assets/images/features/slide1_destinations.png';
import slide2Img from '../../../assets/images/features/slide2_experiences.png';
import slide3Img from '../../../assets/images/features/slide3_interactive_map.png';
import slide4Img from '../../../assets/images/features/slide4_share_ideas.png';
import slide5Img from '../../../assets/images/features/slide5_connect_travelers.png';
import slide6Img from '../../../assets/images/features/slide6_cloud_storage.png';

const FEATURES = [
    {
        id: 0,
        title: "Descubra Destinos e Planeie Viagens",
        subtitle: "Pesquise hotéis, restaurantes, praias e atrações turísticas. Encontre recomendações e planeie experiências de viagem de forma simples e inspiradora.",
        icon: MapPin,
        image: slide1Img,
        gradient: "linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)",
        accentColor: "#0d9488"
    },
    {
        id: 1,
        title: "Experiências Reais de Viajantes",
        subtitle: "Explore vídeos, relatos, guias e descobertas partilhados por viajantes e pelos exploradores oficiais da GO TOUR.",
        icon: Video,
        image: slide2Img,
        gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
        accentColor: "#7c3aed"
    },
    {
        id: 2,
        title: "Mapa Interativo Global",
        subtitle: "Visualize destinos e experiências no mapa. Descubra locais próximos e explore cidades com ferramentas avançadas de navegação.",
        icon: Map,
        image: slide3Img,
        gradient: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
        accentColor: "#2563eb"
    },
    {
        id: 3,
        title: "Partilhe Ideias e Descobertas",
        subtitle: "Publique experiências, partilhe opiniões e descubra novos pontos de vista de viajantes ao redor do mundo.",
        icon: Lightbulb,
        image: slide4Img,
        gradient: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
        accentColor: "#d97706"
    },
    {
        id: 4,
        title: "Conecte-se com Viajantes",
        subtitle: "Converse com pessoas que partilham interesses, participe em comunidades e construa conexões globais.",
        icon: MessageCircle,
        image: slide5Img,
        gradient: "linear-gradient(135deg, #dc2626 0%, #f87171 100%)",
        accentColor: "#dc2626"
    },
    {
        id: 5,
        title: "Memórias na Nuvem",
        subtitle: "Armazene fotos, vídeos e conteúdos num espaço seguro na nuvem com até 2 GB disponíveis.",
        icon: Cloud,
        image: slide6Img,
        gradient: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
        accentColor: "#0ea5e9"
    }
];

const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const changeFeature = useCallback((index) => {
        if (isTransitioning || index === activeFeature) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveFeature(index);
            setIsTransitioning(false);
        }, 400);
    }, [isTransitioning, activeFeature]);

    // Autoplay — 11 seconds
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setActiveFeature(prev => (prev + 1) % FEATURES.length);
                setIsTransitioning(false);
            }, 400);
        }, 11000);
        return () => clearInterval(timer);
    }, [isPaused]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') changeFeature((activeFeature + 1) % FEATURES.length);
            if (e.key === 'ArrowLeft') changeFeature((activeFeature - 1 + FEATURES.length) % FEATURES.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [activeFeature, changeFeature]);

    const current = FEATURES[activeFeature];
    const CurrentIcon = current.icon;

    return (
        <section
            id="funcionalidades"
            className="feat-section"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Animated Background Gradient */}
            <div className="feat-bg-gradient" />

            <div className="feat-container">
                {/* Section Header */}
                <div className="feat-section-header">
                    <span className="feat-eyebrow">Funcionalidades</span>
                    <h2 className="feat-heading">
                        Tudo que precisa para <br />
                        <span className="feat-heading-gradient">explorar o mundo.</span>
                    </h2>
                    <p className="feat-heading-sub">
                        Ferramentas poderosas pensadas para cada etapa da sua viagem —
                        desde a descoberta até à memória.
                    </p>
                </div>

                {/* Bento Grid of Feature Cards */}
                <div className="feat-bento-grid">
                    {FEATURES.map((feature, idx) => {
                        const Icon = feature.icon;
                        const isActive = idx === activeFeature;
                        return (
                            <button
                                key={feature.id}
                                className={`feat-card ${isActive ? 'feat-card-active' : ''}`}
                                onClick={() => changeFeature(idx)}
                                style={{ '--card-gradient': feature.gradient, '--card-accent': feature.accentColor }}
                            >
                                <div className="feat-card-icon-wrap">
                                    <Icon size={24} />
                                </div>
                                <h3 className="feat-card-title">{feature.title}</h3>
                                <p className="feat-card-desc">{feature.subtitle}</p>
                                {isActive && <div className="feat-card-progress"><div className="feat-card-progress-bar" /></div>}
                            </button>
                        );
                    })}
                </div>

                {/* Hero Showcase — Active Feature */}
                <div className="feat-showcase">
                    <div className={`feat-showcase-visual ${isTransitioning ? 'showcase-exit' : 'showcase-enter'}`}>
                        <div className="feat-showcase-img-wrapper" style={{ '--showcase-gradient': current.gradient }}>
                            <img
                                src={current.image}
                                alt={current.title}
                                className="feat-showcase-img"
                            />
                        </div>
                    </div>

                    <div className={`feat-showcase-info ${isTransitioning ? 'showcase-exit' : 'showcase-enter'}`}>
                        <div className="feat-showcase-icon" style={{ background: current.gradient }}>
                            <CurrentIcon size={28} color="#fff" />
                        </div>
                        <h3 className="feat-showcase-title">{current.title}</h3>
                        <p className="feat-showcase-desc">{current.subtitle}</p>
                        <button className="feat-showcase-cta">
                            <span>Saber mais</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* Nav Arrows */}
                    <div className="feat-showcase-nav">
                        <button className="feat-nav-arrow" onClick={() => changeFeature((activeFeature - 1 + FEATURES.length) % FEATURES.length)}>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="feat-nav-dots">
                            {FEATURES.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`feat-dot ${idx === activeFeature ? 'feat-dot-active' : ''}`}
                                    onClick={() => changeFeature(idx)}
                                />
                            ))}
                        </div>
                        <button className="feat-nav-arrow" onClick={() => changeFeature((activeFeature + 1) % FEATURES.length)}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
