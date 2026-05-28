'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import toast from 'react-hot-toast'

type Enquiry = {
  id: number; name: string; phone: string; email: string | null; course: string | null;
  message: string | null; created_at: string; replied: boolean; admission_ok: boolean; fee_paid: boolean;
}

export default function InquiriesPage() {
  const router = useRouter()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
    })
  }, [router])

  const fetchEnquiries = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    if (!error && data) setEnquiries(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchEnquiries()
    const subscription = supabase
      .channel('enquiries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, () => fetchEnquiries())
      .subscribe()
    return () => subscription.unsubscribe()
  }, [])

  const updateStatus = async (id: number, field: string, value: boolean) => {
    const { error } = await supabase.from('enquiries').update({ [field]: value }).eq('id', id)
    if (error) toast.error('Update failed')
    else { toast.success('Updated'); fetchEnquiries() }
  }

  const contactActions = (phone: string, email: string | null) => (
    <div className="flex gap-2">
      <a href={`tel:${phone}`} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Call</a>
      <a href={`https://wa.me/${phone}`} target="_blank" className="bg-green-500 text-white px-2 py-1 rounded text-xs">WhatsApp</a>
      {email && <a href={`mailto:${email}`} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Email</a>}
    </div>
  )

  const filtered = enquiries.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search))
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Inquiries Management</h1>
        <div className="mb-4 flex justify-between">
          <input type="text" placeholder="Search by name or phone" value={search} onChange={e => setSearch(e.target.value)} className="p-2 border rounded w-64" />
        </div>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead className="bg-primary text-white"><tr><th className="p-3">Name</th><th>Phone</th><th>Email</th><th>Course</th><th>Message</th><th>Actions</th><th>Replied</th><th>Admission</th><th>Fee Paid</th></td></thead>
                <tbody>
                  {paginated.map((enq) => (
                    <tr key={enq.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{enq.name}</td><td className="p-3">{enq.phone}</td><td className="p-3">{enq.email || '-'}</td><td className="p-3">{enq.course || '-'}</td><td className="p-3 max-w-xs truncate">{enq.message || '-'}</td>
                      <td className="p-3">{contactActions(enq.phone, enq.email)}</td>
                      <td className="p-3"><input type="checkbox" checked={enq.replied} onChange={(e) => updateStatus(enq.id, 'replied', e.target.checked)} /></td>
                      <td className="p-3"><input type="checkbox" checked={enq.admission_ok} onChange={(e) => updateStatus(enq.id, 'admission_ok', e.target.checked)} /></td>
                      <td className="p-3"><input type="checkbox" checked={enq.fee_paid} onChange={(e) => updateStatus(enq.id, 'fee_paid', e.target.checked)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p-1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p+1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
