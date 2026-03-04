import React, { useState } from 'react';
import { C } from '../constants/theme';
import { PRODUCTS } from '../data/products';
import { Droplets, FlaskConical, Leaf, ShoppingBasket, Wrench } from 'lucide-react';

interface PImgProps {
    id: number;
    size?: number;
    radius?: number;
}

const CAT_FALLBACK_ICONS: Record<string, React.ElementType> = {
    car: Droplets,
    'dry-fruits': Leaf,
    grocery: ShoppingBasket,
    tools: Wrench,
    additive: FlaskConical,
    'fuel-additive': FlaskConical,
};

export default function ProductImage({ id, size = 64, radius = 12 }: PImgProps) {
    const product = PRODUCTS.find(x => x.id === id);
    const [imgError, setImgError] = useState(false);

    const sz = typeof size === 'number' ? size : 80;
    const iconSz = sz > 70 ? 36 : sz > 40 ? 24 : 18;
    const FallbackIcon = CAT_FALLBACK_ICONS[product?.sub ?? product?.cat ?? ''] || Droplets;

    /* ── image available ── */
    if (product?.image && !imgError) {
        return (
            <div style={{
                width: sz, height: sz, borderRadius: radius,
                background: '#FFFFFF',          /* clean white like Amazon */
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: '92%',
                        height: '92%',
                        objectFit: 'contain',   /* show full product, no crop */
                        objectPosition: 'center',
                        display: 'block',
                    }}
                    onError={() => setImgError(true)}
                />
            </div>
        );
    }

    /* ── fallback icon ── */
    return (
        <div style={{
            width: sz, height: sz, borderRadius: radius,
            background: C.primaryBg,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
        }}>
            <FallbackIcon size={iconSz} color={C.primary} />
            <span style={{
                fontSize: 8, color: C.textLight, marginTop: 3, textAlign: 'center',
                padding: '0 4px', lineHeight: 1.2, maxWidth: sz - 8,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
                {product?.name?.split(' ').slice(-2).join(' ')}
            </span>
        </div>
    );
}
