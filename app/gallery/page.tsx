export default function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600',
    'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600',
  ]
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-dark text-white py-24 text-center">
        <div className="container-custom"><h1 className="text-5xl font-bold">Our Gallery</h1><p className="mt-2">A glimpse into life at Skyline Institute</p></div>
      </section>
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <img key={i} src={src} alt="Gallery" className="rounded-xl h-64 w-full object-cover hover:scale-105 transition shadow-md" />
          ))}
        </div>
      </section>
    </>
  )
}
