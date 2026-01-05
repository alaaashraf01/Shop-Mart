


'use client'

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2, Check, ChevronLeft } from 'lucide-react'

export default function ForgotPassword() {
  const router = useRouter()
  const [step, setStep] = useState(1) 
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [passwordStats, setPasswordStats] = useState({
    minChar: false, upper: false, number: false, lower: false,
  })

  const checkPassword = (pass: string) => {
    setPasswordStats({
      minChar: pass.length >= 6 && pass.length <= 11,
      upper: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      lower: /[a-z]/.test(pass),
    })
  }

  // --- 1. Formik for Email Step ---
  const emailFormik = useFormik({
    initialValues: { email: '' },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        // ✅ تحديث الرابط هنا
        const { data } = await axios.post(`${process.env.next_public_api_url}/auth/forgotPasswords`, values)
        if (data.statusMsg === "success") {
          toast.success("Code sent to your email")
          setUserEmail(values.email)
          setStep(2)
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Email not found")
      } finally { setIsLoading(false) }
    }
  })

  // --- 2. Formik for Verify Code Step ---
  const codeFormik = useFormik({
    initialValues: { resetCode: '' },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        // ✅ تحديث الرابط هنا
        const { data } = await axios.post(`${process.env.next_public_api_url}/auth/verifyResetCode`, values)
        if (data.status === "Success") {
          toast.success("Code verified")
          setStep(3)
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Invalid code")
      } finally { setIsLoading(false) }
    }
  })

  // --- 3. Formik for New Password Step ---
  const passwordFormik = useFormik({
    initialValues: { newPassword: '' },
    onSubmit: async (values) => {
      const allMet = Object.values(passwordStats).every(Boolean)
      if (!allMet) {
        toast.error('Security protocols not met')
        return
      }
      setIsLoading(true)
      try {
        // ✅ تحديث الرابط هنا (لاحظي استخدام axios.put)
        const { data } = await axios.put(`${process.env.next_public_api_url}/auth/resetPassword`, {
          email: userEmail,
          newPassword: values.newPassword
        })
        if (data.token) {
          toast.success("Password updated successfully")
          router.push('/login')
        }
      } catch (err: any) {
        toast.error("Failed to reset password")
      } finally { setIsLoading(false) }
    }
  })

  useEffect(() => {
    if (step === 3) checkPassword(passwordFormik.values.newPassword)
  }, [passwordFormik.values.newPassword, step])

  const Requirement = ({ reached, text }: { reached: boolean; text: string }) => (
    <div className={`flex items-center gap-3 transition-all duration-500 ${reached ? 'text-stone-900' : 'text-stone-300'}`}>
      <div className={`w-1 h-1 rounded-full ${reached ? 'bg-stone-900' : 'bg-stone-200'}`} />
      <span className={`text-[9px] uppercase tracking-[0.2em] ${reached ? 'font-bold' : 'font-light'}`}>{text}</span>
    </div>
  )

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-8">
      <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Step Indicator */}
        <div className="flex gap-1 mb-20 justify-center">
            {[1, 2, 3].map((s) => (
                <div key={s} className={`h-0.5 transition-all duration-700 ${step >= s ? 'w-8 bg-stone-900' : 'w-4 bg-stone-100'}`} />
            ))}
        </div>

        {/* Content Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extralight tracking-tighter uppercase text-stone-900 mb-6 italic">
            {step === 1 && "Reset"}
            {step === 2 && "Verify"}
            {step === 3 && "Secure"}
          </h2>
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.4em] leading-relaxed">
            {step === 1 && "Identity Retrieval Process"}
            {step === 2 && "Verification Code Sent"}
            {step === 3 && "Establish New Credentials"}
          </p>
        </div>

        {/* Dynamic Forms */}
        <div className="min-h-[250px]">
          {step === 1 && (
            <form onSubmit={emailFormik.handleSubmit} className="space-y-12">
              <input 
                className="vera-input" placeholder="EMAIL ADDRESS" 
                {...emailFormik.getFieldProps('email')} 
              />
              <button type="submit" disabled={isLoading} className="vera-btn">
                {isLoading ? <Loader2 className="animate-spin" size={16}/> : 'Identify Account'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={codeFormik.handleSubmit} className="space-y-12">
              <input 
                className="vera-input text-center" placeholder="6-DIGIT CODE" 
                {...codeFormik.getFieldProps('resetCode')} 
              />
              <button type="submit" disabled={isLoading} className="vera-btn">
                {isLoading ? <Loader2 className="animate-spin" size={16}/> : 'Validate Identity'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-10">
              <input 
                type="password" className="vera-input" placeholder="NEW PASSWORD" 
                {...passwordFormik.getFieldProps('newPassword')} 
              />
              <div className="bg-stone-50/50 p-6 border border-stone-100 grid grid-cols-2 gap-y-4">
                <Requirement reached={passwordStats.minChar} text="6-11 Chars" />
                <Requirement reached={passwordStats.upper} text="Uppercase" />
                <Requirement reached={passwordStats.lower} text="Lowercase" />
                <Requirement reached={passwordStats.number} text="Digits" />
              </div>
              <button type="submit" disabled={isLoading} className="vera-btn">
                {isLoading ? <Loader2 className="animate-spin" size={16}/> : 'Renew Security'}
              </button>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center border-t border-stone-50 pt-8">
            <button onClick={() => step > 1 ? setStep(step - 1) : router.push('/login')} className="text-[10px] text-stone-300 uppercase tracking-[0.3em] hover:text-black transition-colors flex items-center justify-center gap-2 mx-auto">
                <ChevronLeft size={12} /> {step === 1 ? 'Cancel Request' : 'Previous Stage'}
            </button>
        </div>

      </div>

      <style jsx>{`
        .vera-input {
          width: 100%;
          border-bottom: 1px solid #f5f5f4;
          padding: 1rem 0;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          outline: none;
          transition: all 0.4s ease;
          background: transparent;
        }
        .vera-input:focus {
          border-color: #1c1917;
        }
        .vera-btn {
          width: 100%;
          background: #1c1917;
          color: white;
          padding: 1.25rem 0;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .vera-btn:hover { background: black; }
        .vera-btn:disabled { opacity: 0.5; }
      `}</style>
    </section>
  )
}