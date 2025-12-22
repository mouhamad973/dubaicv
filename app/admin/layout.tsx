// app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Assurez-vous d'importer Image

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer lg:drawer-open font-sans bg-black min-h-screen">
            <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

            {/* --- CONTENU PRINCIPAL --- */}
            <div className="drawer-content flex flex-col">

                {/* BARRE SUPÉRIEURE (NAVBAR ADMIN) */}
                <div className="navbar bg-neutral-900/90 backdrop-blur border-b border-neutral-800 sticky top-0 z-40 px-4 md:px-8 h-16">

                    {/* Partie Gauche : Toggle Mobile */}
                    <div className="flex-1 lg:hidden">
                        <label htmlFor="admin-drawer" className="btn btn-square btn-ghost text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>

                    {/* Partie Droite : Actions (Voir le site + Profil) */}
                    <div className="flex-1 flex justify-end items-center gap-4">

                        {/* BOUTON RETOUR AU SITE */}
                        <Link
                            href="/"
                            target="_blank" // Ouvre dans un nouvel onglet (optionnel, retirez si vous préférez le même onglet)
                            className="btn btn-sm btn-ghost text-neutral-400 hover:text-amber-500 hover:bg-amber-500/10 transition-all font-normal gap-2"
                        >
                            <span className="hidden md:inline">Voir la boutique</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </Link>

                        {/* Séparateur vertical */}
                        <div className="h-6 w-px bg-neutral-800 hidden md:block"></div>

                        {/* Dropdown Profil Admin (Décoratif) */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-9 rounded-full border border-amber-600/50 p-0.5">
                                    <img alt="Admin" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="rounded-full" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral-900 border border-neutral-800 rounded-box w-52 text-neutral-300">
                                <li><a className="hover:text-amber-500">Profil</a></li>
                                <li><a className="hover:text-amber-500">Paramètres</a></li>
                                <li><a className="text-red-400 hover:bg-red-900/20">Déconnexion</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Zone de contenu des pages (injectée ici via children) */}
                <main className="p-6 md:p-10 bg-black min-h-[calc(100vh-64px)] text-white">
                    {children}
                </main>

            </div>

            {/* --- SIDEBAR (Barre Latérale) --- */}
            <div className="drawer-side z-50">
                <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-neutral-900 border-r border-neutral-800 text-neutral-400 gap-2">

                    {/* Logo Sidebar */}
                    <li className="mb-8 ">
                        <div className="flex flex-col items-start gap-0 hover:bg-transparent">

                            <img
                                src="/img/dark1.png"
                                alt="logo"
                                className="w-30 h-auto object-contain cursor-pointer transition-transform hover:scale-105"
                            />
                            <span className="text-[10px] text-neutral-600 uppercase tracking-[0.3em] pl-0.5">Administration</span>
                        </div>
                    </li>

                    {/* Navigation Links */}
                    <li>
                        <Link href="/admin" className="hover:text-amber-400 hover:bg-neutral-800 active:bg-amber-900/30 active:text-amber-400 focus:text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Tableau de bord
                        </Link>
                    </li>

                    <li className="menu-title text-amber-600/40 mt-6 uppercase text-[10px] font-bold tracking-widest">Catalogue</li>

                    <li>
                        <Link href="/admin/products" className="hover:text-amber-400 hover:bg-neutral-800 active:bg-amber-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            Produits
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/categories" className="hover:text-amber-400 hover:bg-neutral-800 active:bg-amber-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/orders" className="hover:text-amber-400 hover:bg-neutral-800 active:bg-amber-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            Commandes
                        </Link>
                    </li>

                    {/* <li className="menu-title text-amber-600/40 mt-6 uppercase text-[10px] font-bold tracking-widest">Utilisateurs</li>

                    <li>
                        <Link href="/admin/customers" className="hover:text-amber-400 hover:bg-neutral-800 active:bg-amber-900/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            Clients
                        </Link>
                    </li> */}
                </ul>
            </div>
        </div>
    );
}