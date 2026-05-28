'use client'
import { motion } from 'framer-motion'

export default function About() {
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-24 text-center">
        <div className="container-custom"><h1 className="text-5xl font-bold">About Skyline Institute</h1><p className="mt-2">Excellence in Hospitality & Bartending Education Since 2015</p></div>
      </section>
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <motion.img initial="hidden" whileInView="visible" variants={fadeUp} src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600" alt="Campus" className="rounded-2xl" />
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
            <span className="text-secondary font-semibold">OUR STORY</span>
            <h2 className="text-3xl md:text-4xl text-primary mt-2">India's Premier Bartending & Hospitality Institute</h2>
            <p className="mt-4">Skyline Institute was founded to bridge the gap between classroom learning and real-world bar & hospitality demands. Thousands of students now work in top hotels, cruise lines, and international bars.</p>
            <p className="mt-2">Our state-of-the-art campus features a fully equipped training bar, mock hotel setup, and modern classrooms. We focus on 100% practical training, industry exposure, and personality development.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-light">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp}>
            <span className="text-secondary font-semibold">MISSION & VISION</span>
            <h2 className="text-3xl md:text-4xl text-primary mt-2">Shaping Future Industry Leaders</h2>
            <p className="mt-4"><strong>Vision:</strong> To be a globally recognized center of excellence in bartending and hospitality education.</p>
            <p className="mt-2"><strong>Mission:</strong> To provide world-class practical training, foster creativity, and nurture professional ethics in every student.</p>
          </motion.div>
          <motion.img initial="hidden" whileInView="visible" variants={fadeUp} src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" alt="Mission" className="rounded-2xl" />
        </div>
      </section>
      <section className="py-20">
        <div className="container-custom">
          <div className="section-title"><span>OUR ACHIEVEMENTS</span><h2>Why Students Trust Skyline</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow"><h3 className="text-4xl font-bold text-primary">10+</h3><p>Years of Excellence</p></div>
            <div className="bg-white p-6 rounded-2xl shadow"><h3 className="text-4xl font-bold text-primary">2000+</h3><p>Successful Graduates</p></div>
            <div className="bg-white p-6 rounded-2xl shadow"><h3 className="text-4xl font-bold text-primary">95%</h3><p>Placement Rate</p></div>
            <div className="bg-white p-6 rounded-2xl shadow"><h3 className="text-4xl font-bold text-primary">50+</h3><p>Industry Partners</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
