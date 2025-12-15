"use server";

import prisma from "@/lib/prisma";
import { imagekit } from "@/lib/imagekit";
import { ProductStatus } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function addProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const oldPrice = parseInt(formData.get("oldPrice") as string);
    const categoryId = formData.get("categoryId") as string;
    const stock = parseInt(formData.get("stock") as string);
    const isFeatured = formData.get("isFeatured") === "true";

    const files = formData.getAll("images") as File[];
    if (!files || files.length === 0) {
      return { success: false, message: "Au moins une image est requise" };
    }

    // ✅ Upload et récupération des fileId
    const uploadedImages: { url: string; fileId: string }[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const upload = await imagekit.upload({
        file: buffer,
        fileName: `product-${Date.now()}-${file.name}`,
      });

      uploadedImages.push({
        url: upload.url,
        fileId: upload.fileId,
      });
    }
    // ⬆️ Fin du bloc upload

    // Crée le produit avec les images complètes
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        oldPrice: oldPrice || null,
        categoryId,
        stock,
        status: stock > 0 ? ProductStatus.DISPONIBLE : ProductStatus.RUPTURE,
        isFeatured,
        images: {
          create: uploadedImages.map((img) => ({
            url: img.url,
            fileId: img.fileId, // doit être exactement comme défini dans Prisma
          })),
        },
      },
    });

    revalidatePath("/admin/products");

    return { success: true };
  } catch (err: any) {
    console.error("Erreur détaillée:", err);
    return { success: false, message: err?.message || "Erreur inconnue" };
  }
}

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
      images: true, // Inclure toutes les images
    },
  });
}

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      category: true,
      images: true, // Inclure toutes les images
    },
  });
}

export async function deleteProduct(productId: string) {
  try {
    // Récupère le produit + images
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      throw new Error("Produit introuvable.");
    }

    // Suppression dans ImageKit
    for (const img of product.images) {
      try {
        await imagekit.deleteFile(img.fileId);
      } catch (err) {
        console.warn("Erreur suppression ImageKit:", err);
      }
    }

    // Supprime les lignes dans ProductImage
    await prisma.productImage.deleteMany({
      where: { productId },
    });

    // Supprime le produit
    await prisma.product.delete({
      where: { id: productId },
    });

    // Revalidation (efface le cache et recharge la page)
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error: any) {
    console.error("Erreur suppression produit:", error);
    return { success: false, message: error.message };
  }
}
