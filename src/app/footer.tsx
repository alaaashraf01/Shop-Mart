// import React from 'react';
// import { MapPin, Phone, Mail } from 'lucide-react';
// import Link from 'next/link';

// export default function Footer() {
//   return (
//     <footer className="bg-white border-t py-12 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
     
//         <div className="lg:col-span-1">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="bg-black text-white font-bold p-1 px-2 rounded">S</div>
//             <span className="text-xl font-bold tracking-tight">ShopMart</span>
//           </div>
//           <p className="text-gray-500 text-sm leading-relaxed mb-6">
//             Your one-stop destination for the latest technology, fashion, and lifestyle products. 
//             Quality guaranteed with fast shipping and excellent customer service.
//           </p>
//           <div className="space-y-3 text-sm text-gray-600">
//             <div className="flex items-start gap-3">
//               <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
//               <span>123 Shop Street, October City, DC 12345</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Phone className="w-4 h-4 flex-shrink-0" />
//               <span>(+20) 01093333333</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Mail className="w-4 h-4 flex-shrink-0" />
//               <span>support@shopmart.com</span>
//             </div>
//           </div>
//         </div>

    
//         <div>
//           <h3 className="font-bold text-sm mb-4 uppercase tracking-wider">Shop</h3>
//           <ul className="space-y-2 text-sm text-gray-500">
//             <li><Link href="/electronics" className="hover:text-black">Electronics</Link></li>
//             <li><Link href="/fashion" className="hover:text-black">Fashion</Link></li>
//             <li><Link href="/home-garden" className="hover:text-black">Home & Garden</Link></li>
//             <li><Link href="/sports" className="hover:text-black">Sports</Link></li>
//             <li><Link href="/deals" className="hover:text-black">Deals</Link></li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="font-bold text-sm mb-4 uppercase tracking-wider">Customer Service</h3>
//           <ul className="space-y-2 text-sm text-gray-500">
//             <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
//             <li><Link href="/help" className="hover:text-black">Help Center</Link></li>
//             <li><Link href="/track" className="hover:text-black">Track Your Order</Link></li>
//             <li><Link href="/returns" className="hover:text-black">Returns & Exchanges</Link></li>
//             <li><Link href="/size-guide" className="hover:text-black">Size Guide</Link></li>
//           </ul>
//         </div>

     
//         <div>
//           <h3 className="font-bold text-sm mb-4 uppercase tracking-wider">About</h3>
//           <ul className="space-y-2 text-sm text-gray-500">
//             <li><Link href="/about" className="hover:text-black">About shopmart</Link></li>
//             <li><Link href="/careers" className="hover:text-black">Careers</Link></li>
//             <li><Link href="/press" className="hover:text-black">Press</Link></li>
//             <li><Link href="/investors" className="hover:text-black">Investor Relations</Link></li>
//             <li><Link href="/sustainability" className="hover:text-black">Sustainability</Link></li>
//           </ul>
//         </div>

    
//         <div>
//           <h3 className="font-bold text-sm mb-4 uppercase tracking-wider">Policies</h3>
//           <ul className="space-y-2 text-sm text-gray-500">
//             <li><Link href="/privacy" className="hover:text-black">Privacy Policy</Link></li>
//             <li><Link href="/terms" className="hover:text-black">Terms of Service</Link></li>
//             <li><Link href="/cookies" className="hover:text-black">Cookie Policy</Link></li>
//             <li><Link href="/shipping-policy" className="hover:text-black">Shipping Policy</Link></li>
//             <li><Link href="/refund-policy" className="hover:text-black">Refund Policy</Link></li>
//           </ul>
//         </div>

//       </div>
//     </footer>
//   );
// }


import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-100 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Section - 4 Columns wide on large screens */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-sm">
                <span className="font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">Vèra Mart</span>
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
              Curating the finest in technology, lifestyle, and design. 
              Experience the art of living with our global selection of quality products.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-stone-50 rounded-full hover:bg-stone-100 transition-colors"><Instagram size={18} /></Link>
              <Link href="#" className="p-2 bg-stone-50 rounded-full hover:bg-stone-100 transition-colors"><Facebook size={18} /></Link>
              <Link href="#" className="p-2 bg-stone-50 rounded-full hover:bg-stone-100 transition-colors"><Twitter size={18} /></Link>
            </div>
          </div>

          {/* Quick Links - 2 Columns each */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-6 text-stone-900">Collections</h3>
            <ul className="space-y-4 text-sm text-stone-500 font-light">
              <li><Link href="/products" className="hover:text-black transition-colors">All Products</Link></li>
              <li><Link href="/electronics" className="hover:text-black transition-colors">Electronics</Link></li>
              <li><Link href="/fashion" className="hover:text-black transition-colors">Fashion</Link></li>
              <li><Link href="/deals" className="hover:text-black transition-colors">Featured Deals</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-6 text-stone-900">Support</h3>
            <ul className="space-y-4 text-sm text-stone-500 font-light">
              <li><Link href="/help" className="hover:text-black transition-colors">Help Center</Link></li>
              <li><Link href="/track" className="hover:text-black transition-colors">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-black transition-colors">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info - 4 Columns wide */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-6 text-stone-900">Get in Touch</h3>
            <div className="space-y-4 text-sm text-stone-500 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-stone-900" />
                <span>123 Design District, October City, Cairo</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-stone-900" />
                <span>+20 109 333 3333</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-stone-900" />
                <span>concierge@veramart.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest">
            © 2025 Vèra Mart. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-stone-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <Link href="/terms" className="hover:text-black">Terms</Link>
            <Link href="/cookies" className="hover:text-black">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}




