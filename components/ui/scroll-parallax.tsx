"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollParallaxProps {
  children: ReactNode
  className?: string
  offset?: [string, string] | string[]
  disabled?: boolean
}

export const ScrollParallax = ({
  children,
  className = "",
  offset = ["start end", "end start"] as [string, string],
  disabled = false,
}: ScrollParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    return window.innerWidth < 768
  })
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  })

  // Reduced parallax intensity for better performance
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Disable parallax on mobile or if disabled prop is true
  const shouldDisableParallax = isMobile || disabled

  return (
    <motion.div 
      ref={ref} 
      style={shouldDisableParallax ? {} : { y, opacity }} 
      className={className}
    >
      {children}
    </motion.div>
  )
}
