import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { C, sm, sp } from '../constants/theme';

interface FloatingCartBarProps {
    totalQty: number;
    totalPrice: number;
    onCheckout: () => void;
}

export default function FloatingCartBar({ totalQty, totalPrice, onCheckout }: FloatingCartBarProps) {
    return (
        <div style={{
            position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)', maxWidth: 398,
            background: C.dark, borderRadius: 20, padding: '12px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 90, animation: `slideUpIn .38s ${sp}`,
            boxShadow: `0 14px 40px rgba(21,128,61,.3)`,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                    background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '7px 12px',
                    display: 'flex', alignItems: 'center', gap: 7,
                }}>
                    <ShoppingCart size={16} color="#fff" strokeWidth={2} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{totalQty}</span>
                </div>
                <div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginBottom: 2 }}>Your cart</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>₹{totalPrice.toLocaleString('en-IN')}</p>
                </div>
            </div>
            <button
                onClick={onCheckout}
                style={{
                    background: C.primary, color: '#fff', border: 'none', borderRadius: 14,
                    padding: '11px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 7,
                    boxShadow: `0 4px 16px rgba(26,158,71,.45)`,
                }}
            >
                Checkout <ArrowRight size={16} color="#fff" strokeWidth={2.5} />
            </button>
        </div>
    );
}
