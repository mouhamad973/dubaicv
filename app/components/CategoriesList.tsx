"use client";

import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

type Category = {
    id: string;
    name: string;
    image: string | null;
};

// Icône de flèche pour le lien "Voir tout"
const ArrowForwardIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
);


export default function CategoriesList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            // ... (logique de récupération inchangée)
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des catégories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les catégories");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategories();
    }, []);

    // ... (Gestion des états inchangée pour la clarté)
    if (isLoading) {
        return (
            <div className="py-10 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
                <p className="mt-2 text-gray-700">Chargement des catégories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="py-10 text-center">
                <p className="text-gray-500">
                    Aucune catégorie disponible pour le moment
                </p>
            </div>
        );
    }

    return (
        <section className="mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Catégories populaires</h2>
                <a
                    href="/categories" // Lien vers la page de toutes les catégories
                    className="text-indigo-600 hover:underline flex items-center text-sm font-medium"
                >
                    Voir tout
                    <ArrowForwardIcon />
                </a>
            </div>

            {/* Grille de 2, 4, ou 6 colonnes comme demandé */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {categories.map((category) => (
                    <CategoryCard key={category.id} {...category} />
                ))}
            </div>
        </section>
    );
}