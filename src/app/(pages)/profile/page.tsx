'use client'

import React, { useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/components/context/CartContext'
import { 
  ShoppingBag, 
  Heart, 
  LogOut, 
  ArrowRight,
  User
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { CartData } = useContext(CartContext)

  // افتراض وجود بيانات للويشليست (يمكنك ربطها بـ Context الويشليست الخاص بكِ لاحقاً)
  const wishlistItems = [] 

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center uppercase tracking-widest text-[10px]">Verifying Identity...</div>

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-20 pb-10 border-b border-stone-100 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-stone-50 border border-stone-100 rounded-full flex items-center justify-center text-stone-900 shadow-sm">
              <User size={30} strokeWidth={1} />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-1 font-bold">VÈRA Member</p>
              <h1 className="text-3xl font-extralight uppercase tracking-tight text-stone-900">
                {session?.user?.name || 'Valued Guest'}
              </h1>
            </div>
          </div>
          
          <button 
            onClick={() => signOut()}
            className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-black transition-colors flex items-center gap-2"
          >
            <LogOut size={12} /> Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Section 1: Shopping Bag Summary */}
       {/* Section 1: Shopping Bag Summary */}
<div className="group border border-stone-100 p-10 hover:border-black transition-all duration-700 bg-stone-50/30">
  <div className="flex justify-between items-start mb-12">
    <div className="space-y-2">
      <ShoppingBag size={24} strokeWidth={1} />
      <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Current Bag</h2>
    </div>
    <span className="text-[10px] font-bold bg-black text-white px-3 py-1">
      {CartData?.numOfCartItems || 0} Items
    </span>
  </div>

  {/* تأكدي من استخدام ?. في السطر القادم */}
  {CartData?.data?.products && CartData.data.products.length > 0 ? (
    <div className="space-y-6">
       {/* عرض عينة من المنتجات في الكارت */}
       <div className="flex -space-x-4 overflow-hidden">
          {CartData.data.products.slice(0, 3).map((item: any, i: number) => (
            <div key={i} className="relative w-16 h-20 border border-white shadow-sm bg-white">
              {/* حماية صورة المنتج أيضاً */}
              <Image 
                src={item?.product?.imageCover || ''} 
                alt="product" 
                fill 
                className="object-cover p-1" 
              />
            </div>
          ))}
       </div>
       <p className="text-[10px] text-stone-500 uppercase tracking-widest">
         Total: EGP {CartData?.data?.totalCartPrice?.toLocaleString() || 0}
       </p>
       <Link href="/cart" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 pt-4 group-hover:gap-4 transition-all">
         View My Bag <ArrowRight size={14} />
       </Link>
    </div>
  ) : (
    <div className="space-y-4">
      <p className="text-[10px] text-stone-400 uppercase tracking-widest italic">Your bag is empty.</p>
      <Link href="/products" className="inline-block text-[9px] uppercase tracking-widest font-bold underline underline-offset-4">
        Discover Pieces
      </Link>
    </div>
  )}
</div>

          {/* Section 2: Wishlist Summary */}
          <div className="group border border-stone-100 p-10 hover:border-black transition-all duration-700">
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-2">
                <Heart size={24} strokeWidth={1} />
                <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Wishlist</h2>
              </div>
              <span className="text-[10px] font-bold text-stone-400 border border-stone-200 px-3 py-1">
                Private
              </span>
            </div>

            <div className="space-y-6">
               <p className="text-[10px] text-stone-500 uppercase tracking-widest leading-relaxed">
                 Save the pieces you love and curate your dream collection.
               </p>
               <Link href="/wishlist" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 pt-4 group-hover:gap-4 transition-all">
                 Go to Wishlist <ArrowRight size={14} />
               </Link>
            </div>
          </div>

        </div>

        {/* Support Footer */}
        <div className="mt-20 pt-10 border-t border-stone-50 text-center">
            <p className="text-[9px] text-stone-300 uppercase tracking-[0.5em]">VÈRA Signature Experience</p>
        </div>
      </div>
    </div>
  )
}
