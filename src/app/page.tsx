

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MoveDown } from "lucide-react";

async function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-stone-50 hidden lg:block -z-10"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-stone-50 hidden lg:block -z-10"></div>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-6 text-center">
        <div className="max-w-[1200px] w-full z-10">
          
          {/* Top Label */}
          <div className="overflow-hidden mb-8">
            <span className="text-[10px] tracking-[0.8em] uppercase text-stone-400 block animate-in slide-in-from-bottom duration-1000">
              New Era of Curated Goods
            </span>
          </div>

          {/* Main Title - VÈRA Signature Style */}
          <div className="relative mb-12">
            <h1 className="text-8xl md:text-[12rem] font-serif italic leading-[0.75] tracking-tighter text-stone-900 animate-in fade-in zoom-in duration-1000">
              Vèra<span className="text-stone-200 not-italic">.</span>
            </h1>
            <p className="mt-8 text-[11px] md:text-sm font-light tracking-[0.5em] text-stone-500 uppercase">
              The Art of Living
            </p>
          </div>

          {/* Description */}
          <p className="max-w-md mx-auto text-stone-400 text-[10px] md:text-[11px] leading-relaxed uppercase tracking-[0.3em] mb-14 opacity-70">
            A sanctuary for those who appreciate the intersection of 
            meticulous craftsmanship and architectural design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link href="/products">
              <Button className="bg-stone-950 text-white hover:bg-black px-14 py-8 text-[10px] tracking-[0.4em] uppercase rounded-none transition-all duration-700">
                Explore Edit <ArrowRight className="ml-4 w-4 h-4" />
              </Button>
            </Link>

            <Link href="/categories" className="group">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-stone-900 border-b border-stone-100 pb-2 group-hover:border-stone-900 transition-all duration-500 cursor-pointer">
                View Collections
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-stone-200">
          <span className="text-[8px] tracking-[0.5em] uppercase [writing-mode:vertical-lr]">Scroll</span>
          <MoveDown className="w-3 h-3 animate-bounce stroke-[1px]" />
        </div>
      </section>

      {/* Side Label */}
      <div className="fixed left-10 top-1/2 -translate-y-1/2 -rotate-90 hidden 2xl:block z-50 opacity-20">
        <span className="text-[9px] tracking-[0.8em] uppercase text-stone-900 whitespace-nowrap">
          Vèra Studio Essentials — Edition 2025
        </span>
      </div>
    </main>
  );
}

export default Home;