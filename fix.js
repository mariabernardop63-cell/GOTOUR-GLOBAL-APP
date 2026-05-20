const fs = require('fs');
const filepath = "c:\\Users\\MY PC\\OneDrive\\Desktop\\New folder\\src\\pages\\Messages\\MessagesScreen.jsx";

const content = fs.readFileSync(filepath, 'utf8');
const lines = content.split('\n');

const newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Line 228 is index 227
    if (i === 227) {
        newLines.push(line);
        newLines.push('        <div className="messages-layout premium-redesign">');
        newLines.push('            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />');
        newLines.push('');
        skip = true;
        continue;
    }
    
    if (skip && i === 544) {
        skip = false;
        newLines.push(line);
        continue;
    }
    
    if (skip) {
        continue;
    }
    
    if (line.trim() === "{/* Gemini FAB - Hide on mobile when chat is active */}") {
        const sidebarCode = `
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
                                <button key={c.id} className="comm-rect-card" style={{ backgroundImage: \`url(\${c.bg})\` }}>
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
`;
        newLines.push(sidebarCode);
        newLines.push(line);
        continue;
    }
    
    newLines.push(line);
}

fs.writeFileSync(filepath, newLines.join('\\n'), 'utf8');
console.log("DOM Fixed by Node.js!");
