"use client";

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="relative z-10 bg-[var(--background)] transition-colors duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                {children}
            </div>
            <Footer />
            <a
                href="https://wa.me/919849884501"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#2d1e95] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
            >
                <FaWhatsapp className="w-7 h-7" />
            </a>
        </>
    );
}


