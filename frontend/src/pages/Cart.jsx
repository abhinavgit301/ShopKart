import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, subtotal, discount, shipping, total, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-2xl pb-16 pt-10 text-center">
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/80 p-10 shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-700">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Your cart is empty.</h1>
          <p className="mt-3 text-slate-600">Looks like you haven’t added any sneakers yet.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Shop now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 pb-10 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Your cart</h1>
          <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="text-sm font-medium text-red-600">Clear cart</button>
        </div>

        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-sm sm:flex-row">
            <img src={item.images[0]} alt={item.name} className="h-28 w-full rounded-[22px] object-cover sm:w-28" />

            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{item.brand}</p>
                  <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                </div>
                <button onClick={() => { removeFromCart(item.id, item.size, item.color); toast.success('Item removed from cart'); }} className="inline-flex items-center gap-2 text-sm font-medium text-red-600">
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                <span>Size: <strong className="text-slate-900">{item.size}</strong></span>
                <span>Color: <strong className="text-slate-900">{item.color}</strong></span>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  <button type="button" onClick={() => updateQuantity(item.id, item.size, item.color, -1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, item.size, item.color, 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
        <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Order summary</h2>

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

        <Link to="/checkout" className="mt-6 block w-full rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
