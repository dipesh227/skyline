import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300 pt-12 pb-6">
      <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
        <div><h3 className="text-white text-xl mb-3">Skyline Institute</h3><p>Management | Hospitality | Bartending</p><p className="mt-2">📍 123 Hospitality Avenue, Near City Mall, India</p></div>
        <div><h4 className="text-white mb-3">Quick Links</h4><ul className="space-y-2"><li><Link href="/" className="hover:text-secondary">Home</Link></li><li><Link href="/about" className="hover:text-secondary">About</Link></li><li><Link href="/courses" className="hover:text-secondary">Courses</Link></li><li><Link href="/contact" className="hover:text-secondary">Contact</Link></li></ul></div>
        <div><h4 className="text-white mb-3">Contact Us</h4><p>📞 <a href="tel:+916395427119" className="hover:text-secondary">+91 63954 27119</a></p><p>📧 skyline@example.com</p><p>⏰ Mon-Sat: 9AM – 7PM</p></div>
      </div>
      <div className="container-custom text-center pt-6 mt-6 border-t border-gray-700 text-sm">&copy; {new Date().getFullYear()} Skyline Institute. All rights reserved.</div>
    </footer>
  )
}
