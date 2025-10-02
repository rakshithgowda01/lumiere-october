"use client"

import { Instagram, Youtube, Mail } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="py-12 px-6 bg-black">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12"></div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Lumiere</h2>

        <div className="flex justify-center items-center gap-8 mb-8">
          <a
            href="mailto:lumiere.elevated@gmail.com"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a 
            href="https://www.instagram.com/lumiere.chronicle/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a 
            href="tel:+919901584053"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <span className="hidden sm:inline">Phone</span>
          </a>
        </div>

        <p className="text-gray-400 text-lg">Thank you for visiting</p>
      </div>
    </footer>
  )
}
