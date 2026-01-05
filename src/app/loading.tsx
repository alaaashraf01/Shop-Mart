import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Container for Logo and Loader */}
      <div className="flex flex-col items-center gap-8">
        
        {/* Branding - Simple & Bold */}
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-12 h-12 bg-black flex items-center justify-center rounded-xl mb-4 shadow-2xl">
            <span className="text-white text-2xl font-bold italic font-serif">V</span>
          </div>
          <h2 className="text-sm tracking-[0.6em] uppercase font-light text-stone-500">
            Vèra Studio
          </h2>
        </div>

        {/* Minimalist Bar Loader - Using Tailwind only */}
        <div className="w-48 h-px bg-stone-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-stone-900 w-1/3 animate-loading-slide"></div>
        </div>

      </div>

      {/* Tailwind Custom Animation (Inline) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-loading-slide {
          animation: loading-slide 1.5s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}} />
    </div>
  );
}