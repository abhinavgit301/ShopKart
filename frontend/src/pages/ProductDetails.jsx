import { useEffect, useMemo, useState } from 'react';
import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductGrid from '../components/ProductGrid';
import Rating from '../components/Rating';
import PriceDisplay from '../components/PriceDisplay';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductDetailsSkeleton } from '../components/LoadingSkeleton';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { items, toggleWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const product = useMemo(() => products.find((item) => item.id === id), [id]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [product]);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (!product) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Product not found.</h2>
        <Link to="/products" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Back to products</Link>
      </div>
    );
  }

  const isWishlisted = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  const relatedProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

  return (
    <div className="space-y-10 pb-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
            <img src={product.images[selectedImage]} alt={product.name} className="h-[500px] w-full rounded-[26px] object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-2xl border ${selectedImage === index ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200'} bg-white p-1`}
              >
                <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-20 w-full rounded-xl object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-violet-700">
              {product.brand}
            </span>
            <button
              type="button"
              onClick={() => {
                toggleWishlist(product);
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                isWishlisted ? 'border-violet-200 bg-violet-600 text-white' : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] text-slate-900">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <Rating value={product.rating} reviewCount={product.reviewCount} compact={false} />
          </div>

          <div className="mt-5">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Available colors</span>
              <span className="text-slate-500">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    selectedColor === color ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>Select size</span>
              <span className="text-slate-500">{selectedSize ? `Size ${selectedSize}` : 'Choose a size'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    selectedSize === size ? 'border-violet-600 bg-violet-600 text-white shadow-md' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center text-sm font-semibold text-slate-900">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button onClick={handleAddToCart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              Buy now
            </button>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <Truck className="mt-0.5 h-5 w-5 text-violet-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Free delivery</p>
                <p className="text-xs text-slate-500">Delivered in 3-5 days</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-violet-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Easy returns</p>
                <p className="text-xs text-slate-500">30-day exchange policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Product details</h2>
          <div className="mt-5 space-y-6 text-sm leading-7 text-slate-600">
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Overview</h3>
              <p>{product.description}</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Specifications</h3>
              <ul className="grid gap-2 md:grid-cols-2">
                <li>• Category: {product.category}</li>
                <li>• Brand: {product.brand}</li>
                <li>• Colors: {product.colors.join(', ')}</li>
                <li>• Sizes: {product.sizes.join(', ')}</li>
                <li>• Rating: {product.rating}/5</li>
                <li>• Stock: {product.stock} pairs</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">Shipping & returns</h3>
              <p>Ships within 48 hours. Free standard shipping on orders above ₹4,999. 30-day returns and exchanges on unused products with original packaging.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Customer reviews</h2>
          <div className="mt-5 space-y-4">
            {[
              { name: 'Riya', text: 'Super comfortable and the fit feels premium. The cushioning is excellent for daily wear.' },
              { name: 'Arjun', text: 'Looks premium and feels lighter than it appears. Great for long walks and gym sessions.' },
              { name: 'Megha', text: 'Love the styling. The quality feels premium and the color pops in the right way.' },
            ].map((review) => (
              <div key={review.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-[#f59e0b]">
                  {[1,2,3,4,5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-sm text-slate-700">“{review.text}”</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">You may also like</p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-900">Related products</h2>
          </div>
        </div>
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  );
}
