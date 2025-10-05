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

type ExperienceItem = {
    period: string;
    title: string;
    details: string[];
}

type ExperienceData = {
    title: string;
    items: ExperienceItem[];
}

type ExperienceSectionProps = {
    data: ExperienceData | null;
    id: string;
}

const ExperienceSection = ({ data, id }: ExperienceSectionProps) => {
    if (!data) return null;
    return (
        <Section id={id}>
            <SectionTitle>{data.title}</SectionTitle>
            <div className="relative">
                <div className="absolute left-4 md:left-1/2 -ml-px w-0.5 h-full bg-zinc-700" aria-hidden="true"></div>
                <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {data.items.map((item, index) => (
                        <motion.div key={index} variants={itemVariants} className="relative mb-8">
                            <div className="md:flex items-center">
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:text-right'}`}>
                                </div>
                                <div className="hidden md:block absolute left-1/2 -ml-4 w-8 h-8 rounded-full bg-zinc-900 border-2 border-amber-500"></div>
                                 <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                                </div>
                            </div>
                            <div className={`relative md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16 md:text-right'}`}>
                                <div className={`creative-card p-6 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                                    <p className="text-sm font-semibold text-amber-500 mb-1">{item.period}</p>
                                    <h3 className="text-xl font-bold text-zinc-100 mb-2">{item.title}</h3>
                                     {item.details && item.details.length > 0 && (
                                        <ul className="list-disc list-inside text-zinc-400 space-y-1">
                                            {item.details.map((detail, i) => <li key={i}>{detail}</li>)}
                                        </ul>
                                     )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default ExperienceSection;