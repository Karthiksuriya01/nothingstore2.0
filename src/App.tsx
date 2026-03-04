import React, { useState } from 'react';
import { C, sm, WA } from './constants/theme';
import { PRODUCTS } from './data/products';
import { CATS_META } from './data/categories';
import type { Screen, CartState } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import FloatingCartBar from './components/FloatingCartBar';
import ListCard from './components/cards/ListCard';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SuggestScreen from './screens/SuggestScreen';
import type { Product } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [selP, setSelP] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartState>({});
  const [vis, setVis] = useState(true);
  const [floatMap, setFloatMap] = useState<Record<number, number>>({});
  const [cartBump, setCartBump] = useState(false);
  const [search, setSearch] = useState('');

  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => {
    const p = PRODUCTS.find(x => x.id === +id);
    return s + (p ? p.price * q : 0);
  }, 0);

  const go = (to: Screen, cId: string | null = null) => {
    setVis(false);
    setTimeout(() => {
      setScreen(to);
      if (cId !== null) setActiveCat(cId);
      setVis(true);
    }, 190);
  };

  const addToCart = (id: number, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setFloatMap(f => ({ ...f, [id]: Date.now() }));
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);
  };

  const dec = (id: number, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setCart(c => {
      const n = { ...c };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });
  };

  const checkout = () => {
    const lines = Object.entries(cart).map(([id, q]) => {
      const p = PRODUCTS.find(x => x.id === +id);
      return `• ${p?.name} (${p?.unit}) x${q} = ₹${(p?.price ?? 0) * q}`;
    });
    const msg = encodeURIComponent(`Hello NothingStore! 🛍️\n\nOrder:\n${lines.join('\n')}\n\n*Total: ₹${totalPrice}*\n\nPlease confirm 🙏`);
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  };

  const catMeta = CATS_META.find(c => c.id === activeCat);
  const catProds = activeCat ? PRODUCTS.filter(p => p.cat === activeCat) : [];
  const searchRes = search.length > 1 ? PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : [];
  const isProd = screen === 'product';

  return (
    <div style={{
      fontFamily: "'Inter',-apple-system,sans-serif",
      maxWidth: 430, margin: '0 auto',
      background: C.bg,
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* PINNED HEADER — never scrolls */}
      {!isProd && (
        <Header
          totalQty={totalQty}
          totalPrice={totalPrice}
          cartBump={cartBump}
          search={search}
          setSearch={setSearch}
          onCartClick={() => go('cart')}
        />
      )}

      {/* SCROLLABLE CONTENT AREA */}
      <div style={isProd ? {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',     /* ProductScreen handles its own scroll */
      } : {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: totalQty > 0 ? 140 : 80,
        WebkitOverflowScrolling: 'touch',
      } as React.CSSProperties}>

        {/* SEARCH RESULTS */}
        {!isProd && search.length > 1 && (
          <div style={{ background: C.bg, padding: '14px 18px 40px', animation: `fadeUp .2s ${sm}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
              {searchRes.length} results
            </p>
            {searchRes.length === 0
              ? <p style={{ textAlign: 'center', color: C.textLight, fontSize: 15, padding: '40px 0' }}>Nothing found 🙁</p>
              : searchRes.map(p => (
                <ListCard
                  key={p.id} p={p} cart={cart} addToCart={addToCart} dec={dec} floatMap={floatMap}
                  onOpen={() => { setSelP(p); go('product'); }}
                />
              ))
            }
          </div>
        )}

        {/* PAGES */}
        {(isProd || search.length <= 1) && (
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity .22s ${sm}, transform .22s ${sm}`,
            ...(isProd ? { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } : {}),
          }}>
            {screen === 'home' && (
              <HomeScreen
                cart={cart} addToCart={addToCart} dec={dec} floatMap={floatMap}
                onCat={id => go('cat', id)}
                onOpen={p => { setSelP(p); go('product'); }}
              />
            )}

            {screen === 'cat' && catMeta && (
              <CategoryScreen
                cat={catMeta} products={catProds}
                cart={cart} addToCart={addToCart} dec={dec} floatMap={floatMap}
                onOpen={p => { setSelP(p); go('product'); }}
                onBack={() => go('home')}
              />
            )}

            {screen === 'product' && selP && (
              <ProductScreen
                p={selP} cart={cart} addToCart={addToCart} dec={dec}
                onBack={() => go(activeCat ? 'cat' : 'home', activeCat)}
                onGoCart={() => { addToCart(selP.id); go('cart'); }}
                onOpen={p => { setSelP(p); go('product'); }}
              />
            )}

            {screen === 'cart' && (
              <CartScreen
                cart={cart} addToCart={addToCart} dec={dec}
                totalPrice={totalPrice} totalQty={totalQty}
                checkout={checkout} onBack={() => go('home')}
              />
            )}

            {screen === 'suggest' && <SuggestScreen />}
          </div>
        )}
      </div>

      {/* FLOATING CART BAR */}
      {!isProd && totalQty > 0 && screen !== 'cart' && (
        <FloatingCartBar
          totalQty={totalQty}
          totalPrice={totalPrice}
          onCheckout={() => go('cart')}
        />
      )}

      {/* BOTTOM NAV */}
      {!isProd && (
        <BottomNav
          screen={screen}
          onNav={(sc, catId) => sc === 'cat' ? go('cat', catId ?? activeCat) : go(sc)}
          activeCat={activeCat}
        />
      )}
    </div>
  );
}
