import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
    return (
        <section id="funcionalidades" className="feat-section">
            <div className="feat-container">
                {/* Section Header */}
                <div className="feat-header">
                    <span className="feat-eyebrow">Funcionalidades</span>
                    <h2 className="feat-title">Tudo que precisa para explorar o mundo.</h2>
                    <p className="feat-desc">
                        Descubra ferramentas poderosas desenhadas para tornar a sua próxima aventura inesquecível, desde o planeamento até à partilha das suas memórias.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="feat-grid">

                    {/* Card 1: Destinos (wide) */}
                    <div className="glass-card feat-card-destinos">
                        <div className="card-hover-gradient card-hover-teal"></div>
                        <div className="card-text-block">
                            <h3 className="card-title">Destinos</h3>
                            <p className="card-subtitle">Encontre os melhores locais com avaliações reais.</p>
                        </div>
                        <div className="card-ui-mock">
                            <div className="search-bar-mock">
                                <span className="search-icon">⌕</span>
                                <span className="search-placeholder">Para onde quer ir?</span>
                            </div>
                            <div className="destination-cards-row">
                                <div className="destination-mini-card">
                                    <div className="dest-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBgpvbpz45xwAZCBvaohlkcVj577VnPpJH-kGwI-taZbA5I6DnjjXBvO8tT0ZwSCdsmFKFlXjraWk5ucNGHk8z3O8V81-uhR_NU9PCM69WY2rJVJhjo5qwZi5rBKD-16ryb-4g82Dd3rl5BB_1SMljqxfd03sZX6vIoLzBY08osuNnGRFSTSG6ay_7OHHZTCFAqk21hhxaJCg-ImAaOf1gWnxRswHZdpf5-dmvYlVbqcX77O1ZeBY2YKu_KAm-Q5g8aQHzwuUk1lk')" }}></div>
                                    <div className="dest-info">
                                        <h4 className="dest-name">Paris</h4>
                                        <div className="dest-meta">
                                            <span className="dest-price">$1200+</span>
                                            <span className="dest-sep">•</span>
                                            <span className="dest-rating">★ 4.8</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="destination-mini-card">
                                    <div className="dest-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_wOLgC4clHeucgjWRcihlABL2CJRa7ta7bWPwLHOwRYHOLKpA8T_P8jl3TCKSDjhpXpwdrCxcF8U04wOYA-Xs06k71ohrUtAq8M5fXrDnuwxJ8hkT040Hy-veoqgchEP4_Wev3lG838RftRDW290V8_EhbuAVWkXC3UtWNtE44_-avtPbSilllAd0u_KaSv8GyKnndPRh7f7ovz2M9pwA_fZSeO4G96uqU7-hMrpXJ4lsGy5JDhu5bR_hkZLsuzx8I_osOtCzoEk')" }}></div>
                                    <div className="dest-info">
                                        <h4 className="dest-name">Tokyo</h4>
                                        <div className="dest-meta">
                                            <span className="dest-price">$1500+</span>
                                            <span className="dest-sep">•</span>
                                            <span className="dest-rating">★ 4.9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Experiências (tall) */}
                    <div className="glass-card feat-card-exp">
                        <div className="card-hover-gradient card-hover-blue"></div>
                        <div className="card-text-block">
                            <h3 className="card-title">Experiências</h3>
                            <p className="card-subtitle">Inspire-se com as viagens da comunidade.</p>
                        </div>
                        <div className="card-ui-mock exp-mock">
                            <div className="exp-video-area" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQUTLVmKS15P65AY6e-n1C9JkTqygOtDnZiNgc51F2SmeZ7XyCLmGUhtZuOkDcC2dahs4XAOJBY8I8e8upStLRhhxQHr1ru2obm6XRoynWWo8rI7qmHL-33ziCVwC1UMfmmMLWfAK1y5Xp-QOIF_KrEJeo1WfLkp_6MDPCQrJbL4HFbEO2ByfiVhEkd66vrol7vZzcQwN3u4S7zF-KQ98ODdJ_-GISNaYQ6oDrxjzrQy177r3O9SeSt1WKeF5WEPLlVDidkKv1b9c')" }}>
                                <div className="exp-overlay"></div>
                                <div className="exp-bottom">
                                    <div className="exp-user">
                                        <div className="exp-avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwuIjfEU8cAg6lduL1l1nVJ76rF7n8s9MPgymIYsceDtFm11PAdPIFz6JVCju19ZxmozQdk5UFtRfUQvxSlZk267bSIf99e4Anfqwvjle0a9zdUHWAvDAk9a4NHS2ey0TiEMJwyG6MASXpcrL4mEVYtzMX5fmk7UEq6qgct811ZQaAWwWiXEovNqzJ7AMpXB3aYaeT4gQKh0Nlybz4DtOa7HF8w_faSoKcFzAqHTvhPRZz4hRZTY82CvQjcbMENzFjEIRKQ9v5L9A')" }}></div>
                                        <div>
                                            <p className="exp-username">Maria Silva</p>
                                            <p className="exp-location">Alpes Suíços</p>
                                        </div>
                                    </div>
                                    <button className="exp-play-btn">▶</button>
                                </div>
                            </div>
                            <div className="exp-stats">
                                <div className="exp-stat-group">
                                    <span className="exp-stat">♥ 1.2k</span>
                                    <span className="exp-stat">💬 300</span>
                                </div>
                                <span className="exp-stat">🔖</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Mapa Interativo (tall, 1 column) */}
                    <div className="glass-card feat-card-map">
                        <div className="map-bg">
                            <div className="map-dots-pattern"></div>
                            <svg className="map-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                                <path d="M40,200 C80,100 160,250 260,130" fill="none" stroke="#0d9488" strokeDasharray="4 4" strokeWidth="2" opacity="0.5" />
                                <circle cx="40" cy="200" r="5" fill="#0d9488" />
                                <circle cx="260" cy="130" r="5" fill="#3b82f6" />
                                <circle cx="150" cy="170" r="3" fill="#a78bfa" opacity="0.6" />
                            </svg>
                        </div>
                        <div className="map-overlay-gradient"></div>
                        <div className="map-content">
                            <h3 className="card-title text-white">Mapa Interativo</h3>
                            <p className="card-subtitle">Planeie rotas com precisão e descubra pontos de interesse pelo caminho.</p>
                            <button className="map-explore-btn">
                                Explorar Mapa <span>→</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 4: Comunidade */}
                    <div className="glass-card feat-card-community">
                        <div className="card-hover-gradient card-hover-purple"></div>
                        <div className="card-text-block">
                            <h3 className="card-title">Comunidade</h3>
                        </div>
                        <div className="card-ui-mock chat-mock">
                            <div className="chat-row chat-left">
                                <div className="chat-avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDltU1dR9bgqjfL0j6_jYSM4XVMYgfnrcoyPE5OjTOi2VpMr_OXhDJVIFMbytEX_ls_SgRAtHhM25bgIq8XU5CnlpNKGTwX7dQS7_702PNUGNxC6N_6INkjHgt9lWtMtUbYHaVqOviTU-cYT7sOPqu9VkQp1DtPeU5lCmB_o6qdOVnSPT6ZN7ufsZp6V8fTIaeurKc70nncGgYtTTKSS4LasUoHjcrWWQFQwBjxarR6O6klkqFGsA-Nd7x0E-E9t6yJ1aXEZnjAUCE')" }}></div>
                                <div className="chat-bubble chat-bubble-other">Alguém conhece bons restaurantes em Roma? 🍝</div>
                            </div>
                            <div className="chat-row chat-right">
                                <div className="chat-bubble chat-bubble-self">Tenta a Trattoria da Enzo! Fica no Trastevere.</div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Partilhar */}
                    <div className="glass-card feat-card-share">
                        <div className="card-hover-gradient card-hover-teal"></div>
                        <div className="card-text-block">
                            <h3 className="card-title">Partilhar</h3>
                        </div>
                        <div className="card-ui-mock share-mock">
                            <div className="share-textarea">Partilhe a sua aventura...</div>
                            <div className="share-actions">
                                <button className="share-img-btn">🖼</button>
                                <button className="share-publish-btn">Publicar</button>
                            </div>
                        </div>
                    </div>

                    {/* Card 6: Cloud Storage (wide) */}
                    <div className="glass-card feat-card-cloud">
                        <div className="card-hover-gradient card-hover-teal-subtle"></div>
                        <div className="cloud-inner">
                            <div className="cloud-left">
                                <h3 className="card-title">Cloud Storage</h3>
                                <p className="card-subtitle">Guarde todas as fotos e documentos da viagem num só lugar seguro.</p>
                                <div className="storage-meter">
                                    <div className="storage-labels">
                                        <span>Usado: 45GB</span>
                                        <span>Total: 100GB</span>
                                    </div>
                                    <div className="storage-bar">
                                        <div className="storage-fill" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="cloud-gallery">
                                <div className="gallery-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDd3rVMAyyhiqcdGrbTNZRiAu6YM9saIxZsWXYpxFOMFr2OKKp3ps-6GgyZ4YPZgUAMVZbW7THQpRPEpISu3o6mn7Gz_wrsYBbuFQtRQe7Z7ADgsEjG2wsW5RDEDpvnE4FTrbzzc-57Cbk0lvMY0iHsy_nz_12Dumm1jLeAyGpN1VtJWjOjh7_CUdltTxgN5EAXvykOFPb_LFiP0HRdqtVYv6cAabR8n-qPariqGVg65kfLx5TCE_TMcTXxm3Pmo3NQrzFfHHuIfMU')" }}></div>
                                <div className="gallery-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEwg-WWYJ6POH_-r_MOKFWPUuM6snHZQWYO7vNDHglfpBHDEee6AncrZHcXpmeXz2v8DxnLK3oS3Ke11Sk-_DEp39YbFaWqd4WrKhRVp1ixbxo-2SGly8LGuum1zrsJv0Q9rrrgvxnYCkuJjkTUZOwc_3e16l4lv_ZqsPcgIsmgCLeBjaUkUyeKdqVqjYeLBYsgKzs1ObTT-A5rF9_oFAIGLziLTMH-fxdC9I0ThmEDt27SeEiSQ4z0krJhClvDboN8BIFmjE-FCk')" }}></div>
                                <div className="gallery-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfYtgUH0Nrf6egSMAivBkPPREFibcq8N44klJ3cjfSEErP44gHm8rrKhfYQFu8y93mnUJrGQguE4AUV7BZmqlr9YX3X4L15kDfDpOo8pOdsejMMW1G86QwG_PxFhts3JpeLskfOOWq0z0rhXMr2GWWPAYFwBWNbIb4q5ptcN-qfMDd0USWqchXDsI2UQNKct-aIAhI5kxdTVftCoeCF5MM0MTh9zCppAUCM15U-BTD0JtBbzWEzJOV6AfaGq_hqwle6t08mgbvHl0')" }}></div>
                                <div className="gallery-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMSj6YRyg2Y1m1I9UvN-X_SWH4CUrkBu7QL-GOGJmWlewSnOyIFC1c0FBzrBSmCFIWbf3h-gkxVJCrnz86dgkEoqYprrtI6afqFNuShJ_ST2lN5N4HI81NS9m3x2syb-KjPE1RlO415Ztmf0D9FzBeShM30KzNWZOoG5Ks1D7RR-shL2YZt_8gZQdoOJ-14rBOLdka8BvxJwkOXJ2TAC3NAHXt7yzMzfO7qzWiHH0RNeHtsITgRS9N0kO-rA6PP_AELd-bSQ7xzO0')" }}></div>
                                <div className="gallery-thumb" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD827pffJBsXP5LIt9ydFnRw1vTJ1mnlAN9Px_-2QGM8vGI-maFStT-yURJgDN9Q7lPtMO3E2Y2oh46f3mmKzw9ltY-fJL_X-p74206oq3DtVAg9zlOdYapkva0nivZjMA0bLexxI0TmBrysB_nhtu7PGULpAqpKg2hiP0_TbHfsiHYpWxXsFXm4DZnMxP0_JFjZnEEl0bhwS08lfXWZwDqCgJHuLmVEeeN4EKp840mTp-3vFeMbu2F49ip3SgfXacG4RnG8rG28Gk')" }}></div>
                                <div className="gallery-thumb gallery-add">+</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
