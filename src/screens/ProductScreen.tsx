import React, { useState } from 'react';
import { ChevronLeft, Star, ArrowRight, Plus, Minus } from 'lucide-react';
import { C, sm } from '../constants/theme';
import { disc, PRODUCTS } from '../data/data';
import type { Product, CartState } from '../types';

interface ProdScreenProps {
    p: Product;
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    onBack: () => void;
    onGoCart: () => void;
    onOpen?: (p: Product) => void; // navigate to another product
}

const catLabel: Record<string, string> = {
    car: 'Car Care', tools: 'Tools', 'dry-fruits': 'Dry Fruits', grocery: 'Groceries',
};

const FALLBACK_ICONS: Record<string, string> = {
    car: '#DCFCE7', 'dry-fruits': '#FEF3C7', grocery: '#D1FAE5', tools: '#FEF9C3',
};

export default function ProductScreen({ p, cart, addToCart, dec, onBack, onGoCart, onOpen }: ProdScreenProps) {
    const qty = cart[p.id] || 0;
    const pct = disc(p.orig, p.price);
    const [imgError, setImgError] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    // Related products — same category, exclude current
    const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 6);

    return (
        /* Outer: flex column filling the parent scroll container */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* ── Scrollable content ── */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>

                {/* Sticky back header */}
                <div style={{
                    padding: '14px 20px', position: 'sticky', top: 0,
                    background: 'rgba(246,251,247,.96)', backdropFilter: 'blur(10px)',
                    zIndex: 10, borderBottom: `1px solid ${C.border}`,
                }}>
                    <button
                        onClick={onBack}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: C.textMid, fontFamily: 'inherit', padding: 0 }}
                    >
                        <ChevronLeft size={18} color={C.textMid} strokeWidth={2.2} /> Back
                    </button>
                </div>

                <div style={{ padding: '0 20px 28px' }}>
                    {/* Product image(s) */}
                    {p.images && p.images.length > 0 ? (
                        <>
                            <div style={{
                                height: 260,
                                background: FALLBACK_ICONS[p.cat] || '#f8f8f8',
                                borderRadius: 24, margin: '18px 0 12px',
                                position: 'relative', overflow: 'hidden', flexShrink: 0
                            }}>
                                <img src={p.images[activeImg]} alt={`${p.name} view ${activeImg + 1}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 20 }} />
                            </div>
                            {p.images.length > 1 && (
                                <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                                    {p.images.map((img, idx) => (
                                        <div key={idx} onClick={() => setActiveImg(idx)} style={{
                                            width: 60, height: 60, borderRadius: 14, cursor: 'pointer', flexShrink: 0,
                                            border: `2px solid ${activeImg === idx ? C.primary : 'transparent'}`,
                                            background: FALLBACK_ICONS[p.cat] || '#f8f8f8', position: 'relative', overflow: 'hidden',
                                            transition: 'border-color 0.2s', padding: 4
                                        }}>
                                            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{
                            height: 260,
                            background: FALLBACK_ICONS[p.cat] || '#f8f8f8',
                            borderRadius: 24, margin: '18px 0',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {p.image && !imgError ? (
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    style={{
                                        position: 'absolute', inset: 0,
                                        width: '100%', height: '100%',
                                        objectFit: 'contain', padding: 20,
                                    }}
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Star size={48} color={C.primary} strokeWidth={1.5} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tags row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                        {p.tag && <span style={{ fontSize: 10, fontWeight: 700, background: C.primary, color: '#fff', borderRadius: 7, padding: '3px 9px', textTransform: 'uppercase' }}>{p.tag}</span>}
                        {pct > 0 && <span style={{ fontSize: 10, fontWeight: 700, background: '#FEF2F2', color: '#DC2626', borderRadius: 7, padding: '3px 9px' }}>{pct}% off</span>}
                        <span style={{ fontSize: 10, fontWeight: 600, background: '#f0fdf4', color: C.primary, borderRadius: 7, padding: '3px 9px' }}>{catLabel[p.cat] || p.cat}</span>
                    </div>

                    <p style={{ fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: 4 }}>{p.name}</p>
                    <p style={{ fontSize: 13, color: C.textLight, fontWeight: 500, marginBottom: 10 }}>{p.unit}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                        <Star size={13} fill="#FBBF24" color="#FBBF24" />
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#92400E' }}>{p.rating}</span>
                        <span style={{ fontSize: 12, color: C.textLight }}>({p.reviews} reviews)</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
                        <p style={{ fontSize: 30, fontWeight: 900, color: C.primary, letterSpacing: '-1px' }}>₹{p.price.toLocaleString('en-IN')}</p>
                        {p.orig > p.price && <p style={{ fontSize: 16, color: C.textLight, textDecoration: 'line-through' }}>₹{p.orig.toLocaleString('en-IN')}</p>}
                    </div>

                    <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.75, marginBottom: 22 }}>{p.desc}</p>

                    {p.specs && (
                        <div style={{ marginBottom: 28 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Key Features</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {p.specs.map((s, i) => (
                                    <div key={i} style={{
                                        background: '#f0fdf4', borderRadius: 12, padding: '9px 12px',
                                        border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 7,
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.primary, flexShrink: 0 }} />
                                        <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Related Products ── */}
                    {related.length > 0 && (
                        <div>
                            <p style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
                                You May Also Like
                            </p>
                            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
                                {related.map(r => {
                                    const rPct = disc(r.orig, r.price);
                                    const rQty = cart[r.id] || 0;
                                    return (
                                        <div
                                            key={r.id}
                                            onClick={() => onOpen?.(r)}
                                            style={{
                                                minWidth: 130, background: C.card, borderRadius: 16,
                                                border: `1px solid ${C.border}`, cursor: 'pointer',
                                                overflow: 'hidden', flexShrink: 0,
                                                boxShadow: `0 2px 10px rgba(26,158,71,.06)`,
                                                transition: `transform .18s ${sm}`,
                                            }}
                                            onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.96)'; }}
                                            onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                                        >
                                            {/* Image */}
                                            <div style={{ height: 100, background: '#fff', position: 'relative', borderBottom: `1px solid ${C.border}` }}>
                                                {r.image ? (
                                                    <img src={r.image} alt={r.name}
                                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
                                                    />
                                                ) : (
                                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' }}>
                                                        <Star size={28} color={C.primary} strokeWidth={1.5} />
                                                    </div>
                                                )}
                                                {rPct > 0 && (
                                                    <span style={{ position: 'absolute', top: 5, right: 5, fontSize: 8, fontWeight: 700, background: '#DC2626', color: '#fff', borderRadius: 5, padding: '2px 4px' }}>
                                                        {rPct}%
                                                    </span>
                                                )}
                                            </div>
                                            {/* Info */}
                                            <div style={{ padding: '8px 10px 10px' }}>
                                                <p style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{r.name}</p>
                                                <p style={{ fontSize: 13, fontWeight: 800, color: C.primaryDark, marginTop: 6 }}>₹{r.price.toLocaleString('en-IN')}</p>
                                                <button
                                                    onClick={e => { e.stopPropagation(); addToCart(r.id, e); }}
                                                    style={{
                                                        width: '100%', marginTop: 7,
                                                        background: rQty > 0 ? '#f0fdf4' : C.primary,
                                                        color: rQty > 0 ? C.primary : '#fff',
                                                        border: 'none', borderRadius: 9, padding: '6px 0',
                                                        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                                        transition: `all .2s ${sm}`,
                                                    }}
                                                >
                                                    {rQty > 0 ? `In Cart (${rQty})` : '+ Add'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Sticky bottom action bar — static in flex column, always visible ── */}
            <div style={{
                background: '#fff',
                borderTop: `1px solid ${C.border}`,
                padding: '12px 20px max(18px, env(safe-area-inset-bottom))',
                display: 'flex', gap: 12, flexShrink: 0,
                boxShadow: '0 -4px 20px rgba(0,0,0,.06)',
            }}>
                {/* Add / qty control */}
                <div style={{
                    flex: 1, background: '#f0fdf4', borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '13px 0', gap: 16, border: `1.5px solid ${C.border}`,
                }}>
                    {qty > 0 ? <>
                        <button onClick={e => dec(p.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', display: 'flex', alignItems: 'center' }}>
                            <Minus size={18} color={C.primary} strokeWidth={2.8} />
                        </button>
                        <span style={{ fontSize: 17, fontWeight: 700, color: C.primary, minWidth: 24, textAlign: 'center' }}>{qty}</span>
                        <button onClick={e => addToCart(p.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', display: 'flex', alignItems: 'center' }}>
                            <Plus size={18} color={C.primary} strokeWidth={2.8} />
                        </button>
                    </> : (
                        <button onClick={e => addToCart(p.id, e)} style={{ background: 'none', border: 'none', fontSize: 15, fontWeight: 700, color: C.primary, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Add to Cart
                        </button>
                    )}
                </div>
                <button
                    onClick={onGoCart}
                    style={{
                        flex: 1.3, background: C.primary, color: '#fff', border: 'none', borderRadius: 16,
                        fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: `0 6px 22px rgba(26,158,71,.38)`,
                    }}
                >
                    Go to Cart <ArrowRight size={16} color="#fff" strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
