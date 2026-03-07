import { Home, ShoppingCart, Lightbulb, LayoutGrid } from 'lucide-react';
import { sm } from '../constants/theme';
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
            padding: '10px 0 16px', zIndex: 100,
        }}>
            {NAV_ITEMS.map(n => {
                const active = screen === n.sc || (n.sc === 'cats' && screen === 'cat');
                return (
                    <div
                        key={n.sc}
                        onClick={() => onNav(n.sc)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', minWidth: 64 }}
                    >
                        <div style={{
                            transition: `transform .18s ${sm}`,
                            transform: active ? 'scale(1.1)' : 'scale(1)',
                        }}>
                            <n.Icon
                                size={22}
                                color={active ? '#111' : '#ccc'}
                                fill={active && n.sc === 'home' ? '#111' : 'none'}
                                strokeWidth={active ? 2.2 : 1.8}
                            />
                        </div>
                        <span style={{
                            fontSize: 10, fontWeight: active ? 700 : 400,
                            color: active ? '#111' : '#bbb',
                            transition: 'color .18s',
                        }}>{n.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
