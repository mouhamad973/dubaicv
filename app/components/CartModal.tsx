'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from "@/app/context/CartContext";
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import dynamique pour éviter les erreurs de SSR
const CheckoutForm = dynamic(() => import('./CheckoutForm'), { ssr: false });

export default function CartModal() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = async (data: any) => {
    setIsProcessing(true);
    try {
      const orderData = {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email || null,
          address: data.address,
          notes: data.notes || '',
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image // Ajout de l'image

        })),
        total,
      };

      // Envoyer la commande à l'API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Vider le panier
        clearCart();
        // Afficher un message de succès
        alert('Votre commande a été passée avec succès ! Vous recevrez bientôt un email de confirmation.');
        // Fermer le modal
        (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();
      } else {
        throw new Error('Erreur lors de la commande');
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box max-w-2xl w-full max-h-[90vh] flex flex-col bg-white text-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-gray-900">
            {isCheckout ? 'Finaliser la commande' : 'Votre Panier'}
          </h3>
          <form method="dialog">
            <button 
              className="btn btn-sm btn-circle bg-white hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900"
              disabled={isProcessing}
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>

        {!isCheckout ? (
          <>
            <div className="flex-1 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">Votre panier est vide</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Parcourez nos produits pour les ajouter à votre panier
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-2 border-b">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500 mb-1">Prix unitaire: {item.price.toFixed(2)} €</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Quantité:</span>
                          <div className="flex items-center border rounded-md overflow-hidden">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item.id, item.quantity - 1);
                              }}
                              className="px-2 py-1 hover:bg-gray-100 transition-colors"
                              disabled={isProcessing}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item.id, item.quantity + 1);
                              }}
                              className="px-2 py-1 hover:bg-gray-100 transition-colors"
                              disabled={isProcessing}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="font-medium mt-1">Total: {(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isProcessing}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">{total.toFixed(2)} €</span>
                </div>
                <button
                  onClick={() => setIsCheckout(true)}
                  className="btn btn-primary w-full"
                  disabled={isProcessing}
                >
                  Passer la commande
                </button>
              </div>
            )}
          </>
        ) : (
          <CheckoutForm
            onCancel={() => setIsCheckout(false)}
            onSubmit={handleCheckout}
            isSubmitting={isProcessing}
            total={total}
          />
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Fermer</button>
      </form>
    </dialog>
  );
}
