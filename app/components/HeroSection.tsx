'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

const words = ['Imbattables', 'Guëne Yomb', 'Guëne Woor'];

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

        <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto mt-8">
          <Link
            href="/sign-in"
            className="relative group w-full flex items-center justify-center gap-3 bg-white text-slate-800 px-8 py-4 rounded-full border border-slate-200 shadow-xl shadow-slate-200/40 hover:shadow-amber-100/50 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-bold text-sm tracking-wide">S'inscrire en 1 clic avec Google</span>
            <span className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
              Rapide
            </span>
          </Link>

          <p className="text-xs text-slate-400 flex items-center gap-2 mt-2">
            <span className="flex text-amber-500">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
            </span>
            Rejoignez +10,000 membres
          </p>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;

