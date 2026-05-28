export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const authData = localStorage.getItem('admin_auth')
  if (!authData) return false
  try {
    const { loggedIn, timestamp, expiry } = JSON.parse(authData)
    if (!loggedIn) return false
    // Check if expired
    if (Date.now() - timestamp > expiry) {
      localStorage.removeItem('admin_auth')
      return false
    }
    return true
  } catch {
    return false
  }
}

export function logoutAdmin() {
  localStorage.removeItem('admin_auth')
  window.location.href = '/admin/login'
}
