'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { LayoutDashboard, MessageSquare, UserPlus, DollarSign, Settings, LogOut, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out')
    router.push('/admin/login')
  }

  const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
    { href: '/admin/admissions', icon: UserPlus, label: 'Admissions' },
    { href: '/admin/fees', icon: DollarSign, label: 'Fee Collection' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-center p-5 border-b border-white/20">
        <h2 className="text-xl font-bold">Skyline Admin</h2>
        <button className="lg:hidden" onClick={closeSidebar}><X size={24} /></button>
      </div>
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeSidebar} className={`flex items-center gap-3 px-5 py-3 transition ${pathname === item.href ? 'bg-secondary text-dark' : 'hover:bg-white/10'}`}>
            <item.icon size={20} /><span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <button onClick={handleLogout} className="flex items-center gap-3 px-2 py-2 w-full hover:bg-white/10 rounded transition">
          <LogOut size={20} /><span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
