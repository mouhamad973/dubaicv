"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { getFeaturedProducts } from "../admin/products/action";
import Link from "next/link";


export type Product = {
    id: string;
    name: string;
    category: { name: string };
    price: number;
    promoPrice?: number | null;
    rating?: number;
    images?: { url: string }[];
};

export const ProductCard = ({ product }: { product: Product }) => {
    const images = product.images || [];
    const firstImage = images[0]?.url || "/placeholder.png";
    const hoverImage = images[1]?.url || firstImage;

    const discountPercentage = product.promoPrice
        ? Math.round(((product.price - (product.promoPrice || 0)) / product.price) * 100)
        : 0;

    return (
        <Link href={`/product/${product.id}`}>
            <div className="group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                {/* Zone image */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                    
                    {/* <button className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                    </button> */}

                    <img
                        src={firstImage}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 z-10 ${hoverImage ? "group-hover:opacity-0" : ""
                            }`}
                    />

                    {hoverImage && (
                        <img
                            src={hoverImage}
                            alt={`${product.name} hover`}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 z-0 opacity-0 group-hover:opacity-100"
                        />
                    )}
                </div>

                {/* Détails produit */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
                            {product.category.name}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400">
                            <Star size={14} className="fill-current" />
                            <span className="text-xs font-bold text-gray-600 ml-1">
                                {product.rating || 0}
                            </span>
                        </div>
                    </div> */}

                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{product.name}</h3>

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
        </Link>
    );
};

// Exportation par défaut pour la rétrocompatibilité
export default ProductCard;

export function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await getFeaturedProducts();
            setProducts(res);
        }
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
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
