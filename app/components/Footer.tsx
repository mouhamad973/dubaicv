import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Check } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="space-y-6">
        <a href="#" className="text-2xl font-serif font-bold tracking-wide block">
          DUBAI<span className="text-gold">.</span>CHEZ<span className="text-gold">.</span>VOUS
        </a>
        <p className="text-sm text-gray-500 leading-relaxed">
          La référence du shopping dubaïote au Senegal. Nous sélectionnons pour vous l'exceptionnel, l'authentique et le raffiné.
        </p>
        <div className="flex gap-4">
          <Instagram className="w-5 h-5 text-gray-400 hover:text-gold cursor-pointer transition-colors" />
          <Facebook className="w-5 h-5 text-gray-400 hover:text-gold cursor-pointer transition-colors" />
          <Twitter className="w-5 h-5 text-gray-400 hover:text-gold cursor-pointer transition-colors" />
        </div>
      </div>

      <div>
        <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Collections</h4>
        <ul className="space-y-4 text-sm text-gray-500">
          <li>
            <a href="#new" className="hover:text-gold transition-colors">
              Nouveautés
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gold transition-colors">
              Abayas & Qamis
            </a>
          </li>
          <li>
            <a href="category/cmj8nkwho0000ju04cef4l5zq" className="hover:text-gold transition-colors">
              Parfumerie
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gold transition-colors">
              Décoration
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Aide & Infos</h4>
        <ul className="space-y-4 text-sm text-gray-500">
          <li>
            <a href="#" className="hover:text-gold transition-colors">
              Suivi de commande
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gold transition-colors">
              Livraisons & Retours
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gold transition-colors">
              Guide des tailles
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gold transition-colors">
              FAQ
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Contact</h4>
        <ul className="space-y-4 text-sm text-gray-500">
          <li className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold shrink-0" />
            <span>
              Downtown Dubai, UAE
              <br />
              Expédié depuis la France
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-gold shrink-0" />
            <span>service@dubaichezvous.com</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
      <p>&copy; 2024 Dubai-Chez-Vous. Tous droits réservés.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-black">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-black">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

