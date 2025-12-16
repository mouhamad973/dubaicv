'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { getLatestProducts } from '@/app/admin/products/action';

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getLatestProducts();
        // Transformer les données pour correspondre au type attendu par ProductCard
        const formattedProducts = data.map(product => ({
          ...product,
          category: { name: product.category?.name || 'Non catégorisé' },
          promoPrice: product.oldPrice || null,
          images: product.images || []
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Nouveautés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Aucun produit</h2>
          <p className="text-gray-600">Aucun produit n'est actuellement disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <section id="new" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Nouveautés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
