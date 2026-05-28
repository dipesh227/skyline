'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '@/app/(admin)/admin/components/AdminLayout'
import toast from 'react-hot-toast'

export default function AddTeamMember() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', role: '', position: '', bio: '', linkedin: '', instagram: '', twitter: '', display_order: 0, is_active: true, image_url: '' })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage.from('team-images').upload(fileName, file)
    if (uploadError) toast.error('Upload failed')
    else {
      const { data: { publicUrl } } = supabase.storage.from('team-images').getPublicUrl(fileName)
      setFormData({ ...formData, image_url: publicUrl })
      toast.success('Image uploaded')
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('team_members').insert([formData])
    if (error) toast.error('Failed: ' + error.message)
    else { toast.success('Member added'); router.push('/admin/team') }
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Add Team Member</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
          <input type="text" placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Role (e.g., Founder & Brand Ambassador) *" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Position (e.g., Chief Mentor)" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full p-2 border rounded" />
          <textarea placeholder="Bio / Description" rows={5} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 border rounded"></textarea>

          <div><label className="block font-semibold mb-1">Profile Image</label><input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="mb-2" />{uploading && <p>Uploading...</p>}{formData.image_url && <img src={formData.image_url} className="w-24 h-24 rounded-full mt-2 object-cover" />}</div>

          <input type="text" placeholder="LinkedIn URL" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Instagram URL" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Twitter URL" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full p-2 border rounded" />
          <input type="number" placeholder="Display Order (lower = higher)" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})} className="w-full p-2 border rounded" />
          <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} /> Active</label>
          <div className="flex gap-4"><button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Member'}</button><button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button></div>
        </form>
      </div>
    </AdminLayout>
  )
}


