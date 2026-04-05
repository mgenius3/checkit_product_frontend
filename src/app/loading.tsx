import { ProductGridSkeleton } from "@/components/ProductSkeleton";

export default function RootLoading() {
  return (
    <div className="flex flex-col w-full py-20 animate-in fade-in duration-500">
      <ProductGridSkeleton />
    </div>
  );
}
