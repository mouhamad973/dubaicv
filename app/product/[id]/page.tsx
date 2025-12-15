import prisma from "@/lib/prisma";
import Wrapper from "@/app/components/Wrapper";
import ProductClient from "./ProductClient";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
        include: { images: true, category: true },
    });

    if (!product) {
        return <div className="p-10 text-center">Produit introuvable.</div>;
    }

    return (
        <Wrapper>
            <ProductClient product={product} />
        </Wrapper>
    );
}
