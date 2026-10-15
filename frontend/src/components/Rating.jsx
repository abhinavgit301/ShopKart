import { Star } from 'lucide-react';

export default function Rating({ value, reviewCount, compact = false }) {
  return (
    <div className="flex items-center gap-1 text-sm text-slate-700">
      <div className="flex items-center gap-0.5 text-[#f59e0b]">
        <Star className="h-3.5 w-3.5 fill-current" />
      </div>
      <span className="font-medium text-slate-900">{value.toFixed(1)}</span>
      {!compact && (
        <span className="text-slate-500">({reviewCount.toLocaleString('en-IN')})</span>
      )}
    </div>
  );
}
