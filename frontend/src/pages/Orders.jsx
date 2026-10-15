import { Link } from 'react-router-dom';
import { orders } from '../data/orders';

export default function Orders() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Order history</p>
        <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">My orders</h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">{order.status}</span>
                <p className="text-lg font-bold text-slate-900">₹{order.total.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {order.items.map((item) => (
                <span key={`${order.id}-${item}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{item}</span>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <Link to={`/orders/${order.id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300">View details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
