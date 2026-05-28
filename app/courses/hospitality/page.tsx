'use client'
export default function HospitalityCourse() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-24 text-center">
        <div className="container-custom"><span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full">Customer Service Excellence</span><h1 className="text-5xl font-bold mt-4">Hospitality Training</h1><p className="mt-2">Master the art of guest relations, management, and service standards</p></div>
      </section>
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-3 gap-6">
          {[
            { icon: '🏨', title: 'Front Office Operations', desc: 'Check-in/check-out, reservations, and guest handling.' },
            { icon: '🍽️', title: 'Food & Beverage Service', desc: 'Restaurant etiquette, service styles, and menu knowledge.' },
            { icon: '🧹', title: 'Housekeeping Management', desc: 'Cleaning standards, inventory, and quality control.' },
            { icon: '🗣️', title: 'Communication Skills', desc: 'Professional English, phone etiquette, and conflict resolution.' },
            { icon: '📊', title: 'Hospitality Management', desc: 'Team leadership, event planning, and operational efficiency.' },
            { icon: '🌍', title: 'International Placement Prep', desc: 'Interview training and CV building for global jobs.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-light p-6 rounded-xl shadow-sm hover:shadow transition">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-primary">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-16 text-center">
        <div className="container-custom"><h2 className="text-3xl">Start Your Hospitality Career</h2><p>Get placed in top hotels & resorts</p><button className="btn-primary bg-secondary text-dark mt-6 hover:bg-white open-popup-trigger">Apply for Admission</button></div>
      </section>
    </>
  )
}
