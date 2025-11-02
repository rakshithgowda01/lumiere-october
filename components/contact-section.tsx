"use client"

import { motion } from "framer-motion"
import { Instagram, Mail, MessageSquare } from "lucide-react"
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

export default function ContactSection() {
  const ConnectWithUs = () => (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 h-full flex flex-col text-white">
      <div className="flex flex-col h-full overflow-hidden">
        <h3 className="text-white font-semibold mb-4 text-lg font-mono">Connect With Us</h3>
        <div className="text-gray-300 text-sm mb-4 leading-relaxed space-y-1 font-mono">
          <p>Email: <a href="mailto:lumiere.elevated@gmail.com" className="underline text-white hover:text-gray-300 transition-colors">lumiere.elevated@gmail.com</a></p>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <a
            href="https://www.instagram.com/lumiere.chronicle/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white hover:bg-gray-200 text-black transition-all duration-300 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="tel:+919901584053"
            className="w-12 h-12 bg-white hover:bg-gray-200 text-black transition-all duration-300 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </a>
          <a
            href="mailto:lumiere.elevated@gmail.com"
            className="w-12 h-12 bg-white hover:bg-gray-200 text-black transition-all duration-300 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
            <span className="text-white text-sm font-medium font-mono">Free Consultation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
            <span className="text-white text-sm font-medium font-mono">Custom Solutions</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
            <span className="text-white text-sm font-medium font-mono">24/7 Support</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
            <span className="text-white text-sm font-medium font-mono">Fast Delivery</span>
          </div>
          <div className="text-gray-300 text-sm mt-4 leading-relaxed font-mono">
            <p>Contact: <span className="font-medium text-white">9901584053, 9901584693, 9902066873</span></p>
          </div>
        </div>
      </div>
    </div>
  )

  const testimonials = [
    {
      author: {
        name: "Sarah Chen",
        handle: "@nexusstudios",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      text: "Working with Lumiere transformed our brand's visual storytelling. Their attention to detail and creative vision exceeded all expectations.",
    },
    {
      author: {
        name: "Michael Rodriguez",
        handle: "@visionaryfilms",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      text: "The cinematic quality and emotional depth they brought to our project was remarkable. Truly exceptional work.",
    },
    {
      author: {
        name: "Emily Watson",
        handle: "@creativeco",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      text: "Professional, creative, and delivered beyond our timeline. The final product speaks for itself.",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-4">
            Let's Create <br />
            <span className="text-4xl md:text-[6rem] font-mono font-bold mt-1 leading-none text-white">
              Together
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        {/* Connect With Us Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <ConnectWithUs />
        </motion.div>

        {/* Testimonials Marquee */}
        <TestimonialsSection
          title="What Our Clients Say"
          description="Join brands who trust Lumiere to bring their vision to life"
          testimonials={testimonials}
        />
      </div>
    </section>
  )
}
