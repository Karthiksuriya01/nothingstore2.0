import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category, Banner, Story } from '../types';
import { PRODUCTS, CATS_META, BANNERS } from '../data/data';

interface DataContextType {
    products: Product[];
    categories: Category[];
    banners: Banner[];
    stories: Story[];

    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: number) => void;

    addCategory: (category: Category) => void;
    updateCategory: (category: Category) => void;
    deleteCategory: (id: string) => void;

    addBanner: (banner: Banner) => void;
    updateBanner: (banner: Banner) => void;
    deleteBanner: (id: string) => void;

    addStory: (story: Story) => void;
    deleteStory: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within DataProvider');
    return context;
};

// Initial ID backfill for default static data
const initialBanners = BANNERS.map((b, i) => ({ ...b, id: b.id || `b_${i}` }));
const defaultCategories = CATS_META as Category[];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [stories, setStories] = useState<Story[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage or fallback to static constants
        try {
            const storedProducts = localStorage.getItem('ns_products');
            const storedCategories = localStorage.getItem('ns_categories');
            const storedBanners = localStorage.getItem('ns_banners');
            const storedStories = localStorage.getItem('ns_stories');

            setProducts(storedProducts ? JSON.parse(storedProducts) : PRODUCTS);
            
            // Merge stored categories with default categories to ensure defaults are always present
            let categoriesData = defaultCategories;
            if (storedCategories) {
                const stored = JSON.parse(storedCategories) as Category[];
                const defaultIds = defaultCategories.map(c => c.id);
                const nonDefaultStored = stored.filter(c => !defaultIds.includes(c.id));
                categoriesData = [...defaultCategories, ...nonDefaultStored];
            }
            setCategories(categoriesData);
            
            setBanners(storedBanners ? JSON.parse(storedBanners) : initialBanners);
            setStories(storedStories ? JSON.parse(storedStories) : []);
        } catch (err) {
            console.error('Error reading from localStorage', err);
            setProducts(PRODUCTS);
            setCategories(defaultCategories);
            setBanners(initialBanners as Banner[]);
            setStories([]);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever state changes after initial load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('ns_products', JSON.stringify(products));
            localStorage.setItem('ns_categories', JSON.stringify(categories));
            localStorage.setItem('ns_banners', JSON.stringify(banners));
            localStorage.setItem('ns_stories', JSON.stringify(stories));
        }
    }, [products, categories, banners, stories, isLoaded]);

    const addProduct = (p: Product) => setProducts(curr => [...curr, p]);
    const updateProduct = (p: Product) => setProducts(curr => curr.map(item => item.id === p.id ? p : item));
    const deleteProduct = (id: number) => setProducts(curr => curr.filter(p => p.id !== id));

    const addCategory = (c: Category) => setCategories(curr => [...curr, c]);
    const updateCategory = (c: Category) => setCategories(curr => curr.map(item => item.id === c.id ? c : item));
    const deleteCategory = (id: string) => setCategories(curr => curr.filter(c => c.id !== id));

    const addBanner = (b: Banner) => setBanners(curr => [...curr, b]);
    const updateBanner = (b: Banner) => setBanners(curr => curr.map(item => item.id === b.id ? b : item));
    const deleteBanner = (id: string) => setBanners(curr => curr.filter(b => b.id !== id));

    const addStory = (s: Story) => setStories(curr => [...curr, s]);
    const deleteStory = (id: string) => setStories(curr => curr.filter(s => s.id !== id));

    if (!isLoaded) return null; // Or a loader

    return (
        <DataContext.Provider value={{
            products, categories, banners, stories,
            addProduct, updateProduct, deleteProduct,
            addCategory, updateCategory, deleteCategory,
            addBanner, updateBanner, deleteBanner,
            addStory, deleteStory
        }}>
            {children}
        </DataContext.Provider>
    );
};
