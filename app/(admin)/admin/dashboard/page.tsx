'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const router = useRouter()
  const [metrics, setMetrics] = useState({ total: 0, pendingReplies: 0, admissionsConfirmed: 0, feePaid: 0 })
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionStorage.getItem('admin_logged_in')) {
      router.push('/admin/login')
    }
    fetchData()
    const subscription = supabase
      .channel('enquiries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, () => fetchData())
      .subscribe()
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const { data: enquiries } = await supabase.from('enquiries').select('replied, admission_ok, fee_paid, created_at')
    if (!enquiries) return
    setMetrics({
      total: enquiries.length,
      pendingReplies: enquiries.filter(e => !e.replied).length,
      admissionsConfirmed: enquiries.filter(e => e.admission_ok).length,
      feePaid: enquiries.filter(e => e.fee_paid).length,
    })
    const grouped = enquiries.reduce((acc: any, e) => {
      const date = new Date(e.created_at).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})
    const chartArray = Object.entries(grouped).map(([date, count]) => ({ date, count })).slice(-7)
    setChartData(chartArray)
    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500"><h3 className="text-gray-500">Total Inquiries</h3><p className="text-3xl font-bold">{metrics.total}</p></div>
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500"><h3 className="text-gray-500">Pending Replies</h3><p className="text-3xl font-bold">{metrics.pendingReplies}</p></div>
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500"><h3 className="text-gray-500">Admissions Confirmed</h3><p className="text-3xl font-bold">{metrics.admissionsConfirmed}</p></div>
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500"><h3 className="text-gray-500">Fee Collected</h3><p className="text-3xl font-bold">{metrics.feePaid}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Enquiries Over Time (Last 7 days)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#1E3A8A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
