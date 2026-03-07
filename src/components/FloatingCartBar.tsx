import { ArrowRight } from 'lucide-react';

interface FloatingCartBarProps {
    totalQty: number;
    totalPrice: number;
    onCheckout: () => void;
}

export default function FloatingCartBar({ totalQty, totalPrice, onCheckout }: FloatingCartBarProps) {
    return (
        <div style={{
            position: 'fixed', bottom: 78, left: 16, right: 16,
            maxWidth: 398, margin: '0 auto',
            background: '#111', borderRadius: 16, padding: '13px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 90, animation: `slideUpIn .28s ease-out`,
            boxShadow: `0 4px 20px rgba(0,0,0,.18)`,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Item count badge */}
                <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'rgba(255,255,255,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{totalQty}</span>
                </div>
                <div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginBottom: 2, fontWeight: 400 }}>
                        {totalQty === 1 ? '1 item' : `${totalQty} items`}
                    </p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.4px' }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>
            <button
                onClick={onCheckout}
                style={{
                    background: '#fff', color: '#111', border: 'none', borderRadius: 12,
                    padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
                    letterSpacing: '-0.2px',
                }}
            >
                View Cart <ArrowRight size={14} color="#111" strokeWidth={2.5} />
            </button>
        </div>
    );
}
