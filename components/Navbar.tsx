import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FIX: Add 'as const' to correctly infer types for framer-motion variants.
const mobileMenuVariant = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { ease: [0.6, 0.05, -0.01, 0.9] } }
} as const;

type NavLink = {
    id: string;
    title: string;
}

type NavbarProps = {
    navLinks: NavLink[];
    lang: string;
    setLang: (lang: string) => void;
    name: string;
    imageUrl: string;
}

const Navbar = ({ navLinks, lang, setLang, name, imageUrl }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const LanguageToggleButton = () => (
        <button
            onClick={() => {
                const newLang = lang === 'en' ? 'ar' : 'en';
                setLang(newLang);
                if(isOpen) toggleMenu();
            }}
            className="bg-zinc-800/50 text-zinc-200 font-bold py-2 px-4 rounded-full border border-amber-500 hover:bg-amber-500 hover:text-zinc-100 transition-all duration-300"
            aria-label="Toggle Language"
        >
            {lang === 'en' ? 'AR' : 'EN'}
        </button>
    );
    
    return (
        <>
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 creative-card px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between h-20">
                    <div className="flex items-center gap-x-8">
                        <a href="#" aria-label="Back to top">
                            <img loading="lazy" src={imageUrl} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 hover:scale-105 transition-transform duration-300" />
                        </a>
                        {/* Desktop Menu */}
                        <ul className="hidden md:flex items-center space-x-2">
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`} className="text-zinc-300 font-medium px-4 py-2 rounded-lg hover:bg-amber-500/10 hover:text-amber-400 transition-colors duration-200">{link.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <LanguageToggleButton />
                        </div>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} aria-label="Open menu">
                                <svg className="w-6 h-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-50 bg-zinc-900/95 backdrop-blur-sm p-8 md:hidden"
                    >
                         <div className="flex justify-end mb-8">
                           <button onClick={toggleMenu} aria-label="Close menu">
                               <svg className="w-8 h-8 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                           </button>
                        </div>
                        <ul className="flex flex-col items-center justify-center space-y-8 h-full -mt-16">
                            {navLinks.map((link, i) => (
                                <motion.li key={link.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                                    <a href={`#${link.id}`} onClick={toggleMenu} className="text-2xl font-bold text-zinc-200 hover:text-amber-400 transition-colors px-6 py-3 rounded-lg hover:bg-amber-500/10">{link.title}</a>
                                </motion.li>
                            ))}
                             <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-6">
                                <LanguageToggleButton />
                             </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;