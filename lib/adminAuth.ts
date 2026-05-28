export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('admin_auth') === 'true'
}

export function logoutAdmin() {
  localStorage.removeItem('admin_auth')
  window.location.href = '/admin/login'
}
