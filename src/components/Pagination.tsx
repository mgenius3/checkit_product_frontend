"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  total: number;
  limit: number;
  skip: number;
}

export function Pagination({ total, limit, skip }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const newSkip = (newPage - 1) * limit;
    
    if (newSkip > 0) {
      params.set("skip", newSkip.toString());
    } else {
      params.delete("skip");
    }

    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-10 px-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-sm font-semibold rounded-md text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-sm font-semibold rounded-md text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing <span className="font-bold text-zinc-900 dark:text-white">{skip + 1}</span> to{" "}
            <span className="font-bold text-zinc-900 dark:text-white">
              {Math.min(skip + limit, total)}
            </span>{" "}
            of <span className="font-bold text-zinc-900 dark:text-white">{total}</span> results
          </p>
        </div>
        
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {/* Simple page numbers */}
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              // Show pages around current page
              let pageToShow = currentPage;
              if (currentPage <= 3) pageToShow = i + 1;
              else if (currentPage >= totalPages - 2) pageToShow = totalPages - 4 + i;
              else pageToShow = currentPage - 2 + i;

              if (pageToShow <= 0 || pageToShow > totalPages) return null;

              return (
                <button
                  key={pageToShow}
                  onClick={() => handlePageChange(pageToShow)}
                  aria-current={currentPage === pageToShow ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center px-4 py-2 border text-sm font-semibold whitespace-nowrap",
                    currentPage === pageToShow
                      ? "z-10 bg-blue-600 border-blue-600 text-white"
                      : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  )}
                >
                  {pageToShow}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
