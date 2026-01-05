


// 'use client'

// import React, { useContext, useState, useEffect } from 'react'
// import { WishlistContext } from '@/components/context/WishlistContext'
// import { Trash2, Loader2, AlertCircle, ArrowLeft, Heart } from 'lucide-react'
// import Loading from '@/app/loading'
// import Link from 'next/link'
// import Image from 'next/image'
// import AddToCart from '@/components/addToCart/AddToCart'
// import toast from 'react-hot-toast'

// export default function WishlistPage() {
//   const { wishlistData, setWishlistData, isLoading, removeFromWishlist, getWishlist } = useContext(WishlistContext)
  
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const [showConfirmModal, setShowConfirmModal] = useState(false)
//   const [itemToDelete, setItemToDelete] = useState<string | null>(null)

//   useEffect(() => {
//     if (getWishlist) {
//       getWishlist()
//     }
//   }, []); 

//   async function handleRemove() {
//     if (!itemToDelete) return
    
//     const idToProcess = itemToDelete;
//     setShowConfirmModal(false)
//     setDeletingId(idToProcess) 

//     try {
//       await removeFromWishlist(idToProcess)
      
//       if (setWishlistData) {
//         setWishlistData((prev: any) => 
//           prev ? prev.filter((item: any) => (item._id || item.id) !== idToProcess) : []
//         )
//       }

//       toast('Removed from vault', {
//         icon: '🗑️',
//         style: {
//           borderRadius: '0px',
//           background: '#000',
//           color: '#fff',
//           padding: '16px',
//           fontSize: '10px',
//           textTransform: 'uppercase',
//           letterSpacing: '0.2em'
//         },
//       });

//     } catch (error) {
//       console.error("Remove Error:", error)
//       toast.error("Failed to remove piece")
//     } finally {
//       setDeletingId(null)
//       setItemToDelete(null)
//     }
//   }

//   if (isLoading && !deletingId && (!wishlistData || wishlistData.length === 0)) {
//     return <Loading />
//   }

//   const validWishlist = wishlistData?.filter(p => typeof p === 'object' && (p._id || p.id)) || [];

//   if (validWishlist.length === 0 && !isLoading) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
//         <Heart className="w-12 h-12 text-stone-200 mb-6" strokeWidth={1} />
//         <h1 className="text-2xl font-light tracking-[0.2em] uppercase">Your Vault is Empty</h1>
//         <Link href="/products" className="mt-8 underline text-[10px] tracking-widest uppercase text-stone-400 hover:text-black transition-colors">Start Exploring</Link>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-[1200px] mx-auto py-16 px-6 lg:px-12 min-h-screen">
      
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
//           <div className="bg-white p-10 max-w-sm w-full shadow-2xl text-center space-y-6 rounded-none border border-stone-100">
//             <AlertCircle size={20} className="mx-auto text-stone-900" strokeWidth={1.5} />
//             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Remove Piece?</h3>
//             <div className="flex gap-3 pt-4">
//               <button className="flex-1 py-3 text-[9px] border border-stone-200 uppercase tracking-widest hover:bg-stone-50 transition-colors" onClick={() => setShowConfirmModal(false)}>Cancel</button>
//               <button className="flex-1 py-3 text-[9px] bg-black text-white uppercase tracking-widest hover:bg-stone-800 transition-colors" onClick={handleRemove}>Remove</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mb-12 border-b border-stone-100 pb-8">
//         <h1 className="text-4xl font-light tracking-widest uppercase">My Vault</h1>
//         <p className="text-[10px] text-stone-400 uppercase mt-2 tracking-[0.3em] font-bold">
//             {validWishlist.length} Pieces Curated
//         </p>
//       </div>

//       <div className="space-y-6">
//         {validWishlist.map((product: any) => {
//           const id = product._id || product.id;
//           const isDeleting = deletingId === id;

//           // ✅ منطق تقليص الاسم لـ 3 كلمات فقط
//           const shortTitle = product.title.split(' ').slice(0, 3).join(' ') + (product.title.split(' ').length > 3 ? '...' : '');

//           return (
//             <div key={id} className={`flex flex-col sm:flex-row items-center gap-8 py-8 border-b border-stone-50 transition-all duration-500 ${isDeleting ? 'opacity-20 pointer-events-none' : ''}`}>
              
//               <div className="relative w-28 h-36 bg-[#FBFBFB] shrink-0 group">
//                 <Image 
//                   src={product.imageCover} 
//                   alt={product.title} 
//                   fill 
//                   sizes="112px"
//                   className="object-contain p-4 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
//                 />
//                 {isDeleting && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
//                     <Loader2 className="w-5 h-5 animate-spin text-black" strokeWidth={1.5} />
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 text-center sm:text-left space-y-1">
//                 <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.2em]">{product.brand?.name}</span>
//                 {/* استخدام العنوان القصير هنا */}
//                 <h3 className="text-sm font-medium text-stone-800 truncate tracking-tight">
//                   {shortTitle}
//                 </h3>
//                 <p className="text-sm font-bold text-stone-900 mt-2 tracking-tighter">EGP {product.price?.toLocaleString()}</p>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center gap-6">
//                 <div className="w-full sm:w-48 scale-95 origin-right">
//                   <AddToCart product={product} />
//                 </div>
//                 <button 
//                   onClick={() => {setItemToDelete(id); setShowConfirmModal(true);}} 
//                   className="text-stone-300 hover:text-black p-2 transition-colors"
//                   disabled={isDeleting}
//                 >
//                   <Trash2 size={16} strokeWidth={1.2} />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-16">
//         <Link href="/products" className="inline-flex items-center gap-3 text-stone-400 hover:text-black text-[9px] uppercase tracking-[0.4em] transition-all group">
//           <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
//         </Link>
//       </div>
//     </div>
//   )
// }




// 'use client'
// import React, { useContext, useState, useEffect } from 'react'
// import { WishlistContext } from '@/components/context/WishlistContext'
// import { Trash2, Loader2, AlertCircle, ArrowLeft, Heart } from 'lucide-react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import Loading from '@/app/loading'
// import Link from 'next/link'
// import Image from 'next/image'
// import AddToCart from '@/components/addToCart/AddToCart'
// import toast from 'react-hot-toast'

// export default function WishlistPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const { wishlistData, setWishlistData, isLoading, removeFromWishlist, getWishlist } = useContext(WishlistContext)
  
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const [showConfirmModal, setShowConfirmModal] = useState(false)
//   const [itemToDelete, setItemToDelete] = useState<string | null>(null)

//   // حماية المسار وجلب البيانات
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login')
//     } else if (status === 'authenticated') {
//       getWishlist()
//     }
//   }, [status])

//   async function handleRemove() {
//     if (!itemToDelete) return
//     const idToProcess = itemToDelete;
//     setShowConfirmModal(false)
//     setDeletingId(idToProcess) 

//     try {
//       await removeFromWishlist(idToProcess)
//       toast('Removed from vault', {
//         icon: '🗑️',
//         style: { borderRadius: '0px', background: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' },
//       });
//     } catch (error) {
//       toast.error("Failed to remove piece")
//     } finally {
//       setDeletingId(null)
//       setItemToDelete(null)
//     }
//   }

//   if (status === "loading" || (isLoading && !deletingId)) return <Loading />
//   if (status === "unauthenticated") return null;

//   const validWishlist = wishlistData?.filter((p: any) => typeof p === 'object' && (p._id || p.id)) || [];

//   if (validWishlist.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
//         <Heart className="w-12 h-12 text-stone-200 mb-6" strokeWidth={1} />
//         <h1 className="text-2xl font-light tracking-[0.2em] uppercase">Your Vault is Empty</h1>
//         <Link href="/products" className="mt-8 underline text-[10px] tracking-widest uppercase text-stone-400 hover:text-black">Start Exploring</Link>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-[1200px] mx-auto py-16 px-6 lg:px-12 min-h-screen">
//       {/* Confirm Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
//           <div className="bg-white p-10 max-w-sm w-full shadow-2xl text-center space-y-6 border border-stone-100">
//             <AlertCircle size={20} className="mx-auto text-stone-900" strokeWidth={1.5} />
//             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Remove Piece?</h3>
//             <div className="flex gap-3 pt-4">
//               <button className="flex-1 py-3 text-[9px] border border-stone-200 uppercase tracking-widest hover:bg-stone-50" onClick={() => setShowConfirmModal(false)}>Cancel</button>
//               <button className="flex-1 py-3 text-[9px] bg-black text-white uppercase tracking-widest hover:bg-stone-800" onClick={handleRemove}>Remove</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mb-12 border-b border-stone-100 pb-8">
//         <h1 className="text-4xl font-light tracking-widest uppercase">My Vault</h1>
//         <p className="text-[10px] text-stone-400 uppercase mt-2 tracking-[0.3em] font-bold">{validWishlist.length} Pieces Curated</p>
//       </div>

//       <div className="space-y-6">
//         {validWishlist.map((product: any) => {
//           const id = product._id || product.id;
//           const isDeleting = deletingId === id;
//           const shortTitle = product.title.split(' ').slice(0, 3).join(' ') + (product.title.split(' ').length > 3 ? '...' : '');

//           return (
//             <div key={id} className={`flex flex-col sm:flex-row items-center gap-8 py-8 border-b border-stone-50 transition-all duration-500 ${isDeleting ? 'opacity-20 pointer-events-none' : ''}`}>
//               <div className="relative w-28 h-36 bg-[#FBFBFB] shrink-0 group">
//                 <Image src={product.imageCover} alt={product.title} fill sizes="112px" className="object-contain p-4 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" />
//                 {isDeleting && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
//                     <Loader2 className="w-5 h-5 animate-spin text-black" />
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 text-center sm:text-left space-y-1">
//                 <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.2em]">{product.brand?.name}</span>
//                 <h3 className="text-sm font-medium text-stone-800 tracking-tight">{shortTitle}</h3>
//                 <p className="text-sm font-bold text-stone-900 mt-2">EGP {product.price?.toLocaleString()}</p>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center gap-6">
//                 <div className="w-full sm:w-48 scale-95 origin-right">
//                   <AddToCart product={product} />
//                 </div>
//                 <button onClick={() => {setItemToDelete(id); setShowConfirmModal(true);}} className="text-stone-300 hover:text-black p-2 transition-colors" disabled={isDeleting}>
//                   <Trash2 size={16} strokeWidth={1.2} />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-16">
//         <Link href="/products" className="inline-flex items-center gap-3 text-stone-400 hover:text-black text-[9px] uppercase tracking-[0.4em] transition-all group">
//           <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
//         </Link>
//       </div>
//     </div>
//   )
// }


'use client'
import React, { useContext, useState, useEffect } from 'react'
import { WishlistContext } from '@/components/context/WishlistContext'
import { Trash2, Loader2, AlertCircle, ArrowLeft, Heart, ShoppingBag } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import Link from 'next/link'
import Image from 'next/image'
import AddToCart from '@/components/addToCart/AddToCart'
import { Button } from '@/components/ui/button' // تأكدي من وجود هذا المكون أو استبداله بـ button عادي
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { wishlistData, isLoading, removeFromWishlist, getWishlist } = useContext(WishlistContext)
  
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      getWishlist()
    }
  }, [status])

  async function handleRemove() {
    if (!itemToDelete) return
    const idToProcess = itemToDelete;
    setShowConfirmModal(false)
    setDeletingId(idToProcess) 

    try {
      await removeFromWishlist(idToProcess)
      toast('Removed from vault', {
        icon: '🗑️',
        style: { borderRadius: '0px', background: '#000', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' },
      });
    } catch (error) {
      toast.error("Failed to remove piece")
    } finally {
      setDeletingId(null)
      setItemToDelete(null)
    }
  }

  if (status === "loading" || (isLoading && !deletingId)) return <Loading />
  if (status === "unauthenticated") return null;

  const validWishlist = wishlistData?.filter((p: any) => typeof p === 'object' && (p._id || p.id)) || [];

  // --- تصميم الـ Empty Wishlist (متوافق مع تصميم الكارت) ---
  if (validWishlist.length === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="relative mb-8">
            {/* تأثير الإضاءة الخلفية الهادئ */}
            <div className="absolute inset-0 bg-stone-100 rounded-full scale-150 blur-3xl opacity-60"></div>
            <Heart strokeWidth={1} className="w-20 h-20 text-stone-300 relative z-10 font-extralight" />
        </div>
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-stone-900 mb-2 text-center">Your Vault is Empty</h1>
        <p className="text-stone-400 text-center max-w-sm mb-10 font-light leading-relaxed">
          Your curation is currently empty. Discover and save the pieces that speak to your style.
        </p>
        <Link href="/products">
          <Button className="bg-black text-white px-12 py-7 rounded-none text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl active:scale-95">
            Discover Collection
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto py-20 px-6 lg:px-12 min-h-screen bg-white">
      {/* Confirm Modal (نفس ستايل الكارت) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-md px-4 transition-all">
          <div className="bg-white p-12 max-w-md w-full shadow-2xl text-center border border-stone-50 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-900">
                <AlertCircle size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium uppercase tracking-widest text-stone-900 mb-2">Remove Piece?</h3>
            <p className="text-stone-400 text-sm mb-10 font-light italic uppercase tracking-tighter">This item will be uncurated from your vault.</p>
            <div className="flex gap-4">
              <button className="flex-1 py-4 text-[10px] border border-stone-200 uppercase tracking-widest font-bold hover:bg-stone-50 transition-all" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="flex-1 py-4 text-[10px] bg-black text-white uppercase tracking-widest font-bold hover:bg-stone-800 transition-all" onClick={handleRemove}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-16 border-b border-stone-100 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
           <h1 className="text-5xl font-extralight tracking-tighter uppercase text-stone-900">My Vault</h1>
           <p className="text-[10px] text-stone-400 uppercase mt-4 tracking-[0.4em] font-bold">{validWishlist.length} Masterpieces Curated</p>
        </div>
        <Link href="/products" className="flex items-center gap-2 text-stone-400 hover:text-black transition-all text-[10px] uppercase tracking-[0.3em] font-bold group">
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {validWishlist.map((product: any) => {
          const id = product._id || product.id;
          const isDeleting = deletingId === id;
          // تعديل شرط الـ 3 كلمات ليكون متطابق مع الكارت
          const shortTitle = product.title.split(' ').slice(0, 3).join(' ');

          return (
            <div key={id} className={`flex flex-col md:flex-row items-center gap-10 py-10 border-b border-stone-50 transition-all duration-700 hover:bg-stone-50/40 px-6 ${isDeleting ? 'opacity-20 pointer-events-none' : ''}`}>
              
              {/* Image Section */}
              <div className="relative w-32 h-40 bg-[#FBFBFB] shrink-0 group overflow-hidden border border-stone-50">
                <Image 
                    src={product.imageCover} 
                    alt={product.title} 
                    fill 
                    sizes="128px" 
                    className="object-contain p-4 mix-blend-multiply opacity-95 group-hover:scale-110 transition-transform duration-700" 
                />
                {isDeleting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] z-20">
                    <Loader2 className="w-6 h-6 animate-spin text-black" />
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <span className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.3em]">{product.brand?.name || 'Exclusive'}</span>
                <h3 className="text-lg font-light text-stone-900 uppercase tracking-tight leading-tight">{shortTitle}</h3>
                <div className="pt-2">
                   <p className="text-lg font-bold text-stone-900 tracking-tighter italic">EGP {product.price?.toLocaleString()}</p>
                </div>
              </div>

              {/* Action Section */}
              <div className="flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto">
                <div className="w-full sm:w-64 scale-100 md:scale-105 origin-right">
                  <AddToCart product={product} />
                </div>
                <button 
                    onClick={() => {setItemToDelete(id); setShowConfirmModal(true);}} 
                    className="text-stone-300 hover:text-red-500 p-4 transition-all" 
                    disabled={isDeleting}
                    title="Remove from Vault"
                >
                  <Trash2 size={18} strokeWidth={1} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-20 pt-10 border-t border-stone-50 flex justify-center">
         <p className="text-[9px] text-stone-300 uppercase tracking-[0.5em]">End of Collection</p>
      </div>
    </div>
  )
}