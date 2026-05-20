import sys
import os

filepath = r"c:\Users\MY PC\OneDrive\Desktop\New folder\src\pages\Messages\MessagesScreen.jsx"
with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if i == 227:
        new_lines.append(line)
        new_lines.append('        <div className="messages-layout premium-redesign">\n')
        new_lines.append('            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />\n\n')
        skip = True
        continue
    if skip and i == 544:
        skip = False
        new_lines.append(line)
        continue
    if skip:
        continue
    if line.strip() == "{/* Gemini FAB - Hide on mobile when chat is active */}":
        sidebar_code = """
            {/* Communities Sidebar (Desktop Only) */}
            <div className="comm-sidebar desktop-only">
                <div className="comm-sidebar-header">
                    <img src={gotourLogo} alt="GoTour" className="comm-logo" />
                    <h2 className="comm-title">Comunidades</h2>
                </div>
                
                <div className="comm-search-area">
                    <div className="msg-search-wrapper" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <Search className="msg-search-icon" size={18} />
                        <input
                            type="text"
                            className="msg-search-input"
                            style={{ background: 'transparent', border: 'none', height: '44px' }}
                            placeholder="Pesquisar..."
                        />
                    </div>
                </div>

                <div className="comm-scroll-view premium-scroll">
                    <div className="comm-section">
                        <h3 className="comm-subtitle">Recomendados</h3>
                        <div className="comm-h-scroll">
                            {mockCommunitiesLists.map(c => (
                                <button key={c.id} className="comm-circle-card">
                                    <div className="comm-circle-img-wrap"><img src={c.image} alt={c.name} /></div>
                                    <span className="comm-card-name" title={c.name}>{c.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="comm-section">
                        <div className="comm-h-scroll">
                            {mockRectCommunitiesLists.map(c => (
                                <button key={c.id} className="comm-rect-card" style={{ backgroundImage: `url(${c.bg})` }}>
                                    <div className="comm-rect-overlay"></div>
                                    <span className="comm-rect-name">{c.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="comm-section others-section">
                        <h2 className="comm-others-header">Outros</h2>
                        
                        <h3 className="comm-subtitle">Turismo</h3>
                        <div className="comm-h-scroll">
                            {mockCommunitiesLists.slice().reverse().map(c => (
                                <button key={c.id} className="comm-circle-card"><div className="comm-circle-img-wrap"><img src={c.image} /></div><span className="comm-card-name" title={c.name}>{c.name}</span></button>
                            ))}
                        </div>

                        <h3 className="comm-subtitle">Estudantes</h3>
                        <div className="comm-h-scroll">
                            {mockCommunitiesLists.slice(1).concat(mockCommunitiesLists[0]).map(c => (
                                <button key={c.id} className="comm-circle-card"><div className="comm-circle-img-wrap"><img src={c.image} /></div><span className="comm-card-name" title={c.name}>{c.name}</span></button>
                            ))}
                        </div>

                        <h3 className="comm-subtitle">Homens de negócios</h3>
                        <div className="comm-h-scroll">
                            {mockCommunitiesLists.slice().reverse().map(c => (
                                <button key={c.id} className="comm-circle-card"><div className="comm-circle-img-wrap"><img src={c.image} /></div><span className="comm-card-name" title={c.name}>{c.name}</span></button>
                            ))}
                        </div>

                        <h3 className="comm-subtitle">Amadores da natureza</h3>
                        <div className="comm-h-scroll">
                            {mockCommunitiesLists.map(c => (
                                <button key={c.id} className="comm-circle-card"><div className="comm-circle-img-wrap"><img src={c.image} /></div><span className="comm-card-name" title={c.name}>{c.name}</span></button>
                            ))}
                        </div>

                        <h3 className="comm-subtitle">África</h3>
                        <div className="comm-h-scroll">
                            {mockCommunitiesLists.slice(2).concat(mockCommunitiesLists.slice(0, 2)).map(c => (
                                <button key={c.id} className="comm-circle-card"><div className="comm-circle-img-wrap"><img src={c.image} /></div><span className="comm-card-name" title={c.name}>{c.name}</span></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
"""
        new_lines.append(sidebar_code)
        new_lines.append(line)
        continue
    new_lines.append(line)

with open(filepath, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Fix applied successfully!")
