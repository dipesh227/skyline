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
  title: 'Skyline Institute | Bartending & Hospitality Training',
  description: 'India\'s leading institute for bartending, flair, and hospitality courses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" /></head>
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
