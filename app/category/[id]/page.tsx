import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/app/components/Wrapper";

export default async function CategoryPage(props: { params: Promise<{ id: string }> }) {
  // 🔥 OBLIGATOIRE sur Next.js 15+
  const { id } = await props.params;

  // Récupérer la catégorie avec ses produits disponibles
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        include: { images: true },
        where: { status: "DISPONIBLE" },
      },
    },
  });

  if (!category) {
    return (
      <Wrapper>
        <div className="p-10 text-center">Catégorie introuvable.</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* En-tête de la catégorie */}
        <div className="text-center mb-12">
          {category.image && (
            <div className="mx-auto w-40 h-40 relative mb-4">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600">Découvrez notre sélection de produits</p>
        </div>

        {/* Liste des produits */}
        {category.products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Aucun produit disponible dans cette catégorie pour le moment.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.products.map((product) => {
              const firstImage = product.images?.[0]?.url || "/placeholder.png";
              return (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-64 w-full">
                      <Image
                        src={firstImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* {product.oldPrice && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </span>
                      )} */}
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">{product.price} FCFA</span>
                          {product.oldPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {product.oldPrice} FCFA
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {product.stock > 0 ? "" : "Rupture"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

// Génération dynamique du metadata pour la catégorie
export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return { title: "Catégorie non trouvée" };
  }

  return {
    title: `${category.name} - Notre sélection`,
    description: `Découvrez notre sélection de produits dans la catégorie ${category.name}`,
  };
}
