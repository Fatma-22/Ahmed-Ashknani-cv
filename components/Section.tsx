import React from 'react';
import { motion } from 'framer-motion';

// --- Animation Variants ---
// FIX: Add 'as const' to correctly infer types for framer-motion variants.
export const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
} as const;

// --- Reusable Components ---
type SectionProps = {
    children?: React.ReactNode;
    className?: string;
    id?: string;
};
export const Section = ({ children, className = '', id }: SectionProps) => (
    <motion.section
        id={id}
        className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${className}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        <div className="max-w-4xl mx-auto">
            {children}
        </div>
    </motion.section>
);

type SectionTitleProps = {
    children?: React.ReactNode;
};
export const SectionTitle = ({ children }: SectionTitleProps) => (
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-500 text-center">{children}</h2>
);