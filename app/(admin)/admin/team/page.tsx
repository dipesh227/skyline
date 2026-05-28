'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import SortableTeamRow from './components/SortableTeamRow'

type TeamMember = {
  id: number
  name: string
  role: string
  display_order: number
  is_active: boolean
  image_url: string
}

export default function TeamListPage() {
  const router = useRouter()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')

  useEffect(() => {
    if (!isAdminAuthenticated()) router.push('/admin/login')
  }, [router])

  const fetchMembers = async () => {
    setLoading(true)
    let query = supabase.from('team_members').select('*').order('display_order', { ascending: true })
    const { data, error } = await query
    if (!error && data) setMembers(data)
    setLoading(false)
  }

  useEffect(() => { fetchMembers() }, [])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = members.findIndex(m => m.id === active.id)
      const newIndex = members.findIndex(m => m.id === over?.id)
      const reordered = arrayMove(members, oldIndex, newIndex)
      setMembers(reordered)
      // Update display_order in DB
      for (let i = 0; i < reordered.length; i++) {
        await supabase.from('team_members').update({ display_order: i }).eq('id', reordered[i].id)
      }
      toast.success('Order saved')
    }
  }

  const toggleStatus = async (id: number, current: boolean) => {
    await supabase.from('team_members').update({ is_active: !current }).eq('id', id)
    toast.success('Status updated')
    fetchMembers()
  }

  const deleteMember = async (id: number) => {
    if (confirm('Permanently delete this member?')) {
      await supabase.from('team_members').delete().eq('id', id)
      toast.success('Deleted')
      fetchMembers()
    }
  }

  const filteredMembers = members.filter(m => {
    if (filterActive === 'active' && !m.is_active) return false
    if (filterActive === 'inactive' && m.is_active) return false
    return m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <h1 className="text-3xl font-bold text-primary">Team Management</h1>
          <Link href="/admin/team/add" className="btn-primary">+ Add New Member</Link>
        </div>

        <div className="flex gap-4 mb-4 flex-wrap">
          <input type="text" placeholder="Search by name or role" value={search} onChange={e => setSearch(e.target.value)} className="p-2 border rounded w-64" />
          <select value={filterActive} onChange={e => setFilterActive(e.target.value as any)} className="p-2 border rounded">
            <option value="all">All</option><option value="active">Active only</option><option value="inactive">Inactive only</option>
          </select>
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-primary text-white">
                <tr><th className="p-3 text-left">Order</th><th className="p-3 text-left">Image</th><th>Name</th><th>Role</th><th>Status</th><th className="text-center">Actions</th></tr>
              </thead>
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={filteredMembers.map(m => m.id)} strategy={verticalListSortingStrategy}>
                  <tbody>
                    {filteredMembers.map(m => (
                      <SortableTeamRow key={m.id} member={m} onToggle={toggleStatus} onDelete={deleteMember} />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}




