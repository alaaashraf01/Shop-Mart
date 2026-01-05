
export const dynamic = 'force-dynamic';

import { BrandI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  // ✅ استبدال الرابط بمتغير البيئة مع استخدام Backticks
  const res = await fetch(`${process.env.next_public_api_url}/brands`, {
    next: { revalidate: 86400 } // تحديث مرة كل يوم لأن البراندات مش بتتغير كتير
  });
  
  const data = await res.json();
  const brands: BrandI[] = data.data;

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-6 lg:px-12 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col items-center mb-20 text-center space-y-4">
        <h1 className="text-5xl font-light tracking-[0.2em] text-stone-900 uppercase">
          Our Partners
        </h1>
        <div className="h-px w-20 bg-stone-900"></div>
        <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em]">
          World-class brands, curated for you
        </p>
      </div>

      {brands ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {brands.map((brand) => (
            <Link href={'/brands/' + brand?._id} key={brand?._id} className="group">
              <div className="relative border border-stone-100 bg-white p-10 h-64 flex flex-col items-center justify-center transition-all duration-500 group-hover:border-stone-900 overflow-hidden">
                
                {/* Brand Logo Container */}
                <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                  <Image 
                    src={brand?.image} 
                    alt={brand?.name} 
                    fill
                    className="object-contain" // يضمن إن اللوجو يظهر كامل بدون قص
                  />
                </div>

                {/* Brand Name - Subtle & Elegant */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-stone-100">
                  <h2 className="text-[10px] font-bold text-center uppercase tracking-[0.3em] text-stone-900">
                    {brand?.name}
                  </h2>
                </div>

                {/* Subtle Decorative Line */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-stone-200 group-hover:border-stone-900 transition-colors"></div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-20">
             <p className="text-stone-400 animate-pulse uppercase tracking-widest text-xs">Loading Directory...</p>
        </div>
      )}
      
      <div className="py-12"></div>
    </div>
  );
}