'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import toast from 'react-hot-toast'

export default function FeesPage() {
  const router = useRouter()
  const [students, setStudents] = useState<any[]>([])
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
    })
  }, [router])

  const fetchData = async () => {
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    if (data) setStudents(data)
  }
  useEffect(() => { fetchData() }, [])

  const toggleFeePaid = async (id: number, current: boolean) => {
    await supabase.from('enquiries').update({ fee_paid: !current }).eq('id', id)
    toast.success('Updated')
    fetchData()
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Fee Collection</h1>
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-primary text-white"><tr><th className="p-3">Name</th><th>Phone</th><th>Course</th><th>Fee Paid</th><th>Action</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.name}</td><td className="p-3">{s.phone}</td><td className="p-3">{s.course || '-'}</td>
                <td className="p-3">{s.fee_paid ? '✅ Yes' : '❌ No'}</td>
                <td className="p-3"><button onClick={() => toggleFeePaid(s.id, s.fee_paid)} className="bg-primary text-white px-3 py-1 rounded text-sm">Mark {s.fee_paid ? 'Unpaid' : 'Paid'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
