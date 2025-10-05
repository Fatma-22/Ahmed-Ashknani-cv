/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ListSection from './components/ListSection';
import ExperienceSection from './components/ExperienceSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

// --- Data Structure (from cv-data.json) ---
const fetchData = async () => {
    const response = await fetch('./cv-data.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


// --- Main App Component ---
function App() {
    const [data, setData] = useState<any>(null);
    const [lang, setLang] = useState('ar');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch (err) {
                setError('Failed to load CV data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);
    
    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);

    const cvData = useMemo(() => data ? data[lang] : null, [data, lang]);
    
    const navLabels = useMemo(() => {
        return lang === 'en' ? 
        {
            about: "About",
            qualifications: "Qualifications",
            experience: "Experience",
            certificates: "Certificates",
            courses: "Courses",
            university: "University Teams",
            gallery: "Gallery"
        } : {
            about: "نبذة",
            qualifications: "المؤهلات",
            experience: "الخبرات",
            certificates: "الشهادات",
            courses: "الدورات",
            university: "الفرق الجامعية",
            gallery: "المعرض"
        };
    }, [lang]);

    const navLinks = useMemo(() => {
        if (!cvData) return [];
        return [
            { id: 'about', title: navLabels.about },
            { id: 'qualifications', title: navLabels.qualifications },
            { id: 'experience', title: navLabels.experience },
            { id: 'certificates', title: navLabels.certificates },
            { id: 'courses', title: navLabels.courses },
            { id: 'university', title: navLabels.university },
            { id: 'gallery', title: navLabels.gallery }
        ];
    }, [cvData, navLabels]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-zinc-200">Loading CV...</div>;
    }
    
    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    if (!cvData) return null;

    return (
        <>
            <AnimatePresence>
                <main key={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <Navbar 
                        navLinks={navLinks} 
                        lang={lang} 
                        setLang={setLang}
                        name={cvData.header.name}
                        imageUrl={cvData.header.imageUrl}
                    />
                    <Header data={cvData.header} />
                    <AboutSection data={cvData.aboutMe} />
                    <ListSection id="qualifications" data={cvData.qualifications} />
                    <ExperienceSection id="certificates" data={cvData.sportsCertificates} />
                    <ListSection id="courses" data={cvData.trainingCourses} />
                    <ExperienceSection id="experience" data={cvData.experiences} />
                    <ListSection id="university" data={cvData.universityTeams} />
                    <GallerySection id="gallery" data={cvData.gallery} />
                    <Footer data={{ name: cvData.header.name, socials: cvData.header.socials }} />
                </main>
            </AnimatePresence>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);