'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (username === 'admin' && password === 'admin123') {
      // Store login with timestamp (expires in 24 hours)
      const loginData = {
        loggedIn: true,
        timestamp: Date.now(),
        expiry: 24 * 60 * 60 * 1000 // 24 hours
      }
      localStorage.setItem('admin_auth', JSON.stringify(loginData))
      toast.success('Login successful')
      // Force full page reload to ensure storage is read
      window.location.href = '/admin/dashboard'
    } else {
      toast.error('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-dark">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">Default: admin / admin123</p>
      </div>
    </div>
  )
}
