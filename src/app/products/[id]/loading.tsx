export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-black animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-6 w-48 mb-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="h-6 w-24 mb-6 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-12 w-3/4 mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            <div className="h-8 w-1/3 mb-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            
            <div className="h-24 w-full mb-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
            
            <div className="h-4 w-full mb-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
            <div className="h-4 w-full mb-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
            <div className="h-4 w-2/3 mb-12 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
            
            <div className="h-16 w-full rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
