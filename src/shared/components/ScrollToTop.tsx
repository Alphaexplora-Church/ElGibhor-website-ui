// src/shared/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            // A short delay ensures AnimatePresence has unmounted the old page
            // and the new page is ready in the DOM before we force the scroll.
            setTimeout(() => {
                // 1. Standard window scroll
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

                // 2. Fallbacks for custom Smooth Scroll wrappers
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 100);
        }
    }, [pathname, hash]);

    return null;
};