'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import toast from 'react-hot-toast'
import { isAdminAuthenticated } from '@/lib/adminAuth'

type Student = {
  id: number
  name: string
  phone: string
  course: string | null
  admission_ok: boolean
}

export default function AdmissionsPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
    fetchData()
  }, [router])

  const fetchData = async () => {
    const { data } = await supabase
      .from('enquiries')
      .select('id, name, phone, course, admission_ok')
      .order('created_at', { ascending: false })
    if (data) setStudents(data as Student[])
  }

  const toggleAdmission = async (id: number, current: boolean) => {
    const { error } = await supabase.from('enquiries').update({ admission_ok: !current }).eq('id', id)
    if (error) toast.error('Update failed')
    else { toast.success('Updated'); fetchData() }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Admissions Management</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-primary text-white">
              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Course</th><th className="p-3 text-left">Admission Confirmed</th><th className="p-3 text-left">Action</th></tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3">{s.course || '-'}</td>
                  <td className="p-3">{s.admission_ok ? '✅ Yes' : '❌ No'}</td>
                  <td className="p-3">
                    <button onClick={() => toggleAdmission(s.id, s.admission_ok)} className="bg-primary text-white px-3 py-1 rounded text-sm">
                      {s.admission_ok ? 'Cancel' : 'Confirm'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

