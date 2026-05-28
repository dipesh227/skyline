'use client'
import Link from 'next/link'

export default function BartendingCourse() {
  const highlights = [
    { icon: '📚', title: 'Theory & Fundamentals', desc: 'Strong foundation in bartending basics, spirits knowledge, bar tools, and service standards.' },
    { icon: '🍹', title: 'Advanced Mixology Training', desc: 'Modern cocktail techniques, flavor balancing, infusion methods, and creative drink crafting.' },
    { icon: '🔥', title: 'Flair Bartending (4 Levels)', desc: 'Pouring Techniques → Juggling Skills → Working Flair → Advanced Flair' },
    { icon: '🌍', title: 'International Screening Preparation', desc: 'Guidance and training for global bartending opportunities and interviews.' },
    { icon: '🧠', title: 'Personal Development (1:1 Sessions)', desc: 'Individual mentoring to build confidence, personality, and professional attitude.' },
    { icon: '🗣️', title: 'Spoken English & Communication', desc: 'Focused training to improve fluency, customer interaction, and hospitality communication.' },
    { icon: '🍸', title: 'Bar Exposure & Live Experience', desc: 'Visits to Top 30 Bars + participation in real-time events for practical learning.' },
    { icon: '👔', title: 'Professional Kit & Uniform', desc: 'Complete bartending kit and uniform provided for a professional training experience.' },
    { icon: '🏫', title: 'Dedicated Training Space', desc: 'Fully equipped bar setup to practice in a real-world environment.' },
  ]
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-24 text-center">
        <div className="container-custom"><span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full">Professional Bartending Program</span><h1 className="text-5xl font-bold mt-4">Bartending Course</h1><p className="mt-2">Master the art of mixology, flair, and bar operations</p></div>
      </section>
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="bg-light p-6 rounded-xl shadow-sm hover:shadow transition">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-primary">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-16 text-center">
        <div className="container-custom"><h2 className="text-3xl">Enroll in Bartending Course Today</h2><p className="mt-2">Limited seats – apply now!</p><button className="btn-primary bg-secondary text-dark mt-6 hover:bg-white open-popup-trigger">Apply Now</button></div>
      </section>
    </>
  )
}
