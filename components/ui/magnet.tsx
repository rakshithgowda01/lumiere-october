"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface MagnetProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function Magnet({ children, className = "", strength = 0.3 }: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const magnet = magnetRef.current
    if (!magnet) return

    const applyTransform = (clientX: number, clientY: number) => {
      const rect = magnet.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (clientX - centerX) * strength
      const deltaY = (clientY - centerY) * strength

      magnet.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseMove = (e: MouseEvent) => {
      applyTransform(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      applyTransform(t.clientX, t.clientY)
    }

    const handleMouseLeave = () => {
      magnet.style.transform = "translate(0px, 0px)"
    }

    magnet.addEventListener("mousemove", handleMouseMove)
    magnet.addEventListener("touchmove", handleTouchMove, { passive: true })
    magnet.addEventListener("mouseleave", handleMouseLeave)
    magnet.addEventListener("touchend", handleMouseLeave)

    return () => {
      magnet.removeEventListener("mousemove", handleMouseMove)
      magnet.removeEventListener("touchmove", handleTouchMove)
      magnet.removeEventListener("mouseleave", handleMouseLeave)
      magnet.removeEventListener("touchend", handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={magnetRef} className={`transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  )
}
