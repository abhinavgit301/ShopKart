export default function SortDropdown({ value, onChange }) {
  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'popularity', label: 'Popularity' },
  ];

  return (
    <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm">
      <span className="font-medium">Sort</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="bg-transparent text-sm text-slate-900 outline-none">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
