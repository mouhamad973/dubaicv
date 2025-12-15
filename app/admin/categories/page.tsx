'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getCategories, addCategory, deleteCategory } from './action';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{ id: string, name: string, image: string | null }[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Erreur lors du chargement des catégories');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name) {
      setError('Le nom est requis');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const result = await addCategory(data);
      if (result.success) {
        setSuccess('Catégorie ajoutée avec succès');
        setFormData({ name: '', image: null });
        loadCategories();
        setIsAdding(false);
      } else {
        setError(result.message || 'Erreur lors de l\'ajout de la catégorie');
      }
    } catch (err) {
      setError('Une erreur est survenue');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

    try {
      const result = await deleteCategory(id);
      if (result.success) {
        setSuccess('Catégorie supprimée avec succès');
        loadCategories();
      } else {
        setError(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Une erreur est survenue');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des catégories</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          {isAdding ? 'Annuler' : 'Ajouter une catégorie'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Nouvelle catégorie</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image (optionnel)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Enregistrer
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Aucune catégorie pour le moment
            </li>
          ) : (
            categories.map((category) => (
              <li key={category.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-10 w-10 rounded-full object-cover mr-4"
                    />
                  )}
                  <span className="text-gray-900 font-medium">{category.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                  title="Supprimer"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
