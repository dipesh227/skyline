'use client'
export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-40">
      <a href="https://wa.me/916395427119" target="_blank" rel="noopener noreferrer" className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition"><i className="fab fa-whatsapp"></i></a>
      <a href="tel:+916395427119" className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition"><i className="fas fa-phone-alt"></i></a>
    </div>
  )
}
