import React from 'react';
import { MessageCircle, Users, ArrowRight, Sparkles } from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
    return (
        <section id="funcionalidades" className="features-section-container">
            <div className="features-grid-layout">
                {/* Left Column: Text & Actions */}
                <div className="features-content">
                    <div className="features-header-wrap">
                        <div className="premium-badge">
                            <Sparkles size={16} />
                            <span>Premium Feature</span>
                        </div>
                        <h2 className="features-main-title">
                            Conecte-se com<br />Outros Viajantes
                        </h2>
                        <p className="features-subtitle">
                            Aprimore a sua viagem conectando-se com pessoas que partilham os seus interesses. Junte-se a comunidades vibrantes, planeiem juntos e criem memórias duradouras.
                        </p>
                    </div>

                    <div className="features-actions">
                        <button className="btn-join-community">
                            <span>Juntar à Comunidade</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="btn-learn-more">
                            Saber Mais
                        </button>
                    </div>

                    {/* Horizontal Navigation Cues */}
                    <div className="nav-cues">
                        <div className="cue-active"></div>
                        <div className="cue-dot"></div>
                        <div className="cue-dot"></div>
                        <div className="cue-dot"></div>
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

                    {/* Chat Bubble Icon (Top Left) */}
                    <div className="floating-card chat-card">
                        <div className="icon-box chat-icon-box">
                            <MessageCircle size={40} className="icon-blue" />
                        </div>
                    </div>

                    {/* Group Icon (Bottom Right) */}
                    <div className="floating-card group-card">
                        <div className="icon-box group-icon-box">
                            <Users size={48} className="icon-white" />
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
