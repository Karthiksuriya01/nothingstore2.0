import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { C, sm } from '../constants/theme';
import { CATS_META, CAT_ICONS } from '../data/categories';
import { PRODUCTS } from '../data/products';

interface CategoryGridProps {
    onCat: (id: string) => void;
}

function Label({ text }: { text: string }) {
    return (
        <p style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1, textTransform: 'uppercase' }}>{text}</p>
    );
}

export default function CategoryGrid({ onCat }: CategoryGridProps) {
    return (
        <div style={{ padding: '26px 18px 0' }}>
            <Label text="Shop by Category" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13, marginTop: 14 }}>
                {CATS_META.map((c, i) => {
                    const iconName = CAT_ICONS[c.id] || 'ShoppingBag';
                    const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[iconName];
                    const count = PRODUCTS.filter(p => p.cat === c.id).length;
                    return (
                        <div key={c.id}
                            onClick={() => onCat(c.id)}
                            style={{
                                background: C.card, borderRadius: 20, overflow: 'hidden',
                                border: `1px solid ${C.border}`,
                                animation: `fadeUp .36s ${sm} ${i * .08}s both`,
                                boxShadow: `0 2px 14px rgba(26,158,71,.07)`,
                                cursor: 'pointer', transition: `transform .18s ${sm}`,
                            }}
                            onMouseDown={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)'; }}
                            onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                        >
                            <div style={{
                                height: 90, background: c.grad,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', right: -14, top: -14, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
                                {IconComp && <IconComp size={38} color="rgba(255,255,255,0.9)" strokeWidth={1.5} style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.22))' }} />}
                            </div>
                            <div style={{ padding: '11px 13px 14px' }}>
                                <p style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '-0.3px' }}>{c.name}</p>
                                <p style={{ fontSize: 11, color: C.textLight, marginTop: 3, fontWeight: 500 }}>{c.sub}</p>
                                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: C.primary }}>{count} items</span>
                                    <ChevronRight size={11} color={C.primary} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
