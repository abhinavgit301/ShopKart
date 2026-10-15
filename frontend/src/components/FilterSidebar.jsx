import { SlidersHorizontal, X } from 'lucide-react';

const currencyFormat = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  products,
  counts,
  isMobile = false,
  onClose,
}) {
  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const sizes = Array.from(new Set(products.flatMap((product) => product.sizes))).sort((a, b) => a - b);
  const colors = Array.from(new Set(products.flatMap((product) => product.colors)));

  const renderFilterGroup = (title, content) => (
    <div className="border-b border-slate-200 pb-5 last:border-none last:pb-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</h3>
        {isMobile && onClose && (
          <button onClick={onClose} className="rounded-full border border-slate-200 p-1 text-slate-500">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {content}
    </div>
  );

  return (
    <aside className={`space-y-5 ${isMobile ? 'w-full' : 'w-[280px]'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm font-semibold uppercase tracking-[0.12em]">Filters</span>
        </div>
        <button onClick={onReset} className="text-sm font-medium text-violet-700">Clear</button>
      </div>

      {renderFilterGroup('Category', (
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => onChange('category', category)}
                  className="h-4 w-4 accent-violet-600"
                />
                {category}
              </span>
              <span className="text-xs text-slate-400">{counts.category[category] || 0}</span>
            </label>
          ))}
        </div>
      ))}

      {renderFilterGroup('Brand', (
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <input type="checkbox" checked={filters.brand.includes(brand)} onChange={() => onChange('brand', brand)} className="h-4 w-4 accent-violet-600" />
                {brand}
              </span>
              <span className="text-xs text-slate-400">{counts.brand[brand] || 0}</span>
            </label>
          ))}
        </div>
      ))}

      {renderFilterGroup('Size', (
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onChange('size', size)}
              className={`rounded-full border px-2.5 py-1.5 text-xs font-medium ${
                filters.size.includes(size)
                  ? 'border-violet-600 bg-violet-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      ))}

      {renderFilterGroup('Color', (
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange('color', color)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                filters.color.includes(color)
                  ? 'border-violet-600 bg-violet-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      ))}

      {renderFilterGroup('Price', (
        <div className="space-y-3">
          <input
            type="range"
            min="4000"
            max="20000"
            step="500"
            value={filters.priceMax}
            onChange={(event) => onChange('priceMax', Number(event.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{currencyFormat(4000)}</span>
            <span>{currencyFormat(filters.priceMax)}</span>
          </div>
        </div>
      ))}

      {renderFilterGroup('Rating', (
        <div className="space-y-2">
          {[4, 4.5, 4.7, 4.8].map((rating) => (
            <label key={rating} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onChange('rating', rating)}
                className="h-4 w-4 accent-violet-600"
              />
              {rating}+ stars
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
}
