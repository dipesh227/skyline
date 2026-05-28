import type { Metadata } from 'next'
import { Open_Sans, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import EnquiryPopup from '@/components/EnquiryPopup'
import { PopupProvider } from '@/context/PopupContext'
import PopupTrigger from '@/components/PopupTrigger'
import { Toaster } from 'react-hot-toast'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const poppins = Poppins({ weight: ['400','500','600','700','800'], subsets: ['latin'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: {
    default: 'Skyline Institute of Management Hospitality & Bartending',
    template: '%s | Skyline Institute'
  },
  description: 'Professional bartending, flair bartending, and hospitality training in Rudrapur, Uttarakhand. 100% practical training, international placements.',
  keywords: 'bartending institute, hospitality training, flair bartending, mixology course, hotel management',
  authors: [{ name: 'Skyline Institute' }],
  openGraph: {
    title: 'Skyline Institute - Professional Bartending & Hospitality Training',
    description: 'Join India\'s leading institute for bartending, flair, and hospitality courses.',
    url: 'https://skylineiiahm.co.in',
    siteName: 'Skyline Institute',
    images: [
      {
        url: '/images/logo/logo.png',
        width: 512,
        height: 512,
        alt: 'Skyline Institute Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skyline Institute - Professional Bartending & Hospitality Training',
    description: 'Join India\'s leading institute for bartending, flair, and hospitality courses.',
    images: ['/images/logo/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '32x32' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${openSans.variable} ${poppins.variable}`}>
        <PopupProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
          <EnquiryPopup />
          <PopupTrigger />
          <Toaster position="top-center" />
        </PopupProvider>
      </body>
    </html>
  )
}
