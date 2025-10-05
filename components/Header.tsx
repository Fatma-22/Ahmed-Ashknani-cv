import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type HeaderData = {
    name: string;
    title: string;
    imageUrl: string;
    contact: {
        email: string;
        phone: string;
        location: string;
    }
}

type HeaderProps = {
    data: HeaderData | null;
}

const Header = ({ data }: HeaderProps) => {
    const [bgImageLoaded, setBgImageLoaded] = useState(false);
    const backgroundImageUrl = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop';
    
    useEffect(() => {
        const img = new Image();
        img.src = backgroundImageUrl;
        img.onload = () => {
            setBgImageLoaded(true);
        };
    }, []);

    if (!data) return null;
    return (
        <header 
            className={`min-h-screen flex items-center justify-center text-white p-4 relative pt-20 header-lazy-bg ${bgImageLoaded ? 'loaded' : ''}`}
            style={{ 
                '--bg-image': `url('${backgroundImageUrl}')`
            }}
        >
             <div className="absolute inset-0 bg-black/60 z-[1]"></div>
            <div className="text-center z-10">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, type: 'spring' }}>
                    <img loading="lazy" src={data.imageUrl} alt={data.name} className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-amber-400 shadow-lg object-cover" />
                </motion.div>
                <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    {data.name}
                </motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-4 text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto">
                    {data.title}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="mt-8 flex justify-center items-center gap-6 text-zinc-300">
                    <a href={`mailto:${data.contact.email}`} className="hover:text-amber-400 transition-colors">{data.contact.email}</a>
                    <span className="hidden sm:inline">|</span>
                    <a href={`tel:${data.contact.phone}`} className="hover:text-amber-400 transition-colors">{data.contact.phone}</a>
                     <span className="hidden sm:inline">|</span>
                    <span>{data.contact.location}</span>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;