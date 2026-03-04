import React from 'react';
import { Star } from 'lucide-react';
import { C, CAT_BG, sm } from '../../constants/theme';
import { disc } from '../../data/products';
import type { Product, CartState } from '../../types';
import ProductImage from '../ProductImage';
import AddToCartControl from '../AddToCartControl';

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

    return (
        <div
            onClick={onOpen}
            style={{
                background: C.card, borderRadius: 20, overflow: 'hidden',
                border: `1px solid ${C.border}`,
                boxShadow: `0 2px 14px rgba(26,158,71,.06)`,
                cursor: 'pointer', transition: `transform .18s ${sm}, box-shadow .18s ${sm}`,
            }}
            onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
        >
            <div style={{
                height: 112, background: CAT_BG[p.cat] || C.primaryBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
                <ProductImage id={p.id} size={80} radius={12} />
                {fresh && (
                    <div style={{
                        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                        fontSize: 11, fontWeight: 800, color: C.primary,
                        background: 'rgba(255,255,255,.95)', borderRadius: 20, padding: '2px 9px',
                        animation: `floatUp .65s ${sm} forwards`, pointerEvents: 'none', whiteSpace: 'nowrap',
                    }}>+1 ✓</div>
                )}
                {p.tag && (
                    <span style={{
                        position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 700,
                        background: C.primary, color: '#fff', borderRadius: 6,
                        padding: '3px 7px', letterSpacing: .4, textTransform: 'uppercase',
                    }}>{p.tag}</span>
                )}
                {pct > 0 && (
                    <span style={{
                        position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700,
                        background: '#DC2626', color: '#fff', borderRadius: 6, padding: '3px 6px',
                    }}>{pct}% off</span>
                )}
            </div>
            <div style={{ padding: '11px 13px 13px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: '-0.3px', lineHeight: 1.35, marginBottom: 2 }}>{p.name}</p>
                <p style={{ fontSize: 11, color: C.textLight, marginBottom: 5, fontWeight: 500 }}>{p.unit}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                    <Star size={12} fill="#FBBF24" color="#FBBF24" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E' }}>{p.rating}</span>
                    <span style={{ fontSize: 10, color: C.textLight }}>({p.reviews})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
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
