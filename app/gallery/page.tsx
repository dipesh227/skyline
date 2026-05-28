'use client'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Combined images array (existing + new)
  const images = [
    // New images
    { src: '/images/gallery/gallery-1.jpeg', alt: 'Bartending Training Session', category: 'Training' },
    { src: '/images/gallery/gallery-2.jpeg', alt: 'Mixology Workshop', category: 'Workshop' },
    { src: '/images/gallery/gallery-3.jpeg', alt: 'Student Practice Session', category: 'Training' },
    // Existing images from Unsplash
    { src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600', alt: 'Campus Life', category: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600', alt: 'Bartending Class', category: 'Training' },
    { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600', alt: 'Flair Show', category: 'Event' },
    { src: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600', alt: 'Institute Campus', category: 'Campus' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600', alt: 'Hospitality Training', category: 'Training' },
    { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600', alt: 'Bar Setup', category: 'Facility' },
  ]

  const categories = ['All', ...new Set(images.map(img => img.category))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold">Our Gallery</h1>
          <p className="text-lg mt-2">A glimpse into life at Skyline Institute</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full transition ${
                  activeCategory === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img.src)}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              >
                <div className="relative h-64 w-full">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white font-semibold">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-secondary">
              <X size={32} />
            </button>
            <img src={selectedImage} alt="Full size" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </>
  )
}
