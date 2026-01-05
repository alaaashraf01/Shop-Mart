


'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'
import { X, Plus } from 'lucide-react'
import Image from 'next/image'

export default function AllOrders() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    const token = (session as any)?.user?.token || (session as any)?.user?.accessToken;
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.id || decoded.sub;
        if (userId) getUserOrders(userId);
      } catch (error) { setLoading(false); }
    }
  }, [session])

  async function getUserOrders(id: string) {
    try {
      // ✅ تصحيح: إضافة الـ Backticks واستخدام المتغير
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${id}`)
      const data = await res.json()
      setOrders(data)
    } finally { setLoading(false) }
  }

  if (loading) return ( 
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-12 h-px bg-black animate-pulse" />
      <p className="text-[8px] uppercase tracking-[0.5em] mt-4 font-bold">Refining Archive</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-16 lg:px-24 font-sans">
      
      {/* Header - Minimalist */}
      <div className="flex justify-between items-baseline border-b border-stone-100 pb-12 mb-20">
        <h1 className="text-6xl md:text-9xl font-extralight tracking-tighter uppercase leading-none">Orders</h1>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 italic">{orders.length} Records</p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {orders.map((order) => (
          <div key={order._id} className="group cursor-pointer" onClick={() => setSelectedOrder(order)}>
            <div className="relative aspect-3/4 bg-stone-50 overflow-hidden mb-8 shadow-sm">
              <Image 
                src={order.cartItems[0]?.product.imageCover} 
                alt="acquisition" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="bg-white/90 backdrop-blur-sm px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                   Reveal Details <Plus size={12} />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-black">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                     <span className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? 'bg-black' : 'bg-stone-200'}`} />
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400">
                        {order.isPaid ? 'Payment Confirmed' : 'Processing'}
                     </span>
                  </div>
                </div>
                <p className="text-lg font-black tracking-tighter text-black italic">
                  {order.totalOrderPrice.toLocaleString()} EGP
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Drawer-style Details Modal --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-300 flex justify-end bg-black/40 backdrop-blur-md transition-all duration-700">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl p-8 md:p-16 overflow-y-auto animate-in slide-in-from-right duration-500 flex flex-col">
            
            <button onClick={() => setSelectedOrder(null)} className="mb-16 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all group">
              <X size={18} className="group-hover:rotate-90 transition-transform" /> Close
            </button>

            <div className="flex-1 space-y-16">
              <header className="border-b border-stone-100 pb-10">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-300 mb-3 italic">Acquisition Date</p>
                <h2 className="text-4xl font-extralight tracking-tighter uppercase leading-none text-black">
                   {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
              </header>

              <div className="space-y-12">
                {selectedOrder.cartItems.map((item: any) => (
                  <div key={item._id} className="flex gap-10 items-center group/item">
                    <div className="w-24 h-32 bg-stone-50 relative shrink-0 overflow-hidden">
                      <Image src={item.product.imageCover} alt="p" fill className="object-contain p-2 mix-blend-multiply group-hover/item:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-[8px] font-black text-stone-300 uppercase tracking-[0.3em]">{item.product.category?.name}</p>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-black leading-relaxed">{item.product.title}</h4>
                      <div className="flex justify-between items-baseline pt-2">
                        <span className="text-[10px] font-medium text-stone-400 italic">Quantity {item.count}</span>
                        <span className="text-sm font-black tracking-tighter italic">{item.price.toLocaleString()} EGP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Summary Bottom */}
            <div className="mt-20 border-t-2 border-black pt-10">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Total Selection Value</span>
                  <span className="text-4xl font-black tracking-tighter text-black italic">
                    {selectedOrder.totalOrderPrice.toLocaleString()} <span className="text-xs">EGP</span>
                  </span>
                </div>
                <div className="bg-stone-50 p-4 text-center">
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-stone-400">Payment via {selectedOrder.paymentMethodType}</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}