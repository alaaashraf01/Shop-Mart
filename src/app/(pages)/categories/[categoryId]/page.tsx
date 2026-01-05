


import Star from '@/app/icons/star';
import AddToCart from '@/components/addToCart/AddToCart';
import WishlistButton from '@/components/WishlistButton/WishlistButton';
import { productI } from '@/interfaces';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;

  // ✅ استبدال الرابط الثابت بمتغير البيئة
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}`,
    { next: { revalidate: 3600 } } // تحديث البيانات كل ساعة (مثالي لصفحات التصنيفات)
  );

  const data = await res.json();
  const products: productI[] = data.data || [];

  const categoryName =
    products.length > 0 ? products[0].category.name : 'Collection';

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-6 lg:px-12 min-h-screen">

      {/* Header */}
      <div className="flex flex-col items-start mb-16 space-y-3">
        <Link
          href="/categories"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-black transition-all group mb-4"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Back to Departments
        </Link>

        <h1 className="text-5xl font-light tracking-tighter text-stone-900 uppercase">
          {categoryName}
        </h1>

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-stone-300"></span>
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.4em]">
            {products.length} Pieces Found
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product._id} className="group flex flex-col">

              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-stone-50 mb-6">
                <WishlistButton productId={product._id} />

                <Link href={`/products/${product._id}`}>
                  <Image
                    src={product.imageCover}
                    fill
                    className="object-cover transition-transform duration-1000 cubic-bezier(0.2,1,0.3,1) group-hover:scale-105"
                    alt={product.title}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </Link>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <Link href={`/products/${product._id}`} className="flex-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 line-clamp-1">
                      {product.title.split(' ').slice(0, 4).join(' ')}
                    </h3>
                  </Link>

                  <span className="text-[11px] font-bold text-stone-900">
                    EGP {product.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest">
                    {product.brand?.name || 'Vèra Select'}
                  </p>

                  <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-stone-700">
                        {product.ratingsAverage}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 border-t border-stone-100">
                  <div className="flex-1">
                    <AddToCart product={product} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32 text-center bg-stone-50/50">
          <ShoppingBag className="w-12 h-12 text-stone-200 mb-6 font-light" />
          <h2 className="text-xl font-light uppercase tracking-[0.2em] text-stone-900">
            Empty Collection
          </h2>
          <p className="text-stone-400 mt-2 text-[10px] uppercase tracking-widest">
            New arrivals coming soon to this department.
          </p>
        </div>
      )}
    </div>
  );
}
