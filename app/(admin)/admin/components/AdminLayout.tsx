'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="relative">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary text-white p-3 flex items-center z-50">
        <button onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
        <h1 className="ml-4 text-lg font-bold">Skyline Admin</h1>
      </div>
      {/* Sidebar for desktop + mobile drawer */}
      <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-300 ease-in-out`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      {/* Main content with padding for mobile top bar */}
      <div className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </div>
    </div>
  )
}
