"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6 h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
        <AlertCircle size={40} />
      </div>
      
      <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
        Something went wrong
      </h2>
      
      <p className="mb-8 max-w-md text-zinc-600 dark:text-zinc-400">
        We encountered an error while trying to fetch the requested content. This could be due to a temporary network issue or an invalid route.
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
        >
          <RotateCcw size={16} />
          Try again
        </button>
        
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-6 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95"
        >
          Back to homepage
        </a>
      </div>
    </div>
  );
}
