import React, { useState } from 'react';
import { C, sm } from '../../constants/theme';
import { disc } from '../../data/data';
import type { Product, CartState } from '../../types';
import { Droplets, FlaskConical, Leaf, ShoppingBasket, Wrench } from 'lucide-react';
import AddToCartControl from '../AddToCartControl';

const FALLBACK_ICONS: Record<string, React.ElementType> = {
    car: Droplets, 'dry-fruits': Leaf, grocery: ShoppingBasket,
    tools: Wrench, additive: FlaskConical, 'fuel-additive': FlaskConical,
};

interface CatGridCardProps {
    p: Product;
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    floatMap: Record<number, number>;
    onOpen: () => void;
}

export default function CatGridCard({ p, cart, addToCart, dec, floatMap, onOpen }: CatGridCardProps) {
    const qty = cart[p.id] || 0;
    const fresh = floatMap[p.id] && Date.now() - floatMap[p.id] < 700;
    const pct = disc(p.orig, p.price);
    const [imgError, setImgError] = useState(false);
    const FallbackIcon = FALLBACK_ICONS[p.sub ?? p.cat] || Droplets;

    return (
        <div
            onClick={onOpen}
            style={{
                background: C.card, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${C.border}`, boxShadow: `0 1px 8px rgba(26,158,71,.05)`,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',   /* equal heights */
                transition: `transform .18s ${sm}`,
            }}
            onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
        >
            {/* ── Image zone — fills full width ── */}
            <div style={{
                height: 120,
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
                            padding: '8px',
                        }}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: '#E2F5EA',
                    }}>
                        <FallbackIcon size={32} color={C.primary} />
                    </div>
                )}

                {fresh && (
                    <div style={{
                        position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
                        fontSize: 10, fontWeight: 800, color: C.primary,
                        background: 'rgba(255,255,255,.95)', borderRadius: 20, padding: '1px 8px',
                        animation: `floatUp .65s ${sm} forwards`, pointerEvents: 'none', whiteSpace: 'nowrap',
                    }}>+1 ✓</div>
                )}
                {p.tag && (
                    <span style={{
                        position: 'absolute', top: 6, left: 6, fontSize: 8, fontWeight: 700,
                        background: C.primary, color: '#fff', borderRadius: 5,
                        padding: '2px 5px', letterSpacing: .3, textTransform: 'uppercase',
                    }}>{p.tag}</span>
                )}
                {pct > 0 && (
                    <span style={{
                        position: 'absolute', top: 6, right: 6, fontSize: 8, fontWeight: 700,
                        background: '#DC2626', color: '#fff', borderRadius: 5, padding: '2px 4px',
                    }}>{pct}%</span>
                )}
            </div>

            {/* ── Info section ── */}
            <div style={{ padding: '9px 10px 11px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: '-0.2px', lineHeight: 1.3, marginBottom: 2 }}>{p.name}</p>
                <p style={{ fontSize: 10, color: C.textLight, marginBottom: 'auto', paddingBottom: 8, fontWeight: 500 }}>{p.unit}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 800, color: C.primaryDark, letterSpacing: '-0.4px' }}>₹{p.price.toLocaleString('en-IN')}</p>
                        {p.orig > p.price && <p style={{ fontSize: 9, color: C.textLight, textDecoration: 'line-through' }}>₹{p.orig.toLocaleString('en-IN')}</p>}
                    </div>
                    <AddToCartControl p={p} qty={qty} addToCart={addToCart} dec={dec} small />
                </div>
            </div>
        </div>
    );
}
