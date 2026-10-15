import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchBar({ value, onChange, suggestions = [], onSelect }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder="Search sneakers, brands, categories"
        className="w-full rounded-full border border-slate-200 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-violet-400"
      />

      {suggestions.length > 0 && value.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {suggestions.slice(0, 5).map((item) => (
            <Link
              key={item.id || item}
              to={item.id ? `/products/${item.id}` : '/products'}
              onClick={() => onSelect(item)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <span>{item.name || item}</span>
              <span className="text-xs text-slate-400">{item.brand || 'shop'}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
