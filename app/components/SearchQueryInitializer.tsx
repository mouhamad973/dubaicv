// components/SearchQueryInitializer.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type SearchQueryInitializerProps = {
    // Ajoutez la fonction pour mettre à jour l'état de recherche
    onQueryUpdate: (query: string) => void;
};

export default function SearchQueryInitializer({ onQueryUpdate }: SearchQueryInitializerProps) {
    // L'utilisation de useSearchParams est isolée ici
    const searchParams = useSearchParams();

    // Effet pour mettre à jour la requête de recherche depuis l'URL
    useEffect(() => {
        const query = searchParams.get('q');
        // Si une requête existe dans l'URL, on appelle la fonction du parent (Navbar)
        if (query) {
            onQueryUpdate(query);
        }
    }, [searchParams, onQueryUpdate]); // onQueryUpdate doit être stable (passé via useCallback si possible, mais ici c'est ok)

    // Ce composant ne rend rien visible, il est juste logique
    return null;
}