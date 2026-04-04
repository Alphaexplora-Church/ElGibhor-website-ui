import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollManager = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Because of Suspense and AnimatePresence, the element might not be immediately available.
            // We use an interval to check for the element's existence up to 2 seconds.
            let attempts = 0;
            const scrollInterval = setInterval(() => {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    clearInterval(scrollInterval);
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                attempts++;
                if (attempts >= 20) {
                    clearInterval(scrollInterval);
                }
            }, 100);
            
            return () => clearInterval(scrollInterval);
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);

    return null;
};
