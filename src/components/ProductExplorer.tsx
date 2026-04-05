"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getProducts } from "@/lib/api";
import { ProductResponse } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import { ProductGridSkeleton } from "./ProductSkeleton";

/**
 * Client-side component to handle dynamic product listing based on searchParams
 * Required for static export (output: 'export') because searchParams are not 
 * provided at build-time in static sites.
 */
export function ProductExplorer({ initialData }: { initialData: ProductResponse }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ProductResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Watch searchParams and update data accordingly
  useEffect(() => {
    // Skip fetching if searchParams are empty (initial pre-rendered state)
    if (!searchParams.toString()) {
      setData(initialData);
      return;
    }

    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const search = searchParams.get("search") || undefined;
        const category = searchParams.get("category") || undefined;
        const skip = parseInt(searchParams.get("skip") || "0", 10);
        const limit = parseInt(searchParams.get("limit") || "20", 10);

        const newData = await getProducts({ search, category, skip, limit });
        startTransition(() => {
          setData(newData);
        });
      } catch (err) {
        console.error("Client fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [searchParams, initialData]);

  const isLoading = loading || isPending;

  if (isLoading && !data.products.length) {
    return <ProductGridSkeleton />;
  }

  if (data.products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={isLoading ? "opacity-60 transition-opacity duration-300" : ""}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">
          {data.total} results found
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mb-12 [view-transition-name:product-grid]">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination 
        total={data.total} 
        limit={parseInt(searchParams.get("limit") || "20", 10)} 
        skip={parseInt(searchParams.get("skip") || "0", 10)} 
      />
    </div>
  );
}
