import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, ShieldCheck, Undo2, ShoppingCart, ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatCurrency, cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Dynamic SEO components using generateMetadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Content Explorer`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Back Link & Breadcrumbs */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </Link>
          <Breadcrumbs 
            items={[
              { label: product.category, href: `/?category=${product.category}` },
              { label: product.title, active: true }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Images */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Image
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                fill
                priority
                className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Gallery (Simplified) */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500 transition-all">
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="150px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-2 inline-flex self-start rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {product.brand || "Premium Selection"}
            </div>

            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                  {product.rating}
                </span>
                <span className="text-sm font-medium text-yellow-600/60 dark:text-yellow-400/60 ml-1">
                  (72 reviews)
                </span>
              </div>
              
              <div className="text-sm font-semibold text-zinc-500">
                SKU: <span className="text-zinc-900 dark:text-white uppercase">{product.sku || product.id}</span>
              </div>
            </div>

            <div className="mb-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-zinc-900 dark:text-white">
                  {formatCurrency(product.price)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-zinc-400 line-through">
                    {formatCurrency(product.price * (1 + product.discountPercentage / 100))}
                  </span>
                )}
              </div>
              <p className={cn(
                "text-sm font-bold",
                product.stock > 10 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
              )}>
                {product.stock > 0 ? `In Stock (${product.stock} units left)` : "Out of Stock"}
              </p>
            </div>

            <p className="mb-10 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {product.description}
            </p>

            <button className="mb-12 group flex items-center justify-center gap-3 w-full rounded-full bg-blue-600 py-5 text-lg font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]">
              <ShoppingCart size={22} strokeWidth={2.5} />
              Add to Catalog
            </button>

            {/* Features/Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <Truck className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold">Fast Shipping</h4>
                  <p className="text-xs text-zinc-500">{product.shippingInformation || "Free global delivery"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <Undo2 className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold">Return Policy</h4>
                  <p className="text-xs text-zinc-500">{product.returnPolicy || "30-day hassle free"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <ShieldCheck className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold">Warranty</h4>
                  <p className="text-xs text-zinc-500">{product.warrantyInformation || "2 Year Protection"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <ShieldCheck className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold">Secure Payment</h4>
                  <p className="text-xs text-zinc-500">100% data encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <section className="mt-20 pt-16 border-t border-zinc-200 dark:border-zinc-800">
           <h2 className="text-2xl font-black mb-10 text-zinc-900 dark:text-white">Customer Reviews</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {product.reviews?.map((review, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className={cn(j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300")} />
                    ))}
                  </div>
                  <p className="mb-4 text-zinc-700 dark:text-zinc-300 italic font-medium">"{review.comment}"</p>
                  <div className="mt-auto">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{review.reviewerName}</p>
                    <p className="text-xs text-zinc-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
             ))}
           </div>
        </section>
      </div>
    </div>
  );
}
