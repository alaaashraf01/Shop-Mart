
// import './globals.css';
// import Navbar from '@/components/navbar/nav';
// import { Inter } from 'next/font/google';
// import Footer from './footer';
// import CartContextProvider from '@/components/context/CartContext';
// import { Toaster } from 'react-hot-toast';
// import WishlistContextProvider from '@/components/context/WishlistContext';
// // import WishlistContextProvider from '@/components/context/WishlistContext';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Shop Mart',
//   description: 'E-commerce App',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//        <CartContextProvider>
//        <WishlistContextProvider>
//          <Navbar />

//         <div className='container mx-auto py-5'>
//           {children}
//         </div>
//         <Toaster/>
//         <Footer/>
//         </WishlistContextProvider>
      
//        </CartContextProvider>
//       </body>
//     </html>
//   );
// }




import './globals.css';
import Navbar from'@/components/navbar/nav'
import { Inter } from 'next/font/google';
import Footer from './footer';
import CartContextProvider from '@/components/context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from '@/components/context/WishlistContext';
import AuthProvider from '@/providers/AuthProvider'; // ✅ الاستيراد الجديد

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shop Mart | Minimalist Elegance',
  description: 'Curated E-commerce Experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 1. NextAuth Provider هو الغلاف الأساسي */}
        <AuthProvider> 
          <CartContextProvider>
            <WishlistContextProvider>
              <Navbar />
              
              <main className='container mx-auto py-5 min-h-screen'>
                {children}
              </main>

              <Toaster position="bottom-right" />
              <Footer />
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}