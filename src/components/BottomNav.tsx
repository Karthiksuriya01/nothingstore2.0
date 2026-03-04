import React from 'react';
import { Home, Store, ShoppingCart, Lightbulb } from 'lucide-react';
import { C, sm, sp } from '../constants/theme';
import type { Screen } from '../types';

interface BottomNavProps {
    screen: Screen;
    onNav: (sc: Screen, catId?: string | null) => void;
    activeCat: string | null;
}

const NAV_ITEMS = [
    { sc: 'home' as Screen, Icon: Home, label: 'Home' },
    { sc: 'cat' as Screen, Icon: Store, label: 'Shop' },
    { sc: 'cart' as Screen, Icon: ShoppingCart, label: 'Cart' },
    { sc: 'suggest' as Screen, Icon: Lightbulb, label: 'Suggest' },
];

export default function BottomNav({ screen, onNav, activeCat }: BottomNavProps) {
    return (
        <div style={{
            position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 430, background: '#fff',
            borderTop: `1px solid ${C.border}`,
            display: 'flex', justifyContent: 'space-around',
            padding: '9px 0 14px', zIndex: 100,
        }}>
            {NAV_ITEMS.map(n => {
                const active = screen === n.sc || (n.sc === 'cat' && screen === 'product');
                return (
                    <div
                        key={n.sc}
                        onClick={() => n.sc === 'cat' ? onNav('cat', activeCat) : onNav(n.sc)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', minWidth: 64 }}
                    >
                        <div style={{ transition: `transform .22s ${sp}`, transform: active ? 'scale(1.15)' : 'scale(1)' }}>
                            <n.Icon
                                size={22}
                                color={active ? C.primary : C.textLight}
                                fill={active && n.sc === 'home' ? C.primary : 'none'}
                                strokeWidth={2}
                            />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? C.primary : C.textLight, transition: 'color .2s' }}>{n.label}</span>
                        {active && <div style={{ width: 20, height: 3, borderRadius: 10, background: C.primary, marginTop: -2 }} />}
                    </div>
                );
            })}
        </div>
    );
}
