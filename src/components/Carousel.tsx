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
                        minWidth: '100%', height: '100%',
                        position: 'relative', flexShrink: 0,
                        overflow: 'hidden',
                        background: b.grad,      /* fallback if image fails */
                    }}>
                        {/* Full-bleed banner image */}
                        {b.image && (
                            <img
                                src={b.image}
                                alt={b.title}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        )}

                        {/* Dark gradient overlay — only on the left so text is readable */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 55%, transparent 100%)',
                        }} />

                        {/* Text on the left */}
                        <div style={{
                            position: 'relative', zIndex: 1,
                            height: '100%',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            padding: '0 24px',
                            maxWidth: '62%',
                        }}>
                            <span style={{
                                display: 'inline-block',
                                fontSize: 10, fontWeight: 700,
                                background: 'rgba(255,255,255,.2)',
                                backdropFilter: 'blur(4px)',
                                color: '#fff', borderRadius: 20,
                                padding: '3px 11px',
                                letterSpacing: .8, textTransform: 'uppercase',
                                width: 'fit-content',
                                marginBottom: 10,
                            }}>{b.tag}</span>
                            <p style={{
                                fontSize: 21, fontWeight: 800, color: '#fff',
                                letterSpacing: '-0.6px', lineHeight: 1.22,
                                marginBottom: 6,
                                textShadow: '0 1px 6px rgba(0,0,0,.3)',
                            }}>{b.title}</p>
                            <p style={{
                                fontSize: 12.5, color: 'rgba(255,255,255,.82)',
                                lineHeight: 1.5,
                                textShadow: '0 1px 4px rgba(0,0,0,.3)',
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
                        background: i === idx ? '#fff' : 'rgba(255,255,255,.4)',
                        transition: `width .35s ${sm}`, cursor: 'pointer',
                    }} />
                ))}
            </div>
        </div>
    );
}
