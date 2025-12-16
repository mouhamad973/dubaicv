export type Category = { id: string; name: string };
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  stock: number;
  status: string;
  isFeatured: boolean;
  category: { name: string };
  images: { url: string }[]; // <-- nouveau champ pour les images
  createdAt?: string;
};

export type ProductForm = {
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  categoryId: string;
  stock: string;
  isFeatured: boolean;
  imageFiles: File[]; // Tableau
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};
