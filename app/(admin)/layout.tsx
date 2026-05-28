// Admin layout – no front-end header/footer
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-light">
      {children}
    </div>
  )
}
