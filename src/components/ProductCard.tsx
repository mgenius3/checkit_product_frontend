import Image from "next/image";
import Link from "next/link";
import { Star, Tag } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:-translate-y-1 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA6jk8GAAAAABJRU5ErkJggg=="
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 capitalize">
          <Tag size={12} className="text-blue-500" />
          {product.category.replace("-", " ")}
        </div>
        
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {product.title}
        </h3>
        
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-black dark:text-white">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
