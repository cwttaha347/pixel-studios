import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '../../data/items';
import Lightbox from './Lightbox';

const categories = ['Logo', 'Banner', 'Emotes', 'VTubers', '3D Animation'] as const;

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState<typeof categories[number] | 'All'>('All');
    const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
    const [visibleCount, setVisibleCount] = useState(12);

    const filteredItems = useMemo(() => {
        let items = activeCategory === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === activeCategory);
        return items;
    }, [activeCategory]);

    const displayedItems = useMemo(() => {
        return filteredItems.slice(0, visibleCount);
    }, [filteredItems, visibleCount]);

    const hasMore = visibleCount < filteredItems.length;

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 12, filteredItems.length));
    };

    // Reset visibility when category changes
    useEffect(() => {
        setVisibleCount(12);
    }, [activeCategory]);

    const handleNext = () => {
        if (!selectedItem) return;
        const currentIndex = portfolioItems.findIndex((item) => item.id === selectedItem.id);
        const nextItem = portfolioItems[(currentIndex + 1) % portfolioItems.length];
        setSelectedItem(nextItem);
    };

    const handlePrev = () => {
        if (!selectedItem) return;
        const currentIndex = portfolioItems.findIndex((item) => item.id === selectedItem.id);
        const prevItem = portfolioItems[(currentIndex - 1 + portfolioItems.length) % portfolioItems.length];
        setSelectedItem(prevItem);
    };

    return (
        <div className="py-20 space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">My <span className="text-gradient">Gallery</span></h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    A collection of my graphic design work, characters, and 3D models.
                </p>
            </motion.div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 px-4">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'All'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === category
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-12">
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 w-full"
                >
                    <AnimatePresence mode='popLayout'>
                        {displayedItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="break-inside-avoid mb-4 group relative cursor-pointer overflow-hidden rounded-xl"
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                                {item.type === 'video' ? (
                                    <video
                                        src={item.src}
                                        muted
                                        loop
                                        playsInline
                                        preload="none"
                                        onMouseEnter={(e) => e.currentTarget.play()}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.pause();
                                            e.currentTarget.currentTime = 0;
                                        }}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={`Portfolio Item ${item.id}`}
                                        loading="lazy"
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {hasMore && (
                    <button
                        onClick={loadMore}
                        className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg shadow-purple-500/20 transition-all transform hover:scale-105 active:scale-95"
                    >
                        Load More Portfolio Items
                    </button>
                )}
            </div>

            {selectedItem && (
                <Lightbox
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </div>
    );
}
