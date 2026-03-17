import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Plane, Building2, Anchor, Compass, Globe } from 'lucide-react';
import './AboutSection.css';

import founderImg from '../../../assets/images/founder_thiago.jpg';
import founderFwImg from '../../../assets/images/founder_portrait_fw.png';
import founderFbImg from '../../../assets/images/founder_portrait_fb.png';

const founders = [
    {
        name: "Thiago Helio CS",
        role: "CEO & Fundador",
        description: "Thiago Helio CS, visionário e empreendedor, fundou a GO TOUR com o propósito de democratizar o acesso a viagens de alto padrão através da tecnologia.",
        image: founderImg
    },
    {
        name: "Elena Rostova",
        role: "COO & Co-Fundadora",
        description: "Elena lidera a expansão global da GO TOUR, garantindo que nossos padrões premium sejam mantidos em cada continente.",
        image: founderFwImg
    },
    {
        name: "Amara Diallo",
        role: "CTO & Co-Fundadora",
        description: "Mente brilhante por trás da Sasha IA. Amara possui vasta experiência em IA e é responsável por arquitetar nosso ecossistema digital.",
        image: founderFbImg
    }
];

const testimonials = [
    {
        name: "Ricardo Almeida",
        role: "Viajante Premium",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "A atenção aos detalhes foi impressionante. Cada hotel e transferência foram perfeitamente coordenados."
    },
    {
        name: "Sofia Martins",
        role: "Viajante Executiva",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "GoTour transformou nossa viagem em algo mágico. O acesso exclusivo a locais históricos superou todas as expectativas."
    },
    {
        name: "Lucas Ferreira",
        role: "Membro Elite",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "A plataforma é intuitiva e o suporte é excepcional. Pela primeira vez, viajei sem me preocupar com absolutamente nada."
    },
    {
        name: "Isabella Costa",
        role: "Viajante Premium",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Um serviço verdadeiramente incomparável. A curadoria de experiências locais deu-nos uma perspectiva nova sobre a Europa."
    },
    {
        name: "Mateus Ndlovu",
        role: "Explorador Global",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Perfeição logística da partida ao regresso. O planejamento Inteligente permitiu-me aproveitar o safari com tranquilidade."
    },
    {
        name: "Carolina Ribeiro",
        role: "Viajante Frequente",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "O nível de personalização é o que diferencia a GoTour. Eles não apenas reservam, mas esculpem a viagem à nossa imagem."
    },
    {
        name: "António Vieira",
        role: "Sócio Fundador",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Como empresário, valorizo o meu tempo. A assistência planeou o meu itinerário de negócios perfeitamente."
    },
    {
        name: "Mariana Silva",
        role: "Membro Elite",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Estar imersa na cultura asiática com guias tão qualificados e num conforto de cinco estrelas foi inesquecível."
    },
    {
        name: "Diego Fernandes",
        role: "Viajante Premium",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "O suporte VIP da GoTour deu-me paz de espírito durante toda a minha odisseia pela América do Sul."
    },
    {
        name: "Juliana Santos",
        role: "Amante de Viagens",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Nunca vi um planeamento tão meticuloso. Tudo fluiu de forma tão orgânica que parecia magia tecnológica."
    },
    {
        name: "João Pedro Maciel",
        role: "Membro Elite",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Hospedagem exclusiva e passeios que fogem do lugar-comum. Recomendo para todos que buscam luxo ágil."
    },
    {
        name: "Bruna Oliveira",
        role: "Viajante Executiva",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Redefiniram o meu conceito de viagem a trabalho. Misturar negócios e lazer nunca foi tão simples."
    },
    {
        name: "Carlos Mendes",
        role: "Explorador Global",
        avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Os voos fretados e as conexões fluidas fizeram-me poupar dias preciosos na minha expedição nórdica."
    },
    {
        name: "Vanessa Carvalho",
        role: "Viajante Premium",
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Senti-me VIP em cada restaurante e museu. A GoTour tem uma rede de contactos fabulosa globalmente."
    },
    {
        name: "Thiago Gomes",
        role: "Membro Elite",
        avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Foi incrível ver os ajustes ao trajeto devido ao clima sendo feitos silenciosamente no background. Perfeito."
    },
    {
        name: "Camila Rodrigues",
        role: "Amante de Viagens",
        avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Hospedar-me em ilhas gregas privadas só foi possível devido à logística impecável das equipas GoTour."
    },
    {
        name: "Felipe Machado",
        role: "Viajante Premium",
        avatar: "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Serviço de altíssima costura! A abordagem personalizada e a simpatia dos assistentes é incomparável."
    },
    {
        name: "Natália Freitas",
        role: "Exploradora Global",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Experiência de luxo absoluto. Os jatos privados e o serviço de limo tornaram o transporte invisível."
    },
    {
        name: "André Pires",
        role: "Viajante Executivo",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Elegância e pontualidade. Tudo esteve impecável desde o embarque até ao copo de champanhe de boas-vindas."
    },
    {
        name: "Beatriz Lemos",
        role: "Membro Elite",
        avatar: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        quote: "Já viajei muito, mas nunca com esse nível absurdo de detalhes controlados. Realmente muda perspectivas."
    }
];

const partnersList = [
    { name: 'AeroLines', icon: <Plane size={32} /> },
    { name: 'GrandStay', icon: <Building2 size={32} /> },
    { name: 'Oceanic', icon: <Anchor size={32} /> },
    { name: 'AtlasCorp', icon: <Compass size={32} /> }
];

const AboutSection = () => {
    const [reviewIndex, setReviewIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setReviewIndex((prev) => (prev + 3) % testimonials.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    // Get 3 visible testimonials wrapping safely
    const visibleReviews = [
        testimonials[reviewIndex % testimonials.length],
        testimonials[(reviewIndex + 1) % testimonials.length],
        testimonials[(reviewIndex + 2) % testimonials.length]
    ];

    return (
        <section id="sobre" className="abt-immersive-section">
            
            {/* 1. Glassmorphism Card Wrapper (Hero) */}
            <header className="abt-glass-header">
                <div className="abt-glass-bgbox">
                    <div className="abt-glass-bg"></div>
                    <div className="abt-glass-overlay"></div>
                    
                    <div className="abt-glass-container">
                        <div className="abt-glass-card">
                            <div className="abt-badge-immersive">
                                <Globe size={16} />
                                Alcance Global
                            </div>
                            <h1 className="abt-headline">
                                Redefinindo o Padrão do Turismo de Luxo.
                            </h1>
                            <p className="abt-subtext">
                                Fundada por **Thiago Helio CS**, a GoTour nasceu da visão de fusionar tecnologia avançada com a curadoria de experiências exclusivas globalmente. Desenhamos jornadas sob medida que combinam precisão, privacidade e imersão cultural profunda.
                            </p>
                            <button className="abt-btn-primary">
                                Saber mais
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Team Section */}
            <section className="abt-grid-section">
                <div className="abt-section-header">
                    <h2 className="abt-section-title">A equipa por trás da jornada</h2>
                    <p className="abt-section-desc">
                        Conheça os visionários, tecnólogos e especialistas operacionais que estão a redefinir a forma como o mundo viaja.
                    </p>
                </div>
                
                <div className="abt-team-grid">
                    {founders.map((founder, index) => (
                        <div className="abt-team-card" key={index}>
                            <div className="abt-team-imgbox">
                                <img src={founder.image} alt={founder.name} className="abt-team-img" />
                            </div>
                            <div className="abt-team-content">
                                <h3 className="abt-team-name">{founder.name}</h3>
                                <p className="abt-team-role">{founder.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Testimonials (Avaliações) */}
            <section className="abt-reviews-section">
                <div className="abt-reviews-bg-glow"></div>
                <div className="abt-grid-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <div className="abt-section-header">
                        <h2 className="abt-section-title">Avaliações</h2>
                        <p className="abt-section-desc">
                            O que nossos clientes dizem sobre suas jornadas transformadoras com a GoTour.
                        </p>
                    </div>

                    <div className="abt-grid-3 relative min-h-[300px]">
                        <AnimatePresence mode="popLayout">
                            {visibleReviews.map((review, idx) => (
                                <motion.div 
                                    key={review.name + reviewIndex} 
                                    className="abt-reviews-card"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                                >
                                    <div className="abt-reviews-top">
                                        <div className="abt-avatar">
                                            <img src={review.avatar} alt={review.name} />
                                        </div>
                                        <div className="abt-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill="currentColor" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="abt-quote">"{review.quote}"</p>
                                    <div>
                                        <p className="abt-reviewer-name">{review.name}</p>
                                        <p className="abt-reviewer-tag">{review.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 4. Partners Static Row */}
            <section className="abt-partners-band">
                <div className="abt-partners-container">
                    <h4 className="abt-partners-title">Trusted by industry leaders worldwide</h4>
                    <div className="abt-partners-grid">
                        {partnersList.map((partner, idx) => (
                            <div key={idx} className="abt-partner-logo">
                                {partner.icon}
                                <span className="abt-partner-text">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </section>
    );
};

export default AboutSection;
