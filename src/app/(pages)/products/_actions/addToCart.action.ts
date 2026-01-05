




'use server'

import { revalidatePath } from 'next/cache'

// ✅ استبدال الرابط الثابت بمتغير البيئة
const CART_API = `${process.env.next_public_api_url}/cart`;

export async function addToCartAction(productId: string, token: string) {
  try {
    const response = await fetch(CART_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token // نستخدم التوكن الممرر من الكومبوننت
      },
      body: JSON.stringify({ productId })
    })

    const data = await response.json()
    
    if (data.status === "success") {
      // ✅ تحديث الكاش الخاص بصفحة السلة لضمان ظهور المنتج الجديد فوراً
      revalidatePath('/cart') 
      return { success: true, data }
    }
    return { success: false, message: data.message }
  } catch (error) {
    console.error("Add to Cart Error:", error)
    return { success: false, message: "Network error" }
  }
}