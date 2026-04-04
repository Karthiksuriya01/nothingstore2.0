import { Home, ShoppingCart, Lightbulb, LayoutGrid } from 'lucide-react';
import type { Screen } from '../types';

interface BottomNavProps {
    screen: Screen;
    onNav: (sc: Screen, catId?: string | null) => void;
}

const NAV_ITEMS = [
    { sc: 'home' as Screen, Icon: Home, label: 'Home' },
    { sc: 'cats' as Screen, Icon: LayoutGrid, label: 'Categories' },
    { sc: 'cart' as Screen, Icon: ShoppingCart, label: 'Cart' },
    { sc: 'suggest' as Screen, Icon: Lightbulb, label: 'Suggest' },
];
export default function BottomNav({ screen, onNav }: BottomNavProps) {
    return (
        <div style={{
            position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 430, background: '#fff',
            boxShadow: '0 -1px 0 rgba(0,0,0,.07)',
            display: 'flex', justifyContent: 'space-around',
            padding: '8px 0 16px', zIndex: 100,
        }}>
            {NAV_ITEMS.map(n => {
                const active = screen === n.sc || (n.sc === 'cats' && screen === 'cat');
                return (
                    <div
                        key={n.sc}
                        onClick={() => onNav(n.sc)}
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            gap: 2, cursor: 'pointer', minWidth: 64,
                            position: 'relative',
                        }}
                    >
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: active ? '#f0fdf4' : 'transparent',
                            transition: 'background .25s ease, transform .2s ease',
                            transform: active ? 'translateY(-2px)' : 'translateY(0)',
                        }}>
                            <n.Icon
                                size={21}
                                color={active ? '#1A9E47' : '#ccc'}
                                fill={active && n.sc === 'home' ? '#1A9E47' : 'none'}
                                strokeWidth={active ? 2.2 : 1.7}
                                style={{ transition: 'color .2s ease' }}
                            />
                        </div>
                        <span style={{
                            fontSize: 10, fontWeight: active ? 700 : 400,
                            color: active ? '#1A9E47' : '#bbb',
                            transition: 'color .2s ease',
                        }}>{n.label}</span>
                        {/* Active indicator dot */}
                        <div style={{
                            width: active ? 4 : 0,
                            height: 4,
                            borderRadius: '50%',
                            background: '#1A9E47',
                            transition: 'width .25s ease',
                            marginTop: 1,
                        }} />
                    </div>
                );
            })}
        </div>
    );
}
