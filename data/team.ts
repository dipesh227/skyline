export type TeamMember = {
  id: number
  name: string
  role: string
  position: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
  }
  order: number
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dipesh Kumar",
    role: "Founder & Brand Ambassador",
    position: "Chief Mentor | IFBA Certified Flair Champion",
    bio: "Award-winning flair bartender with 5x IFBA Championship titles. Dipesh has trained over 1000+ students and is the visionary behind Skyline Institute. As the Brand Ambassador, he represents the institute at national and international forums.",
    image: "/images/team/dipesh.jpg",
    social: {
      linkedin: "https://linkedin.com/in/dipesh",
      instagram: "https://instagram.com/dipesh",
    },
    order: 1,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "HOD - Hospitality Management",
    position: "Senior Faculty | Hospitality Expert",
    bio: "With over 12 years of experience in hotel management, Rajesh heads the Hospitality department. He has worked with leading 5-star hotels and brings practical industry insights to the classroom.",
    image: "/images/team/rajesh.jpg",
    social: {
      linkedin: "https://linkedin.com/in/rajesh",
    },
    order: 2,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "HOD - Mixology & Bartending",
    position: "Lead Mixologist | Certified Bartending Instructor",
    bio: "Priya is a master mixologist with 8+ years of experience. She has won multiple national bartending competitions and specializes in modern cocktail techniques and molecular mixology.",
    image: "/images/team/priya.jpg",
    social: {
      linkedin: "https://linkedin.com/in/priya",
      instagram: "https://instagram.com/priya",
    },
    order: 3,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Senior Faculty - Flair Bartending",
    position: "National Flair Champion | Performance Trainer",
    bio: "Vikram is a national-level flair bartending champion. He specializes in advanced bottle tricks, juggling, and working flair. He has trained students who now work in top bars across India and abroad.",
    image: "/images/team/vikram.jpg",
    social: {
      linkedin: "https://linkedin.com/in/vikram",
      instagram: "https://instagram.com/vikram",
    },
    order: 4,
  },
]
