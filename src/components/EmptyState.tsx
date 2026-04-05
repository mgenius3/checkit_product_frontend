import { SearchX, RotateCcw } from "lucide-react";
import Link from "next/link";

export function EmptyState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6 h-24 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
        <SearchX size={48} strokeWidth={1.5} />
      </div>
      
      <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
        No products found
      </h2>
      
      <p className="mb-8 max-w-md text-zinc-600 dark:text-zinc-400">
        {message || "Try adjusting your search criteria or filters to discover other items in our catalog."}
      </p>
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
      >
        <RotateCcw size={16} />
        Reset all filters
      </Link>
    </div>
  );
}
