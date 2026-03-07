export interface Product {
  id: number;
  name: string;
  cat: string;
  sub: string;
  category?: string;
  price: number;
  orig: number;
  unit: string;
  rating: number;
  reviews: number;
  stock?: number;
  image: string;
  tag: string | null;
  desc: string;
  specs: string[];
}

export interface Category {
  id: string;
  name: string;
  sub: string;
  image: string; // category image
  icon?: string; // lucide icon name
}

export interface Banner {
  id: string;
  grad: string;
  tag: string;
  title: string;
  sub: string;
  icon: string; // lucide icon name
  image?: string; // optional banner image from /public/banner/
}

export interface SubCategory {
  id: string;
  label: string;
  icon: string;
}

export interface Story {
  id: string;
  catId: string;
  image: string;
}

export type Screen = 'home' | 'cat' | 'product' | 'cart' | 'suggest' | 'admin';

export type CartState = Record<number, number>;
