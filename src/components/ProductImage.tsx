import React, { useState } from 'react';
import { C, CAT_BG } from '../constants/theme';
import { PRODUCTS } from '../data/products';
import {
    Droplets, FlaskConical, Leaf, ShoppingBasket, Wrench,
} from 'lucide-react';

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

    const bg = CAT_BG[product?.cat ?? ''] || C.primaryBg;
    const sz = typeof size === 'number' ? size : 80;
    const iconSz = sz > 70 ? 32 : sz > 40 ? 22 : 16;

    const FallbackIcon = CAT_FALLBACK_ICONS[product?.sub ?? product?.cat ?? ''] || Droplets;

    if (product?.image && !imgError) {
        return (
            <div style={{
                width: sz, height: sz, borderRadius: radius, background: bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
                    onError={() => setImgError(true)}
                />
            </div>
        );
    }

    return (
        <div style={{
            width: sz, height: sz, borderRadius: radius, background: bg,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
        }}>
            <FallbackIcon size={iconSz} color={C.primary} />
            <span style={{
                fontSize: 8, color: C.textLight, marginTop: 2, textAlign: 'center',
                padding: '0 3px', lineHeight: 1.2, maxWidth: sz - 8,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
                {product?.name?.split(' ').slice(-2).join(' ')}
            </span>
        </div>
    );
}
