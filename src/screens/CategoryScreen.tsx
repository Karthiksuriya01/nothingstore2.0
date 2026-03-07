import React, { useState } from 'react';

import { ChevronLeft } from 'lucide-react';
import { C, sm } from '../constants/theme';
import { CAT_SUBS } from '../data/data';
import type { Product, CartState } from '../types';
import CatGridCard from '../components/cards/CatGridCard';

interface CatScreenProps {
    cat: { id: string; name: string; sub: string; image: string };
    products: Product[];
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    onOpen: (p: Product) => void;
    onBack: () => void;
}

export default function CategoryScreen({ cat, products, cart, addToCart, dec, onOpen, onBack }: CatScreenProps) {
    const [sub, setSub] = useState('all');
    const subs = CAT_SUBS[cat.id] || [{ id: 'all', label: 'All', icon: 'Package' }];
    const filtered = sub === 'all' ? products : products.filter(p => p.sub === sub);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', height: '100%', minHeight: 0, overflow: 'hidden' }}>
            {/* LEFT SIDEBAR */}
            <div style={{ width: 86, background: '#F0FAF4', borderRight: `1px solid ${C.border}`, overflowY: 'auto', flexShrink: 0 }}>
                {subs.map(s => {
                    const active = sub === s.id;
                    const demoProduct = products.find(p => p.sub === s.id || (s.id === 'all' && p.cat === cat.id));
                    const imgUrl = demoProduct?.image || cat.image;

                    return (
                        <div
                            key={s.id}
                            onClick={() => setSub(s.id)}
                            style={{
                                padding: '14px 6px', textAlign: 'center', cursor: 'pointer',
                                borderRight: active ? `3px solid ${C.primary}` : '3px solid transparent',
                                background: active ? '#fff' : 'transparent',
                                transition: `all .18s ${sm}`,
                            }}
                        >
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: active ? '#E2F5EA' : '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 6px', position: 'relative', overflow: 'hidden',
                                transition: `background .18s ${sm}`,
                                boxShadow: active ? `0 2px 8px rgba(26,158,71,.18)` : '0 1px 3px rgba(0,0,0,0.05)',
                                border: `1px solid ${C.border}`
                            }}>
                                {imgUrl && <img src={imgUrl} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />}
                            </div>
                            <p style={{ fontSize: 9.5, fontWeight: active ? 700 : 500, color: active ? C.primary : C.textMid, lineHeight: 1.3 }}>{s.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT PRODUCT LIST */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px 80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: '-0.4px' }}>{sub === 'all' ? cat.name : subs.find(s => s.id === sub)?.label}</p>
                        <p style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{filtered.length} products</p>
                    </div>
                    <button
                        onClick={onBack}
                        style={{
                            background: '#E2F5EA', border: `1px solid ${C.border}`, borderRadius: 10,
                            padding: '6px 11px', fontSize: 12, fontWeight: 600, color: C.primary,
                            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4,
                        }}
                    >
                        <ChevronLeft size={16} color={C.textMid} strokeWidth={2.2} /> Back
                    </button>
                </div>

                {filtered.length === 0
                    ? <p style={{ textAlign: 'center', color: C.textLight, fontSize: 14, padding: '40px 0' }}>No products here yet</p>
                    : <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {filtered.map((p, i) => (
                            <div key={p.id} style={{ animation: `fadeUp .25s ${sm} ${i * .04}s both`, display: 'flex', flexDirection: 'column' }}>
                                <CatGridCard p={p} cart={cart} addToCart={addToCart} dec={dec} onOpen={() => onOpen(p)} />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}
