import { Suspense } from "react";
import { SearchInput } from "@/components/SearchInput";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductExplorer } from "@/components/ProductExplorer";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { getProducts, getCategories } from "@/lib/api";

/**
 * Static Home Page
 * Fetching initial data for the default state (all categories, skip 0)
 * searchParams are handled by the Client-side ProductExplorer component
 */
export default async function Home() {
  // Fetch initial data (default view) and all categories
  const [initialProducts, categories] = await Promise.all([
    getProducts({ limit: 20, skip: 0 }),
    getCategories(),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* Header / Intro */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 pt-16 pb-12 px-4 text-center sm:text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight">
              Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Explorer.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 font-medium max-w-2xl leading-relaxed">
              Experience a premium, high-performance interface for discovering the world's most desired products. Engineered for speed and accessibility.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <Suspense>
              <SearchInput className="max-w-2xl" />
            </Suspense>
            
            <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <Suspense>
                <CategoryFilter categories={categories} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="flex-1 py-16 px-4 max-w-7xl mx-auto w-full">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductExplorer initialData={initialProducts} />
        </Suspense>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-black tracking-tight text-blue-600">CONTENT EXPLORER</h3>
            <p className="text-zinc-500 text-sm font-medium">
              © {new Date().getFullYear()} All rights reserved. Built for Excellence.
            </p>
          </div>
          <div className="flex gap-10 text-sm font-bold text-zinc-400">
            <span className="hover:text-blue-500 transition-colors cursor-pointer">Github</span>
            <span className="hover:text-blue-500 transition-colors cursor-pointer">Documentation</span>
            <span className="hover:text-blue-500 transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
