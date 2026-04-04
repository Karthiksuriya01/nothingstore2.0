import { useState } from 'react';
import { BANNERS } from '../data/data';
import { useInterval } from '../hooks/useInterval';

export default function Carousel() {
    const [idx, setIdx] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    const goTo = (i: number) => {
        setIdx(i);
        setAnimKey(k => k + 1);
    };

    useInterval(() => goTo((idx + 1) % BANNERS.length), 7000);

    return (
        <div style={{
            margin: '0px 0px 0', borderRadius: 0, overflow: 'hidden',
            position: 'relative', height: 210,
        }}>
            <style>{`
                @keyframes bannerTag {
                    from { opacity: 0; transform: translateY(12px) scale(0.88); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes bannerTitle {
                    from { opacity: 0; transform: translateX(-30px); filter: blur(4px); }
                    to   { opacity: 1; transform: translateX(0); filter: blur(0); }
                }
                @keyframes bannerSub {
                    from { opacity: 0; transform: translateY(10px); filter: blur(2px); }
                    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                @keyframes bannerZoom {
                    from { transform: scale(1.08); }
                    to   { transform: scale(1); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes dotPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
                    50%      { box-shadow: 0 0 0 3px rgba(255,255,255,0.1); }
                }
            `}</style>

            {/* Slide strip */}
            <div style={{
                display: 'flex', height: '100%',
                transition: `transform .65s cubic-bezier(0.22, 1, 0.36, 1)`,
                transform: `translateX(-${idx * 100}%)`,
            }}>
                {BANNERS.map((b, i) => (
                    <div key={i} style={{
                        minWidth: '100%', height: '100%',
                        position: 'relative', flexShrink: 0,
                        overflow: 'hidden',
                        background: b.grad,
                    }}>
                        {/* Full-bleed image with zoom animation */}
                        {b.image && (
                            <img
                                key={`img-${animKey}-${i}`}
                                src={b.image}
                                alt={b.title}
                                style={{
                                    position: 'absolute', inset: 0,
                                    width: '100%', height: '100%',
                                    objectFit: 'cover', objectPosition: 'center',
                                    ...(i === idx ? {
                                        animation: 'bannerZoom 4s ease-out forwards',
                                    } : {}),
                                }}
                            />
                        )}

                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)',
                        }} />
                        {/* Bottom vignette */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)',
                        }} />

                        {/* Animated text */}
                        <div style={{
                            position: 'relative', zIndex: 1,
                            height: '100%',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            padding: '0 24px',
                            maxWidth: '62%',
                        }}>
                            {/* Tag pill with shimmer */}
                            <span
                                key={`tag-${animKey}-${i}`}
                                style={{
                                    display: 'inline-block', width: 'fit-content',
                                    fontSize: 10, fontWeight: 700,
                                    background: i === idx
                                        ? 'linear-gradient(90deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.32) 50%, rgba(255,255,255,.18) 100%)'
                                        : 'rgba(255,255,255,.2)',
                                    backgroundSize: '200% 100%',
                                    backdropFilter: 'blur(6px)',
                                    WebkitBackdropFilter: 'blur(6px)',
                                    color: '#fff', borderRadius: 20,
                                    padding: '4px 12px', letterSpacing: .8,
                                    textTransform: 'uppercase', marginBottom: 10,
                                    border: '1px solid rgba(255,255,255,.15)',
                                    ...(i === idx ? {
                                        animation: 'bannerTag .5s cubic-bezier(0.34,1.56,0.64,1) 0.05s both, shimmer 2s ease-in-out 0.6s 1',
                                    } : { opacity: 1 }),
                                }}
                            >{b.tag}</span>

                            {/* Title */}
                            <p
                                key={`title-${animKey}-${i}`}
                                style={{
                                    fontSize: 22, fontWeight: 800, color: '#fff',
                                    letterSpacing: '-0.6px', lineHeight: 1.22,
                                    marginBottom: 7,
                                    textShadow: '0 2px 8px rgba(0,0,0,.4)',
                                    ...(i === idx ? {
                                        animation: 'bannerTitle .55s cubic-bezier(0.25,0.46,0.45,0.94) 0.12s both',
                                    } : { opacity: 1 }),
                                }}
                            >{b.title}</p>

                            {/* Subtitle */}
                            <p
                                key={`sub-${animKey}-${i}`}
                                style={{
                                    fontSize: 12.5, color: 'rgba(255,255,255,.85)',
                                    lineHeight: 1.55,
                                    textShadow: '0 1px 4px rgba(0,0,0,.3)',
                                    ...(i === idx ? {
                                        animation: 'bannerSub .5s cubic-bezier(0.25,0.46,0.45,0.94) 0.25s both',
                                    } : { opacity: 1 }),
                                }}
                            >{b.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot indicators — pill style with active pulse */}
            <div style={{ position: 'absolute', bottom: 14, left: 24, display: 'flex', gap: 6, alignItems: 'center' }}>
                {BANNERS.map((_, i) => (
                    <div key={i} onClick={() => goTo(i)} style={{
                        width: i === idx ? 24 : 6, height: 6, borderRadius: 10,
                        background: i === idx ? '#fff' : 'rgba(255,255,255,.4)',
                        transition: `all .4s cubic-bezier(0.22, 1, 0.36, 1)`,
                        cursor: 'pointer',
                        ...(i === idx ? {
                            animation: 'dotPulse 2s ease-in-out infinite',
                        } : {}),
                    }} />
                ))}
            </div>
        </div>
    );
}
