'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ]
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container-custom py-4 flex justify-between items-center flex-wrap gap-4">
        <Link href="/" className="text-2xl font-heading font-bold">
          SKYLINE<span className="text-primary">Institute</span>
          <p className="text-xs tracking-wider text-gray-500">MANAGEMENT | HOSPITALITY | BARTENDING</p>
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`font-semibold transition ${pathname === link.href ? 'text-secondary' : 'hover:text-secondary'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="hidden md:inline-block btn-primary open-popup-trigger">Apply Now</button>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`font-semibold ${pathname === link.href ? 'text-secondary' : ''}`}>
              {link.label}
            </Link>
          ))}
          <button className="btn-primary open-popup-trigger w-full text-center">Apply Now</button>
        </div>
      )}
    </header>
  )
}
