import React, { useState, useEffect } from 'react';
import {
    MessageCircle, Users, ArrowRight, Sparkles,
    MapPin, Compass, Video, BookOpen, Map, Navigation,
    Lightbulb, Share2, Cloud, HardDrive
} from 'lucide-react';
import './FeaturesSection.css';

const SLIDES = [
    {
        title: "Descubra Destinos e Planeie Viagens",
        subtitle: "Descubra locais incríveis ao redor do mundo. Pesquise hotéis, restaurantes, praias e atrações turísticas, encontre recomendações e planeie experiências de viagem de forma simples e inspiradora.",
        IconMain: MapPin,
        IconSecondary: Compass
    },
    {
        title: "Descubra Experiências Reais de Viajantes",
        subtitle: "Explore conteúdos autênticos partilhados por viajantes: vídeos, relatos, guias e descobertas. Acompanhe também experiências criadas pelos exploradores oficiais da GO TOUR.",
        IconMain: Video,
        IconSecondary: BookOpen
    },
    {
        title: "Explore o Mundo com um Mapa Interativo",
        subtitle: "Visualize destinos, atrações e experiências diretamente no mapa. Descubra locais próximos, explore novas cidades e encontre lugares interessantes com ferramentas avançadas de navegação.",
        IconMain: Map,
        IconSecondary: Navigation
    },
    {
        title: "Partilhe Ideias e Descobertas",
        subtitle: "Publique experiências, faça perguntas, partilhe opiniões e descubra novos pontos de vista de viajantes ao redor do mundo.",
        IconMain: Lightbulb,
        IconSecondary: Share2
    },
    {
        title: "Conecte-se com Outros Viajantes",
        subtitle: "Converse com pessoas que partilham os mesmos interesses, participe em grupos e comunidades e construa conexões com viajantes de diferentes países.",
        IconMain: MessageCircle,
        IconSecondary: Users
    },
    {
        title: "Guarde Suas Memórias de Viagem",
        subtitle: "Armazene fotos, vídeos e conteúdos importantes num espaço seguro na nuvem com até 2 GB disponíveis para guardar e organizar suas experiências.",
        IconMain: Cloud,
        IconSecondary: HardDrive
    }
];

const FeaturesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const changeSlide = (index) => {
        if (isTransitioning || index === currentSlide) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 500); // 500ms fade out duration precisely matching user request
    };

    // Autoplay logic
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            changeSlide((currentSlide + 1) % SLIDES.length);
        }, 7500); // 7.5s interval
        return () => clearInterval(interval);
    }, [currentSlide, isPaused, isTransitioning]);

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
    }, [currentSlide, isTransitioning]);

    const { title, subtitle, IconMain, IconSecondary } = SLIDES[currentSlide];

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
                                {title.split(' e ').map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}{i < arr.length - 1 ? <><br />e </> : ''}
                                    </React.Fragment>
                                ))}
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

                {/* Right Column: Visual Composition */}
                <div className="features-visuals">
                    {/* Background decorative element */}
                    <div className="visual-bg-glow"></div>

                    {/* Main Avatar Composition (Center) */}
                    <div className="main-avatar-circle">
                        <div className="avatar-composition-wrap">
                            <div className="avatar-bg-image" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCG87-shC8l-T0-RL8D-7TqDAWiIxmw6mXjXdIKtp4OGuXk1VfwPYu2a314EEb1vaCd5bXduInC8JCdxfHk1-RZDIRp2cyC5vtUJBgIUIRZFIUmyi6mXroOXdE7waHjetW5FYFi7C8KeBq37HmiMYhi5_yVu0mw_L077hXWLO3SiuYkuBXdzOKrXiHGPNZNVrMv1yfp-t_hoUW_yKGgSWUfUiwLYrL1VFYxF6c3tbmguxGWb7MGlu4mceUOjaod0ykef4VGHAzILCgs')" }}></div>
                            <div className="avatar-gradient-overlay">
                                <div className="stacked-avatars">
                                    <img className="stacked-avatar z-20" alt="Avatar 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAczknvjLF0VPDC86ZeeDKFdqpIkSQn9Nd-yRg2lvH4f33uoydhrz0U5svxXJo5KQ7u45I3VBD4DfK0kVbl9epsdsUgxIRvFJEhPLSdiCjLNyN9-gIerqvfB0zuRCrhS-MJoEY1Ro4SgXePIDG1hRw7i-zw_Sv0xLL9vUiSi3dAB2AzoygxqzAv7089UyZK7m57msQSHnjYlnBBc1LXSqxYNRrKQBUtLmJ2yoXkSxURJo-doUQv1FgJVLQefP8E5OZWpU0SaHkr1kKj" />
                                    <img className="stacked-avatar z-10" alt="Avatar 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTmhitWV3A7wFvwTPzXIOMtku1ess9-EdnmpT-TOF2TiQpGNds0dqiVuKnSXwkPytFZbGED-y1vJqdvZxd-lZSHlmH0-NQDaT6PMBFPtrHVk1ivwTdoIQwoJ2whM0Nl_IYTE88mnUv2qvvPW7PC4q9KsZ--ZcdNCYGBtjWwJgobNtwSgaIJ8AHrhbKazbe8EiNi72DhCosM10vbaOS3LAYBfBLkc3N0XiaWANU4t0YVX82-JzZzxcqElu9KXcRx8yxzO1ElnxXnS4s" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Dynamic Icon (Top Left) */}
                    <div className="floating-card chat-card">
                        <div className="icon-box chat-icon-box">
                            <div className={`floating-icon-wrapper ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
                                <IconMain size={40} className="icon-blue" />
                            </div>
                        </div>
                    </div>

                    {/* Secondary Dynamic Icon (Bottom Right) */}
                    <div className="floating-card group-card">
                        <div className="icon-box group-icon-box">
                            <div className={`floating-icon-wrapper ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
                                <IconSecondary size={48} className="icon-white" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative dots */}
                    <div className="dot-yellow"></div>
                    <div className="dot-blue"></div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
