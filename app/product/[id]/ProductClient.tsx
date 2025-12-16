"use client";

import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { CartProduct } from "@/app/type";
import { useState } from "react";
import Image from "next/image"; // Utilisation de next/image pour de meilleures performances

// Définition de la structure de l'image pour plus de clarté
type ProductImage = {
    url: string;
};

// Définition des props
type ProductClientProps = {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        oldPrice: number | null;
        images: ProductImage[];
        category: { name: string };
    };
};

// Placeholder pour une image manquante
const PLACEHOLDER_IMAGE = "/placeholder.png";

export default function ProductClient({ product }: ProductClientProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    // 1. Gérer l'image principale actuellement affichée
    const initialImageUrl = product.images?.[0]?.url || PLACEHOLDER_IMAGE;
    const [mainImage, setMainImage] = useState(initialImageUrl);

    // 2. Fonctions de gestion de la quantité
    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

    // 3. Logique d'ajout au panier
    const handleAddToCart = () => {
        // Conversion vers CartProduct
        const cartProduct: CartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: initialImageUrl, // Utilisez la première image comme image du panier
        };

        for (let i = 0; i < quantity; i++) {
            addToCart(cartProduct);
        }
        setQuantity(1); // Réinitialiser la quantité après l'ajout
    };

    // 4. Logique d'achat immédiat (simple simulation)
    const handleBuyNow = () => {
        alert(`Vous allez acheter ${quantity} x ${product.name} pour ${product.price * quantity} €`);
        // Ici, vous intégreriez la logique de checkout/redirection
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* GALERIE D'IMAGES */}
                <div className="flex flex-col gap-6">
                    {/* Image Principale */}
                    <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={mainImage}
                            alt={product.name}
                            fill // Remplir le conteneur parent
                            style={{ objectFit: 'cover' }}
                            priority // Charger rapidement l'image principale
                            sizes="(max-width: 1024px) 100vw, 50vw" // Optimisation responsive
                        />
                    </div>

                    {/* Miniatures */}
                    {product.images && product.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(image.url)}
                                    className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all duration-200 ${image.url === mainImage
                                        ? 'ring-4 ring-offset-2 ring-indigo-600 shadow-md'
                                        : 'opacity-70 hover:opacity-100 hover:ring-2 hover:ring-gray-300'
                                        }`}
                                >
                                    <Image
                                        src={image.url}
                                        alt={`${product.name} - Vue ${index + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="25vw"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* INFOS PRODUIT & ACTIONS */}
                <div>
                    {/* Catégorie */}
                    <p className="badge badge-lg badge-outline mb-3 font-semibold text-gray-600">
                        {product.category.name}
                    </p>

                    {/* Nom du produit */}
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                        {product.name}
                    </h1>

                    {/* Prix */}
                    <div className="flex items-center gap-4 mb-6">
                        {product.oldPrice && (
                            <span className="text-2xl line-through text-gray-400 font-semibold">
                                {product.oldPrice.toFixed(2)} €
                            </span>
                        )}
                        <span className={`text-4xl font-extrabold ${product.oldPrice ? 'text-indigo-600' : 'text-gray-900'}`}>
                            {product.price.toFixed(2)} €
                        </span>
                        {product.oldPrice && product.oldPrice > product.price && (
                            <span className="badge badge-lg badge-error text-white font-bold">
                                -{((1 - product.price / product.oldPrice) * 100).toFixed(0)}%
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Quantité et Actions */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-6">
                            <span className="text-lg font-semibold whitespace-nowrap">Quantité :</span>

                            {/* Contrôle de la quantité avec DaisyUI join */}
                            <div className="join border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                                <button
                                    onClick={handleDecrement}
                                    className="join-item btn btn-sm btn-ghost hover:bg-gray-200"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="join-item px-6 py-2 text-lg font-medium bg-white w-16 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={handleIncrement}
                                    className="join-item btn btn-sm btn-ghost hover:bg-gray-200"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Boutons d'Action */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-lg btn-neutral flex-1 shadow-md hover:bg-gray-800 transition-colors"
                            >
                                <ShoppingCart size={20} />
                                Ajouter au panier
                            </button>

                            {/* <button
                                onClick={handleBuyNow}
                                className="btn btn-lg btn-primary flex-1 shadow-md hover:bg-indigo-700 transition-colors"
                            >
                                Acheter maintenant
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}