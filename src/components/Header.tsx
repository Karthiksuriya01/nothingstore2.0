
import { ShoppingCart, Search, X } from 'lucide-react';
import { C, sm } from '../constants/theme';

interface HeaderProps {
    totalQty: number;
    totalPrice: number;
    cartBump: boolean;
    search: string;
    setSearch: (v: string) => void;
    onCartClick: () => void;
}

export default function Header({ totalQty, totalPrice, cartBump, search, setSearch, onCartClick }: HeaderProps) {
    return (
        <div style={{
            background: '#fff', padding: '16px 20px 14px',
            borderBottom: `1px solid ${C.border}`,
            position: 'sticky', top: 0, zIndex: 60,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ lineHeight: 1 }}>
                    <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-1.5px', color: C.primary }}>nothing</span>
                    <span style={{ fontSize: 26, fontWeight: 300, letterSpacing: '-1.5px', color: C.textLight }}>store</span>
                </div>
                <button
                    onClick={onCartClick}
                    style={{
                        background: totalQty > 0 ? C.primary : C.primaryBg,
                        border: 'none', borderRadius: 50, padding: '10px 16px',
                        display: 'flex', alignItems: 'center', gap: 7,
                        transition: `all .28s ${sm}`,
                        animation: cartBump ? 'bump .4s ease' : undefined,
                        cursor: 'pointer',
                        boxShadow: totalQty > 0 ? `0 4px 18px rgba(26,158,71,.38)` : 'none',
                    }}
                >
                    <ShoppingCart size={17} color={totalQty > 0 ? '#fff' : C.primary} strokeWidth={2.1} />
                    {totalQty > 0
                        ? <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                        : <span style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Cart</span>}
                </button>
            </div>
            <div style={{
                background: C.primarySoft, borderRadius: 14,
                display: 'flex', alignItems: 'center', padding: '12px 15px', gap: 10,
                border: `1.5px solid ${C.border}`,
            }}>
                <Search size={16} color={C.textLight} strokeWidth={2.2} />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        border: 'none', background: 'transparent', outline: 'none',
                        flex: 1, fontSize: 15, color: C.text, fontFamily: 'inherit', fontWeight: 500,
                    }}
                    placeholder="Search Liqui Moly, tools, dry fruits…"
                />
                {search && (
                    <span onClick={() => setSearch('')} style={{ cursor: 'pointer', color: C.textLight, display: 'flex', alignItems: 'center' }}>
                        <X size={14} color={C.textLight} />
                    </span>
                )}
            </div>
        </div>
    );
}
