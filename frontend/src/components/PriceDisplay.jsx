export default function PriceDisplay({ price, originalPrice, discount }) {
  const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-slate-900">{formatPrice(price)}</span>
      {originalPrice && (
        <>
          <span className="text-sm text-slate-400 line-through">{formatPrice(originalPrice)}</span>
          {discount && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {discount}% off
            </span>
          )}
        </>
      )}
    </div>
  );
}
