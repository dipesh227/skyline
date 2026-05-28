'use client'
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

export default function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
    >
      <div className="relative h-72 w-full overflow-hidden bg-gray-200">
        {member.image ? (
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">👤</span>
          </div>
        )}
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-primary">{member.name}</h3>
        <p className="text-secondary font-semibold text-sm mt-1">{member.role}</p>
        <p className="text-gray-500 text-xs mt-1">{member.position}</p>
        <p className="text-gray-600 text-sm mt-3 line-clamp-3">{member.bio}</p>
        <div className="flex justify-center gap-4 mt-4">
          {member.linkedin && <a href={member.linkedin} target="_blank" className="text-gray-500 hover:text-primary"><i className="fab fa-linkedin text-xl"></i></a>}
          {member.instagram && <a href={member.instagram} target="_blank" className="text-gray-500 hover:text-primary"><i className="fab fa-instagram text-xl"></i></a>}
          {member.twitter && <a href={member.twitter} target="_blank" className="text-gray-500 hover:text-primary"><i className="fab fa-twitter text-xl"></i></a>}
        </div>
      </div>
    </motion.div>
  )
}
