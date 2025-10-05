import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from './GallerySection';

type LightboxProps = {
    selectedItem: GalleryItem | null;
    setSelectedItem: (item: GalleryItem | null) => void;
    items: GalleryItem[];
}

const Lightbox = ({ selectedItem, setSelectedItem, items }: LightboxProps) => {
    if (!selectedItem) return null;

    const gotoPrevious = useCallback(() => {
        const currentIndex = items.findIndex(item => item.fullUrl === selectedItem.fullUrl);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        setSelectedItem(items[prevIndex]);
    }, [items, selectedItem, setSelectedItem]);

    const gotoNext = useCallback(() => {
        const currentIndex = items.findIndex(item => item.fullUrl === selectedItem.fullUrl);
        const nextIndex = (currentIndex + 1) % items.length;
        setSelectedItem(items[nextIndex]);
    }, [items, selectedItem, setSelectedItem]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedItem(null);
            if (e.key === 'ArrowLeft') gotoPrevious();
            if (e.key === 'ArrowRight') gotoNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gotoPrevious, gotoNext, setSelectedItem]); 

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
        >
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-zinc-100 text-4xl z-[120] hover:text-amber-400 transition-colors" aria-label="Close gallery">&times;</button>
            <button onClick={(e) => { e.stopPropagation(); gotoPrevious(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-100 bg-black/30 rounded-full p-2 text-3xl z-[120] hover:bg-black/60 transition-colors" aria-label="Previous item">‹</button>
            <button onClick={(e) => { e.stopPropagation(); gotoNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-100 bg-black/30 rounded-full p-2 text-3xl z-[120] hover:bg-black/60 transition-colors" aria-label="Next item">›</button>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedItem.fullUrl}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-full max-h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {selectedItem.type === 'photo' ? (
                        <img src={selectedItem.fullUrl} alt={selectedItem.title} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                    ) : (
                        <video src={selectedItem.fullUrl} controls autoPlay className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                    )}
                    <p className="text-center text-zinc-100 mt-2 bg-black/50 p-2 rounded-b-lg">{selectedItem.title}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default Lightbox;