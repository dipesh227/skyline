'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../components/AdminLayout'
import toast from 'react-hot-toast'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export default function SettingsPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    // Store in localStorage (demo mode - in production use proper auth)
    localStorage.setItem('admin_password', password)
    toast.success('Password updated (demo mode)')
    setPassword('')
    setConfirm('')
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Settings</h1>
        <div className="bg-white p-6 rounded-xl shadow max-w-md">
          <h2 className="text-xl font-semibold mb-4">Change Admin Password (Demo)</h2>
          <form onSubmit={handleChange} className="space-y-4">
            <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full p-2 border rounded" required />
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Updating...' : 'Update Password'}</button>
          </form>
          <p className="text-xs text-gray-400 mt-4">Note: This is a demo. In production, integrate with Supabase Auth.</p>
        </div>
      </div>
    </AdminLayout>
  )
}

