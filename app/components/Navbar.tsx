'use client';

import React from 'react';
import { Menu, Search as SearchIcon, ShoppingBag, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from "@/app/context/CartContext";
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs de SSR
const CartModal = dynamic(() => import('./CartModal'), { ssr: false });

type NavbarProps = {
  scrolled: boolean;
  onMenuOpen: () => void;
};

const Navbar = ({ scrolled, onMenuOpen }: NavbarProps) => {

  const { user } = useUser();
  const { cart } = useCart();

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Gestionnaire pour le clic sur Collections
  const handleCollectionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // 🔥 Total réel du panier
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => {
    (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal();
  };

  // Gérer la soumission du formulaire de recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      // Ne pas fermer automatiquement sur desktop pour permettre des recherches successives
      if (window.innerWidth < 768) { // Mobile
        setIsSearchOpen(false);
      }
    }
  };

  // Effet pour gérer la fermeture de la recherche avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Effet pour mettre à jour la requête de recherche depuis l'URL
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);


  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-all duration-500 
          ${scrolled ? 'bg-white/90 shadow-lg py-3 border-b border-gray-100' : 'bg-transparent py-5'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* LOGO + MENU MOBILE */}
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={onMenuOpen} aria-label="Ouvrir le menu">
              <Menu className="w-6 h-6 text-black" />
            </button>
            <Link href="../">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-20 h-auto object-contain cursor-pointer transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* NAVIGATION DESKTOP */}
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-wide">
            <Link href="/products" className="nav-link">Tous les produits</Link>
            <Link href="/#new" className="nav-link">Nouveautés</Link>
             <a 
              href="#categories" 
              onClick={handleCollectionsClick}
              className="nav-link hover:text-amber-600 transition-colors cursor-pointer"
            >
              Collections
            </a>

            {/* Affichage conditionnel Admin */}
            {user?.primaryEmailAddress?.emailAddress &&
              ["kingmetzo1@gmail.com", "momo@gmail.com"].includes(user.primaryEmailAddress.emailAddress) && (
                <Link href={"/admin"} className="nav-link">
                  Admin
                </Link>
              )}
          </div>

          {/* ICONES DROITES */}
          <div className="flex items-center gap-6 text-black">

            {/* Barre de recherche intégrée */}
            <div className="relative group">
              {/* Bouton de recherche */}
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 0);
                }}
                className={`p-2 transition-all duration-300 ${isSearchOpen ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
                aria-label="Rechercher des produits"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Barre de recherche déroulante */}
              <div 
                className={`absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top-right transform-gpu ${
                  isSearchOpen 
                    ? 'opacity-100 scale-100 visible' 
                    : 'opacity-0 scale-95 invisible'
                }`}
                style={{
                  top: '100%',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <form 
                  onSubmit={handleSearch}
                  className="relative"
                >
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un produit..."
                      className="w-full py-3 pl-10 pr-12 border-0 focus:ring-2 focus:ring-amber-500 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-amber-600 hover:text-amber-700"
                      aria-label="Rechercher"
                    >
                      <SearchIcon className="h-4 w-4" />
                    </button>
                  </div>
                </form>
                
                {/* Suggestions (optionnel) */}
                {searchQuery && (
                  <div className="border-t border-gray-100 py-2 text-sm text-gray-500 px-3">
                    Appuyez sur Entrée pour rechercher
                  </div>
                )}
              </div>
            </div>

            {/* Overlay pour mobile */}
            {isSearchOpen && (
              <div 
                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                onClick={() => setIsSearchOpen(false)}
              />
            )}

            {/* PANIER */}
            <button
              onClick={openCart}
              aria-label="Ouvrir le panier"
              className="relative cursor-pointer group"
            >
              <div
                className="p-2 bg-white rounded-full shadow-sm border border-gray-200 
                group-hover:border-amber-500 group-hover:shadow-amber-200 transition-all"
              >
                <ShoppingBag className="w-5 h-5 group-hover:text-amber-600 transition-colors" />
              </div>

              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 
                  text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md"
                >
                  {totalItems}
                </span>
              )}
            </button>

            <SignedOut>
              <Link
                href="/sign-in"
                className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-amber-600 transition-colors"
              >
                Se connecter
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  {user?.primaryEmailAddress?.emailAddress &&
                    ["kingmetzo1@gmail.com", "momo@gmail.com"].includes(user.primaryEmailAddress.emailAddress) && (
                      <UserButton.Action
                        label="Admin"
                        labelIcon={null}
                        onClick={() => {
                          window.location.href = "/admin";
                        }}
                      />
                    )}
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>
      </nav>
      
      {/* Modal du panier */}
      <CartModal />
    </>
  );
};

export default Navbar;
