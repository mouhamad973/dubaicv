'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import { getProducts } from '@/app/admin/products/action';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SearchPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const allProducts = await getProducts();
        
        // Filtrage simple basé sur le nom du produit
        const filteredProducts = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        );

        // Formater les produits pour correspondre au type attendu par ProductCard
        const formattedProducts = filteredProducts.map(product => ({
          ...product,
          category: { name: product.category?.name || 'Non catégorisé' },
          promoPrice: product.oldPrice || null,
          images: product.images || []
        }));

        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la recherche:', err);
        setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf7]">
        <Navbar scrolled={scrolled} onMenuOpen={() => setMobileMenuOpen(true)} />
        <main className="pt-32 px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">
              Recherche en cours pour "{searchQuery}"...
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      <Navbar scrolled={scrolled} onMenuOpen={() => setMobileMenuOpen(true)} />
      <main className="pt-32 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {searchQuery ? (
            <h1 className="text-2xl font-bold mb-8">
              Résultats pour "{searchQuery}" - {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold mb-8">Recherchez un produit</h1>
          )}

          {error ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Erreur</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Aucun résultat trouvé</h2>
              <p className="text-gray-500 mb-6">Aucun produit ne correspond à votre recherche.</p>
              <button
                onClick={() => router.push('/products')}
                className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                Voir tous les produits
              </button>
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

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
