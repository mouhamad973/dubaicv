"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { addProduct, deleteProduct, getCategories, getProducts } from "./action";
import { Product, ProductForm, Category } from "../../type"

// Types



export default function ProductsPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState<ProductForm>({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        categoryId: "",
        stock: "",
        isFeatured: false,
        imageFiles: [],
    });

    // Charger catégories et produits
    useEffect(() => {
        async function load() {
            const cats = await getCategories();
            const prods: any = await getProducts();
            setCategories(cats);
            setProducts(prods);
        }
        load();
    }, []);

    // Inputs text
    const handleChange = (e: any) => {
        const { name, type, checked, value } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    // Image
    const handleImage = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, imageFiles: Array.from(e.target.files) });
        }
    };


    // Soumission formulaire
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.imageFiles || formData.imageFiles.length === 0) {
            toast.error("Veuillez ajouter au moins une image !");
            return;
        }

        const fd = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            if (key === "imageFiles") {
                (val as File[]).forEach((file) => fd.append("images", file));
            } else {
                if (typeof val === "boolean") {
                    fd.append(key, val ? "true" : "false");
                } else {
                    fd.append(key, val as string);
                }
            }
        });

        setLoading(true);
        const res = await addProduct(fd);
        setLoading(false);

        if (!res.success) {
            toast.error(res.message || "Erreur inconnue");
            return;
        }

        // ✅ succès
        toast.success("Produit ajouté !");
        setIsModalOpen(false);
        const updated: any = await getProducts();
        setProducts(updated);
        setFormData({
            name: "",
            description: "",
            price: "",
            oldPrice: "",
            categoryId: "",
            stock: "",
            isFeatured: false,
            imageFiles: [],
        });

    };

    const handleDeleteProduct = async (id: string) => {
        const confirmDelete = confirm("Supprimer ce produit ?");
        if (!confirmDelete) return;

        const res = await deleteProduct(id);

        // if (res?.error) {
        //     toast.error(res.error);
        //     return;
        // }

        toast.success("Produit supprimé.");

        // Mettre à jour liste locale
        const updated: any = await getProducts();
        setProducts(updated);
    };


    return (
        <div className="p-6 space-y-6 text-white">
            <Toaster />

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif">Produits</h1>
                    <p className="text-neutral-500 text-sm">Gérez votre catalogue</p>
                </div>

                <button
                    className="btn bg-amber-600 hover:bg-amber-700 text-black"
                    onClick={() => setIsModalOpen(true)}
                >
                    Ajouter un produit
                </button>
            </div>

            {/* TABLEAU */}
            <div className="overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-black text-amber-500 uppercase text-xs font-bold">
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Prix</th>
                            <th>Stock</th>
                            <th>Statut</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {p.images.map((img, i) => (
                                            <Image key={i} src={img.url} width={48} height={48} alt={p.name} className="rounded-md" />
                                        ))}
                                    </div>
                                    <span>{p.name}</span>
                                </td>


                                <td>{p.category.name}</td>

                                <td className="text-amber-300 font-mono">{p.price} €</td>

                                <td className={p.stock === 0 ? "text-red-500 font-bold" : ""}>
                                    {p.stock} u.
                                </td>

                                <td>
                                    {p.status === "DISPONIBLE" ? (
                                        <span className="badge bg-emerald-900/30 text-emerald-400 border-none">
                                            En ligne
                                        </span>
                                    ) : (
                                        <span className="badge bg-red-900/30 text-red-400 border-none">
                                            Rupture
                                        </span>
                                    )}
                                </td>

                                <td className="text-right">
                                   
                                    <button className="btn btn-ghost btn-xs hover:text-red-500" onClick={() => handleDeleteProduct(p.id)}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            <input
                type="checkbox"
                className="modal-toggle"
                checked={isModalOpen}
                onChange={() => setIsModalOpen(!isModalOpen)}
            />

            <div className="modal">
                <div className="modal-box bg-neutral-900 text-white w-full max-w-md">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-lg mb-4">Ajouter un produit</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="name" placeholder="Nom" className="input input-bordered w-full bg-neutral-800" onChange={handleChange} value={formData.name} />

                        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full bg-neutral-800" onChange={handleChange} value={formData.description} />

                        <input type="number" name="price" placeholder="Prix" className="input input-bordered w-full bg-neutral-800" onChange={handleChange} value={formData.price} />

                        <input type="number" name="oldPrice" placeholder="Ancien Prix" className="input input-bordered w-full bg-neutral-800" onChange={handleChange} value={formData.oldPrice} />

                        <input type="number" name="stock" placeholder="Stock" className="input input-bordered w-full bg-neutral-800" onChange={handleChange} value={formData.stock} />

                        <label className="flex items-center gap-3 text-sm text-neutral-200">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                className="checkbox checkbox-warning"
                                onChange={handleChange}
                                checked={formData.isFeatured}
                            />
                            Produit mis en avant (page d'accueil)
                        </label>

                        <select name="categoryId" className="select select-bordered w-full bg-neutral-800" onChange={handleChange} value={formData.categoryId}>
                            <option value="">Choisir catégorie</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>

                        <input type="file" accept="image/*" multiple className="file-input ..." onChange={handleImage} />

                        <button className="btn bg-amber-600 w-full" disabled={loading}>
                            {loading ? "Enregistrement..." : "Ajouter"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
