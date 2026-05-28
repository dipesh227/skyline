import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300 pt-12 pb-6">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Institute Name */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo/logo.png"
                alt="Skyline Institute Logo"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-white text-xl font-bold">Skyline Institute</h3>
          </div>
          <p className="text-sm">Management | Hospitality | Bartending</p>
          <p className="text-sm mt-2">📍 Khatima, Uttarakhand, India</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
            <li><Link href="/about" className="hover:text-secondary">About</Link></li>
            <li><Link href="/courses" className="hover:text-secondary">Courses</Link></li>
            <li><Link href="/gallery" className="hover:text-secondary">Gallery</Link></li>
            <li><Link href="/team" className="hover:text-secondary">Team</Link></li>
            <li><Link href="/location" className="hover:text-secondary">Location</Link></li>
            <li><Link href="/contact" className="hover:text-secondary">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white mb-3">Contact Us</h4>
          <p>📞 <a href="tel:+916395427119" className="hover:text-secondary">+91 63954 27119</a></p>
          <p>📞 <a href="tel:+917060121105" className="hover:text-secondary">+91 70601 21105</a></p>
          <p>📧 <a href="mailto:info@skylineinstitute.com" className="hover:text-secondary">info@skylineinstitute.com</a></p>
          <p>⏰ Mon–Sat: 9AM – 7PM</p>
        </div>

        {/* Social & Admin */}
        <div>
          <h4 className="text-white mb-3">Follow Us</h4>
          <div className="flex gap-4 mb-4">
            <a href="#" target="_blank" className="text-2xl hover:text-secondary"><i className="fab fa-facebook"></i></a>
            <a href="#" target="_blank" className="text-2xl hover:text-secondary"><i className="fab fa-instagram"></i></a>
            <a href="#" target="_blank" className="text-2xl hover:text-secondary"><i className="fab fa-youtube"></i></a>
          </div>
          <div>
            <Link href="/admin/login" className="text-sm bg-primary/20 px-3 py-1 rounded hover:bg-primary/40 transition inline-block">
              🔐 Admin Login
            </Link>
          </div>
        </div>
      </div>
      <div className="container-custom text-center pt-6 mt-6 border-t border-gray-700 text-sm">
        &copy; {new Date().getFullYear()} Skyline Institute of Management, Hospitality & Bartending. All rights reserved.
      </div>
    </footer>
  )
}
