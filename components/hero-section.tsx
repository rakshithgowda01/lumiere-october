"use client"

import { useEffect, useState } from "react"
import VariableProximity from "./ui/variable-proximity"
import TextPressure from "./ui/text-pressure"
import Magnet from "./ui/magnet"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="text-center z-10 px-6"
        style={{
          transform: isMobile ? undefined : `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div style={{ position: "relative", height: isMobile ? "120px" : "160px" }} className="mb-6 md:mb-8 md:h-[220px]">
          <TextPressure
            text={"LUMIÈRE!"}
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
            className=""
          />
        </div>

        <h2
          className="text-lg md:text-3xl lg:text-4xl text-white mb-4 md:mb-6 font-light"
          style={{
            transform: isMobile ? undefined : `translateY(${scrollY * 0.15}px)`,
          }}
        >
          We turn stories into scroll stopping content
        </h2>

        <p
          className="text-sm md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{
            transform: isMobile ? undefined : `translateY(${scrollY * 0.2}px)`,
          }}
        >
          Cinematic video editing, viral Instagram reels, and brand storytelling
          <br />
          that makes your audience stop scrolling
        </p>

        <div
          style={{
            transform: isMobile ? undefined : `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <Magnet strength={0.2}>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full transition-all duration-300 font-medium text-lg flex items-center space-x-2 mx-auto hover:bg-white hover:text-black hover:scale-105 active:scale-95 font-mono">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Start Your Project</span>
            </button>
          </Magnet>
        </div>
      </div>
    </section>
  )
}
