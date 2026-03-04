import React, { useState } from 'react';
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
                {BANNERS.map((b, i) => (
                    <div key={i} style={{
                        minWidth: '100%', height: '100%', background: b.grad,
                        position: 'relative', flexShrink: 0,
                        display: 'flex', alignItems: 'center', padding: '0 24px', overflow: 'hidden',
                    }}>
                        {/* decorative circle */}
                        <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />

                        {/* banner image on the right */}
                        {b.image && (
                            <img
                                src={b.image}
                                alt={b.title}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    height: '100%',
                                    width: '52%',
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                    maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)',
                                    pointerEvents: 'none',
                                }}
                            />
                        )}

                        {/* text on the left */}
                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '54%' }}>
                            <span style={{
                                fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,.22)',
                                color: '#fff', borderRadius: 20, padding: '3px 11px',
                                letterSpacing: .8, textTransform: 'uppercase',
                            }}>{b.tag}</span>
                            <p style={{
                                fontSize: 21, fontWeight: 800, color: '#fff',
                                letterSpacing: '-0.7px', marginTop: 10, lineHeight: 1.22,
                            }}>{b.title}</p>
                            <p style={{
                                fontSize: 12.5, color: 'rgba(255,255,255,.75)',
                                marginTop: 6, lineHeight: 1.5,
                            }}>{b.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* dot indicators */}
            <div style={{ position: 'absolute', bottom: 14, left: 24, display: 'flex', gap: 6 }}>
                {BANNERS.map((_, i) => (
                    <div key={i} onClick={() => setIdx(i)} style={{
                        width: i === idx ? 22 : 6, height: 6, borderRadius: 10,
                        background: i === idx ? '#fff' : 'rgba(255,255,255,.38)',
                        transition: `width .35s ${sm}`, cursor: 'pointer',
                    }} />
                ))}
            </div>
        </div>
    );
}
