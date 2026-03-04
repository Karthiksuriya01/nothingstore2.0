import React from 'react';
import { ChevronLeft, Star, ArrowRight, Plus, Minus } from 'lucide-react';
import { C, CAT_BG } from '../constants/theme';
import { disc } from '../data/products';
import type { Product, CartState } from '../types';
import ProductImage from '../components/ProductImage';

interface ProdScreenProps {
    p: Product;
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    onBack: () => void;
    onGoCart: () => void;
}

const catLabel: Record<string, string> = {
    car: 'Car Care',
    tools: 'Tools',
    'dry-fruits': 'Dry Fruits',
    grocery: 'Groceries',
};

export default function ProductScreen({ p, cart, addToCart, dec, onBack, onGoCart }: ProdScreenProps) {
    const qty = cart[p.id] || 0;
    const pct = disc(p.orig, p.price);

    return (
        <div style={{ background: C.bg, minHeight: '100vh' }}>
            {/* Back header */}
            <div style={{
                padding: '16px 20px', position: 'sticky', top: 0,
                background: 'rgba(246,251,247,.95)', backdropFilter: 'blur(10px)',
                zIndex: 10, borderBottom: `1px solid ${C.border}`,
            }}>
                <button
                    onClick={onBack}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: C.textMid, fontFamily: 'inherit', padding: 0 }}
                >
                    <ChevronLeft size={18} color={C.textMid} strokeWidth={2.2} /> Back
                </button>
            </div>

            <div style={{ padding: '0 20px 140px' }}>
                {/* Product image */}
                <div style={{
                    height: 250, background: CAT_BG[p.cat] || C.primaryBg, borderRadius: 24,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '18px 0', boxShadow: `0 4px 20px rgba(26,158,71,.1)`,
                }}>
                    <ProductImage id={p.id} size={160} radius={20} />
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    {p.tag && <span style={{ fontSize: 10, fontWeight: 700, background: C.primary, color: '#fff', borderRadius: 7, padding: '3px 9px', textTransform: 'uppercase' }}>{p.tag}</span>}
                    {pct > 0 && <span style={{ fontSize: 10, fontWeight: 700, background: '#FEF2F2', color: '#DC2626', borderRadius: 7, padding: '3px 9px' }}>{pct}% off</span>}
                    <span style={{ fontSize: 10, fontWeight: 600, background: C.primaryBg, color: C.primary, borderRadius: 7, padding: '3px 9px' }}>{catLabel[p.cat] || p.cat}</span>
                </div>

                <p style={{ fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: 5 }}>{p.name}</p>
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

                <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>

                {p.specs && (
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Key Features</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {p.specs.map((s, i) => (
                                <div key={i} style={{
                                    background: C.primarySoft, borderRadius: 12, padding: '9px 12px',
                                    border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 7,
                                }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.primary, flexShrink: 0 }} />
                                    <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fixed bottom bar */}
            <div style={{
                position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '100%', maxWidth: 430, background: '#fff',
                borderTop: `1px solid ${C.border}`, padding: '12px 20px 22px',
                display: 'flex', gap: 12, zIndex: 50,
            }}>
                {/* Add/qty control */}
                <div style={{
                    flex: 1, background: C.primarySoft, borderRadius: 16,
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
