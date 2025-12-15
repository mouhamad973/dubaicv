// app/admin/page.tsx
export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif text-white">Vue d'ensemble</h1>

            {/* Stats Cards */}
            <div className="stats shadow bg-neutral-900 border border-neutral-800 w-full text-white stats-vertical lg:stats-horizontal">

                <div className="stat">
                    <div className="stat-figure text-amber-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title text-neutral-400">Revenu Total</div>
                    <div className="stat-value text-amber-500">45,200 €</div>
                    <div className="stat-desc text-neutral-500">↗︎ 12% ce mois-ci</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-amber-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <div className="stat-title text-neutral-400">Nouvelles Commandes</div>
                    <div className="stat-value text-white">142</div>
                    <div className="stat-desc text-neutral-500">↘︎ 5 (en attente)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-amber-500">
                        <div className="avatar online">
                            <div className="w-16 rounded-full border border-amber-500/30">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="avatar" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-title text-neutral-400">Nouveaux Clients</div>
                    <div className="stat-value text-white">35</div>
                    <div className="stat-desc text-neutral-500">Cette semaine</div>
                </div>

            </div>

            {/* Exemple de section rapide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-neutral-900 border border-neutral-800 p-6">
                    <h3 className="text-lg font-serif mb-4 text-amber-500">Dernières Activités</h3>
                    <ul className="steps steps-vertical text-sm">
                        <li className="step step-warning" data-content="✓">Commande #4023 expédiée</li>
                        <li className="step step-warning" data-content="✓">Paiement reçu de Jean D. (450€)</li>
                        <li className="step" data-content="●">Nouveau produit "Onyx Ring" ajouté</li>
                        <li className="step" data-content="●">Stock faible : Parfum Élixir</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}