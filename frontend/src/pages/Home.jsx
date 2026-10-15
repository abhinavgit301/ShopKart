import { motion } from 'framer-motion';
import { ArrowRight, Flame, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { featuredProducts, newArrivalProducts, bestSellerProducts } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const promos = [
  { icon: Truck, label: 'Free shipping over ₹4,999' },
  { icon: ShieldCheck, label: '30-day easy returns' },
  { icon: Sparkles, label: 'New drops every week' },
];

export default function Home() {
  const { addToCart } = useCart();
  const { items, toggleWishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-12 pb-8">
      {isAuthenticated && (
        <div className="rounded-[28px] border border-violet-200 bg-violet-50/80 p-4 text-sm text-violet-900 shadow-sm">
          Welcome back, <span className="font-bold">{user?.fullName || user?.name || 'Customer'}</span> · {user?.email}
        </div>
      )}

      <section className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_25%),linear-gradient(135deg,#fff_0%,#f8fafc_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
              <Flame className="h-3.5 w-3.5" />
              Premium performance
            </div>

            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-7xl">
                STEP INTO YOUR STYLE
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Premium sneakers built for movement, comfort and everyday expression.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300">
                Explore New Arrivals
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">{promos.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-surface rounded-2xl px-4 py-3">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-slate-700">{label}</p>
              </div>
            ))}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-violet-200/60 blur-3xl" />
            <div className="absolute h-64 w-64 rounded-full bg-amber-100 blur-3xl" />
            <div className="relative z-10 rounded-[32px] border border-white/50 bg-white/40 p-4 shadow-[0_24px_80px_rgba(124,58,237,0.2)] backdrop-blur-lg">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
                alt="Premium sneaker"
                className="h-[420px] w-[520px] rounded-[28px] object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Featured</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">Shop by category</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trending now</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">Trending sneakers</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-violet-700 transition hover:text-violet-800">View all</Link>
        </div>
        <ProductGrid products={featuredProducts.slice(0, 4)} />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fresh drop</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">New arrivals</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-violet-700 transition hover:text-violet-800">See more</Link>
        </div>
        <ProductGrid products={newArrivalProducts.slice(0, 4)} />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Best sellers</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">Loved by customers</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-violet-700 transition hover:text-violet-800">Explore picks</Link>
        </div>
        <ProductGrid products={bestSellerProducts.slice(0, 4)} />
      </section>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#312e81_100%)] p-8 text-white shadow-[0_20px_50px_rgba(30,41,59,0.35)] lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">Seasonal drop</p>
            <h2 className="text-3xl font-black tracking-[-0.05em] sm:text-5xl">UP TO 40% OFF</h2>
            <p className="mt-3 max-w-xl text-slate-200">Your next pair is waiting. Refresh your rotation with premium footwear built for comfort and speed.</p>
          </div>
          <Link to="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            Shop Sale
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Top brands</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">Trending labels</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Nike', 'Adidas', 'Puma', 'New Balance', 'ASICS', 'Reebok', 'Converse', 'Vans'].map((brand) => (
            <div key={brand} className="glass-surface rounded-[24px] border border-slate-200 p-6 text-center">
              <div className="mb-3 text-2xl font-black tracking-[-0.05em] text-slate-900">{brand}</div>
              <p className="text-sm text-slate-600">Premium performance tools</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stay in the loop</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">Get sneaker drops before everyone else.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
            />
            <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Join Newsletter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
