"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CategoriesList from "./components/CategoriesList";

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#fcfaf7] min-h-screen font-sans text-black overflow-x-hidden">
      <Navbar scrolled={scrolled} onMenuOpen={() => setMobileMenuOpen(true)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main>
        <HeroSection />
        <CategoriesList />
        <ProductCard />

      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
