import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from './Section';

type AboutData = {
    title: string;
    content: string;
}

type AboutSectionProps = {
    data: AboutData | null;
}

const AboutSection = ({ data }: AboutSectionProps) => {
    if (!data) return null;
    return (
        <Section id="about">
            <SectionTitle>{data.title}</SectionTitle>
            <motion.div 
                className="creative-card p-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <p className="text-zinc-300 leading-relaxed text-lg">{data.content}</p>
            </motion.div>
        </Section>
    );
};

export default AboutSection;