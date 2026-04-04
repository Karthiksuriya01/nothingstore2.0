
import { ShoppingCart, Search, X } from 'lucide-react';
import { C, sm } from '../constants/theme';

interface HeaderProps {
    totalQty: number;
    totalPrice: number;
    search: string;
    setSearch: (v: string) => void;
    onCartClick: () => void;
}

export default function Header({ totalQty, totalPrice, search, setSearch, onCartClick }: HeaderProps) {
    return (
        <div style={{
            background: '#fff',
            padding: '14px 20px 12px',
            borderBottom: `1px solid ${C.border}`,
            position: 'sticky', top: 0, zIndex: 60,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ lineHeight: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div>
                        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-1.2px', color: '#111' }}>Nothing</span>
                        <span style={{ fontSize: 24, fontWeight: 300, letterSpacing: '-1.2px', color: '#bbb' }}>Store</span>
                    </div>
                </div>
                <button
                    onClick={onCartClick}
                    style={{
                        background: totalQty > 0 ? '#111' : 'transparent',
                        border: totalQty > 0 ? 'none' : `1.5px solid ${C.border}`,
                        borderRadius: 50, padding: totalQty > 0 ? '9px 16px' : '8px 14px',
                        display: 'flex', alignItems: 'center', gap: 7,
                        transition: `all .22s ${sm}`,
                        cursor: 'pointer',
                    }}
                >
                    <ShoppingCart size={16} color={totalQty > 0 ? '#fff' : C.textLight} strokeWidth={2} />
                    {totalQty > 0
                        ? <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                        : <span style={{ fontSize: 12, fontWeight: 500, color: C.textLight }}>Cart</span>}
                </button>
            </div>
            {/* Search */}
            <div style={{
                background: C.surface, borderRadius: 12,
                display: 'flex', alignItems: 'center', padding: '11px 14px', gap: 9,
                border: `1.5px solid ${search ? '#111' : C.border}`,
                transition: `border-color .25s ease`,
            }}>
                <Search size={15} color={C.textLight} strokeWidth={2} />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        border: 'none', background: 'transparent', outline: 'none',
                        flex: 1, fontSize: 14, color: C.text, fontFamily: 'inherit', fontWeight: 400,
                    }}
                    placeholder="Search Liqui Moly, tools, dry fruits…"
                />
                {search && (
                    <span onClick={() => setSearch('')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <X size={14} color={C.textLight} />
                    </span>
                )}
            </div>
        </div>
    );
}
