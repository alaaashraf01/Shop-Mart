
'use client'
import React, { useContext, useState } from 'react'
import { CartContext } from '@/components/context/CartContext'
import { ShoppingCart, Loader2, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToCartAction } from '@/app/(pages)/products/_actions/addToCart.action'

export default function AddToCart({ product }: { product: any }) {
  const { data: session } = useSession()
  const router = useRouter()
  // أضفنا getCart هنا من الـ Context
  const { setCartData, getCart } = useContext(CartContext)
  const [isAdding, setIsAdding] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // الحصول على التوكن الديناميكي للمستخدم المسجل حالياً
  const userToken = (session?.user as any)?.token;

  async function handleAddToCart() {
    // 1. التحقق من تسجيل الدخول
    if (!session) {
      toast('Login required to shop', {
        icon: '🔒',
        style: {
          borderRadius: '0px',
          background: '#1c1917',
          color: '#fff',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }
      });
      return router.push('/login');
    }

    if (!product?._id) return
    
    setIsAdding(true)
    try {
      // 2. إرسال الطلب للسيرفر مع التوكن الصحيح
      const result = await addToCartAction(product._id, userToken)
      
      if (result.success) {
        // 3. الخطوة الأهم: تحديث البيانات في الـ Context بالكامل
        // نستدعي getCart لجلب تفاصيل المنتجات (الصور والأسماء) وليس فقط الـ IDs
        await getCart(); 
        
        setIsSuccess(true)
        toast.success(`${product.title.split(' ').slice(0, 2).join(' ')} added to your bag`, {
          style: {
            borderRadius: '0px',
            background: '#1c1917',
            color: '#fff',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          },
        });

        setTimeout(() => setIsSuccess(false), 2000)
      } else {
        toast.error(result.message || "Failed to update cart")
      }
    } catch (error) {
      toast.error("Connection error")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full h-12 transition-all duration-500 uppercase text-[10px] tracking-[0.2em] font-bold flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70
        ${isSuccess 
          ? 'bg-stone-100 text-stone-900 border border-stone-200' 
          : 'bg-stone-900 text-white hover:bg-black'}`}
    >
      {isAdding ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isSuccess ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Add to Bag
        </>
      )}
    </button>
  )
}