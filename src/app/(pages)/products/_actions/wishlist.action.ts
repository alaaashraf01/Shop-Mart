

'use server'

import { cookies } from 'next/headers'

// ✅ استبدال الرابط الثابت بمتغير البيئة
const BASE_URL = `${process.env.next_public_api_url}/wishlist`;

// دالة الإضافة
export async function addToWishlistAction(productId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return { success: false, message: "Authentication required" };

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    if (data.status === 'success') {
      return { success: true, data: data.data }; // مصفوفة الـ IDs
    }
    return { success: false };
  } catch (error) {
    console.error("Wishlist Add Error:", error);
    return { success: false };
  }
}

// دالة الحذف
export async function removeFromWishlistAction(productId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return { success: false };

    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        'token': token,
      },
    });

    const data = await res.json();
    if (data.status === 'success') {
      return { success: true, data: data.data };
    }
    return { success: false };
  } catch (error) {
    console.error("Wishlist Remove Error:", error);
    return { success: false };
  }
}