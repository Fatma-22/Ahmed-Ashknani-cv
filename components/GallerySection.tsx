import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionTitle } from './Section';
import Lightbox from './Lightbox';

const listVariants = {
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
};

export type GalleryItem = {
    type: 'photo' | 'video';
    thumbnailUrl: string;
    fullUrl: string;
    title: string;
};

type GalleryData = {
    title: string;
    items: GalleryItem[];
}

type GallerySectionProps = {
    data: GalleryData | null;
    id: string;
}

const GallerySection = ({ data, id }: GallerySectionProps) => {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    if (!data) return null;

    const PlayIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-zinc-100 drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
    );

    return (
        <Section id={id}>
            <SectionTitle>{data.title}</SectionTitle>
            <motion.div 
                className="columns-2 sm:columns-3 lg:columns-4 gap-4"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {data.items.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 ease-in-out border border-amber-500/20 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-1"
                        onClick={() => setSelectedItem(item)}
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedItem(item)}
                        role="button"
                        aria-label={`View ${item.title}`}
                    >
                        <img loading="lazy" src={item.thumbnailUrl} alt={item.title} className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-1" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        {item.type === 'video' && (
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayIcon />
                           </div>
                        )}
                         <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-zinc-100 text-sm p-2 truncate">{item.title}</p>
                    </motion.div>
                ))}
            </motion.div>
            <AnimatePresence>
                {selectedItem && <Lightbox selectedItem={selectedItem} setSelectedItem={setSelectedItem} items={data.items} />}
            </AnimatePresence>
        </Section>
    );
};

export default GallerySection;