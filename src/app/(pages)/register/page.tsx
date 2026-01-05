

'use client'

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Loader2, Eye, EyeOff, Check } from 'lucide-react'

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [passwordStats, setPasswordStats] = useState({
    minChar: false,
    upper: false,
    number: false,
    lower: false,
  })

  const checkPassword = (pass: string) => {
    setPasswordStats({
      minChar: pass.length >= 6 && pass.length <= 11,
      upper: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      lower: /[a-z]/.test(pass),
    })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validate: (values) => {
      const errors: any = {}
      if (!values.name) errors.name = 'Required'
      if (!values.email) errors.email = 'Required'
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email'
      if (!values.phone) errors.phone = 'Required'
      else if (!/^01[0125][0-9]{8}$/.test(values.phone)) errors.phone = 'Invalid phone'
      if (!values.password) errors.password = 'Required'
      if (values.password !== values.rePassword) errors.rePassword = 'Mismatch'
      return errors
    },
    onSubmit: async (values) => {
      const allMet = Object.values(passwordStats).every(Boolean)
      if (!allMet) {
        toast.error('Security protocols not met')
        return
      }
      setIsLoading(true)
      try {
        // ✅ تحديث الرابط لاستخدام متغير البيئة
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, values)
        
        if (data.message === 'success') {
          toast.success('Welcome to VÈRA')
          router.push('/login')
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Registration failed')
      } finally {
        setIsLoading(false)
      }
    },
  })

  useEffect(() => {
    checkPassword(formik.values.password)
  }, [formik.values.password])

  const Requirement = ({ reached, text }: { reached: boolean; text: string }) => (
    <div className={`flex items-center gap-2 transition-all duration-300 ${reached ? 'text-stone-900' : 'text-stone-300'}`}>
      {reached ? <Check size={12} className="text-stone-900" /> : <div className="w-3 h-3 border border-stone-200 rounded-full" />}
      <span className={`text-[10px] uppercase tracking-widest ${reached ? 'font-medium' : 'font-light'}`}>{text}</span>
    </div>
  )

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[450px]">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-light tracking-[0.4em] uppercase text-stone-900 mb-3">VÈRA</h1>
          <div className="h-px w-12 bg-stone-900 mx-auto mb-8"></div>
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em]">Identity & Excellence</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-10">
          
          <div className="space-y-8">
            <div className="relative">
                <input className="vera-minimal-input" placeholder="FULL NAME" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name && <span className="error-text">{formik.errors.name as string}</span>}
            </div>

            <div className="relative">
                <input className="vera-minimal-input" placeholder="EMAIL ADDRESS" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && <span className="error-text">{formik.errors.email as string}</span>}
            </div>

            <div className="relative">
                <input className="vera-minimal-input" placeholder="MOBILE NUMBER" {...formik.getFieldProps('phone')} />
                {formik.touched.phone && formik.errors.phone && <span className="error-text">{formik.errors.phone as string}</span>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="vera-minimal-input"
                placeholder="PASSWORD"
                {...formik.getFieldProps('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-stone-400 hover:text-stone-900 transition-colors"
              >
                {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>

            {/* Password Protocol Grid */}
            <div className="bg-stone-50/50 p-6 rounded-sm border border-stone-100 grid grid-cols-2 gap-y-4 gap-x-2">
              <Requirement reached={passwordStats.minChar} text="6-11 Characters" />
              <Requirement reached={passwordStats.upper} text="Uppercase" />
              <Requirement reached={passwordStats.lower} text="Lowercase" />
              <Requirement reached={passwordStats.number} text="Digits" />
            </div>

            <div className="relative">
                <input
                type="password"
                className="vera-minimal-input"
                placeholder="CONFIRM PASSWORD"
                {...formik.getFieldProps('rePassword')}
                />
                {formik.touched.rePassword && formik.errors.rePassword && <span className="error-text">{formik.errors.rePassword as string}</span>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-900 text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/login" className="text-[10px] text-stone-400 uppercase tracking-[0.2em] hover:text-stone-900 transition-colors">
            Already a member? <span className="border-b border-stone-900 text-stone-900 pb-1 ml-1">Sign In</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .vera-minimal-input {
          width: 100%;
          border-bottom: 1px solid #e7e5e4;
          padding: 0.75rem 0;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          outline: none;
          transition: border-color 0.4s ease;
          background: transparent;
        }
        .vera-minimal-input:focus {
          border-color: #1c1917;
        }
        .error-text {
            position: absolute;
            right: 0;
            top: -12px;
            font-size: 9px;
            color: #a8a29e;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
      `}</style>
    </section>
  )
}