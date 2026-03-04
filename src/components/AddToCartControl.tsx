import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { C, sm } from '../constants/theme';
import type { Product } from '../types';

interface AddCtrlProps {
    p: Product;
    qty: number;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    small?: boolean;
}

export default function AddToCartControl({ p, qty, addToCart, dec, small = false }: AddCtrlProps) {
    const h = small ? 30 : 34;

    if (qty === 0) {
        return (
            <button
                onClick={e => addToCart(p.id, e)}
                style={{
                    height: h,
                    background: C.primaryBg,
                    color: C.primary,
                    border: `1.5px solid ${C.primary}`,
                    borderRadius: 10,
                    padding: small ? '0 10px' : '0 15px',
                    fontSize: small ? 11 : 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    whiteSpace: 'nowrap',
                    transition: `transform .14s ${sm}`,
                }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.93)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
            >
                <Plus size={small ? 11 : 13} color={C.primary} strokeWidth={2.8} />
                {!small && 'ADD'}
            </button>
        );
    }

    return (
        <div
            onClick={e => { e.preventDefault(); e.stopPropagation(); }}
            style={{
                height: h,
                display: 'flex',
                alignItems: 'center',
                gap: small ? 8 : 10,
                background: C.primary,
                borderRadius: 10,
                padding: small ? '0 10px' : '0 12px',
                boxShadow: `0 3px 10px rgba(26,158,71,.32)`,
            }}
        >
            <button
                onClick={e => dec(p.id, e)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
            >
                <Minus size={small ? 12 : 14} color="#fff" strokeWidth={2.8} />
            </button>
            <span style={{ color: '#fff', fontSize: small ? 12 : 14, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>{qty}</span>
            <button
                onClick={e => addToCart(p.id, e)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
            >
                <Plus size={small ? 12 : 14} color="#fff" strokeWidth={2.8} />
            </button>
        </div>
    );
}
