'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export default function AdminDashboard() {
  const router = useRouter()
  const [metrics, setMetrics] = useState({ total: 0, pendingReplies: 0, admissionsConfirmed: 0, feePaid: 0 })
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
      return
    }
    const fetchData = async () => {
      const { data } = await supabase.from('enquiries').select('replied, admission_ok, fee_paid, created_at')
      if (!data) return
      const enquiries = data as any[]
      setMetrics({
        total: enquiries.length,
        pendingReplies: enquiries.filter((e: any) => !e.replied).length,
        admissionsConfirmed: enquiries.filter((e: any) => e.admission_ok).length,
        feePaid: enquiries.filter((e: any) => e.fee_paid).length,
      })
      const grouped: Record<string, number> = {}
      enquiries.forEach((e: any) => {
        const date = new Date(e.created_at).toLocaleDateString()
        grouped[date] = (grouped[date] || 0) + 1
      })
      setChartData(Object.entries(grouped).map(([date, count]) => ({ date, count })).slice(-7))
      setLoading(false)
    }
    fetchData()
    const subscription = supabase
      .channel('enquiries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, fetchData)
      .subscribe()
    return () => subscription.unsubscribe()
  }, [router])

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500"><h3>Total Inquiries</h3><p className="text-3xl font-bold">{metrics.total}</p></div>
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500"><h3>Pending Replies</h3><p className="text-3xl font-bold">{metrics.pendingReplies}</p></div>
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500"><h3>Admissions</h3><p className="text-3xl font-bold">{metrics.admissionsConfirmed}</p></div>
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500"><h3>Fee Paid</h3><p className="text-3xl font-bold">{metrics.feePaid}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Enquiries Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#1E3A8A" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
