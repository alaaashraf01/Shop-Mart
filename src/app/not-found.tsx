

'use client' 

import React from "react";
import Link from 'next/link';
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-6">
   
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-blue-50 rounded-full scale-150 blur-2xl opacity-50"></div>
        <AlertCircle size={100} className="text-stone-800 relative z-10 animate-pulse stroke-[1px]" />
      </div>

     
      <div className="text-center space-y-4">
        <h1 className="text-8xl font-black tracking-tighter text-stone-900">
          404
        </h1>
        <h2 className="text-xl font-bold text-stone-800 uppercase tracking-widest">
          Page Not Found
        </h2>
        <p className="text-stone-500 max-w-sm mx-auto text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

   
      <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-xs sm:max-w-none justify-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-all rounded-sm shadow-sm"
        >
          <Home size={14} />
          Go Back Home
        </Link>
        
        <Link
          href="/products"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-black border border-stone-200 text-xs uppercase tracking-widest font-bold hover:bg-stone-50 transition-all rounded-sm"
        >
          Continue Shopping
        </Link>
      </div>

 
      <div className="mt-16 pt-8 border-t border-stone-100 w-full max-w-lg text-center">
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em]">
          Need help? <Link href="/contact" className="text-black font-bold underline underline-offset-4">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}

