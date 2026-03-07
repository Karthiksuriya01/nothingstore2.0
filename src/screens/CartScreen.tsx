import React from 'react';
import { ChevronLeft, ShoppingCart, ArrowRight, MessageCircle } from 'lucide-react';
import { C } from '../constants/theme';
import { PRODUCTS } from '../data/data';
import type { CartState } from '../types';
import ListCard from '../components/cards/ListCard';

interface CartScreenProps {
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    totalPrice: number;
    totalQty: number;
    checkout: () => void;
    onBack: () => void;
}

export default function CartScreen({ cart, addToCart, dec, totalPrice, totalQty, checkout, onBack }: CartScreenProps) {
    return (
        <div style={{ padding: '20px 18px', paddingBottom: 100 }}>
            <button
                onClick={onBack}
                style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: C.textMid, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}
            >
                <ChevronLeft size={18} color={C.textMid} strokeWidth={2.2} /> Back
            </button>
            <p style={{ fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: '-0.7px', marginBottom: 20 }}>Your Cart</p>

            {totalQty === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <div style={{ width: 72, height: 72, background: '#E2F5EA', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <ShoppingCart size={32} color={C.primary} strokeWidth={2} />
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Cart is empty</p>
                    <p style={{ fontSize: 13, color: C.textLight, marginTop: 6 }}>Browse and add products</p>
                </div>
            ) : (
                <>
                    {Object.entries(cart).map(([id, _q]) => {
                        const p = PRODUCTS.find(x => x.id === +id);
                        if (!p) return null;
                        return <ListCard key={id} p={p} cart={cart} addToCart={addToCart} dec={dec} floatMap={{}} onOpen={() => { }} />;
                    })}
                    <div style={{ background: C.card, borderRadius: 18, padding: '16px 18px', marginTop: 8, border: `1px solid ${C.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.textLight, marginBottom: 10 }}>
                            <span>Subtotal ({totalQty} items)</span>
                            <span style={{ color: C.text, fontWeight: 600 }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, color: C.primary, borderTop: `1px solid ${C.border}`, paddingTop: 12, letterSpacing: '-0.4px' }}>
                            <span>Total</span><span>₹{totalPrice.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <button
                        onClick={checkout}
                        style={{
                            width: '100%', background: C.primary, color: '#fff', border: 'none', borderRadius: 18,
                            padding: '17px 20px', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                            fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            marginTop: 16, boxShadow: `0 8px 28px rgba(26,158,71,.35)`,
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <MessageCircle size={18} color="#fff" strokeWidth={2} /> Order via WhatsApp
                        </span>
                        <span style={{ background: 'rgba(255,255,255,.18)', borderRadius: 11, padding: '5px 13px', fontSize: 14 }}>
                            ₹{totalPrice.toLocaleString('en-IN')} <ArrowRight size={13} color="#fff" style={{ display: 'inline', marginLeft: 2, verticalAlign: 'middle' }} />
                        </span>
                    </button>
                </>
            )}
        </div>
    );
}
