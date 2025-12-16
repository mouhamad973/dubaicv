'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import { getProducts } from '@/app/admin/products/action';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Le type Product est importé depuis ProductCard

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Transformer les données pour correspondre au type attendu par ProductCard
        const formattedProducts = data.map(product => ({
          ...product,
          category: { name: product.category?.name || 'Non catégorisé' },
          promoPrice: product.oldPrice || null,
          images: product.images || []
        }));
        setProducts(formattedProducts);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger les produits');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfaf7] min-h-screen font-sans text-black overflow-x-hidden">
      <Navbar scrolled={scrolled} onMenuOpen={() => setMobileMenuOpen(true)} />
      
      <main className="min-h-screen pt-32 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Tous Nos Produits</h1>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Erreur</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Aucun produit trouvé</h2>
              <p className="text-gray-500">Aucun produit n'est disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
