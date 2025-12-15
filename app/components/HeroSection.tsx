'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

const words = ['Imbattables', 'Guëne Yomb', 'Guëne Woor'];
const OUTLINE_COLOR_CLASS = "text-amber-700 border-amber-200 hover:bg-amber-50";
const PRIMARY_COLOR_CLASSES = "bg-amber-600 hover:bg-amber-700";

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let deleting = false;
    let currentWord = words[index];

    const interval = setInterval(() => {
      if (!deleting) {
        setDisplayedText(currentWord.slice(0, currentIndex + 1));
        currentIndex += 1;

        if (currentIndex === currentWord.length) {
          deleting = true;
        }
      } else {
        setDisplayedText(currentWord.slice(0, currentIndex - 1));
        currentIndex -= 1;

        if (currentIndex === 0) {
          deleting = false;
          setIndex((prev) => (prev + 1) % words.length);
          currentWord = words[(index + 1) % words.length];
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <header className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-white to-gold/10 blur-xl"></div>

      <div className="relative text-center max-w-5xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-black leading-[1.1] mb-6">
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent drop-shadow-sm">
            Dubaï Chez Vous
          </span>
          <br />
          <span className="text-black">{displayedText}</span>
          <span className="text-gold animate-pulse">|</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          Découvrez le <span className="text-emerald-700 font-semibold">luxe authentique</span>, une expérience premium unique importée directement des Émirats.
        </p>

        {/* Conteneur des Boutons d'Action (CTAs) */}
        <div className="flex justify-center space-x-4 md:space-x-6">

          {/* Bouton Primaire (Découvrir les produits) - Style Solide Or/Ambre */}
          <Link
            href="/products"
            className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white ${PRIMARY_COLOR_CLASSES} transition duration-300 transform hover:scale-[1.02]`}
          >
            Découvrir les produits
            <ChevronRight className="w-5 h-5 ml-2 -mr-1" />
          </Link>

          {/* Bouton Secondaire (Nos catégories) - Style Contour Or/Ambre */}
          <Link
            href="/categories"
            className={`inline-flex items-center justify-center px-8 py-3 border ${OUTLINE_COLOR_CLASS} text-base font-semibold rounded-full bg-white ${OUTLINE_COLOR_CLASS.split(' ')[0].replace('text', 'hover:text')} transition duration-300`}
          >
            Nos catégories
          </Link>

        </div>
      </div>
    </header>
  );
};

export default HeroSection;

