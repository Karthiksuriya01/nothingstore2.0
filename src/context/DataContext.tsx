import React, { createContext, useContext } from 'react';
import type { Product, Category, Banner, Story } from '../types';
import { PRODUCTS, CATS_META, BANNERS, STORIES } from '../data/data';

interface DataContextType {
    products: Product[];
    categories: Category[];
    banners: Banner[];
    stories: Story[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within DataProvider');
    return context;
};

const staticBanners = BANNERS.map((b, i) => ({ ...b, id: b.id || `b_${i}` }));
const staticCategories = CATS_META as Category[];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <DataContext.Provider value={{
            products: PRODUCTS,
            categories: staticCategories,
            banners: staticBanners,
            stories: STORIES,
        }}>
            {children}
        </DataContext.Provider>
    );
};
