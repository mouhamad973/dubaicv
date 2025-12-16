import prisma from "@/lib/prisma";
import Wrapper from "@/app/components/Wrapper";
import ProductClient from "./ProductClient";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true, images: true }
  });

  if (!product) {
    return {
      title: "Produit non trouvé | Dubai Chez Vous",
      description: "Ce produit n'existe pas ou a été supprimé."
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const productImage = product.images?.[0]?.url || '/img/placeholder-product.png';
  const productUrl = `/product/${product.id}`;

  return {
    title: `${product.name} | Dubai Chez Vous`,
    description: product.description || `Découvrez ${product.name} - ${product.category?.name || 'produit'} de qualité. Livraison rapide.`,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Dubai Chez Vous`,
      description: product.description || `Découvrez ${product.name} sur Dubai Chez Vous.`,
      url: productUrl,
      images: [productImage, ...previousImages],
      type: 'product',
      siteName: 'Dubai Chez Vous',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Dubai Chez Vous`,
      description: product.description || `Découvrez ${product.name} sur Dubai Chez Vous.`,
      images: [productImage],
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { 
      images: true, 
      category: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            }
          }
        }
      }
    },
  });

  if (!product) {
    return (
      <Wrapper>
        <div className="p-10 text-center">Produit introuvable.</div>
      </Wrapper>
    );
  }

  // Données structurées pour le produit
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0]?.url || '',
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Dubai Chez Vous'
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dubaichezvous.com'}/product/${product.id}`,
      priceCurrency: 'EUR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: product.reviews && product.reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating || 0,
      reviewCount: product.reviews.length,
      bestRating: '5',
      worstRating: '1'
    } : undefined
  };

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductClient product={product} />
    </Wrapper>
  );
}
