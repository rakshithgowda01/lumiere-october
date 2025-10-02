"use client"

import type React from "react"
import { useState } from "react"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Youtube, Mail, User, MessageSquare } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const testimonials = [
    {
      quote:
        "Working with Lumiere transformed our brand's visual storytelling. Their attention to detail and creative vision exceeded all expectations.",
      name: "Sarah Chen",
      designation: "Creative Director at Nexus Studios",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "The cinematic quality and emotional depth they brought to our project was remarkable. Truly exceptional work.",
      name: "Michael Rodriguez",
      designation: "Producer at Visionary Films",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote: "Professional, creative, and delivered beyond our timeline. The final product speaks for itself.",
      name: "Emily Watson",
      designation: "Marketing Lead at Creative Co.",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      designation: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Sarah Kim",
      designation: "Lead Editor",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      designation: "Cinematographer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      name: "Lisa Zhang",
      designation: "Motion Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ]

  const ProjectForm = () => (
    <div className="h-full flex flex-col bg-black p-6 rounded-lg border border-gray-800 text-white">
      <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
        <div className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 font-mono"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 font-mono"
            required
          />
        </div>
        <Textarea
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-400 resize-none flex-1 font-mono"
          required
        />
        <div className="flex flex-col gap-4 mt-auto">
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-mono transition-all duration-300 hover:scale-105 active:scale-95">
            Send Message
          </Button>
          <div className="flex items-center justify-center">
            <span className="text-gray-400 text-sm mr-3 font-mono">Our Team:</span>
            <AnimatedTooltip items={teamMembers} />
          </div>
        </div>
      </form>
    </div>
  )

  const ConnectWithUs = () => (
    <div className="bg-black p-6 rounded-lg border border-gray-800 h-full flex flex-col text-white">
      <div className="flex flex-col h-full overflow-hidden">
        <h3 className="text-white font-semibold mb-4 text-lg font-mono">Connect With Us</h3>
        <div className="text-gray-300 text-sm mb-4 leading-relaxed space-y-1 font-mono">
          <p>Email: <a href="mailto:lumiere.elevated@gmail.com" className="underline text-white">lumiere.elevated@gmail.com</a></p>
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

  return (
    <section id="contact" className="py-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-4">
              Let's Create <br />
              <span className="text-4xl md:text-[6rem] font-mono font-bold mt-1 leading-none text-white">
                Together
              </span>
            </h1>
          </>
        }
      >
        <div className="w-full h-[120vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600 bg-black">
          <div className="p-8 max-w-7xl mx-auto text-white">
            <div className="max-w-2xl mx-auto mb-8">
              <BentoGridItem
                title="Connect With Us"
                description="Follow our journey and stay updated with our latest work."
                header={<ConnectWithUs />}
                icon={<MessageSquare className="h-4 w-4 text-neutral-500" />}
                className="bg-black border-gray-800 w-full"
              />
            </div>

            {/* Testimonials Section */}
            <div className="mt-8 bg-black border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center font-mono">What Our Clients Say</h3>
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  )
}
