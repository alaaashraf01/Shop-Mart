



// 'use client'
// import { CartContext } from '../context/CartContext';
// import { WishlistContext } from '@/components/context/WishlistContext'; 
// import React, { useContext, useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Badge } from "@/components/ui/badge";
// import { User2Icon, ShoppingCart, Loader2, Menu, X, Heart, LogOut, User } from 'lucide-react';
// import { useSession, signOut } from 'next-auth/react'; 
// import toast from 'react-hot-toast';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"; 

// export default function Navbar() {
//   const { data: session, status } = useSession(); 
//   const isAuthenticated = status === 'authenticated';

//   const { CartData, isLoading: cartLoading, getCart } = useContext(CartContext);
//   const { wishlistData, isLoading: wishLoading, getWishlist } = useContext(WishlistContext); 
  
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   // جلب البيانات فور تسجيل الدخول
//   useEffect(() => {
//     if (isAuthenticated) {
//       getCart();
//       getWishlist();
//     }
//   }, [isAuthenticated, getCart, getWishlist]);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     toast.success("Successfully logged out", {
//       style: { borderRadius: '0px', background: '#1c1917', color: '#fff', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }
//     });
//     await signOut({ callbackUrl: '/' });
//   };

//   const isActive = (path: string) => pathname === path;

//   const navLinks = [
//     { name: 'Products', href: '/products' },
//     { name: 'Brands', href: '/brands' },
//     { name: 'Categories', href: '/categories' },
//   ];

//   // حساب القيم بأمان لتجنب أخطاء TypeScript
//   const wishlistCount = wishlistData?.length ?? 0;
//   const cartCount = CartData?.numOfCartItems ?? 0;

//   return (
//     <>
//       <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
//         scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-white py-5'
//       }`}>
//         <div className="mx-auto w-11/12 md:w-[90%] flex items-center justify-between">
          
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 group">
//             <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-sm transition-transform group-hover:rotate-90">
//               <span className="text-xl font-bold">V</span>
//             </div>
//             <h1 className="font-bold text-xl tracking-tighter text-stone-900">VÈRA <span className="font-light text-stone-400 text-sm tracking-normal">MART</span></h1>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-10">
//             {navLinks.map((link) => (
//               <Link 
//                 key={link.href}
//                 href={link.href} 
//                 className={`text-[13px] uppercase tracking-widest transition-all duration-300 relative pb-1 group ${
//                   isActive(link.href) ? 'text-black font-bold' : 'text-stone-500 hover:text-black'
//                 }`}
//               >
//                 {link.name}
//                 <span className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
//               </Link>
//             ))}
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-3">
//             <DropdownMenu>
//               <DropdownMenuTrigger className="focus:outline-none p-2 hover:bg-stone-100 rounded-full transition-colors flex items-center gap-2">
//                 <User2Icon className="w-5 h-5 text-stone-700 stroke-[1.5px]" />
//                 {isAuthenticated && (
//                   <span className="hidden lg:block text-[10px] uppercase tracking-widest font-medium text-stone-500">
//                     {session?.user?.name?.split(' ')[0]}
//                   </span>
//                 )}
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-52 mt-2 rounded-none border-stone-100 shadow-xl p-2 bg-white">
//                 {isAuthenticated ? (
//                   <>
//                     <DropdownMenuLabel className="text-[10px] text-stone-400 font-normal uppercase tracking-widest pb-3">
//                       Welcome, {session?.user?.name}
//                     </DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem asChild>
//                       <Link href='/profile' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider flex items-center gap-2"><User className="w-3.5 h-3.5" /> Profile</Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={handleLogout} className="text-red-500 py-3 text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-pointer">
//                       <LogOut className="w-3.5 h-3.5" /> Logout
//                     </DropdownMenuItem>
//                   </>
//                 ) : (
//                   <>
//                     <DropdownMenuItem asChild>
//                       <Link href='/login' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider">Login</Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild>
//                       <Link href='/register' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider">Create Account</Link>
//                     </DropdownMenuItem>
//                   </>
//                 )}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Wishlist */}
//             <Link href={'/wishlist'} className="w-10 h-10 flex items-center justify-center bg-stone-50 hover:bg-stone-100 rounded-full transition-all relative">
//               <Heart className={`w-5 h-5 stroke-[1.5px] ${isAuthenticated && wishlistCount > 0 ? 'text-stone-900 fill-stone-900' : 'text-stone-700'}`} />
//               {isAuthenticated && wishlistCount > 0 && (
//                 <Badge className="h-4 min-w-4 rounded-full px-1 absolute -top-1 -right-1 bg-black text-white text-[8px] flex items-center justify-center border-2 border-white">
//                   {wishLoading ? <Loader2 className='w-2 h-2 animate-spin'/> : wishlistCount}
//                 </Badge>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link href={'/cart'} className="w-10 h-10 flex items-center justify-center bg-stone-50 hover:bg-stone-100 rounded-full transition-all relative">
//               <ShoppingCart className="w-5 h-5 text-stone-700 stroke-[1.5px]" />
//               {isAuthenticated && cartCount > 0 && (
//                 <Badge className="h-4 min-w-4 rounded-full px-1 absolute -top-1 -right-1 bg-black text-white text-[8px] flex items-center justify-center border-2 border-white">
//                   {cartLoading ? <Loader2 className='w-2 h-2 animate-spin'/> : cartCount}
//                 </Badge>
//               )}
//             </Link>

//             <button className="md:hidden p-2 hover:bg-stone-50 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <X className="w-6 h-6 text-stone-900" /> : <Menu className="w-6 h-6 text-stone-900" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {menuOpen && (
//           <div className="absolute top-full left-0 w-full bg-white border-b border-stone-100 flex flex-col p-6 gap-4 animate-in slide-in-from-top md:hidden">
//             {navLinks.map((link) => (
//               <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`text-sm uppercase tracking-widest py-2 ${isActive(link.href) ? 'font-bold text-black' : 'text-stone-500'}`}>{link.name}</Link>
//             ))}
//             {isAuthenticated ? (
//                <button onClick={handleLogout} className="text-sm uppercase tracking-widest py-2 text-red-500 font-bold text-left">Logout</button>
//             ) : (
//               <Link href="/login" className="text-sm uppercase tracking-widest py-2 text-black font-bold">Login / Register</Link>
//             )}
//           </div>
//         )}
//       </nav>
//       <div className={`transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}></div>
//     </>
//   );
// }


'use client'
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '@/components/context/WishlistContext'; 
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { User2Icon, ShoppingCart, Loader2, Menu, X, Heart, LogOut, User, PackageCheck } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react'; 
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 

export default function Navbar() {
  const { data: session, status } = useSession(); 
  const isAuthenticated = status === 'authenticated';

  const { CartData, isLoading: cartLoading, getCart } = useContext(CartContext);
  const { wishlistData, isLoading: wishLoading, getWishlist } = useContext(WishlistContext); 
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
      getWishlist();
    }
  }, [isAuthenticated, getCart, getWishlist]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    toast.success("Successfully logged out", {
      style: { borderRadius: '0px', background: '#1c1917', color: '#fff', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }
    });
    await signOut({ callbackUrl: '/' });
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/brands' },
    { name: 'Categories', href: '/categories' },
  ];

  const wishlistCount = wishlistData?.length ?? 0;
  const cartCount = CartData?.numOfCartItems ?? 0;

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-white py-5'
      }`}>
        <div className="mx-auto w-11/12 md:w-[90%] flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-sm transition-transform group-hover:rotate-90">
              <span className="text-xl font-bold">V</span>
            </div>
            <h1 className="font-bold text-xl tracking-tighter text-stone-900 uppercase">VÈRA <span className="font-light text-stone-400 text-sm tracking-normal">Mart</span></h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-[12px] uppercase tracking-widest transition-all duration-300 relative pb-1 group ${
                  isActive(link.href) ? 'text-black font-bold' : 'text-stone-500 hover:text-black'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}

            {/* All Orders Link for Authenticated Users */}
            {isAuthenticated && (
              <Link 
                href="/allorders" 
                className={`text-[12px] uppercase tracking-widest transition-all duration-300 relative pb-1 group flex items-center gap-1.5 ${
                  isActive('/allorders') ? 'text-black font-bold' : 'text-stone-500 hover:text-black'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                Orders
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ${isActive('/allorders') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none p-2 hover:bg-stone-100 rounded-full transition-colors flex items-center gap-2">
                <User2Icon className="w-5 h-5 text-stone-700 stroke-[1.5px]" />
                {isAuthenticated && (
                  <span className="hidden lg:block text-[10px] uppercase tracking-widest font-medium text-stone-500">
                    {session?.user?.name?.split(' ')[0]}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 mt-2 rounded-none border-stone-100 shadow-xl p-2 bg-white">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuLabel className="text-[10px] text-stone-400 font-normal uppercase tracking-widest pb-3">
                      Welcome, {session?.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href='/profile' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider flex items-center gap-2 font-medium">
                        <User className="w-3.5 h-3.5" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    {/* All Orders in Dropdown */}
                    <DropdownMenuItem asChild>
                      <Link href='/allorders' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider flex items-center gap-2 font-medium">
                        <PackageCheck className="w-3.5 h-3.5" /> All Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 py-3 text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold">
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href='/login' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/register' className="cursor-pointer py-3 text-[11px] uppercase tracking-wider">Create Account</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Link href={'/wishlist'} className="w-10 h-10 flex items-center justify-center bg-stone-50 hover:bg-stone-100 rounded-full transition-all relative">
              <Heart className={`w-5 h-5 stroke-[1.5px] ${isAuthenticated && wishlistCount > 0 ? 'text-stone-900 fill-stone-900' : 'text-stone-700'}`} />
              {isAuthenticated && wishlistCount > 0 && (
                <Badge className="h-4 min-w-4 rounded-full px-1 absolute -top-1 -right-1 bg-black text-white text-[8px] flex items-center justify-center border-2 border-white">
                  {wishLoading ? <Loader2 className='w-2 h-2 animate-spin'/> : wishlistCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link href={'/cart'} className="w-10 h-10 flex items-center justify-center bg-stone-50 hover:bg-stone-100 rounded-full transition-all relative">
              <ShoppingCart className="w-5 h-5 text-stone-700 stroke-[1.5px]" />
              {isAuthenticated && cartCount > 0 && (
                <Badge className="h-4 min-w-4 rounded-full px-1 absolute -top-1 -right-1 bg-black text-white text-[8px] flex items-center justify-center border-2 border-white">
                  {cartLoading ? <Loader2 className='w-2 h-2 animate-spin'/> : cartCount}
                </Badge>
              )}
            </Link>

            <button className="md:hidden p-2 hover:bg-stone-50 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6 text-stone-900" /> : <Menu className="w-6 h-6 text-stone-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-stone-100 flex flex-col p-6 gap-4 animate-in slide-in-from-top md:hidden shadow-xl">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`text-sm uppercase tracking-widest py-2 ${isActive(link.href) ? 'font-bold text-black' : 'text-stone-500'}`}>{link.name}</Link>
            ))}
            {/* All Orders for Mobile */}
            {isAuthenticated && (
              <Link href="/allorders" onClick={() => setMenuOpen(false)} className={`text-sm uppercase tracking-widest py-2 flex items-center gap-2 ${isActive('/allorders') ? 'font-bold text-black' : 'text-stone-500'}`}>
                <PackageCheck className="w-4 h-4" /> My Orders
              </Link>
            )}
            <div className="h-px bg-stone-100 my-2"></div>
            {isAuthenticated ? (
               <button onClick={handleLogout} className="text-sm uppercase tracking-widest py-2 text-red-500 font-bold text-left flex items-center gap-2">
                 <LogOut className="w-4 h-4" /> Logout
               </button>
            ) : (
              <Link href="/login" className="text-sm uppercase tracking-widest py-2 text-black font-bold">Login / Register</Link>
            )}
          </div>
        )}
      </nav>
      <div className={`transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}></div>
    </>
  );
}