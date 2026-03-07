import React from 'react';
import { Star } from 'lucide-react';
import { C, sm } from '../../constants/theme';
import { disc } from '../../data/data';
import type { Product, CartState } from '../../types';
import ProductImage from '../ProductImage';
import AddToCartControl from '../AddToCartControl';

interface ListCardProps {
    p: Product;
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    onOpen: () => void;
}

export default function ListCard({ p, cart, addToCart, dec, onOpen }: ListCardProps) {
    const qty = cart[p.id] || 0;
    const pct = disc(p.orig, p.price);

    return (
        <div
            onClick={onOpen}
            style={{
                background: C.card, borderRadius: 18, padding: '13px 14px', marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 13,
                border: `1px solid ${C.border}`, boxShadow: `0 2px 10px rgba(26,158,71,.05)`,
                cursor: 'pointer', transition: `transform .18s ${sm}, box-shadow .18s ${sm}`,
            }}
            onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
        >
            <ProductImage id={p.id} size={62} radius={14} />
            <div style={{ flex: 1, minWidth: 0 }}>
                {p.tag && (
                    <span style={{
                        fontSize: 9, fontWeight: 700, background: C.primary, color: '#fff',
                        borderRadius: 5, padding: '2px 6px', display: 'inline-block',
                        marginBottom: 4, letterSpacing: .3, textTransform: 'uppercase',
                    }}>{p.tag}</span>
                )}
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: '-0.3px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                <p style={{ fontSize: 11, color: C.textLight, marginTop: 1, fontWeight: 500 }}>{p.unit}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                    <Star size={12} fill="#FBBF24" color="#FBBF24" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#92400E' }}>{p.rating}</span>
                    <span style={{ fontSize: 10, color: C.textLight }}>({p.reviews})</span>
                </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: C.primaryDark, letterSpacing: '-0.4px' }}>₹{p.price.toLocaleString('en-IN')}</p>
                {p.orig > p.price && <p style={{ fontSize: 10, color: C.textLight, textDecoration: 'line-through', marginBottom: 2 }}>₹{p.orig.toLocaleString('en-IN')}</p>}
                {pct > 0 && <p style={{ fontSize: 9, fontWeight: 700, color: '#DC2626', marginBottom: 5 }}>{pct}% off</p>}
                <AddToCartControl p={p} qty={qty} addToCart={addToCart} dec={dec} />
            </div>
        </div>
    );
}
