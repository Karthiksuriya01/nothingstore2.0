import type { Banner, SubCategory } from '../types';

interface CategoryMeta {
    id: string;
    name: string;
    sub: string;
    grad: string;
}

export const CATS_META: CategoryMeta[] = [
    { id: 'car', name: 'Car Care', sub: 'Liqui Moly & more', grad: 'linear-gradient(135deg,#15803D,#22C55E)' },
    { id: 'dry-fruits', name: 'Dry Fruits', sub: 'Fresh & nutritious', grad: 'linear-gradient(135deg,#7C2D12,#EA580C)' },
    { id: 'grocery', name: 'Groceries', sub: 'Oils & essentials', grad: 'linear-gradient(135deg,#166534,#16A34A)' },
    { id: 'tools', name: 'Tools', sub: 'Taparia, 3M & more', grad: 'linear-gradient(135deg,#713F12,#CA8A04)' },
];

export const BANNERS: Banner[] = [
    { grad: 'linear-gradient(135deg,#15803D,#22C55E)', tag: 'Car Care', title: 'Liqui Moly Range', sub: "Germany's best engine oils", icon: 'Droplets', image: '/banner/liquimoly.png' },
    { grad: 'linear-gradient(135deg,#166534,#16A34A)', tag: 'Additives', title: 'Fuel & Engine Care', sub: 'Protect your engine today', icon: 'FlaskConical', image: '/banner/liquimolyimage2.png' },
    { grad: 'linear-gradient(135deg,#713F12,#CA8A04)', tag: 'Tools', title: 'Taparia & 3M Tools', sub: 'Pro-grade at fair prices', icon: 'Wrench', image: '/banner/tools.png' },
    { grad: 'linear-gradient(135deg,#7C2D12,#EA580C)', tag: 'Dry Fruits', title: 'Fresh Dry Fruits', sub: 'Premium cashews, walnuts & more', icon: 'Leaf', image: '/banner/dryfruits.png' },
];

export const CAT_SUBS: Record<string, SubCategory[]> = {
    car: [
        { id: 'all', label: 'All', icon: 'Car' },
        { id: 'engine-oil', label: 'Engine Oil', icon: 'Droplets' },
        { id: 'fuel-additive', label: 'Fuel Additives', icon: 'Fuel' },
        { id: 'additive', label: 'Additives', icon: 'FlaskConical' },
    ],
    'dry-fruits': [
        { id: 'all', label: 'All', icon: 'Leaf' },
        { id: 'nuts', label: 'Nuts', icon: 'Circle' },
        { id: 'seeds', label: 'Seeds', icon: 'Sprout' },
    ],
    grocery: [
        { id: 'all', label: 'All', icon: 'ShoppingBasket' },
        { id: 'oils', label: 'Cooking Oils', icon: 'FlaskConical' },
    ],
    tools: [
        { id: 'all', label: 'All', icon: 'Wrench' },
        { id: 'hand-tools', label: 'Hand Tools', icon: 'Hammer' },
        { id: 'electrical', label: 'Electrical', icon: 'Zap' },
    ],
};

export const CAT_ICONS: Record<string, string> = {
    car: 'Car',
    'dry-fruits': 'Leaf',
    grocery: 'ShoppingBasket',
    tools: 'Wrench',
};
