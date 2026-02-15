import { useEffect } from 'react';

export function useSecurity() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
            if (
                (e.ctrlKey && (e.key === 's' || e.key === 'u')) ||
                (e.ctrlKey && e.shiftKey && e.key === 'i') ||
                e.key === 'F12'
            ) {
                e.preventDefault();
                return false;
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
}
