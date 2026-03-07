import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { C, sm, WA } from '../constants/theme';

export default function SuggestScreen() {
    const [text, setText] = useState('');
    const [done, setDone] = useState(false);

    const send = () => {
        const m = encodeURIComponent(`Hi NothingStore! 💡\nProduct suggestion:\n${text}`);
        window.open(`https://wa.me/${WA}?text=${m}`, '_blank');
        setDone(true);
    };

    return (
        <div style={{ padding: '28px 20px' }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: '-0.7px', marginBottom: 6 }}>Suggest a Product</p>
            <p style={{ fontSize: 13, color: C.textLight, marginBottom: 28, lineHeight: 1.6 }}>Can't find what you need? Tell us and we'll stock it!</p>

            {done ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: 72, height: 72, background: '#E2F5EA', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Send size={32} color={C.primary} strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Thanks!</p>
                    <p style={{ fontSize: 13, color: C.textLight, marginTop: 8 }}>We'll review and add it soon.</p>
                    <button
                        onClick={() => { setDone(false); setText(''); }}
                        style={{ marginTop: 24, background: C.primary, color: '#fff', border: 'none', borderRadius: 14, padding: '13px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                        Suggest Another
                    </button>
                </div>
            ) : (
                <>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows={5}
                        style={{
                            width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 16,
                            padding: '15px', fontSize: 14, resize: 'none', outline: 'none',
                            fontFamily: 'inherit', color: C.text, background: '#fff', lineHeight: 1.7,
                            transition: 'border-color .2s',
                        }}
                        placeholder="e.g. Castrol Edge 5W-30 1L, or Tata Salt 1kg…"
                        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.primary; }}
                        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.border; }}
                    />
                    <button
                        onClick={send}
                        disabled={!text.trim()}
                        style={{
                            width: '100%',
                            background: text.trim() ? C.primary : '#E2F5EA',
                            color: text.trim() ? '#fff' : C.textLight,
                            border: 'none', borderRadius: 16, padding: '16px', fontSize: 15,
                            fontWeight: 700, cursor: text.trim() ? 'pointer' : 'default',
                            fontFamily: 'inherit', marginTop: 12,
                            transition: `all .25s ${sm}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}
                    >
                        <MessageCircle size={18} color={text.trim() ? '#fff' : C.textLight} strokeWidth={2} />
                        Send via WhatsApp
                    </button>
                </>
            )}
        </div>
    );
}
