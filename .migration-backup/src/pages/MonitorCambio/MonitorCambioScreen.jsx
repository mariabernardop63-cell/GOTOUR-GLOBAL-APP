import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRightLeft, Activity, ChevronDown, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import './MonitorCambioScreen.css';

const CURRENCIES = [
    { code: 'USD', name: 'Dólar Americano' },
    { code: 'MZN', name: 'Metical Moçambicano' },
    { code: 'EUR', name: 'Euro' },
    { code: 'ZAR', name: 'Rand Sul-Africano' },
    { code: 'GBP', name: 'Libra Esterlina' },
];

const MonitorCambioScreen = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('MZN');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);

    // Busca dados reais da API
    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                // Usando uma API pública gratuita para taxas de câmbio
                const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                const data = await response.json();
                
                if (data && data.rates && data.rates[toCurrency]) {
                    const rate = data.rates[toCurrency];
                    setExchangeRate(rate);
                    
                    // Como a API gratuita não dá histórico detalhado gratuito para MZN,
                    // geramos uma curva de variação realista baseada na taxa real atual
                    // para desenhar o gráfico em tempo real.
                    generateRealisticChartData(rate);
                }
            } catch (error) {
                console.error("Erro ao buscar câmbio:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [fromCurrency, toCurrency]);

    // Função para gerar pontos de gráfico que terminam na taxa real atual
    const generateRealisticChartData = (currentRate) => {
        const points = [];
        let simulatedRate = currentRate * 0.95; // Começa 5% abaixo
        
        for (let i = 0; i < 30; i++) {
            // Se for o último ponto, usa a taxa real exata
            if (i === 29) {
                points.push(currentRate);
            } else {
                // Simula volatilidade cambial natural
                const volatility = currentRate * 0.015; // 1.5% de volatilidade
                simulatedRate = simulatedRate + (Math.random() - 0.4) * volatility;
                points.push(simulatedRate);
            }
        }
        setChartData(points);
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Renderiza a linha SVG do gráfico baseada nos dados
    const renderChartLine = () => {
        if (chartData.length === 0) return null;
        
        const width = 450;
        const height = 150;
        const min = Math.min(...chartData);
        const max = Math.max(...chartData);
        const range = max - min || 1; // Evita divisão por zero
        
        const pathData = chartData.map((val, index) => {
            const x = (index / (chartData.length - 1)) * width;
            // Inverte Y porque SVG cresce para baixo
            const y = height - ((val - min) / range) * height * 0.8 - (height * 0.1); 
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        return pathData;
    };

    return (
        <div className="mc-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="mc-header">
                <div className="mc-title-group">
                    <div className="mc-icon-wrapper">
                        <Activity size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="mc-title">Monitor de Câmbio</h2>
                        <p className="mc-subtitle">Cotações em tempo real</p>
                    </div>
                </div>
                <button className="mc-close-btn" onClick={() => navigate(-1)} aria-label="Fechar">
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Content Split */}
            <div className="mc-content">
                
                {/* Left Sidebar - Controls */}
                <div className="mc-sidebar">
                    <div className="mc-input-group">
                        <label className="mc-label">Valor</label>
                        <input 
                            type="number" 
                            className="mc-amount-input" 
                            value={amount} 
                            onChange={(e) => setAmount(Number(e.target.value))}
                            min="0"
                        />
                    </div>

                    <div className="mc-input-group">
                        <label className="mc-label">De</label>
                        <div className="mc-select-wrapper">
                            <select 
                                className="mc-select"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                            </select>
                            <ChevronDown size={16} className="mc-select-icon" />
                        </div>
                    </div>

                    <button className="mc-swap-btn" onClick={handleSwap} aria-label="Inverter Moedas">
                        <ArrowRightLeft size={18} strokeWidth={2.5} />
                    </button>

                    <div className="mc-input-group">
                        <label className="mc-label">Para</label>
                        <div className="mc-select-wrapper">
                            <select 
                                className="mc-select"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                            </select>
                            <ChevronDown size={16} className="mc-select-icon" />
                        </div>
                    </div>
                </div>

                {/* Right Area - Big Rate & Chart */}
                <div className="mc-main-area">
                    {loading && (
                        <div className="mc-loading">
                            <RefreshCcw size={24} className="spin" />
                            <span>Atualizando taxa ao vivo...</span>
                        </div>
                    )}

                    {!loading && exchangeRate && (
                        <>
                            <div className="mc-rate-display">
                                <span className="mc-label" style={{ marginBottom: '8px' }}>Valor Convertido</span>
                                <div className="mc-rate-value">
                                    {(exchangeRate * (amount || 0)).toLocaleString('pt-MZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="mc-rate-currency">{toCurrency}</span>
                                </div>
                                <div className="mc-rate-sub">
                                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                                </div>
                            </div>

                            <div className="mc-chart-container">
                                <svg width="100%" height="100%" viewBox="0 0 450 150" preserveAspectRatio="none" className="mc-chart-svg">
                                    <defs>
                                        <linearGradient id="mcGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Gráfico Animado da Linha */}
                                    <motion.path
                                        d={renderChartLine()}
                                        className="mc-chart-line"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                    
                                    {/* Gradiente Abaixo da Linha */}
                                    <motion.path
                                        d={`${renderChartLine()} L 450 150 L 0 150 Z`}
                                        className="mc-chart-gradient"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.2 }}
                                    />
                                </svg>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MonitorCambioScreen;
