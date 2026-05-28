'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../../../components/AdminLayout'
import toast from 'react-hot-toast'

export default function EditTeamMember() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [formData, setFormData] = useState({
    name: '', role: '', position: '', bio: '', image: '', linkedin: '', instagram: '', twitter: '', display_order: 0, is_active: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchMember = async () => {
      const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single()
      if (error) toast.error('Member not found')
      else setFormData(data)
      setLoading(false)
    }
    if (id) fetchMember()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('team_members').update(formData).eq('id', id)
    if (error) toast.error('Update failed')
    else { toast.success('Updated'); router.push('/admin/team') }
    setSaving(false)
  }

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Edit Team Member</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
          <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Position" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full p-2 border rounded" />
          <textarea placeholder="Bio" rows={4} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 border rounded"></textarea>
          <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-2 border rounded" />
          <input type="text" placeholder="LinkedIn URL" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Instagram URL" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Twitter URL" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full p-2 border rounded" />
          <input type="number" placeholder="Display Order" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})} className="w-full p-2 border rounded" />
          <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} /> Active</label>
          <div className="flex gap-4"><button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Changes'}</button><button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button></div>
        </form>
      </div>
    </AdminLayout>
  )
}