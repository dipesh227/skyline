'use client'
export default function FlairTraining() {
  const levels = [
    { level: 'Level 1: Pouring Techniques', desc: 'Smooth and stylish liquid handling, basic bottle grips.' },
    { level: 'Level 2: Juggling Skills', desc: 'Bottle and shaker control tricks, hand-eye coordination.' },
    { level: 'Level 3: Working Flair', desc: 'Practical flair for real bar environments – speed and accuracy.' },
    { level: 'Level 4: Advanced Flair', desc: 'High-energy performance-level skills, showmanship, and stage acts.' },
  ]
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-24 text-center">
        <div className="container-custom"><span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full">Advanced Performance Skills</span><h1 className="text-5xl font-bold mt-4">Flair Bartending Training</h1><p className="mt-2">Learn professional bottle tricks, juggling, and stage presence</p></div>
      </section>
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-6">
          {levels.map((item, idx) => (
            <div key={idx} className="bg-light p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-primary">{item.level}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
          <div className="bg-light p-6 rounded-xl shadow"><h3 className="text-xl font-bold text-primary">🏆 Competition Training</h3><p>Preparation for national and international flair competitions.</p></div>
          <div className="bg-light p-6 rounded-xl shadow"><h3 className="text-xl font-bold text-primary">🎬 Video Portfolio</h3><p>Create your professional flair video for job applications.</p></div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-16 text-center">
        <div className="container-custom"><h2 className="text-3xl">Become a Flair Champion</h2><p>Learn from award-winning flair trainers</p><button className="btn-primary bg-secondary text-dark mt-6 hover:bg-white open-popup-trigger">Enroll Now</button></div>
      </section>
    </>
  )
}
