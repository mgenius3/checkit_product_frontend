export function ProductSkeleton() {
  return (
    <div className="flex flex-col animate-pulse overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="aspect-square bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5">
        <div className="h-3 w-20 mb-3 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-5 w-3/4 mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-full mb-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-5/6 mb-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="flex justify-between items-center">
          <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8 max-w-7xl mx-auto w-full">
      {[...Array(8)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
