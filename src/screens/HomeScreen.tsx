import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import StoryViewer from '../components/StoryViewer';
import { sm } from '../constants/theme';
import type { Product, CartState } from '../types';
// import Carousel from '../components/Carousel';
import CategoryGrid from '../components/CategoryGrid';
import GridCard from '../components/cards/GridCard';

interface HomeScreenProps {
    cart: CartState;
    addToCart: (id: number, e?: React.MouseEvent) => void;
    dec: (id: number, e?: React.MouseEvent) => void;
    onCat: (id: string) => void;
    onOpen: (p: Product) => void;
}

function Label({ text }: { text: string }) {
    return <p style={{ fontSize: 11, fontWeight: 700, color: '#9BB8A4', letterSpacing: 1, textTransform: 'uppercase' }}>{text}</p>;
}

export default function HomeScreen({ cart, addToCart, dec, onCat, onOpen }: HomeScreenProps) {
    const { products, stories, categories } = useData();
    const [selectedStoryCat, setSelectedStoryCat] = useState<string | null>(null);

    const activeCats = categories.filter(c => stories.some(s => s.catId === c.id));
    const viewingStories = stories.filter(s => s.catId === selectedStoryCat);
    const viewingCat = categories.find(c => c.id === selectedStoryCat);

    return (
        <>
            {selectedStoryCat && viewingCat && viewingStories.length > 0 && (
                <StoryViewer
                    stories={viewingStories}
                    category={viewingCat}
                    onClose={() => setSelectedStoryCat(null)}
                />
            )}

            {activeCats.length > 0 && (
                <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '16px 18px 0', WebkitOverflowScrolling: 'touch' }}>
                    {activeCats.map(c => (
                        <div key={c.id} onClick={() => setSelectedStoryCat(c.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
                            <div style={{ width: 66, height: 66, borderRadius: 33, padding: 3, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                                <div style={{ width: '100%', height: '100%', borderRadius: 33, border: '2px solid #fff', overflow: 'hidden', backgroundImage: `url('${c.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 500, color: '#333' }}>{c.name.split(' ')[0]}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* <Carousel /> */}
            <CategoryGrid onCat={onCat} limit={4} />

            <div style={{ padding: '26px 0 0' }}>
                <div style={{ padding: '0 18px' }}>
                    <Label text="Latest Products" />
                </div>
                <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '14px 18px 0', WebkitOverflowScrolling: 'touch' }}>
                    {[...products].reverse().map((p, i) => (
                        <div key={`latest-${p.id}`} style={{ animation: `fadeUp .3s ${sm} ${i * .025}s both`, display: 'flex', flexDirection: 'column', flexShrink: 0, width: 154 }}>
                            <GridCard p={p} cart={cart} addToCart={addToCart} dec={dec} onOpen={() => onOpen(p)} />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: '26px 18px 0' }}>
                <Label text="All Products" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13, marginTop: 14 }}>
                    {products.map((p, i) => (
                        <div key={p.id} style={{ animation: `fadeUp .3s ${sm} ${i * .025}s both`, display: 'flex', flexDirection: 'column' }}>
                            <GridCard p={p} cart={cart} addToCart={addToCart} dec={dec} onOpen={() => onOpen(p)} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
