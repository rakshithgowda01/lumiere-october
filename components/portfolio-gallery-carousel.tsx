"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  thumbnail: string
  title: string
}

interface GalleryCategory {
  id: string
  title: string
  folderId: string
  images: GalleryImage[]
  loading: boolean
  useEmbedded: boolean
}

// Google Drive folder IDs
const DRIVE_FOLDER_IDS = {
  boxing: "1NQU_f6yya0LWnsybExRA_ctVFUZjnrV6",
  food: "1RBtzqXIVl4-cp03VZSUxFndVyGTmiafe",
  gym: "14TbyU-TAWsiqo2JHb_q1nf9pL-24WWzt",
  jewellery: "1ewTYQD0NbfgE2sHmMMP1SUyS88E6cKoQ",
  portraits: "1vkEl6sOR0Mqv6qp2f_mDsWNkGxolfCBp",
  sports: "15ukGGuJAmjUmlrmaDsu3dfBGtnjx-lho",
  reels: "1Fl4i5xX_KBMeanEdvRF8X9ssAk-pYpsH",
}

// Category Section Component with Embedded Drive View (Styled)
const CategorySectionEmbedded: React.FC<{
  category: GalleryCategory
}> = ({ category }) => {
  const iframeUrl = `https://drive.google.com/embeddedfolderview?id=${category.folderId}#grid`

  return (
    <div className="w-full h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-3xl md:text-5xl font-bold font-mono mb-6 md:mb-8 text-center"
      >
        {category.title}
      </motion.h2>
      
      <div className="relative w-full h-full flex-1 min-h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/10 backdrop-blur-sm group">
        <iframe
          src={iframeUrl}
          className="w-full h-full border-0 rounded-2xl transition-opacity duration-300"
          title={`${category.title} Gallery`}
          allow="autoplay; fullscreen"
          loading="lazy"
          style={{ pointerEvents: 'auto' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}

// Category Section Component with Grid Layout
const CategorySectionGrid: React.FC<{
  category: GalleryCategory
  onImageClick: (images: GalleryImage[], index: number) => void
}> = ({ category, onImageClick }) => {
  if (category.loading) {
    return (
      <div className="w-full h-full flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-3xl md:text-5xl font-bold font-mono mb-6 md:mb-8 text-center"
        >
          {category.title}
        </motion.h2>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      </div>
    )
  }

  if (category.images.length === 0 || category.useEmbedded) {
    return <CategorySectionEmbedded category={category} />
  }

  return (
    <div className="w-full h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-3xl md:text-5xl font-bold font-mono mb-6 md:mb-8 text-center"
      >
        {category.title}
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px] overflow-y-auto flex-1 pb-4">
        {category.images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg bg-gray-900 border border-white/10 hover:border-white/30 transition-all duration-300 min-w-[250px]"
            onClick={() => onImageClick(category.images, index)}
          >
            <motion.img
              src={image.thumbnail || image.src}
              alt={image.title}
              className="w-full h-[320px] object-cover transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm font-medium truncate">{image.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Main Portfolio Gallery Component
export default function PortfolioGalleryCarousel() {
  const [categories, setCategories] = useState<GalleryCategory[]>([
    { id: "boxing", title: "Boxing", folderId: DRIVE_FOLDER_IDS.boxing, images: [], loading: true, useEmbedded: true },
    { id: "food", title: "Food", folderId: DRIVE_FOLDER_IDS.food, images: [], loading: true, useEmbedded: true },
    { id: "gym", title: "Gym", folderId: DRIVE_FOLDER_IDS.gym, images: [], loading: true, useEmbedded: true },
    { id: "jewellery", title: "Jewellery", folderId: DRIVE_FOLDER_IDS.jewellery, images: [], loading: true, useEmbedded: true },
    { id: "portraits", title: "Portraits", folderId: DRIVE_FOLDER_IDS.portraits, images: [], loading: true, useEmbedded: true },
    { id: "sports", title: "Sports", folderId: DRIVE_FOLDER_IDS.sports, images: [], loading: true, useEmbedded: true },
    { id: "reels", title: "Reels", folderId: DRIVE_FOLDER_IDS.reels, images: [], loading: true, useEmbedded: true },
  ])

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [selectedImages, setSelectedImages] = useState<GalleryImage[] | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Fetch images for each category
  useEffect(() => {
    const fetchCategoryImages = async (category: GalleryCategory) => {
      try {
        const response = await fetch(`/api/drive-gallery?category=${category.id}`)
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          setCategories(prev => prev.map(cat => 
            cat.id === category.id 
              ? { ...cat, images: data.images, loading: false, useEmbedded: false }
              : cat
          ))
        } else {
          // No images found, use embedded view
          setCategories(prev => prev.map(cat => 
            cat.id === category.id 
              ? { ...cat, loading: false, useEmbedded: true }
              : cat
          ))
        }
      } catch (error) {
        console.error(`Error fetching images for ${category.title}:`, error)
        setCategories(prev => prev.map(cat => 
          cat.id === category.id 
            ? { ...cat, loading: false, useEmbedded: true }
            : cat
        ))
      }
    }

    categories.forEach(category => {
      fetchCategoryImages(category)
    })
  }, [])

  const nextCategory = () => {
    setDirection(1)
    setCurrentCategoryIndex((prev) => (prev + 1) % categories.length)
  }

  const prevCategory = () => {
    setDirection(-1)
    setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImages) {
        if (e.key === "Escape") closeModal()
        if (e.key === "ArrowRight") nextImage()
        if (e.key === "ArrowLeft") prevImage()
      } else {
        if (e.key === "ArrowRight") nextCategory()
        if (e.key === "ArrowLeft") prevCategory()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedImages, selectedIndex, currentCategoryIndex])

  const openModal = (images: GalleryImage[], index: number) => {
    setSelectedImages(images)
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedImages(null)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    if (selectedImages) {
      setSelectedIndex((prev) => (prev + 1) % selectedImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImages) {
      setSelectedIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const currentCategory = categories[currentCategoryIndex]

  return (
    <section id="portfolio" className="min-h-screen bg-black py-10 md:py-20 px-4 md:px-6 overflow-hidden" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
      <div className="max-w-7xl mx-auto h-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white font-mono mb-4">
            Portfolio Gallery
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Explore our work across different categories
          </p>
        </motion.div>

        {/* Category Carousel Container */}
        <div className="relative w-full h-[75vh] md:h-[80vh] min-h-[600px]">
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevCategory}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/70 border border-white/20 hover:bg-black/90 text-white transition-all flex items-center justify-center backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </motion.button>

          <motion.button
            onClick={nextCategory}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/70 border border-white/20 hover:bg-black/90 text-white transition-all flex items-center justify-center backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </motion.button>

          {/* Category Slides */}
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentCategoryIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full h-full p-4 md:p-6"
              >
                {currentCategory.useEmbedded ? (
                  <CategorySectionEmbedded category={currentCategory} />
                ) : (
                  <CategorySectionGrid
                    category={currentCategory}
                    onImageClick={openModal}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Category Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
            {categories.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentCategoryIndex ? 1 : -1)
                  setCurrentCategoryIndex(index)
                }}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentCategoryIndex
                    ? 'w-8 md:w-10 bg-white'
                    : 'w-2 md:w-2.5 bg-white/40 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to ${categories[index].title}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Image Modal - Fullscreen Viewer */}
      <AnimatePresence>
        {selectedImages && selectedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-60 w-12 h-12 rounded-full bg-black/70 border border-white/20 hover:bg-black/90 transition-all flex items-center justify-center"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/70 border border-white/20 hover:bg-black/90 text-white transition-all flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </motion.button>

            <motion.button
              className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/70 border border-white/20 hover:bg-black/90 text-white transition-all flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] max-w-[95vw] w-auto h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImages[selectedIndex] && (
                <motion.img
                  src={selectedImages[selectedIndex].src}
                  alt={selectedImages[selectedIndex].title}
                  className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Image Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/20"
              >
                <span className="text-white text-sm md:text-base font-medium">
                  {selectedIndex + 1} / {selectedImages.length}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
