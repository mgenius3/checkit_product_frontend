import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex flex-wrap items-center text-sm font-medium text-zinc-500", className)}
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-zinc-400" />
            {item.href && !item.active ? (
              <Link 
                href={item.href} 
                className="hover:text-blue-600 transition-colors capitalize"
              >
                {item.label.replace("-", " ")}
              </Link>
            ) : (
              <span className={cn(
                "capitalize",
                item.active ? "text-zinc-900 dark:text-white font-bold" : ""
              )}>
                {item.label.replace("-", " ")}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
