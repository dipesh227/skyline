'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark to-primary text-white py-20 md:py-28">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm">#1 Bartending Institute</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4">Build Your Career in <span className="text-secondary">Bartending & Hospitality</span></h1>
            <p className="text-lg mt-4 opacity-90">Learn from award-winning flair champions with live practical training, modern mixology, and international job assistance.</p>
            <div className="flex gap-4 mt-6">
              <button className="btn-primary open-popup-trigger">Enroll Now</button>
              <Link href="/courses" className="btn-secondary">Explore Courses</Link>
            </div>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format" alt="Bartending" className="rounded-3xl shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-light">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '5x', label: 'IFBA Flair Champion' }, { value: '30+', label: 'Bar Exposure Visits' }, { value: '100%', label: 'Practical Training' }, { value: 'Top 10', label: 'National Finalist' }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&auto=format" alt="Institute" className="rounded-2xl shadow-xl" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <span className="text-secondary font-semibold">ABOUT US</span>
            <h2 className="text-3xl md:text-4xl text-primary mt-2">India's Leading Hospitality & Bartending School</h2>
            <p className="mt-4 text-gray-600">Skyline Institute provides professional bartending, flair bartending, and hospitality training with international preparation and 100% practical exposure.</p>
            <Link href="/about" className="btn-secondary mt-6 inline-block">Read More</Link>
          </motion.div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-20 bg-light">
        <div className="container-custom">
          <div className="section-title"><span>OUR PROGRAMS</span><h2>Professional Courses</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Bartending Course', desc: 'Complete bartending fundamentals with practical training.', img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400', link: '/courses/bartending' },
              { title: 'Flair Bartending', desc: 'Professional bottle tricks and advanced flair skills.', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400', link: '/courses/flair' },
              { title: 'Hospitality Training', desc: 'Customer service, communication, and management.', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400', link: '/courses/hospitality' },
            ].map((course, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={course.img} alt={course.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                  <p className="mt-2 text-gray-600">{course.desc}</p>
                  <Link href={course.link} className="text-secondary font-semibold mt-4 inline-block">Learn More →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bartending Highlights Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="section-title"><span>WHAT YOU'LL LEARN</span><h2>Bartending Course Highlights</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Theory & Fundamentals', desc: 'Strong foundation in bartending basics, spirits, bar tools, and service standards.' },
              { icon: '🍹', title: 'Advanced Mixology Training', desc: 'Modern cocktail techniques, flavor balancing, infusion methods.' },
              { icon: '🔥', title: 'Flair Bartending (4 Levels)', desc: 'Pouring → Juggling → Working Flair → Advanced Flair' },
              { icon: '🌍', title: 'International Screening', desc: 'Guidance for global bartending opportunities and interviews.' },
              { icon: '🧠', title: 'Personal Development', desc: '1:1 mentoring for confidence and professionalism.' },
              { icon: '🗣️', title: 'Spoken English', desc: 'Focused training for fluency and customer interaction.' },
              { icon: '🍸', title: 'Bar Exposure & Live Experience', desc: 'Visits to Top 30 Bars + real-time events.' },
              { icon: '👔', title: 'Professional Kit & Uniform', desc: 'Complete bartending kit and uniform provided.' },
              { icon: '🏫', title: 'Dedicated Training Space', desc: 'Fully equipped bar setup for real-world practice.' },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-light p-6 rounded-xl shadow-sm hover:shadow transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-light">
        <div className="container-custom">
          <div className="section-title"><span>WHY CHOOSE SKYLINE</span><h2>Industry-Ready Training</h2></div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'fas fa-trophy', title: 'Award-Winning Faculty', desc: 'Learn from IFBA flair champions.' },
              { icon: 'fas fa-chalkboard-user', title: '100% Practical', desc: 'No theory-only classes.' },
              { icon: 'fas fa-globe', title: 'International Placements', desc: 'Global job assistance.' },
              { icon: 'fas fa-calendar-alt', title: 'Flexible Batches', desc: 'Weekend & weekday options.' },
            ].map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-xl text-center shadow">
                <i className={`${feat.icon} text-4xl text-secondary mb-4`}></i>
                <h4 className="text-xl font-bold">{feat.title}</h4>
                <p className="text-gray-600">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <div className="section-title"><span>STUDENT SUCCESS</span><h2>What Our Students Say</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: 'Skyline transformed my career! The flair training got me a job in a 5-star hotel.', name: 'Rohan Mehta' },
              { text: 'Best mixology sessions – now I run my own cocktail bar.', name: 'Priya Sharma' },
              { text: 'Excellent support for international placements. Highly recommended!', name: 'Aditya Kapoor' },
            ].map((test, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow text-center">
                <i className="fas fa-quote-left text-3xl text-secondary mb-4"></i>
                <p className="italic text-gray-700">{test.text}</p>
                <h4 className="font-bold text-primary mt-4">{test.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-light">
        <div className="container-custom">
          <div className="section-title"><span>OUR CAMPUS</span><h2>Gallery</h2></div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400',
              'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400',
            ].map((src, i) => (
              <img key={i} src={src} alt="gallery" className="rounded-xl h-64 w-full object-cover hover:scale-105 transition" />
            ))}
          </div>
          <div className="text-center mt-8"><Link href="/gallery" className="btn-secondary">View Full Gallery →</Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-dark text-white py-20 text-center">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mt-2 opacity-90">Limited seats available for upcoming batches. Apply now!</p>
          <button className="btn-primary bg-secondary text-dark mt-6 hover:bg-white open-popup-trigger">Apply for Admission</button>
        </div>
      </section>
    </>
  )
}
