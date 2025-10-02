"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ParallaxScrollProps {
  images?: string[];
  className?: string;
  onImageClick?: (image: string, index: number) => void;
}

const SmartImg: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const hasExt = /\.[a-zA-Z0-9]+$/.test(src)
  const candidates = hasExt ? [src] : [
    `${src}.jpg`, `${src}.JPG`, `${src}.jpeg`, `${src}.JPEG`, `${src}.png`, `${src}.PNG`, `${src}.webp`, `${src}.WEBP`
  ]
  const [i, setI] = useState(0)
  const current = candidates[Math.min(i, candidates.length - 1)]
  return (
    <img src={current} alt={alt} className={className} onError={() => setI((x) => Math.min(x + 1, candidates.length - 1))} onClick={onClick} loading="lazy" />
  )
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  images = [],
  className,
  onImageClick,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : true;
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn(isMobile ? "items-start w-full" : "h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={isMobile ? undefined : { y: translateFirst }}
              key={"grid-1" + idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <SmartImg
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                alt="Gallery image"
                onClick={isMobile ? undefined : () => onImageClick?.(el, idx)}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={isMobile ? undefined : { y: translateSecond }}
              key={"grid-2" + idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <SmartImg
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                alt="Gallery image"
                onClick={isMobile ? undefined : () => onImageClick?.(el, idx + firstPart.length)}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={isMobile ? undefined : { y: translateThird }}
              key={"grid-3" + idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <SmartImg
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                alt="Gallery image"
                onClick={isMobile ? undefined : () => onImageClick?.(el, idx + firstPart.length + secondPart.length)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const defaultImages = Array.from({ length: 74 }, (_, i) => `/gallery/photo${i + 1}`);

export default function ParallaxGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % defaultImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(defaultImages[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = selectedIndex === 0 ? defaultImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(defaultImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedIndex]);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : true;
  return (
    <div className="bg-gray-950 min-h-screen overflow-x-hidden">
      <div className="py-10">
        <h1 className="text-3xl md:text-6xl font-bold text-center text-white mb-10 md:mb-16">Portfolio Gallery</h1>
        <ParallaxScroll images={defaultImages} onImageClick={isMobile ? undefined : handleImageClick} />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-60"
              onClick={handleCloseModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            <motion.button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-4xl z-60"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </motion.button>

            <motion.button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-4xl z-60"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </motion.button>

            <motion.img
              src={selectedImage}
              alt="Selected gallery image"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} / {defaultImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


