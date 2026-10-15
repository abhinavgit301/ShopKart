import { useMemo, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const text = query.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(text) ||
      product.brand.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text),
    );
  }, [query]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const text = query.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(text) ||
      product.brand.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text),
    ).slice(0, 5);
  }, [query]);

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
        <div className="mb-5 flex items-center gap-3 text-slate-700">
          <SearchIcon className="h-5 w-5" />
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">Search sneakers</h1>
        </div>
        <SearchBar value={query} onChange={setQuery} suggestions={suggestions} onSelect={(item) => setQuery(item.name || item)} />
      </div>

      {!query.trim() ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Find your next pair.</h2>
          <p className="mt-2 text-slate-600">Search by style, category, or brand.</p>
        </div>
      ) : filteredProducts.length ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Search results</p>
              <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">{filteredProducts.length} matches</h2>
            </div>
            <Link to="/products" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300">Browse catalogue</Link>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">No sneakers found.</h2>
          <p className="mt-2 text-slate-600">Try searching for another style or brand.</p>
        </div>
      )}
    </div>
  );
}
