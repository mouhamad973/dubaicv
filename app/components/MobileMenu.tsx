'use client';

import React from 'react';
import { X } from 'lucide-react';

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
        <a href="#" className="hover:text-gold">
          Collections
        </a>
        <a href="#" className="hover:text-gold">
          Femmes
        </a>
        <a href="#" className="hover:text-gold">
          Hommes
        </a>
        <a href="#" className="hover:text-gold">
          Maison
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;

