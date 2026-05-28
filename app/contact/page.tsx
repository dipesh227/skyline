'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('enquiries').insert([
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        course: null,
        message: formData.message || null,
      }
    ])
    if (error) {
      toast.error('Failed to send message')
    } else {
      toast.success('Message sent! We will get back to you.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }
    setLoading(false)
  }

  // Khatima coordinates (approx)
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.123456789!2d79.983405!3d28.9327586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0510da2a0ad0d%3A0x73e180e8ac5c7ec9!2sSkyline%20Institute%20of%20Management%20Hospitality%20%26%20Bartending!5e0!3m2!1sen!2sin!4v1748426780433!5m2!1sen!2sin"

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="text-lg mt-2">We are located in Khatima – visit us or reach out anytime</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column: Contact Info & Location */}
            <div>
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">📍 Our Location (Khatima)</h2>
                <p className="text-gray-700">Skyline Institute of Management, Hospitality & Bartending</p>
                <p className="text-gray-700">Main Road, Near Bus Stand, Khatima – 262308</p>
                <p className="text-gray-700">Uttarakhand, India</p>
                <div className="mt-4">
                  <a
                    href="https://www.google.com/maps/place/Khatima,+Uttarakhand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">📞 Contact Information</h2>
                <p><i className="fas fa-phone-alt text-secondary w-6"></i> <a href="tel:+916395427119" className="hover:text-primary">+91 63954 27119</a></p>
                <p className="mt-2"><i className="fab fa-whatsapp text-secondary w-6"></i> <a href="https://wa.me/916395427119" target="_blank">+91 63954 27119 (WhatsApp)</a></p>
                <p className="mt-2"><i className="fas fa-envelope text-secondary w-6"></i> <a href="mailto:info@skylineinstitute.com">info@skylineinstitute.com</a></p>
                <p className="mt-2"><i className="fas fa-clock text-secondary w-6"></i> Mon–Sat: 9:00 AM – 7:00 PM</p>
              </div>

              <div className="bg-white p-2 rounded-xl shadow-md overflow-hidden">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Institute Location Map – Khatima"
                ></iframe>
                <p className="text-xs text-gray-400 text-center mt-2">(Interactive map – Skyline Institute, Khatima)</p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-4">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-lg" required />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 border rounded-lg" />
                <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border rounded-lg" required />
                <textarea rows={5} placeholder="Your Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full p-3 border rounded-lg"></textarea>
                <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Sending...' : 'Send Message'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
