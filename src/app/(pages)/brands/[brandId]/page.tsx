


// import Star from '@/app/icons/star';
// import AddToCart from '@/components/addToCart/AddToCart';
// import { productI } from '@/interfaces';
// import { ShoppingBag, ArrowLeft } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// // ✅ استيراد زر الويشليست الذكي
// import WishlistButton from '@/components/WishlistButton/WishlistButton';

// export default async function BrandProductsPage({ params }: any) {
//   const { brandId } = await params;
  
//   const [res, brandRes] = await Promise.all([
//     fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}&limit=50`),
//     fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
//   ]);
  
//   const data = await res.json();
//   const brandData = await brandRes.json();
//   const specificProducts: productI[] = data.data;
//   const brandName = brandData.data?.name || "New Era";

//   return (
//     <div className="min-h-screen bg-white pb-32">
//       {/* Header Section - Cinematic Approach */}
//       <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-white border-b border-stone-50">
//         <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-center">
//           <h1 className="text-[25vw] font-black leading-none uppercase tracking-tighter">
//             {brandName.split(' ')[0]}
//           </h1>
//         </div>
//         <div className="relative z-10 text-center space-y-6">
//           <div className="flex items-center justify-center gap-4">
//              <span className="h-px w-12 bg-stone-200"></span>
//              <span className="text-[10px] tracking-[0.6em] uppercase text-stone-400 animate-pulse">Brand Archive</span>
//              <span className="h-px w-12 bg-stone-200"></span>
//           </div>
//           <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter text-stone-900">
//             {brandName}<span className="text-stone-300 not-italic">.</span>
//           </h1>
//         </div>
//       </div>

//       <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-20">
//         {specificProducts && specificProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
//             {specificProducts.map((product) => (
//               <div key={product._id} className="group relative flex flex-col">
                
//                 {/* Product Image Section */}
//                 <div className="relative aspect-3/4 overflow-hidden bg-stone-50 mb-6 block">
//                   <Link href={"/products/" + product._id}>
//                     <Image 
//                       src={product?.imageCover} 
//                       fill
//                       className="object-cover transition-transform duration-[1.5s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105" 
//                       alt={product?.title}
//                       sizes="(max-width: 768px) 100vw, 25vw"
//                     />
//                   </Link>
                  
//                   {/* Category Badge */}
//                   <div className="absolute top-0 left-0 bg-black text-white px-3 py-1.5 text-[8px] font-bold tracking-[0.2em] uppercase z-10">
//                     {product?.category?.name}
//                   </div>

//                   {/* Quick Actions Overlay */}
//                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//                 </div>

//                 {/* Product Info Section */}
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-start">
//                     <div className="space-y-1">
//                        <h3 className="text-[11px] font-bold text-stone-900 tracking-wider uppercase leading-snug line-clamp-1">
//                          {product.title.split(' ').slice(0, 3).join(' ')}
//                        </h3>
//                        <p className="text-[9px] text-stone-400 uppercase tracking-widest">{brandName}</p>
//                     </div>
//                     <p className="text-xs font-bold text-stone-900">
//                       EGP {product.price.toLocaleString()}
//                     </p>
//                   </div>

//                   {/* Action Buttons: AddToCart + Wishlist */}
//                   <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
//                     <div className="flex-1">
//                        <AddToCart product={product} />
//                     </div>
                    
//                     {/* زر الويشليست الجديد بنفس تنسيق الصفحة */}
//                     <div className="shrink-0">
//                        <WishlistButton productId={product._id} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="py-40 text-center space-y-6">
//             <ShoppingBag className="mx-auto w-12 h-12 text-stone-200 font-light" />
//             <h2 className="text-xl font-serif italic text-stone-400 tracking-widest">No pieces found in this archive</h2>
//             <Link href="/brands" className="inline-block text-[10px] tracking-[0.4em] uppercase border-b border-stone-200 pb-2 hover:border-black transition-colors">Return to Brands</Link>
//           </div>
//         )}
//       </div>

//       <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-20">
//          <Link href="/products" className="inline-flex items-center gap-3 text-stone-400 hover:text-black text-[10px] uppercase tracking-[0.3em] transition-all group">
//            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
//          </Link>
//       </div>
//     </div>
//   );
// }


import Star from '@/app/icons/star';
import AddToCart from '@/components/addToCart/AddToCart';
import { productI } from '@/interfaces';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// ✅ استيراد زر الويشليست الذكي
import WishlistButton from '@/components/WishlistButton/WishlistButton';

export default async function BrandProductsPage({ params }: any) {
  const { brandId } = await params;
  
  // ✅ تم استبدال اللينك الثابت بالمتغير من ملف الـ .env
  const [res, brandRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?brand=${brandId}&limit=50`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands/${brandId}`)
  ]);
  
  const data = await res.json();
  const brandData = await brandRes.json();
  const specificProducts: productI[] = data.data;
  const brandName = brandData.data?.name || "New Era";

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header Section - Cinematic Approach */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-white border-b border-stone-50">
        <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-center">
          <h1 className="text-[25vw] font-black leading-none uppercase tracking-tighter">
            {brandName.split(' ')[0]}
          </h1>
        </div>
        <div className="relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
             <span className="h-px w-12 bg-stone-200"></span>
             <span className="text-[10px] tracking-[0.6em] uppercase text-stone-400 animate-pulse">Brand Archive</span>
             <span className="h-px w-12 bg-stone-200"></span>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter text-stone-900">
            {brandName}<span className="text-stone-300 not-italic">.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-20">
        {specificProducts && specificProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {specificProducts.map((product) => (
              <div key={product._id} className="group relative flex flex-col">
                
                {/* Product Image Section */}
                <div className="relative aspect-3/4 overflow-hidden bg-stone-50 mb-6 block">
                  <Link href={"/products/" + product._id}>
                    <Image 
                      src={product?.imageCover} 
                      fill
                      className="object-cover transition-transform duration-[1.5s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105" 
                      alt={product?.title}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </Link>
                  
                  {/* Category Badge */}
                  <div className="absolute top-0 left-0 bg-black text-white px-3 py-1.5 text-[8px] font-bold tracking-[0.2em] uppercase z-10">
                    {product?.category?.name}
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Product Info Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <h3 className="text-[11px] font-bold text-stone-900 tracking-wider uppercase leading-snug line-clamp-1">
                         {product.title.split(' ').slice(0, 3).join(' ')}
                       </h3>
                       <p className="text-[9px] text-stone-400 uppercase tracking-widest">{brandName}</p>
                    </div>
                    <p className="text-xs font-bold text-stone-900">
                      EGP {product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Action Buttons: AddToCart + Wishlist */}
                  <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                    <div className="flex-1">
                       <AddToCart product={product} />
                    </div>
                    
                    <div className="shrink-0">
                       <WishlistButton productId={product._id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-6">
            <ShoppingBag className="mx-auto w-12 h-12 text-stone-200 font-light" />
            <h2 className="text-xl font-serif italic text-stone-400 tracking-widest">No pieces found in this archive</h2>
            <Link href="/brands" className="inline-block text-[10px] tracking-[0.4em] uppercase border-b border-stone-200 pb-2 hover:border-black transition-colors">Return to Brands</Link>
          </div>
        )}
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 mt-20">
         <Link href="/products" className="inline-flex items-center gap-3 text-stone-400 hover:text-black text-[10px] uppercase tracking-[0.3em] transition-all group">
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
         </Link>
      </div>
    </div>
  );
}