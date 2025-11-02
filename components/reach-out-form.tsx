"use client"

import { useState } from "react"

export default function ReachOutForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sendViaWhatsApp = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields before sending.')
      return
    }
    
    const whatsappMessage = `Hi! I'm ${formData.name} (${formData.email}). ${formData.message}`
    const whatsappUrl = `https://wa.me/919901584053?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }
  
  const sendViaEmail = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields before sending.')
      return
    }
    
    const subject = `New Project Inquiry from ${formData.name}`
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
    const mailtoUrl = `mailto:lumiere.elevated@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    window.location.href = mailtoUrl
  }

  return (
    <div className="bg-transparent border border-gray-800 rounded-lg p-8">
      <form className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 text-white placeholder:text-gray-400 font-mono px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 text-white placeholder:text-gray-400 font-mono px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              required
            />
          </div>
        </div>
        
        <div>
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full bg-gray-900 border border-gray-600 text-white placeholder:text-gray-400 font-mono px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
            required
          ></textarea>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm font-mono mb-4">Choose how to send your message:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button"
              onClick={sendViaWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-mono font-medium transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
              </svg>
              <span>WhatsApp</span>
            </button>
            <button 
              type="button"
              onClick={sendViaEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-mono font-medium transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>Email</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center pt-4">
          <span className="text-gray-400 text-sm mr-3 font-mono">Our Team:</span>
          <div className="flex -space-x-2">
            <div className="relative group">
              <img className="w-8 h-8 rounded-full border-2 border-gray-800 hover:border-white transition-all duration-300 cursor-pointer" src="/team-member-1.heic" alt="Nohil Yash Arthur" onError={(e) => { const target = e.target as HTMLImageElement; if (target.src.endsWith('.heic')) { target.src = '/team-member-1.jpg'; } else if (target.src.endsWith('.jpg')) { target.src = '/team-member-1.png'; } }} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Nohil Yash Arthur
              </div>
            </div>
            <div className="relative group">
              <img className="w-8 h-8 rounded-full border-2 border-gray-800 hover:border-white transition-all duration-300 cursor-pointer" src="/team-member-2.heic" alt="Hruthik. G" onError={(e) => { const target = e.target as HTMLImageElement; if (target.src.endsWith('.heic')) { target.src = '/team-member-2.jpg'; } else if (target.src.endsWith('.jpg')) { target.src = '/team-member-2.png'; } }} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Hruthik. G
              </div>
            </div>
            <div className="relative group">
              <img className="w-8 h-8 rounded-full border-2 border-gray-800 hover:border-white transition-all duration-300 cursor-pointer" src="/team-member-3.heic" alt="Mayank V.N" onError={(e) => { const target = e.target as HTMLImageElement; if (target.src.endsWith('.heic')) { target.src = '/team-member-3.jpg'; } else if (target.src.endsWith('.jpg')) { target.src = '/team-member-3.png'; } }} />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Mayank V.N
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
