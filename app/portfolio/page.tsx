"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import PortfolioGalleryCarousel from "@/components/portfolio-gallery-carousel"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed top-4 left-4 z-[90]">
        <Link
          href="/"
          aria-label="Back to home"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-black/60 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-md"
        >
          <Home className="w-5 h-5" />
        </Link>
      </div>
      <PortfolioGalleryCarousel />
    </main>
  )
}
