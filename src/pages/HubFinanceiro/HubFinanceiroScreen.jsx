import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, Briefcase, CreditCard, Smartphone, Banknote, 
    ArrowRightLeft, AlertTriangle, Building2, MapPin
} from 'lucide-react';
import './HubFinanceiroScreen.css';

const PAYMENT_METHODS = [
    { method: 'Visa / Mastercard', desc: 'Aceite em hotéis, supermercados e restaurantes premium. Possibilidade de taxas adicionais em alguns terminais.', icon: CreditCard, bg: '#eff6ff', color: '#3b82f6' },
    { method: 'M-Pesa / e-Mola', desc: 'Carteiras móveis essenciais. Permitem pagar quase tudo, desde táxis a pequenos comerciantes.', icon: Smartphone, bg: '#f0fdf4', color: '#10b981' },
    { method: 'Dinheiro Físico (MZN)', desc: 'Indispensável para mercados tradicionais, transportes locais (chapas) e pequenas compras fora do centro.', icon: Banknote, bg: '#fffbeb', color: '#f59e0b' },
];

const ATMS = [
    { name: 'BCI', address: 'Av. 25 de Setembro (Sede), Maputo', logo: 'BCI' },
    { name: 'Millennium BIM', address: 'Av. Julius Nyerere, Polana', logo: 'BIM' },
    { name: 'Standard Bank', address: 'Praça dos Trabalhadores', logo: 'STB' },
    { name: 'Absa Bank', address: 'Av. Marginal (Baía Mall)', logo: 'ABSA' },
];

const HubFinanceiroScreen = () => {
    const navigate = useNavigate();
    
    // Budget State
    const [budget, setBudget] = useState('50000');
    const [spent, setSpent] = useState('12500');

    // Converter State
    const [usdAmount, setUsdAmount] = useState('100');
    const exchangeRate = 63.92; // 1 USD to MZN

    const numBudget = Number(budget) || 0;
    const numSpent = Number(spent) || 0;
    const remaining = Math.max(0, numBudget - numSpent);
    const percentSpent = numBudget > 0 ? Math.min(100, (numSpent / numBudget) * 100) : 0;

    // Circle SVG math
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (percentSpent / 100) * circumference;

    const circleColor = percentSpent > 85 ? 'var(--hub-danger)' : percentSpent > 60 ? 'var(--hub-warning)' : 'var(--hub-success)';

    return (
        <div className="hub-container">
            {/* Mesh Gradient Background for Premium Feel */}
            <div className="chk-mesh-bg" />

            {/* Navigation */}
            <nav className="hub-nav">
                <button className="hub-back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <div style={{ width: 40 }} /> {/* Spacer */}
            </nav>

            {/* Main Content */}
            <main className="hub-main">
                
                <header className="hub-header">
                    <h1>Hub Financeiro</h1>
                    <p>Controle o seu orçamento, converta moedas rapidamente e descubra os melhores métodos de pagamento locais para uma viagem sem preocupações.</p>
                </header>

                <div className="hub-grid">
                    
                    {/* Left Column: Budget & Converter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Budget Tracker Card */}
                        <div className="hub-card">
                            <div className="hub-card-header" style={{ justifyContent: 'space-between', marginBottom: '32px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--hub-text-sub)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Orçamento (MZN)
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: circleColor }}>
                                    {Math.round(percentSpent)}% Gasto
                                </span>
                            </div>

                            {/* Half-Donut Chart */}
                            <div className="hub-budget-chart-container">
                                <svg className="hub-chart-svg" viewBox="0 0 200 100">
                                    <path 
                                        className="hub-chart-bg" 
                                        d="M 10 90 A 80 80 0 0 1 190 90" 
                                    />
                                    <path 
                                        className="hub-chart-fill" 
                                        d="M 10 90 A 80 80 0 0 1 190 90" 
                                        stroke={circleColor}
                                        strokeDasharray="251.2" 
                                        strokeDashoffset={251.2 - (percentSpent / 100) * 251.2}
                                    />
                                </svg>
                                <div className="hub-chart-text">
                                    <div className="hub-chart-label">Saldo Restante</div>
                                    <div className="hub-chart-balance">
                                        {remaining.toLocaleString('pt-MZ')} MT
                                    </div>
                                </div>
                            </div>

                            {/* Stripe-style Form Inputs */}
                            <div className="hub-form-group">
                                <label className="hub-label">Orçamento Total</label>
                                <div className="hub-input-wrapper">
                                    <span className="hub-input-currency">MT</span>
                                    <input 
                                        type="number" 
                                        className="hub-input" 
                                        value={budget} 
                                        onChange={(e) => setBudget(e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            
                            <div className="hub-form-group" style={{ marginBottom: 0 }}>
                                <label className="hub-label">Total Gasto</label>
                                <div className="hub-input-wrapper">
                                    <span className="hub-input-currency">MT</span>
                                    <input 
                                        type="number" 
                                        className="hub-input" 
                                        value={spent} 
                                        onChange={(e) => setSpent(e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Converter Card */}
                        <div className="hub-card">
                            <div className="hub-card-header" style={{ marginBottom: '16px' }}>
                                <div className="hub-card-icon" style={{ background: '#F1F5F9', color: 'var(--hub-accent)' }}>
                                    <ArrowRightLeft size={20} />
                                </div>
                                <h2 className="hub-card-title">Câmbio Rápido</h2>
                            </div>
                            
                            <div className="hub-form-group" style={{ marginBottom: 0 }}>
                                <label className="hub-label">Valor (USD)</label>
                                <div className="hub-input-wrapper">
                                    <span className="hub-input-currency">$</span>
                                    <input 
                                        type="number" 
                                        className="hub-input" 
                                        value={usdAmount} 
                                        onChange={(e) => setUsdAmount(e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="hub-converter-row">
                                <div className="hub-converter-col">
                                    <div className="hub-converter-label">Recebe aprox. (MZN)</div>
                                    <div className="hub-converter-value">
                                        {((Number(usdAmount) || 0) * exchangeRate).toLocaleString('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MT
                                    </div>
                                </div>
                                <div className="hub-converter-icon">
                                    <Banknote size={24} strokeWidth={1.5} />
                                </div>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--hub-text-light)', marginTop: '8px', textAlign: 'right' }}>
                                Taxa atual: 1 USD = {exchangeRate} MZN
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Payments & ATMs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Payment Methods */}
                        <div className="hub-card" style={{ padding: '24px 32px' }}>
                            <h3 style={{ fontSize: '18px', color: 'var(--hub-text-main)', margin: '0 0 20px 0' }}>Meios de Pagamento</h3>
                            <div className="hub-methods-grid">
                                {PAYMENT_METHODS.map(pm => {
                                    const Icon = pm.icon;
                                    return (
                                        <div key={pm.method} className="hub-method-item">
                                            <div className="hub-method-icon" style={{ background: pm.bg, color: pm.color }}>
                                                <Icon size={24} strokeWidth={2} />
                                            </div>
                                            <div className="hub-method-content">
                                                <div className="hub-method-title">{pm.method}</div>
                                                <div className="hub-method-desc">{pm.desc}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="hub-alert">
                                <AlertTriangle size={20} color="#FF7B00" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <div className="hub-alert-content">
                                    <h4>Atenção às Taxas de Cartão</h4>
                                    <p>Alguns terminais locais cobram uma taxa fixa ou percentual adicional ao pagar com cartões estrangeiros. Pergunte sempre antes de pagar.</p>
                                </div>
                            </div>
                        </div>

                        {/* ATMs */}
                        <div className="hub-card" style={{ padding: '24px 32px' }}>
                            <div className="hub-card-header" style={{ marginBottom: '20px' }}>
                                <div className="hub-card-icon" style={{ background: '#F1F5F9', color: 'var(--hub-text-main)' }}>
                                    <Building2 size={20} />
                                </div>
                                <h2 className="hub-card-title">ATMs Recomendados (Seguros)</h2>
                            </div>

                            <div className="hub-atm-list">
                                {ATMS.map(atm => (
                                    <div key={atm.name} className="hub-atm-item">
                                        <div className="hub-atm-logo">{atm.logo}</div>
                                        <div className="hub-atm-info">
                                            <h4>{atm.name}</h4>
                                            <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <MapPin size={12} /> {atm.address}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default HubFinanceiroScreen;
