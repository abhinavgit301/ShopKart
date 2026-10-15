export default function QuantitySelector({ value, onIncrease, onDecrease, min = 1 }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5">
      <button type="button" onClick={onDecrease} className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40" disabled={value <= min}>
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-slate-900">{value}</span>
      <button type="button" onClick={onIncrease} className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-700 hover:bg-slate-100">
        +
      </button>
    </div>
  );
}
