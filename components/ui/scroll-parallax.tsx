"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollParallaxProps {
  children: ReactNode
  className?: string
  offset?: number[]
}

export const ScrollParallax = ({
  children,
  className = "",
  offset = ["start end", "end start"],
}: ScrollParallaxProps) => {
  const ref = useRef(null)
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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} style={isMobile ? undefined : { y, opacity }} className={className}>
      {children}
    </motion.div>
  )
}
