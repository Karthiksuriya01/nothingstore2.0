import { ChevronRight } from 'lucide-react';
import { C, sm } from '../constants/theme';
import { useData } from '../context/DataContext';

interface CategoryGridProps {
    onCat: (id: string) => void;
    limit?: number;
    onSeeAll?: () => void;
}

function Label({ text }: { text: string }) {
    return (
        <p style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1, textTransform: 'uppercase' }}>{text}</p>
    );
}

export default function CategoryGrid({ onCat, limit, onSeeAll }: CategoryGridProps) {
    const { categories, products } = useData();
    const displayCats = limit ? categories.slice(0, limit) : categories;

    return (
        <div style={{ padding: '26px 18px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Label text="Shop by Category" />
                {onSeeAll && (
                    <button
                        onClick={onSeeAll}
                        style={{ fontSize: 12, fontWeight: 700, color: C.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        See All
                    </button>
                )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13, marginTop: 14 }}>
                {displayCats.map((c, i) => {
                    const count = products.filter(p => p.cat === c.id).length;
                    return (
                        <div key={c.id}
                            onClick={() => onCat(c.id)}
                            style={{
                                background: C.card, borderRadius: 20, overflow: 'hidden',
                                border: `1px solid ${C.border}`,
                                animation: `fadeUp .36s ${sm} ${i * .08}s both`,
                                boxShadow: `0 2px 14px rgba(26,158,71,.07)`,
                                cursor: 'pointer', transition: `transform .18s ${sm}`,
                            }}
                            onTouchStart={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)'; }}
                            onTouchEnd={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                        >
                            <div style={{
                                height: 90, backgroundImage: `url('${c.image}')`, backgroundSize: 'cover', backgroundPosition: 'center',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                            </div>
                            <div style={{ padding: '11px 13px 14px' }}>
                                <p style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '-0.3px' }}>{c.name}</p>
                                <p style={{ fontSize: 11, color: C.textLight, marginTop: 3, fontWeight: 500 }}>{c.sub}</p>
                                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: C.primary }}>{count} items</span>
                                    <ChevronRight size={11} color={C.primary} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
