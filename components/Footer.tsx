import React from 'react';

// SVG Icons for social media
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.06.088.621 1.944 2.423 3.352 4.564 3.39-1.87 1.474-4.249 2.35-6.82 2.35-1.09 0-2.16-.064-3.21-.188 2.413 1.548 5.274 2.454 8.354 2.454 10.422 0 16.121-8.638 16.121-16.121 0-.245-.005-.49-.017-.734.93-.67 1.737-1.512 2.384-2.47z" />
    </svg>
);

type FooterData = {
    name: string;
    socials: {
        instagram: string;
        twitter: string;
    }
}

type FooterProps = {
    data: FooterData;
}

const Footer = ({ data }: FooterProps) => {
    return (
        <footer className="bg-zinc-900 border-t border-amber-500/20 text-zinc-400 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <a href={data.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-amber-400 transition-colors">
                        <InstagramIcon />
                    </a>
                    <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-amber-400 transition-colors">
                        <TwitterIcon />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;