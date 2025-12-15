"use client";

import { ShoppingCart, Trash } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div>
            <button
                aria-label="Ouvrir le panier"
                className="btn"
                onClick={() =>
                    (document.getElementById("my_modal_2") as HTMLDialogElement)?.showModal()
                }
            >
                <div className="relative">
                    <ShoppingCart />
                    <span className="absolute top-0 left-7 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                        {total}
                    </span>
                </div>
            </button>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Shopping cart</h3>

                    <div className="mt-6">
                        {cart.length === 0 && (
                            <p className="text-gray-500">Votre panier est vide.</p>
                        )}

                        {cart.map((item) => (
                            <div key={item.id} className="flex py-4 border-b">
                                <img
                                    src={item.image || "/placeholder.png"}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />


                                <div className="ml-4 flex-1">
                                    <h3>{item.name}</h3>
                                    <p>{item.price} €</p>
                                    <p>Qté : {item.quantity}</p>
                                </div>

                                <button
                                    className="btn btn-ghost"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash color="red" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Sous-total</span>
                            <span>{subtotal.toFixed(2)} €</span>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>Fermer</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Cart;
