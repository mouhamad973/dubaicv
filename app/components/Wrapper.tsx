'use client';

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer";

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div className="bg-[#fcfaf7] min-h-screen font-sans text-black overflow-x-hidden">

                {/* NAVBAR */}
                <Navbar scrolled={scrolled} onMenuOpen={() => setMobileMenuOpen(true)} />

                {/* MENU MOBILE */}
                <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

                {/* CONTENU CENTRAL */}
                <div className="pt-32 px-5 md:px-[10%] mb-10">
                    {children}
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Wrapper;
