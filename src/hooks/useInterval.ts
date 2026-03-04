import { useRef, useEffect } from 'react';

export function useInterval(cb: () => void, ms: number) {
    const r = useRef(cb);
    useEffect(() => { r.current = cb; }, [cb]);
    useEffect(() => {
        const t = setInterval(() => r.current(), ms);
        return () => clearInterval(t);
    }, [ms]);
}
