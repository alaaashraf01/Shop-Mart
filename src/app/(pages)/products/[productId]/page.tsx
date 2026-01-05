

import { productI } from '@/interfaces'
import React from 'react'
import Star from '@/app/icons/star'
import ProductSlider from '@/components/productSlider/ProductSlider'
import AddToCart from '@/components/addToCart/AddToCart'
import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  
  let product: productI | null = null;
  
  try {
    // ✅ تحديث الرابط لاستخدام متغير البيئة
    const response = await fetch(`${process.env.next_public_api_url}/products/${productId}`, {
        next: { revalidate: 3600 } // تخزين مؤقت لمدة ساعة لسرعة الاستجابة
    })
    const result = await response.json()
    product = result.data
  } catch (error) {
    console.error("Fetch failed", error)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 animate-pulse">
          Product Unattainable
        </p>
      </div>
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8 py-16 lg:py-24">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex justify-between items-center mb-16">
            <Link href="/products" className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-stone-400 hover:text-black transition-all group">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Selection
            </Link>
            <div className="hidden md:flex gap-2 text-[9px] tracking-[0.2em] uppercase text-stone-300">
                <Link href="/" className="hover:text-stone-900 transition-colors">Vèra</Link>
                <span>/</span>
                <span className="text-stone-900 font-bold uppercase">{product.category.name}</span>
            </div>
        </div>

        {/* Product Interior Grid */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          
          {/* Left: Gallery Section */}
          <div className="w-full space-y-8 sticky top-24">
            <div className="bg-[#fafafa] overflow-hidden border border-stone-50">
              <ProductSlider images={product.images} altContent={product.title} />
            </div>
            
            {/* Visual Indicators for Authenticity */}
            <div className="flex flex-col gap-4 py-6 border-t border-stone-50">
                <div className="flex items-center gap-3 opacity-40">
                    <ShieldCheck size={14} strokeWidth={1.5} />
                    <p className="text-[9px] uppercase tracking-widest font-medium">Authenticity Guaranteed</p>
                </div>
            </div>
          </div>

          {/* Right: Intellectual & Commercial Info */}
          <div className="flex flex-col">
            <header className="space-y-6 border-b border-stone-100 pb-10">
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-bold">
                  {product.brand?.name || 'Vèra Select'}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif italic text-stone-900 tracking-tighter leading-[1.1]">
                  {product.title}
                </h1>
              </div>
              
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-stone-900 tracking-tighter">
                  EGP {product.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-stone-700">
                        {product.ratingsAverage}
                    </span>
                </div>
              </div>
            </header>

            {/* Narrative - The "Story" of the product */}
            <section className="py-12 space-y-4">
              <h3 className="text-[10px] tracking-[0.4em] uppercase font-black text-stone-900">The Narrative</h3>
              <p className="text-stone-500 text-[14px] leading-[1.8] font-light text-justify">
                {product.description}
              </p>
            </section>

            {/* Purchase & Logistics */}
            <div className="mt-4 space-y-10">
               <div className="max-w-md">
                  <AddToCart product={product} />
               </div>
               
               {/* Logistics Details */}
               <div className="grid grid-cols-2 gap-12 pt-10 border-t border-stone-50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-stone-900">
                        <Truck size={12} />
                        <p className="text-[9px] tracking-[0.2em] uppercase font-bold">Logistics</p>
                    </div>
                    <p className="text-[11px] text-stone-500 font-light leading-relaxed italic">
                        Complimentary delivery on all orders. Arrives in 2-4 business days.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-stone-900">Assurance</p>
                    <p className="text-[11px] text-stone-500 font-light leading-relaxed italic">
                        14-day return policy for a seamless exchange experience.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Section Space */}
      <div className="py-20 border-t border-stone-50 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone-200 italic">Vèra Studio Essentials</p>
      </div>
    </main>
  )
}