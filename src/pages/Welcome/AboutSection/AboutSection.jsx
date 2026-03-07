import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Map, Globe2, BrainCircuit, Users, HeartHandshake, Code2, Navigation, MessageCircle } from 'lucide-react';
import './AboutSection.css';
import Button from '../../../components/Button/Button';

// Hook for scroll animations (Pitch style fade-up)
import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pitch-reveal');
                }
            });
        }, { threshold: 0.1, ...options });

        elements.forEach(el => el && observer.observe(el));
        return () => elements.forEach(el => el && observer.unobserve(el));
    }, [elements, options]);

    const setRef = (el) => {
        if (el && !elements.includes(el)) setElements(prev => [...prev, el]);
    };
    return setRef;
};

const AboutSection = () => {
    const navigate = useNavigate();
    const setRef = useIntersectionObserver();

    return (
        <section id="sobre" className="pitch-about-section">
            <div className="pitch-container">

                {/* 1. HERO BLOCK */}
                <div className="pitch-hero" ref={setRef}>
                    <div className="pitch-hero-badge pitch-hidden">
                        <Sparkles size={16} className="text-primary" /> Sobre a GoTour
                    </div>
                    <h1 className="pitch-h1 pitch-hidden delay-1">
                        Redefinindo a forma como as pessoas exploram o mundo.
                    </h1>
                    <p className="pitch-hero-sub pitch-hidden delay-2">
                        A GoTour é uma plataforma de turismo inovadora que combina tecnologia, inteligência artificial e uma vibrante comunidade global para fundir viagens, serviços locais e experiências autênticas num único ecossistema digital.
                    </p>
                    <div className="pitch-hero-image-wrapper pitch-hidden delay-3">
                        {/* High quality travel/tech image wrapper */}
                        <img
                            src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&q=80&w=2000"
                            alt="Equipa e Viagens"
                            className="pitch-hero-image"
                        />
                    </div>
                </div>

                {/* 2. HISTORY & FOUNDER - SPLIT BLOCK */}
                <div className="pitch-split-block pitch-bg-sand" ref={setRef}>
                    <div className="pitch-split-text pitch-hidden">
                        <span className="pitch-overline">História e Origem</span>
                        <h2 className="pitch-h2">A jornada começou em Maputo, Moçambique.</h2>
                        <p className="pitch-p">
                            Fundada em 2022 pelo empreendedor <strong>Tiago J.B. Paqueliua</strong>, a ideia da GoTour nasceu durante uma série de viagens internacionais em 2021. Percebeu-se que os viajantes enfrentavam enormes dificuldades em encontrar informações confiáveis, serviços locais de qualidade e recomendações verdadeiramente personalizadas.
                        </p>
                        <p className="pitch-p mt-4">
                            Especialista em tecnologia e empreendedorismo, Tiago reuniu uma equipa dedicada de developers e designers com uma visão clara: viajar tem de ser uma experiência rica, informativa e perfeitamente apoiada pela tecnologia.
                        </p>
                    </div>
                    <div className="pitch-split-visual pitch-hidden delay-1">
                        {/* Cool card stack or image */}
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                            alt="Fundador e Equipa"
                            className="pitch-visual-img"
                        />
                    </div>
                </div>

                {/* 3. SASHA IA - HUGE COLOR BLOCK */}
                <div className="pitch-color-block pitch-bg-lavender" ref={setRef}>
                    <div className="pitch-block-header pitch-hidden">
                        <div className="pitch-icon-box bg-white text-purple"><BrainCircuit size={32} /></div>
                        <h2 className="pitch-h2">Sasha IA – O Coração da Plataforma</h2>
                        <p className="pitch-p center">
                            No centro da GoTour encontra-se a Sasha IA, o nosso assistente turístico inteligente que utiliza modelos avançados de IA para oferecer resoluções em tempo real. Desde o Modelo 2.3 básico até à poderosa versão Modelo 5 no plano Avançado.
                        </p>
                    </div>

                    <div className="pitch-features-grid">
                        <div className="pitch-feature-card pitch-hidden delay-1">
                            <Navigation size={28} className="feat-icon text-purple" />
                            <h3>Sugere e Cria Roteiros</h3>
                            <p>Cria roteiros otimizados, sugerindo destinos e experiências perfeitamente moldadas ao seu perfil de viajante.</p>
                        </div>
                        <div className="pitch-feature-card pitch-hidden delay-2">
                            <HeartHandshake size={28} className="feat-icon text-purple" />
                            <h3>Recomenda Serviços Locais</h3>
                            <p>Indica transportes, restaurantes e farmácias de confiança para que viaje com a máxima segurança.</p>
                        </div>
                        <div className="pitch-feature-card pitch-hidden delay-3">
                            <MessageCircle size={28} className="feat-icon text-purple" />
                            <h3>Interação em Tempo Real</h3>
                            <p>Responde a dúvidas sobre qualquer destino no momento e interage com outros grupos de viajantes na plataforma.</p>
                        </div>
                    </div>
                </div>

                {/* 4. TECH STACK & GLOBAL MAP - TWO COLUMNS */}
                <div className="pitch-dual-cards">
                    <div className="pitch-card pitch-bg-blue pitch-hidden" ref={setRef}>
                        <Code2 size={40} className="card-icon text-blue" />
                        <h2 className="pitch-h3">Tecnologia Cloud e UX Premium</h2>
                        <p className="pitch-p">
                            Desenvolvida em <strong>Node.js</strong> e <strong>React Native</strong> com uma infraestrutura cloud ultrarrápida. Oferecemos Mapas Inteligentes, uma "Coleção de Memórias" para fotos e vídeos, além de estatísticas precisas de viagens e check-ins. O design é focado na experiência interativa de luxo.
                        </p>
                    </div>
                    <div className="pitch-card pitch-bg-mint pitch-hidden delay-1" ref={setRef}>
                        <Globe2 size={40} className="card-icon text-mint" />
                        <h2 className="pitch-h3">Comunidade de 120+ Países</h2>
                        <p className="pitch-p">
                            Promovemos intercâmbio cultural massivo. A GoTour liga viajantes além-fronteiras, promovendo também eventos online, presenciais e workshops criativos. Valorizamos autenticidade e garantimos que descobre o novo destino em total segurança.
                        </p>
                    </div>
                </div>

                {/* 5. MISSION & VISION */}
                <div className="pitch-vision-block pitch-bg-dark" ref={setRef}>
                    <div className="pitch-vision-content pitch-hidden">
                        <span className="pitch-overline light">Missão e Visão</span>
                        <h2 className="pitch-h2 text-white">Criar a maior comunidade global de viajantes.</h2>
                        <div className="pitch-vision-split">
                            <div className="v-card">
                                <h3 className="text-white">Missão</h3>
                                <p className="text-gray-300">Tornar a exploração do mundo mais inteligente, conectada e segura, oferecendo tecnologia avançada e recomendações hyper-personalizadas para todos os perfis.</p>
                            </div>
                            <div className="v-card">
                                <h3 className="text-white">Visão</h3>
                                <p className="text-gray-300">Integrar tecnologia, serviços locais e experiências autênticas num só lugar, redefinindo globalmente a forma como a exploração humana acontece e é partilhada.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. FINAL CTA */}
                <div className="pitch-cta" ref={setRef}>
                    <h2 className="pitch-cta-title pitch-hidden">Pronto para transformar a sua viagem?</h2>
                    <div className="pitch-cta-actions pitch-hidden delay-1">
                        <Button variant="primary" size="lg" onClick={() => navigate('/signup')} style={{ borderRadius: '999px', fontWeight: 'bold', padding: '0 32px', height: '56px' }}>Criar conta gratuitamente</Button>
                        <Button variant="secondary" size="lg" onClick={() => navigate('/login')} style={{ borderRadius: '999px', fontWeight: 'bold', padding: '0 32px', height: '56px', backgroundColor: '#f1f5f9', color: '#0f172a', border: 'none' }}>Já tenho conta</Button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
