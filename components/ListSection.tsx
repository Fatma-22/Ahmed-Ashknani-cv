import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from './Section';

const listVariants = {
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

type ListItem = string | { title: string; details: string; };

type ListData = {
    title: string;
    items: ListItem[];
}

type ListSectionProps = {
    data: ListData | null;
    id: string;
}

const ListSection = ({ data, id }: ListSectionProps) => {
    if (!data) return null;
    return (
        <Section id={id}>
            <SectionTitle>{data.title}</SectionTitle>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
                {data.items.map((item, index) => (
                    <motion.li key={index} variants={itemVariants} className="creative-card p-6 flex items-start space-x-4 rtl:space-x-reverse">
                        <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                             {typeof item === 'string' ? (
                                <p className="text-zinc-300">{item}</p>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg text-zinc-100">{item.title}</h3>
                                    <p className="text-zinc-400">{item.details}</p>
                                </>
                            )}
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </Section>
    );
};

export default ListSection;