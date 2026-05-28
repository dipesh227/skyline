import Link from 'next/link'

export default function LocationPage() {
  // Khatima specific embed URL (use real Google Maps embed code if available)
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.123456789!2d79.983405!3d28.9327586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0510da2a0ad0d%3A0x73e180e8ac5c7ec9!2sSkyline%20Institute%20of%20Management%20Hospitality%20%26%20Bartending!5e0!3m2!1sen!2sin!4v1748426780433!5m2!1sen!2sin"

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold">Our Location – Khatima</h1>
          <p className="text-lg mt-2">Come visit our state‑of‑the‑art campus in the heart of Khatima</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">📍 Skyline Institute, Khatima</h2>
              <p className="text-gray-700 mb-6">
                Main Road, Near Bus Stand,<br />
                Khatima – 262308, Uttarakhand, India
              </p>
              <div className="space-y-4">
                <div><i className="fas fa-train text-secondary w-6"></i> Nearest Railway Station: <strong>Khatima Railway Station</strong> (approx. 2 km)</div>
                <div><i className="fas fa-bus text-secondary w-6"></i> Bus Stop: <strong>Khatima Bus Stand</strong> (next to campus)</div>
                <div><i className="fas fa-car text-secondary w-6"></i> Parking: <strong>Free on‑campus parking available</strong></div>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-block">Contact Us →</Link>
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-md overflow-hidden">
              <iframe
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Skyline Institute Khatima Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-16 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-primary mb-4">Need Directions?</h2>
          <p className="mb-6">Get route from your location to our campus using Google Maps.</p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Khatima,+Uttarakhand"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Get Directions
          </a>
        </div>
      </section>
    </>
  )
}
