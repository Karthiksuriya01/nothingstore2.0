import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Story, Category } from '../types';

interface StoryViewerProps {
    stories: Story[];
    category: Category;
    onClose: () => void;
    onOrderNow?: (productId: number) => void;
}

export default function StoryViewer({ stories, category, onClose, onOrderNow }: StoryViewerProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Auto-advance every 4 seconds
        const t = setTimeout(() => {
            if (index < stories.length - 1) {
                setIndex(index + 1);
            } else {
                onClose();
            }
        }, 4000);
        return () => clearTimeout(t);
    }, [index, stories.length, onClose]);

    const handleTap = (e: React.MouseEvent) => {
        const x = e.clientX;
        const width = window.innerWidth;
        if (x < width * 0.3) {
            // go back
            if (index > 0) setIndex(index - 1);
        } else {
            // go forward
            if (index < stories.length - 1) setIndex(index + 1);
            else onClose();
        }
    };

    const modalContent = (
        <div style={{
            position: 'fixed', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 430, height: '100dvh',
            background: '#000', zIndex: 99999,
            display: 'flex', flexDirection: 'column'
        }}>
            {/* Progress bars */}
            <div style={{
                display: 'flex', gap: 4, padding: '16px 12px',
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10
            }}>
                {stories.map((s, i) => (
                    <div key={s.id} style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                            width: i < index ? '100%' : i === index ? '100%' : '0%',
                            height: '100%', background: '#fff',
                            transition: i === index ? 'width 4s linear' : 'none'
                        }} />
                    </div>
                ))}
            </div> 

            {/* Header */}
            <div style={{
                position: 'absolute', top: 24, left: 16, right: 16, zIndex: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={category.image} alt="" style={{ width: 32, height: 32, borderRadius: 16, objectFit: 'cover', background: '#ddd' }} />
                    {/* <span style={{ fontWeight: 600, fontSize: 14, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{category.name}</span> */}
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, textShadow: '0 1px 4px rgba(0,0,0,0.5)', cursor: 'pointer' }}>&times;</button>
            </div>

            {/* Tap Area and Image */}
            <div onClick={handleTap} style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>
                {stories[index] && (
                    <>
                        <img
                            src={stories[index].image || 'https://images.unsplash.com/photo-1549590776-15485f4bebed?w=500&h=800&fit=crop'}
                            alt="Story"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=800&fit=crop';
                            }}
                        />
                        {stories[index].productId && onOrderNow && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOrderNow(stories[index].productId!);
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: 40,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: '#fff',
                                    color: '#000',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: 24,
                                    fontWeight: 600,
                                    fontSize: 16,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    cursor: 'pointer',
                                    zIndex: 20
                                }}
                            >
                                Order Now
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
