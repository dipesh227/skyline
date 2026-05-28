'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import toast from 'react-hot-toast'

export default function AdmissionsPage() {
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

  const toggleAdmission = async (id: number, current: boolean) => {
    await supabase.from('enquiries').update({ admission_ok: !current }).eq('id', id)
    toast.success('Updated')
    fetchData()
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Admissions Management</h1>
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-primary text-white"><tr><th className="p-3">Name</th><th>Phone</th><th>Course</th><th>Admission Confirmed</th><th>Action</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.name}</td><td className="p-3">{s.phone}</td><td className="p-3">{s.course || '-'}</td>
                <td className="p-3">{s.admission_ok ? '✅ Yes' : '❌ No'}</td>
                <td className="p-3"><button onClick={() => toggleAdmission(s.id, s.admission_ok)} className="bg-primary text-white px-3 py-1 rounded text-sm">{s.admission_ok ? 'Cancel' : 'Confirm'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
