import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { C, sm } from '../../constants/theme';
import { disc, PRODUCTS } from '../../data/products';
import type { Product, CartState } from '../../types';
import { Droplets, FlaskConical, Leaf, ShoppingBasket, Wrench } from 'lucide-react';
import AddToCartControl from '../AddToCartControl';

const FALLBACK_ICONS: Record<string, React.ElementType> = {
    car: Droplets, 'dry-fruits': Leaf, grocery: ShoppingBasket,
    tools: Wrench, additive: FlaskConical, 'fuel-additive': FlaskConical,
};

interface GridCardProps {
    p: Product;
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    floatMap: Record<number, number>;
    onOpen: () => void;
}

export default function GridCard({ p, cart, addToCart, dec, floatMap, onOpen }: GridCardProps) {
    const qty = cart[p.id] || 0;
    const fresh = floatMap[p.id] && Date.now() - floatMap[p.id] < 700;
    const pct = disc(p.orig, p.price);
    const [imgError, setImgError] = useState(false);
    const FallbackIcon = FALLBACK_ICONS[p.sub ?? p.cat] || Droplets;

    return (
        <div
            onClick={onOpen}
            style={{
                background: C.card, borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${C.border}`,
                boxShadow: `0 2px 14px rgba(26,158,71,.06)`,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',   /* equal card heights */
                transition: `transform .18s ${sm}`,
            }}
            onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
        >
            {/* ── Image zone — image fills the full area ── */}
            <div style={{
                height: 150,
                background: '#fff',
                position: 'relative',
                borderBottom: `1px solid ${C.border}`,
            }}>
                {p.image && !imgError ? (
                    <img
                        src={p.image}
                        alt={p.name}
                        style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'contain',
                            padding: '10px',          /* breathing room, no border */
                        }}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: C.primaryBg,
                    }}>
                        <FallbackIcon size={40} color={C.primary} />
                    </div>
                )}

                {/* +1 float */}
                {fresh && (
                    <div style={{
                        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                        fontSize: 11, fontWeight: 800, color: C.primary,
                        background: 'rgba(255,255,255,.95)', borderRadius: 20, padding: '2px 9px',
                        animation: `floatUp .65s ${sm} forwards`, pointerEvents: 'none', whiteSpace: 'nowrap',
                    }}>+1 ✓</div>
                )}

                {/* Tag badge */}
                {p.tag && (
                    <span style={{
                        position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 700,
                        background: C.primary, color: '#fff', borderRadius: 6,
                        padding: '3px 7px', letterSpacing: .4, textTransform: 'uppercase',
                    }}>{p.tag}</span>
                )}

                {/* Discount badge */}
                {pct > 0 && (
                    <span style={{
                        position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700,
                        background: '#DC2626', color: '#fff', borderRadius: 6, padding: '3px 6px',
                    }}>{pct}% off</span>
                )}
            </div>

            {/* ── Info section — flex:1 so all cards same height ── */}
            <div style={{ padding: '11px 13px 13px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: '-0.3px', lineHeight: 1.35, marginBottom: 2 }}>{p.name}</p>
                <p style={{ fontSize: 11, color: C.textLight, marginBottom: 5, fontWeight: 500 }}>{p.unit}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                    <Star size={12} fill="#FBBF24" color="#FBBF24" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E' }}>{p.rating}</span>
                    <span style={{ fontSize: 10, color: C.textLight }}>({p.reviews})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginTop: 'auto' }}>
                    <div>
                        <p style={{ fontSize: 15, fontWeight: 800, color: C.primaryDark, letterSpacing: '-0.5px' }}>₹{p.price.toLocaleString('en-IN')}</p>
                        {p.orig > p.price && <p style={{ fontSize: 10, color: C.textLight, textDecoration: 'line-through', marginTop: 1 }}>₹{p.orig.toLocaleString('en-IN')}</p>}
                    </div>
                    <AddToCartControl p={p} qty={qty} addToCart={addToCart} dec={dec} small />
                </div>
            </div>
        </div>
    );
}

// keep TS happy
void PRODUCTS;
