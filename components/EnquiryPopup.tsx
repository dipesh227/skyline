'use client'
import { usePopup } from '@/context/PopupContext'
import { supabase } from '@/lib/supabaseClient'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'
import { useState } from 'react'

type FormData = {
  name: string
  phone: string
  email: string
  course: string
  message: string
}

export default function EnquiryPopup() {
  const { isOpen, closePopup } = usePopup()
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setSubmitError(null)
    if (!data.name || !data.phone) {
      toast.error('Please fill in your name and phone number')
      return
    }

    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email?.trim() || null,
          course: data.course || null,
          message: data.message?.trim() || null,
        }
      ])

      if (error) {
        console.error('Supabase insert error:', error)
        toast.error('Failed to submit. Please try again or call us directly.')
        setSubmitError(error.message)
      } else {
        toast.success('Enquiry submitted! We will contact you soon.')
        reset()
        closePopup()
      }
    } catch (err: any) {
      console.error('Unexpected error:', err)
      toast.error('Something went wrong. Please try again.')
      setSubmitError(err.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closePopup}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={closePopup} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-primary mb-4">Quick Enquiry</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name', { required: true })} placeholder="Full Name *" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <input {...register('phone', { required: true })} placeholder="Mobile Number *" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <input {...register('email')} placeholder="Email Address (optional)" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <select {...register('course')} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select Course (optional)</option>
            <option>Bartending Course</option>
            <option>Flair Bartending</option>
            <option>Hospitality Training</option>
          </select>
          <textarea {...register('message')} rows={3} placeholder="Your Message (optional)" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          {submitError && <p className="text-red-500 text-sm">Error: {submitError}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}
