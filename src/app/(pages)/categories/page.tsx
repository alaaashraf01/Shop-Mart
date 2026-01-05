

import { CategoryI } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

// 1. تحديث دالة جلب البيانات لاستخدام متغير البيئة
async function getCategoriesData() {
  try {
    // ✅ تم استبدال الرابط الثابت بمتغير البيئة
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { 
      cache: "no-store" 
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Categories Fetch Error:", error);
    return null;
  }
}

export default async function CategoriesPage() {
  const response = await getCategoriesData();
  
  if (!response || !response.data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em]">
          Collections are currently unavailable.
        </p>
      </div>
    );
  }

  const categories: CategoryI[] = response.data;

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col items-center mb-20 text-center space-y-4">
        <h1 className="text-5xl font-light tracking-[0.2em] text-stone-900 uppercase">
          Departments
        </h1>
        <div className="h-px w-20 bg-stone-900"></div>
        <p className="text-stone-400 text-xs uppercase tracking-[0.4em]">
          Explore our curated collections
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group relative overflow-hidden aspect-4/5 bg-stone-100"
          >
            <div className="relative h-full w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
              />
              
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
                <div className="relative py-4 px-8 border border-white/40 backdrop-blur-sm bg-white/10 group-hover:bg-white group-hover:border-white transition-all duration-500">
                   <h2 className="text-white group-hover:text-black text-sm font-bold uppercase tracking-[0.3em] transition-colors duration-500">
                    {category.name}
                  </h2>
                </div>
                
                <span className="text-white text-[9px] uppercase tracking-[0.5em] mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                  Shop Selection
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}