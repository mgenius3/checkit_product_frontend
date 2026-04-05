"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";
import debounce from "lodash.debounce";
import { cn } from "@/lib/utils";

/**
 * URL-driven search input with 300ms debounce.
 */
export function SearchInput({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = debounce((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset skip when searching
    params.delete("skip");
    
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, 300);

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const clearSearch = () => {
    setQuery("");
    handleSearch("");
  };

  return (
    <div className={cn("relative group w-full", className)}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-blue-500">
        {isPending ? (
          <Loader2 size={18} className="animate-spin text-blue-500" />
        ) : (
          <Search size={18} />
        )}
      </div>
      
      <input
        type="text"
        placeholder="Search products..."
        className="w-full h-12 pl-12 pr-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 border text-base outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-zinc-400 placeholder:font-normal"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
      />

      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
