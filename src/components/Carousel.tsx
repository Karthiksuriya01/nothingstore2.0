import React, { useState } from 'react';

import * as LucideIcons from 'lucide-react';
import { sm } from '../constants/theme';
import { BANNERS } from '../data/categories';
import { useInterval } from '../hooks/useInterval';

export default function Carousel() {
    const [idx, setIdx] = useState(0);
    useInterval(() => setIdx(i => (i + 1) % BANNERS.length), 3500);

    return (
        <div style={{
            margin: '18px 18px 0', borderRadius: 24, overflow: 'hidden',
            position: 'relative', height: 190, boxShadow: `0 8px 30px rgba(21,128,61,.18)`,
        }}>
            <div style={{
                display: 'flex', height: '100%',
                transition: `transform .58s ${sm}`,
                transform: `translateX(-${idx * 100}%)`,
            }}>
                {BANNERS.map((b, i) => {
                    const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[b.icon];
                    return (
                        <div key={i} style={{
                            minWidth: '100%', height: '100%', background: b.grad,
                            position: 'relative', flexShrink: 0,
                            display: 'flex', alignItems: 'center', padding: '0 28px', overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', right: -40, top: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
                            <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,.18))' }}>
                                {IconComp && <IconComp size={72} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />}
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,.2)', color: '#fff', borderRadius: 20, padding: '3px 11px', letterSpacing: .8, textTransform: 'uppercase' }}>{b.tag}</span>
                                <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.7px', marginTop: 10, lineHeight: 1.2, maxWidth: 195 }}>{b.title}</p>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.72)', marginTop: 6, maxWidth: 175, lineHeight: 1.5 }}>{b.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: 14, left: 28, display: 'flex', gap: 6 }}>
                {BANNERS.map((_, i) => (
                    <div key={i} onClick={() => setIdx(i)} style={{
                        width: i === idx ? 22 : 6, height: 6, borderRadius: 10,
                        background: i === idx ? '#fff' : 'rgba(255,255,255,.35)',
                        transition: `width .35s ${sm}`, cursor: 'pointer',
                    }} />
                ))}
            </div>
        </div>
    );
}
