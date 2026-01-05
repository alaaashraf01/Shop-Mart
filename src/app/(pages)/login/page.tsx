


'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

const LoginPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // NextAuth يتولى إرسال الطلب لـ next_public_api_url الذي حددناه في الإعدادات
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      toast.error('Invalid credentials. Please try again.', {
        style: {
          borderRadius: '0px',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }
      })
    } else {
      toast.success((t) => (
        <div className="flex flex-col items-center gap-1 py-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">
            Welcome to the VÈRA Family
          </p>
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em] font-light">
            Excellence in every detail
          </p>
        </div>
      ), {
        duration: 4500,
        position: 'top-center',
        style: {
          border: '1px solid #1c1917',
          padding: '16px 32px',
          borderRadius: '0px',
          background: '#fff',
        },
        iconTheme: {
          primary: '#1c1917',
          secondary: '#fff',
        },
      });

      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-[400px] w-full animate-in fade-in duration-1000">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-light tracking-[0.4em] uppercase text-stone-900">Identity</h1>
          <div className="h-px w-8 bg-stone-900 mx-auto"></div>
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.4em] font-medium">
            Access your curated collection
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-8">
            <div className="group relative">
              <label className="text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-1 block transition-colors group-focus-within:text-stone-900">
                Email Address
              </label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-all duration-500 bg-transparent text-[13px] font-light text-stone-900 tracking-wider placeholder:text-stone-200 uppercase"
                placeholder="EMAIL@EXAMPLE.COM"
              />
            </div>

            <div className="group relative">
              <label className="text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-1 block transition-colors group-focus-within:text-stone-900">
                Password
              </label>
              <input 
                name="password"
                type="password" 
                required
                className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-900 transition-all duration-500 bg-transparent text-[13px] font-light text-stone-900 tracking-widest placeholder:text-stone-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-900 text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all duration-500 flex justify-center items-center gap-3 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Sign In'}
          </button>
        </form>

        {/* Footer Section */}
        <div className="mt-20 flex items-center justify-center gap-6 border-t border-stone-50 pt-10">
          <Link href="/register" className="text-[9px] text-stone-400 uppercase tracking-[0.2em] hover:text-stone-900 transition-colors duration-300">
            New here? <span className="text-stone-900 font-bold ml-1">Join VÈRA</span>
          </Link>
          <div className="w-px h-3 bg-stone-100"></div>
          <Link href="/forgotPassword" className="text-[9px] text-stone-400 uppercase tracking-[0.2em] hover:text-stone-900 transition-colors duration-300">
            Lost Access? <span className="text-stone-900 font-bold ml-1">Reset Security</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default LoginPage