'use client';

import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 animate-fade-in">
      <div className="flex justify-end">
        <button onClick={onClose} aria-label="Fermer le menu">
          <X className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 mt-12 text-xl font-serif">
        <Link href="/#categories" className="hover:text-gold" onClick={onClose}>
          Collections
        </Link>
        <Link href="/#new" className="hover:text-gold" onClick={onClose}>
          Nouveautés
        </Link>
        <Link href="/products" className="hover:text-gold" onClick={onClose}>
          Tous les produits
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;

