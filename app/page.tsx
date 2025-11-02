import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import ReachOutForm from "@/components/reach-out-form"

// Make HeroSection client-side only to avoid hydration issues with TextPressure component
const HeroSection = dynamic(() => import("@/components/hero-section"), { 
  ssr: false,
  loading: () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="text-center z-10 px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white font-mono mb-4">
            LUMIÈRE!
          </h1>
        </div>
        <h2 className="text-lg md:text-3xl lg:text-4xl text-white mb-4 md:mb-6 font-light">
          We turn stories into scroll stopping content
        </h2>
        <p className="text-sm md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Cinematic video editing, viral Instagram reels, and brand storytelling
          <br />
          that makes your audience stop scrolling
        </p>
        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full transition-all duration-300 font-medium text-lg flex items-center space-x-2 mx-auto hover:bg-white hover:text-black hover:scale-105 active:scale-95 font-mono">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>Start Your Project</span>
        </button>
      </div>
    </section>
  )
})

// Keep critical above-the-fold content with SSR enabled
// Load other sections dynamically for performance
const AboutSection = dynamic(() => import("@/components/about-section"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>
})
const ServicesSection = dynamic(() => import("@/components/services-section"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>
})
const ReelsSection = dynamic(() => import("@/components/reels-section"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>
})
const GalleryShowcase = dynamic(() => import("@/components/ui/gallery-showcase").then(m => m.GalleryShowcase), { 
  ssr: false,
  loading: () => <div className="text-white text-center">Loading gallery...</div>
})
const WorkSection = dynamic(() => import("@/components/work-section"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>
})
const TeamSection = dynamic(() => import("@/components/team-section"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>
})
const ContactSection = dynamic(() => import("@/components/contact-section"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>
})
const FooterSection = dynamic(() => import("@/components/footer-section"), { 
  ssr: false,
  loading: () => <div className="text-white text-center py-12">Loading...</div>
})
const ScrollParallax = dynamic(() => import("@/components/ui/scroll-parallax").then(m => m.ScrollParallax), { 
  ssr: false,
  loading: () => <div className="text-white text-center">Loading...</div>
})
const Faq = dynamic(() => import("@/components/ui/faq-sections"), { 
  ssr: false,
  loading: () => <div className="text-white text-center py-12">Loading FAQ...</div>
})

export default function Home() {
  const galleryPhotos = Array.from({ length: 74 }, (_, i) => {
    const n = i + 1
    return {
      id: n,
      // Use extensionless path; SmartImg in GalleryShowcase will try .jpg/.JPG/.png/.webp etc
      src: `/gallery/photo${n}`,
      title: `Photo ${n}`,
      description: "",
    }
  })
  return (
    <main className="min-h-screen relative z-0">
      <Navbar />
        <HeroSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* About Lumière Section */}
      <AboutSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ServicesSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ReelsSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <section id="gallery" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-mono">Gallery Showcase</h2>
          </div>
          <GalleryShowcase photos={galleryPhotos} />
        </div>
      </section>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <WorkSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <TeamSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <ContactSection />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Reach Out to Us Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-6">
              Reach Out to Us
            </h2>
            <p className="text-lg text-gray-400 font-mono">
              Ready to bring your vision to life? Let's discuss your project and create something amazing together.
            </p>
          </div>
          
          <ReachOutForm />
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* CTA: Schedule Consultation Call */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Schedule Consultation Call</h3>
          <p className="text-gray-400 mb-6">15min consultation call to know about our services and agency</p>
          <a
            href={process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/your-username/15min"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent border-2 border-white text-white transition-all duration-300 font-medium hover:bg-white hover:text-black hover:scale-105 active:scale-95 font-mono"
          >
            Schedule Consultation Call
          </a>
        </div>
      </section>

      {/* FAQ section with no duplicate heading */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Faq />
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
