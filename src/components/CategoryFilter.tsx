"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, ChevronDown } from "lucide-react";
import { Category } from "@/types/product";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  className?: string;
}

export function CategoryFilter({ categories, className }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset search when changing category to avoid weird filtering combos 
    // unless the API supports complex filtering. DummyJSON supports one or the other.
    params.delete("search");
    
    // Reset skip
    params.delete("skip");

    if (slug && slug !== "all") {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn("relative group w-full", className)}>
      <div className="flex items-center gap-2 mb-3 px-1">
        <Filter size={14} className="text-blue-600" />
        <span className="text-xs font-black uppercase tracking-wider text-zinc-500">
          Filter by Category
        </span>
      </div>

      {/* Mobile Select UI (Visible only below 'sm' breakpoint) */}
      <div className="sm:hidden relative">
        <select
          value={currentCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full h-12 pl-4 pr-10 appearance-none rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
        >
          <option value="all">All Items</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
          <ChevronDown size={18} />
        </div>
      </div>

      {/* Desktop Pill UI (Hidden below 'sm' breakpoint) */}
      <div className="hidden sm:flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap",
            currentCategory === "all"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-500"
          )}
        >
          All Items
        </button>
        
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap",
              currentCategory === category.slug
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-500"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
