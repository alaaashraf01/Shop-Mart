
'use client'

import { createContext, ReactNode, useEffect, useState, useCallback, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

export const WishlistContext = createContext<{
    wishlistData: any[] | null,
    setWishlistData: Dispatch<SetStateAction<any[] | null>>,
    isLoading: boolean,
    getWishlist: () => Promise<void>,
    addToWishlist: (productId: string) => Promise<boolean>,
    removeFromWishlist: (productId: string) => Promise<boolean>,
    isInWishlist: (productId: string) => boolean
}>({
    wishlistData: null,
    setWishlistData: () => {},
    isLoading: false,
    getWishlist: async () => {},
    addToWishlist: async () => false,
    removeFromWishlist: async () => false,
    isInWishlist: () => false
})

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [wishlistData, setWishlistData] = useState<any[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const userToken = (session?.user as any)?.token;
    // ✅ استخدام رابط الـ API من متغيرات البيئة
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wishlist`;

    const getWishlist = useCallback(async () => {
        if (!userToken) {
            setWishlistData([]);
            return;
        }
        setIsLoading(true)
        try {
            const response = await fetch(API_URL, {
                headers: { token: userToken }
            })
            const result = await response.json()
            if (result.status === "success") {
                setWishlistData(result.data)
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error)
        } finally {
            setIsLoading(false)
        }
    }, [userToken, API_URL])

    const addToWishlist = async (productId: string) => {
        if (!userToken) return false;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: userToken },
                body: JSON.stringify({ productId })
            })
            const result = await response.json()
            if (result.status === "success") {
                // ✅ تحديث البيانات لجلب تفاصيل المنتج الجديد بدلاً من مجرد الـ ID
                await getWishlist();
                return true;
            }
            return false;
        } catch (error) { return false; }
    }

    const removeFromWishlist = async (productId: string) => {
        if (!userToken) return false;
        try {
            const response = await fetch(`${API_URL}/${productId}`, {
                method: 'DELETE',
                headers: { token: userToken }
            })
            const result = await response.json()
            if (result.status === "success") {
                // ✅ تحديث الواجهة فوراً (Optimistic UI Update)
                setWishlistData((prev) => 
                    prev ? prev.filter((item) => (item._id || item.id) !== productId) : []
                )
                return true;
            }
            return false;
        } catch (error) { return false; }
    }

    const isInWishlist = (productId: string) => {
        return wishlistData?.some((item) => item.id === productId || item._id === productId) || false
    }

    useEffect(() => {
        if (userToken) getWishlist()
    }, [userToken, getWishlist])

    return (
        <WishlistContext.Provider value={{ wishlistData, setWishlistData, isLoading, getWishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}