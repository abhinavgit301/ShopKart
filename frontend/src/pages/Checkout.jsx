import { useState } from 'react';
import { CheckCircle2, CreditCard, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const [isPlaced, setIsPlaced] = useState(false);

  if (!items.length && !isPlaced) {
    return (
      <div className="mx-auto max-w-xl pb-16 pt-10 text-center">
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/80 p-10 shadow-sm">
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Cart is empty</h1>
          <p className="mt-3 text-slate-600">Add products before proceeding to checkout.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Go to products</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    clearCart();
    toast.success('Order placed successfully');
    navigate('/orders');
  };

  if (isPlaced) {
    return (
      <div className="mx-auto max-w-lg pb-16 pt-10 text-center">
        <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-10 shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Order placed!</h1>
          <p className="mt-3 text-slate-600">Your order is confirmed and will be delivered soon.</p>
          <Link to="/orders" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">View orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-violet-700" />
            <h2 className="text-xl font-bold text-slate-900">Shipping details</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Full name" defaultValue="Aarav Sharma" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Phone number" defaultValue="+91 98765 43210" />
            <input className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Street address" defaultValue="14, Green Avenue, Koramangala" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="City" defaultValue="Bengaluru" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Postal code" defaultValue="560034" />
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-violet-700" />
            <h2 className="text-xl font-bold text-slate-900">Payment</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <input type="radio" name="payment" defaultChecked className="h-4 w-4 accent-violet-600" />
              Credit / Debit card
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <input type="radio" name="payment" className="h-4 w-4 accent-violet-600" />
              UPI
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <input type="radio" name="payment" className="h-4 w-4 accent-violet-600" />
              Cash on delivery
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
        <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Checkout summary</h2>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">Qty {item.quantity} • Size {item.size}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          <div className="flex items-center justify-between"><span>Discount</span><span className="text-emerald-600">-₹{discount.toLocaleString('en-IN')}</span></div>
          <div className="flex items-center justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span></div>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button onClick={handlePlaceOrder} className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          Place order
        </button>
      </div>
    </div>
  );
}
