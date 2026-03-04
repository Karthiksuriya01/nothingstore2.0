import React from 'react';
import { sm } from '../constants/theme';
import { PRODUCTS } from '../data/products';
import type { Product, CartState } from '../types';
import Carousel from '../components/Carousel';
import CategoryGrid from '../components/CategoryGrid';
import GridCard from '../components/cards/GridCard';

interface HomeScreenProps {
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    floatMap: Record<number, number>;
    onCat: (id: string) => void;
    onOpen: (p: Product) => void;
}

function Label({ text }: { text: string }) {
    return <p style={{ fontSize: 11, fontWeight: 700, color: '#9BB8A4', letterSpacing: 1, textTransform: 'uppercase' }}>{text}</p>;
}

export default function HomeScreen({ cart, addToCart, dec, floatMap, onCat, onOpen }: HomeScreenProps) {
    return (
        <>
            <Carousel />
            <CategoryGrid onCat={onCat} />
            <div style={{ padding: '26px 18px 0' }}>
                <Label text="All Products" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13, marginTop: 14 }}>
                    {PRODUCTS.map((p, i) => (
                        <div key={p.id} style={{ animation: `fadeUp .3s ${sm} ${i * .025}s both` }}>
                            <GridCard p={p} cart={cart} addToCart={addToCart} dec={dec} floatMap={floatMap} onOpen={() => onOpen(p)} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
