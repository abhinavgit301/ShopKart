import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import Rating from './Rating';
import PriceDisplay from './PriceDisplay';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { items, toggleWishlist } = useWishlist();
  const isWishlisted = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product.sizes?.length) {
      addToCart(product, 1, product.sizes[0], product.colors[0]);
      toast.success(`${product.name} added to cart`);
    }
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="group rounded-[28px] border border-slate-200/80 bg-white/80 p-3 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
    >
      <div className="relative overflow-hidden rounded-[22px] bg-slate-100">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => {
            toggleWishlist(product);
            toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
          }}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition ${
            isWishlisted ? 'border-violet-200 bg-violet-600 text-white' : 'border-white/70 bg-white/75 text-slate-700'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            {product.discount}% Off
          </span>
        )}
      </div>

      <div className="px-1 pb-1 pt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{product.brand}</span>
          <div className="flex items-center gap-1 text-slate-700">
            <Star className="h-3.5 w-3.5 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`} className="block text-lg font-semibold text-slate-900 hover:text-violet-700">
          {product.name}
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>
          <Link to={`/products/${product.id}`} className="rounded-full border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
            View
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
