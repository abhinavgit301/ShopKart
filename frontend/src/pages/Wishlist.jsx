import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { items } = useWishlist();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-2xl pb-16 pt-10 text-center">
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/80 p-10 shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-700">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Your wishlist is empty.</h1>
          <p className="mt-3 text-slate-600">Save the sneakers you love and come back anytime.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Explore products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Saved items</p>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">My wishlist</h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
          <ShoppingBag className="h-4 w-4" />
          {items.length} items
        </div>
      </div>

      <ProductGrid products={items} />
    </div>
  );
}
