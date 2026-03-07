import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { C } from '../constants/theme';
import type { Product, Category, Banner, Story } from '../types';

export default function AdminScreen({ onBack }: { onBack: () => void }) {
    const [auth, setAuth] = useState(sessionStorage.getItem('admin_token') === 'true');
    const [pass, setPass] = useState('');
    const [tab, setTab] = useState<'products' | 'categories' | 'banners' | 'stories'>('products');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass === 'admin123') {
            sessionStorage.setItem('admin_token', 'true');
            setAuth(true);
        } else {
            alert('Incorrect Password');
        }
    };

    return (
        <div style={{
            background: C.bg, height: '100%', display: 'flex', flexDirection: 'column',
            fontFamily: "'Inter',sans-serif", overflowY: 'auto'
        }}>
            <div style={{
                padding: '16px 20px', background: '#fff', borderBottom: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10
            }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>
                    ←
                </button>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Admin Panel</span>
            </div>

            {!auth ? (
                <div style={{ padding: 40, textAlign: 'center' }}>
                    <h3>Enter Password</h3>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                        <input
                            type="password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            placeholder="Password..."
                            style={{ padding: 12, borderRadius: 8, border: `1px solid ${C.border}` }}
                        />
                        <button type="submit" style={{ padding: 12, background: C.primary, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold' }}>
                            Login
                        </button>
                    </form>
                </div>
            ) : (
                <div style={{ padding: 16 }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                        {(['products', 'categories', 'banners', 'stories'] as const).map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    flex: 1, padding: '10px 0', borderRadius: 8,
                                    fontWeight: 600, cursor: 'pointer',
                                    background: tab === t ? C.primary : '#fff',
                                    color: tab === t ? '#fff' : C.text,
                                    border: tab === t ? 'none' : `1px solid ${C.border}`
                                }}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    {tab === 'products' && <ProductsAdmin />}
                    {tab === 'categories' && <CategoriesAdmin />}
                    {tab === 'banners' && <BannersAdmin />}
                    {tab === 'stories' && <StoriesAdmin />}
                </div>
            )}
        </div>
    );
}

// =======================
// CATEGORIES ADMIN
// =======================
function CategoriesAdmin() {
    const { categories, products, addCategory, updateCategory, deleteCategory } = useData();
    const [editing, setEditing] = useState<Category | null>(null);

    const emptyCategory: Category = {
        id: `cat_${Date.now()}`,
        name: '',
        sub: '',
        image: '',
    };

    const handleSave = (c: Category) => {
        if (categories.find(x => x.id === c.id)) updateCategory(c);
        else addCategory(c);
        setEditing(null);
    };

    if (editing) return <CategoryForm c={editing} onSave={handleSave} onCancel={() => setEditing(null)} products={products} />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ margin: 0 }}>All Categories ({categories.length})</h4>
                <button onClick={() => setEditing({ ...emptyCategory, id: `cat_${Date.now()}` })} style={{ background: C.primary, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>+ Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {categories.map(c => (
                    <div key={c.id} style={{ background: '#fff', padding: 12, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={c.image} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6, background: '#f5f5f5' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: C.textLight }}>{c.sub}</div>
                        </div>
                        <button onClick={() => setEditing(c)} style={{ border: 'none', background: '#f0f0f0', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => { if (window.confirm('Delete?')) deleteCategory(c.id) }} style={{ border: 'none', background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Del</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CategoryForm({ c, onSave, onCancel, products }: any) {
    const [form, setForm] = useState<Category>(c);
    
    // Get products from this category to suggest images
    const categoryProducts = products.filter((p: Product) => p.cat === c.id);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', padding: 16, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h4 style={{ margin: 0 }}>{form.name ? 'Edit Category' : 'New Category'}</h4>
            <input placeholder="Category Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            <input placeholder="Subtitle (e.g. Fresh & nutritious)" value={form.sub} onChange={e => setForm({ ...form, sub: e.target.value })} style={inputStyle} />
            <input placeholder="Image URL / Path" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} />
            
            {form.image && (
                <div style={{ height: 80, borderRadius: 6, overflow: 'hidden', border: `1px solid ${C.border}`, background: '#f5f5f5' }}>
                    <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            {categoryProducts.length > 0 && (
                <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textLight, marginBottom: 8 }}>
                        📦 Products in this category ({categoryProducts.length})
                    </div>
                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                        {categoryProducts.slice(0, 5).map((p: Product) => (
                            <div
                                key={p.id}
                                onClick={() => setForm({ ...form, image: p.image })}
                                style={{ 
                                    cursor: 'pointer', 
                                    flex: '0 0 60px',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 6,
                                    overflow: 'hidden',
                                    border: form.image === p.image ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
                                    background: '#f5f5f5'
                                }}
                                title={p.name}
                            >
                                <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button onClick={onCancel} style={{ flex: 1, padding: 10, border: `1px solid ${C.border}`, background: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Cancel</button>
                <button onClick={() => onSave(form)} style={{ flex: 1, padding: 10, border: 'none', background: C.primary, color: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Save</button>
            </div>
        </div>
    );
}

// =======================
// PRODUCTS ADMIN
// =======================
function ProductsAdmin() {
    const { products, addProduct, updateProduct, deleteProduct, categories } = useData();
    const [editing, setEditing] = useState<Product | null>(null);

    const emptyProduct: Product = {
        id: Date.now(), name: '', cat: categories[0]?.id || '', sub: '', price: 0, orig: 0, unit: '1 pc',
        rating: 4.5, reviews: 0, stock: 10, image: '', tag: '', desc: '', specs: []
    };

    const handleSave = (p: Product) => {
        if (products.find(x => x.id === p.id)) updateProduct(p);
        else addProduct(p);
        setEditing(null);
    };

    if (editing) return <ProductForm p={editing} onSave={handleSave} onCancel={() => setEditing(null)} cats={categories} />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ margin: 0 }}>All Products ({products.length})</h4>
                <button onClick={() => setEditing({ ...emptyProduct, id: Date.now() })} style={{ background: C.primary, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>+ Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {products.map(p => (
                    <div key={p.id} style={{ background: '#fff', padding: 12, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={p.image} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, background: '#f5f5f5' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: C.textLight }}>₹{p.price} • {p.cat}</div>
                        </div>
                        <button onClick={() => setEditing(p)} style={{ border: 'none', background: '#f0f0f0', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => { if (window.confirm('Delete?')) deleteProduct(p.id) }} style={{ border: 'none', background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Del</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProductForm({ p, onSave, onCancel, cats }: any) {
    const [form, setForm] = useState<Product>(p);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', padding: 16, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h4 style={{ margin: 0 }}>{p.name ? 'Edit Product' : 'New Product'}</h4>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            <select value={form.cat} onChange={e => setForm({ ...form, cat: e.target.value })} style={inputStyle}>
                {cats.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} style={inputStyle} />
            <input placeholder="Original Price" type="number" value={form.orig} onChange={e => setForm({ ...form, orig: +e.target.value })} style={inputStyle} />
            <input placeholder="Unit (e.g. 1kg)" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} style={inputStyle} />
            <input placeholder="Image URL / Path" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} />
            <textarea placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} style={{ ...inputStyle, height: 60 }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button onClick={onCancel} style={{ flex: 1, padding: 10, border: `1px solid ${C.border}`, background: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Cancel</button>
                <button onClick={() => onSave(form)} style={{ flex: 1, padding: 10, border: 'none', background: C.primary, color: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Save</button>
            </div>
        </div>
    );
}

// =======================
// BANNERS ADMIN
// =======================
function BannersAdmin() {
    const { banners, addBanner, updateBanner, deleteBanner } = useData();
    const [editing, setEditing] = useState<Banner | null>(null);

    const emptyBanner: Banner = { id: `b_${Date.now()}`, grad: 'linear-gradient(135deg,#111,#333)', tag: '', title: '', sub: '', icon: 'Image', image: '' };

    const handleSave = (b: Banner) => {
        if (banners.find(x => x.id === b.id)) updateBanner(b);
        else addBanner(b);
        setEditing(null);
    };

    if (editing) return <BannerForm b={editing} onSave={handleSave} onCancel={() => setEditing(null)} />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ margin: 0 }}>All Banners ({banners.length})</h4>
                <button onClick={() => setEditing({ ...emptyBanner, id: `b_${Date.now()}` })} style={{ background: C.primary, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>+ Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {banners.map(b => (
                    <div key={b.id} style={{ background: '#fff', padding: 12, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ background: b.grad, width: 40, height: 40, borderRadius: 6, flexShrink: 0, overflow: 'hidden' }}>
                            {b.image && <img src={b.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{b.title || 'Untitled Banner'}</div>
                            <div style={{ fontSize: 11, color: C.textLight }}>{b.tag}</div>
                        </div>
                        <button onClick={() => setEditing(b)} style={{ border: 'none', background: '#f0f0f0', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => { if (window.confirm('Delete?')) deleteBanner(b.id) }} style={{ border: 'none', background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Del</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BannerForm({ b, onSave, onCancel }: any) {
    const [form, setForm] = useState<Banner>(b);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', padding: 16, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h4 style={{ margin: 0 }}>{b.title ? 'Edit Banner' : 'New Banner'}</h4>
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            <input placeholder="Subtitle" value={form.sub} onChange={e => setForm({ ...form, sub: e.target.value })} style={inputStyle} />
            <input placeholder="Tag (e.g. Best Offer)" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inputStyle} />
            <input placeholder="Image URL / Path" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} />
            <input placeholder="Gradient (CSS value)" value={form.grad} onChange={e => setForm({ ...form, grad: e.target.value })} style={inputStyle} />
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button onClick={onCancel} style={{ flex: 1, padding: 10, border: `1px solid ${C.border}`, background: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Cancel</button>
                <button onClick={() => onSave(form)} style={{ flex: 1, padding: 10, border: 'none', background: C.primary, color: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Save</button>
            </div>
        </div>
    );
}

// =======================
// STORIES ADMIN
// =======================
function StoriesAdmin() {
    const { stories, addStory, deleteStory, categories } = useData();
    const [editing, setEditing] = useState<Story | null>(null);

    const emptyStory: Story = { id: `s_${Date.now()}`, catId: categories[0]?.id || '', image: '' };

    const handleSave = (s: Story) => {
        // only Add or Delete for simplicity (since it's just an image)
        addStory(s);
        setEditing(null);
    };

    if (editing) return <StoryForm s={editing} onSave={handleSave} onCancel={() => setEditing(null)} cats={categories} />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ margin: 0 }}>All Stories ({stories.length})</h4>
                <button onClick={() => setEditing({ ...emptyStory, id: `s_${Date.now()}` })} style={{ background: C.primary, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>+ Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {stories.map(s => {
                    const cName = categories.find(c => c.id === s.catId)?.name || s.catId;
                    return (
                        <div key={s.id} style={{ background: '#fff', padding: 12, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={s.image} alt="" style={{ width: 40, height: 60, objectFit: 'cover', borderRadius: 4, background: '#f5f5f5' }} />
                            <div style={{ flex: 1, minWidth: 0, fontWeight: 600, fontSize: 13 }}>For: {cName}</div>
                            <button onClick={() => { if (window.confirm('Delete?')) deleteStory(s.id) }} style={{ border: 'none', background: '#fee2e2', color: '#dc2626', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Del</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function StoryForm({ s, onSave, onCancel, cats }: any) {
    const [form, setForm] = useState<Story>(s);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', padding: 16, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <h4 style={{ margin: 0 }}>New Story</h4>
            <select value={form.catId} onChange={e => setForm({ ...form, catId: e.target.value })} style={inputStyle}>
                {cats.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input placeholder="Image URL / Path" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} />
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button onClick={onCancel} style={{ flex: 1, padding: 10, border: `1px solid ${C.border}`, background: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Cancel</button>
                <button onClick={() => onSave(form)} style={{ flex: 1, padding: 10, border: 'none', background: C.primary, color: '#fff', borderRadius: 6, fontWeight: 'bold' }}>Save</button>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: 10,
    borderRadius: 6,
    border: `1px solid ${C.border}`,
    fontSize: 14,
    fontFamily: 'inherit'
}
