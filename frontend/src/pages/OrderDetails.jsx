import { ArrowLeft, PackageCheck, Truck, WalletCards } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { orders } from '../data/orders';

export default function OrderDetails() {
  const { id } = useParams();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg pb-16 pt-10 text-center">
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/80 p-10 shadow-sm">
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Order not found</h1>
          <Link to="/orders" className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Order summary</p>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Order #{order.id}</h1>
        </div>
        <Link to="/orders" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Items</h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">{order.status}</span>
          </div>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={`${order.id}-${item}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item}</p>
                  <p className="text-xs text-slate-500">Premium handcrafted pair</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">₹{Math.round(order.total / order.items.length).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Tracking</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <PackageCheck className="mt-0.5 h-5 w-5 text-violet-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Order confirmed</p>
                  <p className="text-xs text-slate-500">Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 text-violet-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Out for delivery</p>
                  <p className="text-xs text-slate-500">Estimated delivery within 2-3 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <WalletCards className="mt-0.5 h-5 w-5 text-violet-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Payment completed</p>
                  <p className="text-xs text-slate-500">Paid via UPI / Card</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Amount</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{(order.total - 599).toLocaleString('en-IN')}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>₹599</span></div>
              <div className="flex items-center justify-between text-base font-bold text-slate-900"><span>Total</span><span>₹{order.total.toLocaleString('en-IN')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
