'use client';

import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useCart } from "@/app/context/CartContext";

type NavbarProps = {
  scrolled: boolean;
  onMenuOpen: () => void;
};

const Navbar = ({ scrolled, onMenuOpen }: NavbarProps) => {

  const { user } = useUser();
  const { cart } = useCart();

  // 🔥 Total réel du panier
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => {
    (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal();
  };


  return (
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
          <a href="#new" className="nav-link">Nouveautés</a>
          <a href="#categories" className="nav-link">Collections</a>
          <a href="#bestsellers" className="nav-link">Best-Sellers</a>

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

          <Search className="icon-btn" />

          {/* 🛒 PANIER */}
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
  );
};

export default Navbar;
