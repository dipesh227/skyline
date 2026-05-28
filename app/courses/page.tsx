import Link from 'next/link'

export default function Courses() {
  const courses = [
    { title: 'Bartending Course', desc: 'Complete bartending fundamentals with practical training.', img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400', link: '/courses/bartending' },
    { title: 'Flair Bartending', desc: 'Master bottle tricks, juggling, and working flair.', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400', link: '/courses/flair' },
    { title: 'Hospitality Training', desc: 'Customer service, communication, and management skills.', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400', link: '/courses/hospitality' },
  ]
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-24 text-center">
        <div className="container-custom"><h1 className="text-5xl font-bold">Our Professional Courses</h1><p className="mt-2">Choose your path to an exciting career</p></div>
      </section>
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <div key={i} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
              <img src={course.img} alt={course.title} className="h-56 w-full object-cover" />
              <div className="p-6"><h3 className="text-xl font-bold text-primary">{course.title}</h3><p className="mt-2 text-gray-600">{course.desc}</p><Link href={course.link} className="text-secondary font-semibold mt-4 inline-block">Learn More →</Link></div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
