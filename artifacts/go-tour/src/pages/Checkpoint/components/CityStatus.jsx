import React from 'react';
import { ShieldAlert, Activity, Users, Thermometer } from 'lucide-react';

const CityStatus = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            
            {/* Safety Score */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div>
                    <div style={{ fontSize: '11px', color: 'var(--tic-text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Global Safety Score</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--tic-accent)', lineHeight: 1 }}>92<span style={{ fontSize: '16px', color: 'var(--tic-text-secondary)' }}>/100</span></div>
                </div>
                <ShieldAlert size={32} color="var(--tic-accent)" strokeWidth={1.5} />
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--tic-border)' }}>
                    <Activity size={14} color="var(--tic-text-secondary)" style={{ marginBottom: '8px' }} />
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--tic-text-primary)' }}>Normal</div>
                    <div style={{ fontSize: '10px', color: 'var(--tic-text-tertiary)', textTransform: 'uppercase' }}>Threat Level</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--tic-border)' }}>
                    <Users size={14} color="var(--tic-text-secondary)" style={{ marginBottom: '8px' }} />
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--tic-text-primary)' }}>High</div>
                    <div style={{ fontSize: '10px', color: 'var(--tic-text-tertiary)', textTransform: 'uppercase' }}>Crowd Density</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <Thermometer size={14} color="var(--tic-warning)" style={{ marginBottom: '8px' }} />
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--tic-warning)' }}>31°C</div>
                    <div style={{ fontSize: '10px', color: 'var(--tic-warning)', textTransform: 'uppercase', opacity: 0.8 }}>Heat Warning</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--tic-border)' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--tic-accent)', marginBottom: '8px' }} />
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--tic-text-primary)' }}>Active</div>
                    <div style={{ fontSize: '10px', color: 'var(--tic-text-tertiary)', textTransform: 'uppercase' }}>Police Patrols</div>
                </div>
            </div>

        </div>
    );
};

export default CityStatus;
