import { useState } from 'react';
import { sm } from '../constants/theme';
import { BANNERS } from '../data/categories';
import { useInterval } from '../hooks/useInterval';

export default function Carousel() {
    const [idx, setIdx] = useState(0);
    const [animKey, setAnimKey] = useState(0); // bump to re-trigger text animation

    const goTo = (i: number) => {
        setIdx(i);
        setAnimKey(k => k + 1);
    };

    useInterval(() => goTo((idx + 1) % BANNERS.length), 3500);

    return (
        <div style={{
            margin: '0px 0px 0', borderRadius: 0, overflow: 'hidden',
            position: 'relative', height: 190,
        }}>
            {/* Keyframe animations injected inline */}
            <style>{`
                @keyframes bannerTag {
                    from { opacity: 0; transform: translateY(10px) scale(0.92); }
                    to   { opacity: 1; transform: translateY(0)   scale(1); }
                }
                @keyframes bannerTitle {
                    from { opacity: 0; transform: translateX(-22px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes bannerSub {
                    from { opacity: 0; transform: translateX(-14px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            {/* Slide strip */}
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
                        background: b.grad,
                    }}>
                        {/* Full-bleed image */}
                        {b.image && (
                            <img
                                src={b.image}
                                alt={b.title}
                                style={{
                                    position: 'absolute', inset: 0,
                                    width: '100%', height: '100%',
                                    objectFit: 'cover', objectPosition: 'center',
                                }}
                            />
                        )}

                        {/* Left-only dark overlay for text readability */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 55%, transparent 100%)',
                        }} />

                        {/* Animated text — only animate the active slide */}
                        <div style={{
                            position: 'relative', zIndex: 1,
                            height: '100%',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            padding: '0 24px',
                            maxWidth: '62%',
                        }}>
                            {/* Tag pill */}
                            <span
                                key={`tag-${animKey}-${i}`}
                                style={{
                                    display: 'inline-block', width: 'fit-content',
                                    fontSize: 10, fontWeight: 700,
                                    background: 'rgba(255,255,255,.2)',
                                    backdropFilter: 'blur(4px)',
                                    color: '#fff', borderRadius: 20,
                                    padding: '3px 11px', letterSpacing: .8,
                                    textTransform: 'uppercase', marginBottom: 10,
                                    ...(i === idx ? {
                                        animation: 'bannerTag .45s cubic-bezier(0.34,1.56,0.64,1) 0.05s both',
                                    } : { opacity: 1 }),
                                }}
                            >{b.tag}</span>

                            {/* Title */}
                            <p
                                key={`title-${animKey}-${i}`}
                                style={{
                                    fontSize: 21, fontWeight: 800, color: '#fff',
                                    letterSpacing: '-0.6px', lineHeight: 1.22,
                                    marginBottom: 6,
                                    textShadow: '0 1px 6px rgba(0,0,0,.3)',
                                    ...(i === idx ? {
                                        animation: 'bannerTitle .52s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s both',
                                    } : { opacity: 1 }),
                                }}
                            >{b.title}</p>

                            {/* Subtitle */}
                            <p
                                key={`sub-${animKey}-${i}`}
                                style={{
                                    fontSize: 12.5, color: 'rgba(255,255,255,.82)',
                                    lineHeight: 1.5,
                                    textShadow: '0 1px 4px rgba(0,0,0,.3)',
                                    ...(i === idx ? {
                                        animation: 'bannerSub .52s cubic-bezier(0.25,0.46,0.45,0.94) 0.26s both',
                                    } : { opacity: 1 }),
                                }}
                            >{b.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: 14, left: 24, display: 'flex', gap: 6 }}>
                {BANNERS.map((_, i) => (
                    <div key={i} onClick={() => goTo(i)} style={{
                        width: i === idx ? 22 : 6, height: 6, borderRadius: 10,
                        background: i === idx ? '#fff' : 'rgba(255,255,255,.4)',
                        transition: `width .35s ${sm}`, cursor: 'pointer',
                    }} />
                ))}
            </div>
        </div>
    );
}
