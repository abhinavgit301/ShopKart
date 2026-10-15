import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import FilterDrawer from '../components/FilterDrawer';
import SortDropdown from '../components/SortDropdown';
import { products } from '../data/products';

const initialFilters = {
  category: [],
  brand: [],
  size: [],
  color: [],
  priceMax: 20000,
  rating: null,
};

export default function Products() {
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const counts = useMemo(() => {
    const category = {};
    const brand = {};

    products.forEach((product) => {
      category[product.category] = (category[product.category] || 0) + 1;
      brand[product.brand] = (brand[product.brand] || 0) + 1;
    });

    return { category, brand };
  }, []);

  const updateFilter = (key, value) => {
    setFilters((current) => {
      if (key === 'priceMax') return { ...current, priceMax: value };
      if (key === 'rating') return { ...current, rating: current.rating === value ? null : value };

      const list = current[key];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...current, [key]: next };
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category.length) {
      result = result.filter((product) => filters.category.includes(product.category));
    }

    if (filters.brand.length) {
      result = result.filter((product) => filters.brand.includes(product.brand));
    }

    if (filters.size.length) {
      result = result.filter((product) => product.sizes.some((size) => filters.size.includes(size)));
    }

    if (filters.color.length) {
      result = result.filter((product) => product.colors.some((color) => filters.color.includes(color)));
    }

    result = result.filter((product) => product.price <= filters.priceMax);
    if (filters.rating) result = result.filter((product) => product.rating >= filters.rating);

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  const activeFilterCount = Object.values(filters).reduce((sum, value) => {
    if (Array.isArray(value)) return sum + value.length;
    if (value && value !== 20000 && value !== null) return sum + 1;
    return sum;
  }, 0);

  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/80 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Collection</p>
            <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">All sneakers</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Search className="h-4 w-4" />
              <span>{filteredProducts.length} results</span>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden" onClick={() => setMobileFilterOpen(true)}>
              <Filter className="h-4 w-4" />
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onChange={updateFilter} onReset={() => setFilters(initialFilters)} products={products} counts={counts} />
          </div>
        </div>

        <div>
          {filteredProducts.length ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">No sneakers found.</h3>
              <p className="mt-2 text-slate-600">Try searching for another style or brand.</p>
              <button className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white" onClick={() => setFilters(initialFilters)}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <FilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={updateFilter}
        onReset={() => setFilters(initialFilters)}
        products={products}
        counts={counts}
      />
    </div>
  );
}
