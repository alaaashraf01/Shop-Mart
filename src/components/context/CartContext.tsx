

'use client'

import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShieldCheck, X, Trash2 } from "lucide-react";

// 1. تعريف النوع (Type) ليشمل كل الوظائف
export const CartContext = createContext<{
    CartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart: () => Promise<void>,
    clearCart: () => Promise<void>,
    onlinePayment: (shippingAddress: any) => Promise<void>,
    cashPayment: (shippingAddress: any) => Promise<void>
}>({
    CartData: null,
    setCartData: () => {},
    isLoading: false,
    setIsLoading: () => {},
    getCart: async () => {},
    clearCart: async () => {},
    onlinePayment: async () => {},
    cashPayment: async () => {}
})

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [CartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const userToken = (session?.user as any)?.token;
    const API_URL = process.env.next_public_api_url;

    // --- جلب بيانات السلة ---
    const getCart = useCallback(async () => {
        if (!userToken) return;
        try {
            const response = await fetch(`${API_URL}/cart`, {
                headers: { token: userToken }
            })
            const data = await response.json()
            if (data.status === "success") setCartData(data)
        } catch (error) { console.error("Get Cart Error:", error) }
    }, [userToken, API_URL])

    // --- مسح السلة بالكامل ---
    const clearCart = async () => {
        if (!userToken) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/cart`, {
                method: 'DELETE',
                headers: { token: userToken }
            });
            const data = await response.json();
            if (data.status === "success") {
                setCartData(null);
                toast.success("CART EMPTIED", {
                    style: { background: '#000', color: '#fff', fontSize: '10px', borderRadius: '0' }
                });
            }
        } catch (error) {
            console.error("Clear Cart Error:", error);
        } finally { setIsLoading(false); }
    }

    // --- توستر النجاح الفاخرة ---
    const showLuxuryToast = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-in fade-in slide-in-from-top-4' : 'animate-out fade-out slide-out-to-top-2'} max-w-md w-full bg-black text-white shadow-2xl rounded-none flex border border-stone-800`}>
                <div className="flex-1 p-5 flex items-center">
                    <div className="h-10 w-10 bg-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="text-black" size={20} />
                    </div>
                    <div className="ml-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Order Confirmed</p>
                        <p className="mt-1 text-[9px] text-stone-500 uppercase">Processed successfully.</p>
                    </div>
                </div>
                <button onClick={() => toast.dismiss(t.id)} className="p-4 border-l border-stone-800 text-stone-500 hover:text-white">
                    <X size={14} />
                </button>
            </div>
        ), { duration: 4000 });
    }

    // --- الدفع أونلاين ---
    const onlinePayment = async (shippingAddress: any) => {
        if (!CartData?.data?._id || !userToken) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders/checkout-session/${CartData.data._id}?url=${window.location.origin}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: userToken },
                body: JSON.stringify({ shippingAddress })
            });
            const data = await response.json();
            if (data.status === "success") window.location.href = data.session.url;
        } catch (error) { toast.error("PAYMENT_ERROR") }
        finally { setIsLoading(false) }
    }

    // --- الدفع كاش ---
    const cashPayment = async (shippingAddress: any) => {
        if (!CartData?.data?._id || !userToken) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/orders/${CartData.data._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: userToken },
                body: JSON.stringify({ shippingAddress })
            });
            const data = await response.json();
            if (data.status === "success") {
                showLuxuryToast();
                setCartData(null);
                setTimeout(() => router.push('/allorders'), 2000);
            }
        } catch (error) { toast.error("CASH_ERROR") }
        finally { setIsLoading(false) }
    }

    useEffect(() => {
        if (userToken) getCart()
    }, [userToken, getCart])

    return (
        <CartContext.Provider value={{ 
            CartData, setCartData, isLoading, setIsLoading, 
            getCart, clearCart, onlinePayment, cashPayment 
        }}>
            {children}
        </CartContext.Provider>
    )
}