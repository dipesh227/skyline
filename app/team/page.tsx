'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import TeamCard from '@/components/TeamCard'
import { motion } from 'framer-motion'

type TeamMember = {
  id: number
  name: string
  role: string
  position: string
  bio: string
  image: string
  linkedin: string
  instagram: string
  twitter: string
  display_order: number
  is_active: boolean
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
      if (!error && data) setMembers(data)
      setLoading(false)
    }
    fetchTeam()
  }, [])

  const founder = members.find(m => m.role.toLowerCase().includes('founder'))
  const otherMembers = members.filter(m => !m.role.toLowerCase().includes('founder'))

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold">Our Team</h1>
          <p className="text-lg mt-2 max-w-2xl mx-auto">
            Meet the dedicated professionals behind Skyline Institute – experts committed to shaping your career in hospitality and bartending.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          {!loading && founder && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">Meet Our Founder</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{founder.bio}</p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {!loading && otherMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
            {!loading && otherMembers.length === 0 && <p className="text-center col-span-full">No team members found.</p>}
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">Why Learn From Our Experts?</h2>
            <p className="text-gray-600 mt-2">Industry professionals with real-world experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow"><div className="text-4xl mb-3">🏆</div><h3 className="text-xl font-bold">Award-Winning Faculty</h3><p>Our team includes IFBA flair champions and national award winners.</p></div>
            <div className="text-center p-6 bg-white rounded-xl shadow"><div className="text-4xl mb-3">📚</div><h3 className="text-xl font-bold">100% Practical Training</h3><p>Learn hands-on from experts who work in the industry.</p></div>
            <div className="text-center p-6 bg-white rounded-xl shadow"><div className="text-4xl mb-3">🌍</div><h3 className="text-xl font-bold">Global Industry Network</h3><p>Connect with international opportunities through our faculty.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-dark text-white py-16 text-center">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl">Ready to Learn from the Best?</h2>
          <p className="mt-2 opacity-90">Join Skyline Institute and start your journey today</p>
          <button className="btn-primary bg-secondary text-dark mt-6 hover:bg-white open-popup-trigger">Apply Now</button>
        </div>
      </section>
    </>
  )
}
