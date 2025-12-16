import prisma from "@/lib/prisma";
import Wrapper from "@/app/components/Wrapper";
import ProductClient from "./ProductClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // ✅ FIX IMPORTANT

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, category: true },
  });

  if (!product) {
    return {
      title: "Produit introuvable | Dubai Chez Vous",
      robots: { index: false, follow: false },
    };
  }

  const image = product.images?.[0]?.url || "/images/og-image.jpg";

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [image],
    },
    alternates: {
      canonical: `/product/${product.id}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ FIX IMPORTANT

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, category: true },
  });

  if (!product) {
    return <div className="p-10 text-center">Produit introuvable.</div>;
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map(img => img.url),
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Dubai Chez Vous",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.id}`,
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductClient product={product} />
    </Wrapper>
  );
}
