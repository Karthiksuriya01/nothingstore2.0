import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { CartState, Product } from '../types';

interface FloatingCartBarProps {
    totalQty: number;
    totalPrice: number;
    onCheckout: () => void;
    cart?: CartState;
    products?: Product[];
}

export default function FloatingCartBar({ totalQty, totalPrice, onCheckout }: FloatingCartBarProps) {
    useEffect(() => {
        const styleSheet = document.createElement('style');
        if (!document.getElementById('floating-cart-animations')) {
            styleSheet.id = 'floating-cart-animations';
            styleSheet.textContent = `
                @keyframes slideUpIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulseGlow {
                    0% {
                        box-shadow: 0 4px 20px rgba(26, 158, 71, 0.08), 0 0 20px rgba(26, 158, 71, 0);
                    }
                    50% {
                        box-shadow: 0 4px 20px rgba(26, 158, 71, 0.15), 0 0 30px rgba(26, 158, 71, 0.2);
                    }
                    100% {
                        box-shadow: 0 4px 20px rgba(26, 158, 71, 0.08), 0 0 20px rgba(26, 158, 71, 0);
                    }
                }

                @keyframes countPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.15);
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }, []);

    return (
        <div style={{
            position: 'fixed', bottom: 98, left: 16, right: 16,
            maxWidth: 398, margin: '0 auto',
            background: '#fff',
            borderRadius: 16, padding: '14px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 90, animation: `slideUpIn .35s cubic-bezier(0.34, 1.56, 0.64, 1), pulseGlow 2.5s ease-in-out infinite`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.12)`,
            transition: 'all 0.3s ease',
            border: '1px solid rgba(0, 0, 0, 0.06)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Item count badge with pulse animation */}
                <div style={{
                    width: 36, height: 36, borderRadius: 12,
                    background: '#f0fdf4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1.5px solid #22c55e',
                    animation: `countPulse 2s ease-in-out infinite`,
                    boxShadow: '0 0 12px rgba(34, 197, 94, 0.2)',
                }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#16a34a' }}>{totalQty}</span>
                </div>
                <div>
                    <p style={{ fontSize: 11, color: 'rgba(0, 0, 0, 0.55)', marginBottom: 3, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {totalQty === 1 ? '1 item' : `${totalQty} items`}
                    </p>
                    <p style={{ fontSize: 18, fontWeight: 900, color: '#000', letterSpacing: '-0.5px' }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            <button
                onClick={onCheckout}
                style={{
                    background: '#1f2937', color: '#fff', border: 'none', borderRadius: 12,
                    padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
                    letterSpacing: '-0.2px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(31, 41, 55, 0.2)',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(31, 41, 55, 0.35)';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(31, 41, 55, 0.2)';
                }}
            >
                View Cart <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
            </button>
        </div>
    );
}
