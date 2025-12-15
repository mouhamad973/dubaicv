import { getOrders } from "./action";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif text-white">Commandes</h1>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <table className="table">
          <thead className="bg-black text-amber-500">
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Articles</th>
              <th>Total</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody className="text-neutral-300">
            {orders.map((order: any) => {
              const customerName = `${order.customerFirstName || ""} ${order.customerLastName || ""}`.trim();
              const createdAt = order.createdAt ? new Date(order.createdAt) : null;
              const dateLabel = createdAt
                ? createdAt.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-";

              const itemsCount = Array.isArray(order.items)
                ? order.items.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0)
                : 0;

              return (
                <tr
                  key={order.id}
                  className="border-b border-neutral-800 hover:bg-neutral-800/30"
                >
                  <td className="font-mono text-white">{order.id}</td>
                  <td className="font-medium">
                    <div className="flex flex-col">
                      <span>{customerName || "Client"}</span>
                      <span className="text-xs text-neutral-500">{order.customerPhone || ""}</span>
                    </div>
                  </td>
                  <td className="text-sm text-neutral-500">{dateLabel}</td>
                  <td className="text-white font-bold">{itemsCount}</td>
                  <td className="text-white font-bold">
                    {typeof order.total === "number" ? formatCurrency(order.total) : order.total}
                  </td>
                  <td>
                    <span className="badge badge-outline badge-sm text-neutral-300">
                      {order.status || "pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-6 text-neutral-400">Aucune commande pour le moment.</div>
        )}
      </div>
    </div>
  );
}