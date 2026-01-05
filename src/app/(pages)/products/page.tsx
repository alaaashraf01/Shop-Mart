


import { productI } from '@/interfaces';
import React from 'react';
import Image from 'next/image';
import Star from '@/app/icons/star';
import { HeartIcon, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/addToCart/AddToCart';
import WishlistButton from '@/components/WishlistButton/WishlistButton';

async function ProductsPage() {
  let products: productI[] = [];

  try {
    // ✅ استخدام متغير البيئة مع الـ fetch
    const response = await fetch(`${process.env.next_public_api_url}/products`, {
      next: { revalidate: 60 } // إعادة التحقق كل 60 ثانية لضمان تحديث البيانات
    });
    
    if (response.ok) {
      const result = await response.json();
      products = result.data || [];
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400">Curating Collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-10 pt-32 pb-20 text-center space-y-4">
        <span className="text-[9px] tracking-[0.6em] uppercase text-stone-400 block">Season 2025</span>
        <h1 className="text-5xl font-serif italic text-stone-900 tracking-tighter">The Edit</h1>
        <div className="h-px w-10 bg-stone-200 mx-auto mt-6"></div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
          {products.map((product) => (
            <div key={product._id} className="group flex flex-col">
              <div className="relative aspect-4/5 bg-[#fcfcfc] overflow-hidden border border-stone-50">
                <Link href={'/products/' + product._id}>
                  <Image 
                    src={product.imageCover} 
                    className='object-contain p-10 opacity-90 group-hover:scale-105 transition-transform duration-1000' 
                    alt={product.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </Link>
                <WishlistButton productId={product._id} />
              </div>
              
              <div className="pt-6 space-y-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-300">
                    {product.brand?.name || "VÈRA"}
                  </span>
                  <Link href={'/products/' + product._id}>
                    <h3 className="text-xs font-medium text-stone-800 tracking-tight line-clamp-1 hover:text-stone-400 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className='text-sm font-bold text-stone-900'>
                    EGP {product.price?.toLocaleString()}
                  </p>
                

                  <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-stone-700">
                        {product.ratingsAverage}
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;