import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface LightboxProps {
    item: { id: number; src: string; type: string } | null;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                        onClick={onClose}
                    >
                        <X size={32} />
                    </button>

                    {/* Navigation */}
                    <button
                        className="absolute left-4 p-4 text-white/50 hover:text-white transition-colors hidden md:block"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrev();
                        }}
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        className="absolute right-4 p-4 text-white/50 hover:text-white transition-colors hidden md:block"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                    >
                        <ChevronRight size={48} />
                    </button>

                    {/* Image Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={item.src}
                            alt={`Portfolio Item ${item.id}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none select-none"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        {/* Security Overlay (Transparent) */}
                        <div className="absolute inset-0 bg-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
