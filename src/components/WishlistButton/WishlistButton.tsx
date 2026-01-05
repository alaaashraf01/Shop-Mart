


// 'use client'
// import React, { useContext, useState } from 'react'
// import { WishlistContext } from '@/components/context/WishlistContext'
// import { Heart, Loader2 } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function WishlistButton({ productId }: { productId: string }) {
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)
//   const [isUpdating, setIsUpdating] = useState(false) // حالة اللودينج الخاصة بكل زر
  
//   const isFav = isInWishlist(productId)

//   const handleToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsUpdating(true); // تشغيل اللودينج فور الضغط

//     if (isFav) {
//       const success = await removeFromWishlist(productId);
//       if (success) {
//         toast('Removed from vault', {
//           icon: '🗑️',
//           style: {
//             borderRadius: '0px',
//             background: '#333',
//             color: '#fff',
//             fontSize: '10px',
//             letterSpacing: '2px',
//             textTransform: 'uppercase'
//           },
//         });
//       }
//     } else {
//       const success = await addToWishlist(productId);
//       if (success) {
//         toast('Added to your vault', {
//           icon: '🖤',
//           style: {
//             borderRadius: '0px',
//             background: '#000',
//             color: '#fff',
//             padding: '16px',
//             fontSize: '10px',
//             textTransform: 'uppercase',
//             letterSpacing: '0.2em'
//           },
//         });
//       }
//     }
//     setIsUpdating(false); // إيقاف اللودينج بعد انتهاء العملية
//   }

//   return (
//     <button 
//       onClick={handleToggle} 
//       disabled={isUpdating}
//       className="absolute top-4 right-4 z-10 p-2.5 bg-white/60 backdrop-blur-sm rounded-full transition-all hover:bg-white flex items-center justify-center min-w-9 min-h-9"
//     >
//       {isUpdating ? (
//         <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
//       ) : (
//         <Heart 
//           size={16} 
//           fill={isFav ? "#000" : "none"} 
//           className={isFav ? "text-black" : "text-stone-400 hover:text-black transition-colors"} 
//           strokeWidth={isFav ? 0 : 1.5}
//         />
//       )}
//     </button>
//   )
// }


'use client'
import React, { useContext, useState } from 'react'
import { WishlistContext } from '@/components/context/WishlistContext'
import { Heart, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react' // 1. استيراد السيزن
import { useRouter } from 'next/navigation' // 2. استيراد الراوتر للتوجيه

export default function WishlistButton({ productId }: { productId: string }) {
  const { data: session } = useSession() // جلب بيانات الجلسة
  const router = useRouter()
  
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const isFav = isInWishlist(productId)

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // ✅ التحقق: إذا لم يكن هناك يوزر مسجل، نمنعه ونوجهه للوجين
    if (!session) {
      toast('Login to save items', {
        icon: '🔒',
        style: {
          borderRadius: '0px',
          background: '#000',
          color: '#fff',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        },
      });
      return router.push('/login'); // نقله لصفحة اللوجين
    }

    setIsUpdating(true);

    if (isFav) {
      const success = await removeFromWishlist(productId);
      if (success) {
        toast('Removed from vault', {
          icon: '🗑️',
          style: {
            borderRadius: '0px',
            background: '#333',
            color: '#fff',
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          },
        });
      }
    } else {
      const success = await addToWishlist(productId);
      if (success) {
        toast('Added to your vault', {
          icon: '🖤',
          style: {
            borderRadius: '0px',
            background: '#000',
            color: '#fff',
            padding: '16px',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          },
        });
      }
    }
    setIsUpdating(false);
  }

  return (
    <button 
      onClick={handleToggle} 
      disabled={isUpdating}
      className="absolute top-4 right-4 z-10 p-2.5 bg-white/60 backdrop-blur-sm rounded-full transition-all hover:bg-white flex items-center justify-center min-w-9 min-h-9"
    >
      {isUpdating ? (
        <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
      ) : (
        <Heart 
          size={16} 
          fill={isFav ? "#000" : "none"} 
          className={isFav ? "text-black" : "text-stone-400 hover:text-black transition-colors"} 
          strokeWidth={isFav ? 0 : 1.5}
        />
      )}
    </button>
  )
}

