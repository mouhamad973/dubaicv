"use server";

import prisma from "@/lib/prisma";
import { imagekit } from "@/lib/imagekit";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name) {
      return { success: false, message: "Le nom de la catégorie est requis" };
    }

    let imageUrl = "";
    let fileId = "";

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const upload = await imagekit.upload({
        file: buffer,
        fileName: `category-${Date.now()}-${imageFile.name}`,
        folder: "/categories"
      });

      imageUrl = upload.url;
      fileId = upload.fileId;
    }

    await prisma.category.create({
      data: {
        name,
        image: imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: any) {
    console.error("Erreur lors de l'ajout de la catégorie:", err);
    return { success: false, message: err?.message || "Erreur inconnue" };
  }
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    
    revalidatePath("/");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: any) {
    console.error("Erreur lors de la suppression de la catégorie:", err);
    return { success: false, message: err?.message || "Erreur inconnue" };
  }
}
