'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
    { href: '/location', label: 'Location' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container-custom py-3 flex justify-between items-center flex-wrap gap-4">
        <Link href="/" className="flex items-center group">
          <div className="relative w-20 h-20 flex-shrink-0">  {/* Increased size */}
            {!logoError ? (
              <Image
                src="/images/logo/vertical-logo.png"
                alt="Skyline Institute Logo"
                fill
                className="object-contain"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                S
              </div>
            )}
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold transition ${pathname === link.href ? 'text-secondary' : 'hover:text-secondary'}`}
            >
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-semibold ${pathname === link.href ? 'text-secondary' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <button className="btn-primary open-popup-trigger w-full text-center">Apply Now</button>
        </div>
      )}
    </header>
  )
}

