import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './FeaturesSection.css';

/* Premium illustrations for each slide */
import slide1Img from '../../../assets/images/features/slide1_destinations.png';
import slide2Img from '../../../assets/images/features/slide2_experiences.png';
import slide3Img from '../../../assets/images/features/slide3_interactive_map.png';
import slide4Img from '../../../assets/images/features/slide4_share_ideas.png';
import slide5Img from '../../../assets/images/features/slide5_connect_travelers.png';
import slide6Img from '../../../assets/images/features/slide6_cloud_storage.png';

const SLIDES = [
    {
        title: "Descubra Destinos e Planeie Viagens",
        subtitle: "Descubra locais incríveis ao redor do mundo. Pesquise hotéis, restaurantes, praias e atrações turísticas, encontre recomendações e planeie experiências de viagem de forma simples e inspiradora.",
        image: slide1Img
    },
    {
        title: "Descubra Experiências Reais de Viajantes",
        subtitle: "Explore conteúdos autênticos partilhados por viajantes: vídeos, relatos, guias e descobertas. Acompanhe também experiências criadas pelos exploradores oficiais da GO TOUR.",
        image: slide2Img
    },
    {
        title: "Explore o Mundo com um Mapa Interativo",
        subtitle: "Visualize destinos, atrações e experiências diretamente no mapa. Descubra locais próximos, explore novas cidades e encontre lugares interessantes com ferramentas avançadas de navegação.",
        image: slide3Img
    },
    {
        title: "Partilhe Ideias e Descobertas",
        subtitle: "Publique experiências, faça perguntas, partilhe opiniões e descubra novos pontos de vista de viajantes ao redor do mundo.",
        image: slide4Img
    },
    {
        title: "Conecte-se com Outros Viajantes",
        subtitle: "Converse com pessoas que partilham os mesmos interesses, participe em grupos e comunidades e construa conexões com viajantes de diferentes países.",
        image: slide5Img
    },
    {
        title: "Guarde Suas Memórias de Viagem",
        subtitle: "Armazene fotos, vídeos e conteúdos importantes num espaço seguro na nuvem com até 2 GB disponíveis para guardar e organizar suas experiências.",
        image: slide6Img
    }
];

const FeaturesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const changeSlide = useCallback((index) => {
        if (isTransitioning || index === currentSlide) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 500);
    }, [isTransitioning, currentSlide]);

    // Autoplay logic — 11 seconds
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide(prev => (prev + 1) % SLIDES.length);
                setIsTransitioning(false);
            }, 500);
        }, 11000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                changeSlide((currentSlide + 1) % SLIDES.length);
            } else if (e.key === 'ArrowLeft') {
                changeSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, changeSlide]);

    const { title, subtitle, image } = SLIDES[currentSlide];

    return (
        <section
            id="funcionalidades"
            className="features-section-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="features-grid-layout">
                {/* Left Column: Text & Actions */}
                <div className="features-content">
                    <div className={`slide-content-wrapper ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
                        <div className="features-header-wrap">
                            <div className="premium-badge">
                                <Sparkles size={16} />
                                <span>Premium Feature</span>
                            </div>
                            <h2 className="features-main-title">
                                {title}
                            </h2>
                            <p className="features-subtitle">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="features-actions">
                        <button className="btn-join-community">
                            <span>Saber Mais</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Horizontal Navigation Cues */}
                    <div className="nav-cues">
                        {SLIDES.map((_, idx) => (
                            <div
                                key={idx}
                                className={idx === currentSlide ? 'cue-active' : 'cue-dot'}
                                onClick={() => changeSlide(idx)}
                                title={`Slide ${idx + 1}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Premium Illustration */}
                <div className="features-visuals">
                    <div className="visual-bg-glow"></div>

                    <div className={`illustration-wrapper ${isTransitioning ? 'illustration-exit' : 'illustration-enter'}`}>
                        <img
                            src={image}
                            alt={title}
                            className="slide-illustration"
                        />
                    </div>

                    {/* Decorative dots */}
                    <div className="dot-yellow"></div>
                    <div className="dot-blue"></div>
                    <div className="dot-teal"></div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
