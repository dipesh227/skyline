'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const router = useRouter()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
    })
  }, [router])

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirm) { toast.error('Passwords do not match'); return }
    setLoading(true)
    // First verify current password by attempting to sign in (optional, but good)
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: (await supabase.auth.getUser()).data.user?.email ?? '',
      password: oldPassword
    })
    if (signError) {
      toast.error('Current password is incorrect')
    } else {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) toast.error(error.message)
      else {
        toast.success('Password changed! Please login again.')
        await supabase.auth.signOut()
        router.push('/admin/login')
      }
    }
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Settings</h1>
        <div className="bg-white p-6 rounded-xl shadow max-w-md">
          <h2 className="text-xl font-semibold mb-4">Change Admin Password</h2>
          <form onSubmit={handleChange} className="space-y-4">
            <input type="password" placeholder="Current Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Confirm New Password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full p-2 border rounded" required />
            <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Updating...' : 'Update Password'}</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
