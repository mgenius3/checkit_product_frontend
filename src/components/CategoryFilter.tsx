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
    <div className={cn("relative group", className)}>
      <div className="flex items-center gap-2 mb-2 px-1">
        <Filter size={14} className="text-blue-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Filter by Category
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
            currentCategory === "all"
              ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
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
              "px-4 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap",
              currentCategory === category.slug
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
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
