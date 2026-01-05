

'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/components/context/CartContext'
import { Trash2, Loader2, Minus, Plus, ShoppingBag, AlertCircle, ArrowLeft, CreditCard, X, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Loading from '@/app/loading'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { CartData, isLoading, getCart, setCartData, onlinePayment, cashPayment, clearCart } = useContext(CartContext)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isClearing, setIsClearing] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [address, setAddress] = useState({ details: "", phone: "", city: "" })

  const userToken = (session as any)?.user?.token || '';

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') getCart()
  }, [status, getCart])

  // ✅ حذف منتج واحد وتحديث الحالة فوراً
  async function removeCartItem() {
    if (!itemToDelete) return
    setShowConfirmModal(false); 
    setDeletingId(itemToDelete);
    try {
      const response = await fetch(`${process.env.next_public_api_url}/cart/${itemToDelete}`, {
        method: 'DELETE', 
        headers: { 'token': userToken }
      })
      const data = await response.json()
      if (data.status === "success") { 
        setCartData(data); // تحديث الواجهة بالبيانات الجديدة (التي لا تحتوي المنتج المحذوف)
        toast.success("ITEM REMOVED"); 
      }
    } catch (error) { 
      toast.error("ERROR REMOVING ITEM") 
    } finally { 
      setDeletingId(null) 
    }
  }

  // ✅ مسح السلة بالكامل وتصفير الحالة فوراً (هذا ما سيخفي المنتجات فوراً)
  async function handleClearCart() {
    setShowClearConfirm(false);
    setIsClearing(true);
    try {
      await clearCart(); // هذه الدالة في الكونتكس تمسح السيرفر
      setCartData(null); // 👈 هذه الخطوة السحرية: تجعل الواجهة فارغة فوراً دون ريلود
    } catch (error) {
      toast.error("FAILED TO CLEAR CART");
    } finally {
      setIsClearing(false);
    }
  }

  async function updateCount(productId: string, count: number) {
    if (count < 1) return
    setUpdatingId(productId)
    try {
      const response = await fetch(`${process.env.next_public_api_url}/cart/${productId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'token': userToken },
        body: JSON.stringify({ count })
      })
      const data = await response.json()
      if (data.status === "success") setCartData(data)
    } catch (error) { 
      toast.error("FAILED TO UPDATE") 
    } finally { 
      setUpdatingId(null) 
    }
  }

  if (status === 'loading' || isLoading || isClearing) return <Loading />

  // ✅ بفضل setCartData(null)، هذا الجزء سيعمل فوراً بعد المسح
  if (!CartData || CartData.numOfCartItems === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-white animate-in fade-in duration-700">
        <ShoppingBag strokeWidth={1} className="w-20 h-20 text-stone-200 mb-6" />
        <h1 className="text-2xl font-light tracking-[0.2em] uppercase">Your Bag is Empty</h1>
        <Link href="/products" className="mt-8 underline text-[10px] tracking-widest uppercase text-stone-400 hover:text-black transition-colors">Start Exploring</Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-6 lg:px-12 bg-white min-h-screen">
      
      {/* Modals Section */}
      {showAddressModal && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="bg-white p-10 max-w-md w-full shadow-2xl relative border border-stone-100">
            <button onClick={() => setShowAddressModal(false)} className="absolute top-6 right-6 text-stone-400 hover:text-black"><X size={18}/></button>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 border-b pb-4 text-black">Shipping Details</h3>
            <div className="space-y-6">
              <input type="text" className="w-full border-b border-stone-100 py-3 focus:border-black outline-none text-sm" placeholder="City" onChange={(e) => setAddress({...address, city: e.target.value})} />
              <input type="text" className="w-full border-b border-stone-100 py-3 focus:border-black outline-none text-sm" placeholder="Phone" onChange={(e) => setAddress({...address, phone: e.target.value})} />
              <input type="text" className="w-full border-b border-stone-100 py-3 focus:border-black outline-none text-sm" placeholder="Address Details" onChange={(e) => setAddress({...address, details: e.target.value})} />
            </div>
            <div className="flex flex-col gap-3 mt-12">
              <Button onClick={() => cashPayment(address)} disabled={!address.city || !address.phone} className="w-full bg-white text-black border-2 border-black hover:bg-stone-50 h-14 rounded-none text-[10px] font-black uppercase tracking-widest flex gap-2">
                <Banknote size={16} /> Cash on Delivery
              </Button>
              <Button onClick={() => onlinePayment(address)} disabled={!address.city || !address.phone} className="w-full bg-black text-white hover:bg-stone-800 h-14 rounded-none text-[10px] font-black uppercase tracking-widest flex gap-2">
                <CreditCard size={16} /> Pay with Card
              </Button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white p-12 max-w-sm w-full text-center shadow-2xl">
            <AlertCircle className="w-10 h-10 text-black mx-auto mb-6" strokeWidth={1} />
            <h3 className="text-xs font-black uppercase tracking-widest mb-10">Remove this item?</h3>
            <div className="flex gap-4">
              <button className="flex-1 py-4 text-[9px] uppercase border font-bold" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="flex-1 py-4 text-[9px] uppercase bg-black text-white font-bold" onClick={removeCartItem}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white p-12 max-w-sm w-full text-center shadow-2xl border border-stone-100">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-6" strokeWidth={1} />
            <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-black">Clear Entire Bag?</h3>
            <p className="text-[9px] text-stone-400 uppercase tracking-widest mb-10">All selections will be removed.</p>
            <div className="flex gap-4">
              <button className="flex-1 py-4 text-[9px] uppercase border border-stone-200 font-bold hover:bg-stone-50 transition-colors" onClick={() => setShowClearConfirm(false)}>Cancel</button>
              <button className="flex-1 py-4 text-[9px] uppercase bg-black text-white font-bold hover:bg-stone-800 transition-colors" onClick={handleClearCart}>Yes, Clear All</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-100 pb-10 gap-6">
        <div>
          <h1 className="text-5xl font-extralight tracking-tighter uppercase text-stone-900 leading-none">Your Bag</h1>
          <p className="text-[10px] text-stone-400 uppercase mt-4 tracking-[0.3em] font-bold">{CartData.numOfCartItems} Masterpieces Selected</p>
        </div>
        <div className="flex gap-8 items-center">
            <button onClick={() => setShowClearConfirm(true)} className="text-stone-300 hover:text-black transition-colors text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                <Trash2 size={14} /> Clear All
            </button>
            <Link href="/products" className="text-stone-400 hover:text-black transition-all text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="lg:col-span-8 space-y-4">
          {CartData.data.products.map((item: any) => (
            <div key={item._id} className="flex flex-col md:flex-row gap-10 py-10 border-b border-stone-50 hover:bg-stone-50/30 transition-all px-4 group">
              <div className="relative w-32 h-40 bg-stone-50 shrink-0 overflow-hidden">
                <Image src={item.product.imageCover} alt="product" fill className="object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-[9px] uppercase font-black text-stone-300 tracking-[0.2em] mb-1">{item.product.category?.name}</p>
                      <h3 className="text-lg font-light text-black leading-tight uppercase tracking-tight">{item.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                   </div>
                   <p className="text-lg font-black tracking-tighter text-black italic">EGP {item.price.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center mt-10">
                   <div className="flex items-center border border-stone-200">
                      <button onClick={() => updateCount(item.product._id, item.count - 1)} disabled={updatingId === item.product._id || item.count <= 1} className="p-3 hover:bg-stone-100 disabled:opacity-20 transition-colors"><Minus size={14}/></button>
                      <span className="w-10 text-center text-xs font-bold">{updatingId === item.product._id ? <Loader2 size={12} className="animate-spin mx-auto"/> : item.count}</span>
                      <button onClick={() => updateCount(item.product._id, item.count + 1)} disabled={updatingId === item.product._id} className="p-3 hover:bg-stone-100 transition-colors"><Plus size={14}/></button>
                   </div>
                   <button onClick={() => {setItemToDelete(item.product._id); setShowConfirmModal(true)}} className="text-stone-300 hover:text-red-500 text-[10px] uppercase font-black tracking-widest flex items-center gap-2 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} /> {deletingId === item.product._id ? "Removing..." : "Remove"}
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white border-2 border-black p-8 sticky top-32 shadow-sm">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-8 border-b border-stone-100 pb-4">Summary</h2>
            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-[10px] uppercase tracking-widest text-stone-400"><span>Subtotal</span><span className="text-black font-bold">EGP {CartData.data.totalCartPrice.toLocaleString()}</span></div>
               <div className="flex justify-between text-[10px] uppercase tracking-widest text-stone-400"><span>Delivery</span><span className="text-black font-bold italic">Free</span></div>
            </div>
            <div className="border-t-2 border-black pt-6 mb-10 text-black">
               <p className="text-[10px] uppercase font-black tracking-[0.3em] mb-2">Total Amount</p>
               <p className="text-4xl font-black tracking-tighter italic leading-none">EGP {CartData.data.totalCartPrice.toLocaleString()}</p>
            </div>
            <Button onClick={() => setShowAddressModal(true)} className="w-full bg-black text-white hover:bg-stone-900 rounded-none h-14 text-[11px] font-black uppercase tracking-[0.3em] transition-all">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
