import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';

// --- 1. LES DONNÉES FICTIVES MISES À JOUR (Avec 2 images) ---
const products = [
    {
        id: 1,
        name: "Sony WH-1000XM5 Premium",
        category: "Audio",
        price: 349,
        promoPrice: 299,
        rating: 4.8,
        // Image principale : Vue de côté
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Image au survol : Vue portée ou différente
        imageHover: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Nike Air Zoom Pegasus",
        category: "Sport",
        price: 120,
        promoPrice: null,
        rating: 4.5,
        // Image principale : Chaussure seule
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Image au survol : Vue portée en action
        imageHover: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Montre Chrono Black",
        category: "Accessoires",
        price: 189,
        promoPrice: 145,
        rating: 4.2,
        // Vue de face
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Vue sur poignet
        imageHover: "https://images.unsplash.com/photo-1619134778706-7015533a6150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Sac à dos Herschel Travel",
        category: "Voyage",
        price: 85,
        promoPrice: null,
        rating: 4.7,
        // Vue fermée
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Vue portée dos
    },
    // Produit sans deuxième image pour tester
    {
        id: 5,
        name: "Appareil Photo Vintage",
        category: "Photo",
        price: 450,
        promoPrice: null,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Pas d'imageHover définie ici
    },
];

// --- 2. LE COMPOSANT CARD MODIFIÉ ---
const ProductCard = ({ product }) => {
    const discountPercentage = product.promoPrice
        ? Math.round(((product.price - product.promoPrice) / product.price) * 100)
        : 0;

    // Vérifie si une deuxième image existe
    const hasHoverImage = Boolean(product.imageHover);

    return (
        // Ajout de 'group' sur le conteneur principal pour déclencher les effets au survol
        <div className="group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">

            {/* --- ZONE IMAGE (C'est ici que la magie opère) --- */}
            <div className="relative h-72 overflow-hidden bg-gray-100">

                {/* Badges (Promo / Like) */}
                {product.promoPrice && (
                    <span className="absolute top-3 left-3 z-20 bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm">
                        -{discountPercentage}%
                    </span>
                )}
                <button className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                </button>

                {/* IMAGE PRINCIPALE 
           - absolute inset-0 : Prend toute la place
           - z-10 : Est au premier plan par défaut
           - transition-opacity : Animation fluide
           - group-hover:opacity-0 : Devient transparente si on survole la carte (ET s'il y a une autre image)
        */}
                <img
                    src={product.image}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 z-10 ${hasHoverImage ? 'group-hover:opacity-0' : ''}`}
                />

                {/* IMAGE AU SURVOL (S'affiche uniquement si elle existe dans les données)
           - absolute inset-0 : Prend exactement la même place que la première
           - z-0 : Est en arrière-plan par défaut
           - opacity-0 : Transparente par défaut
           - group-hover:opacity-100 : Devient visible au survol
        */}
                {hasHoverImage && (
                    <img
                        src={product.imageHover}
                        alt={`${product.name} hover`}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 z-0 opacity-0 group-hover:opacity-100"
                    />
                )}
            </div>
            {/* --- FIN ZONE IMAGE --- */}


            {/* Détails du produit (reste inchangé) */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} className="fill-current" />
                        <span className="text-xs font-bold text-gray-600 ml-1">{product.rating}</span>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                    {product.name}
                </h3>

                <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex flex-col">
                        {product.promoPrice ? (
                            <>
                                <span className="text-xs text-gray-400 line-through font-medium leading-none mb-1">
                                    {product.price} €
                                </span>
                                <span className="text-xl font-extrabold text-gray-900 leading-none">
                                    {product.promoPrice} €
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-extrabold text-gray-900 leading-none mt-4">
                                {product.price} €
                            </span>
                        )}
                    </div>

                    <button className="bg-gray-900 hover:bg-indigo-600 text-white p-3 rounded-xl transition-colors duration-300 flex items-center gap-2 active:scale-95">
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- 3. AFFICHAGE (Reste inchangé) ---
export default function ProductGridDemo() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Titre de section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Nos Meilleures Ventes
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Découvrez notre sélection exclusive de produits tendance.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}