export function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-3">
      <div className="h-72 rounded-[22px] bg-slate-200" />
      <div className="mt-4 h-4 w-20 rounded bg-slate-200" />
      <div className="mt-3 h-6 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 h-5 w-1/2 rounded bg-slate-200" />
      <div className="mt-5 flex gap-2">
        <div className="h-10 flex-1 rounded-full bg-slate-200" />
        <div className="h-10 w-16 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="h-[480px] rounded-[32px] bg-slate-200" />
          <div className="grid grid-cols-4 gap-3">
            {[1,2,3,4].map((key) => <div key={key} className="h-20 rounded-2xl bg-slate-200" />)}
          </div>
        </div>
        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="h-5 w-20 rounded bg-slate-200" />
          <div className="h-10 w-3/4 rounded bg-slate-200" />
          <div className="h-5 w-24 rounded bg-slate-200" />
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="h-14 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
        <span className="h-3 w-3 animate-pulse rounded-full bg-violet-600" />
        Loading ShopKart...
      </div>
    </div>
  );
}

export function ButtonLoader() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />;
}
