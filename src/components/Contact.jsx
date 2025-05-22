import React, { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, Send, Globe, Clock, MessageSquare, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'

// Enhanced particle system for contact
const ContactParticles = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles = []
    const particleCount = 120

    // Initialize particles with contact theme
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() * 40 + 180, // Blue to teal spectrum
        pulse: Math.random() * Math.PI * 2,
        energy: Math.random()
      })
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.03
        particle.energy += 0.01
        
        // Boundary check with gentle bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.9
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.9
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }
        
        // Mouse interaction - more dynamic
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 3000
          particle.vx -= dx * force
          particle.vy -= dy * force
          particle.opacity = Math.min(1, particle.opacity + 0.1)
          particle.energy += 0.05
        } else {
          particle.opacity = Math.max(0.2, particle.opacity - 0.005)
          particle.energy = Math.max(0, particle.energy - 0.01)
        }
        
        // Draw particle with enhanced effects
        ctx.save()
        ctx.globalAlpha = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse))
        
        // Energy-based glow
        const glowSize = particle.size * (2 + particle.energy * 3)
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0, 
          particle.x, particle.y, glowSize
        )
        gradient.addColorStop(0, `hsl(${particle.hue}, 80%, 70%)`)
        gradient.addColorStop(0.5, `hsl(${particle.hue}, 60%, 50%)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Core particle
        ctx.fillStyle = `hsl(${particle.hue}, 90%, 85%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Enhanced connections with energy
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dist = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (dist < 120) {
            ctx.save()
            const connectionStrength = ((120 - dist) / 120) * 0.4 * Math.min(particle.energy, other.energy)
            ctx.globalAlpha = connectionStrength
            
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y)
            lineGradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
            lineGradient.addColorStop(1, `hsl(${other.hue}, 70%, 60%)`)
            
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 2 * Math.min(particle.energy, other.energy)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    canvas.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
    />
  )
}

// Contact info card component
const ContactInfoCard = ({ contact, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200 + 400)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div 
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full group">
        {/* Enhanced glow effect */}
        <div className={`absolute -inset-2 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-2xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Main card */}
        <div className="relative h-full p-6 transition-all duration-300 border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border-white/20 rounded-2xl hover:scale-105">
          {/* Icon container */}
          <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14">
            <div className="absolute opacity-50 w-14 h-14 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl blur-md animate-pulse" />
            <div className="relative flex items-center justify-center shadow-lg w-14 h-14 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl">
              <contact.icon className="text-white w-7 h-7" />
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-primary-200">
              {contact.title}
            </h4>
            
            {contact.link !== '#' ? (
              <a 
                href={contact.link}
                className="block text-sm leading-relaxed text-gray-300 transition-colors duration-300 hover:text-primary-300"
              >
                {contact.info}
              </a>
            ) : (
              <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                {contact.info}
              </p>
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          <div className="absolute w-8 h-8 rounded-full bottom-2 right-2 bg-gradient-to-br from-cyan-500/20 to-primary-500/20 blur-sm" />
        </div>
      </div>
    </div>
  )
}

// Animated form input component
const AnimatedInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value !== '')
  }

  return (
    <div className="relative">
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-4 py-4 text-white placeholder-transparent transition-all duration-300 border bg-white/5 border-white/20 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 backdrop-blur-sm"
        placeholder={label}
      />
      <label className={`absolute transition-all duration-300 pointer-events-none ${
        isFocused || hasValue 
          ? 'top-2 left-4 text-xs text-primary-300 font-medium' 
          : 'top-4 left-4 text-gray-400'
      }`}>
        {label}
      </label>
    </div>
  )
}

// Animated textarea component
const AnimatedTextarea = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value !== '')
  }

  return (
    <div className="relative">
      <textarea
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-4 py-4 text-white placeholder-transparent transition-all duration-300 border resize-none bg-white/5 border-white/20 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 backdrop-blur-sm"
        rows={4}
        placeholder={label}
      />
      <label className={`absolute transition-all duration-300 pointer-events-none ${
        isFocused || hasValue 
          ? 'top-2 left-4 text-xs text-primary-300 font-medium' 
          : 'top-4 left-4 text-gray-400'
      }`}>
        {label}
      </label>
    </div>
  )
}

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', company: '', message: '' })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon',
      info: '+62 815 194 20311',
      link: 'tel:+6281519420311'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'sales.project@99aeropower.com',
      link: 'mailto:sales.project@99aeropower.com'
    },
    {
      icon: Globe,
      title: 'Website',
      info: 'www.99aeropower.com',
      link: 'https://www.99aeropower.com'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      info: 'Jl. Jendral Sudirman, KAV 26\nKaret Setia Budi, Sona Topas Tower 5A Floor\nJakarta, Indonesia',
      link: '#'
    }
  ]

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <ContactParticles />
        
        {/* Glowing orbs */}
        <div className="absolute rounded-full top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-cyan-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-primary-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/8 to-cyan-500/12 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 188, 212, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 188, 212, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className={`mb-16 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary-300" />
            <span className="font-medium text-primary-200">Hubungi Kami</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="text-white">Hubungi </span>
            <span className="text-transparent bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-400 bg-clip-text">
              Kami
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300">
            Siap membantu mewujudkan ide dan kebutuhan digital bisnis Anda. 
            Mari diskusikan project Anda bersama kami.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="mb-6 text-2xl font-bold text-white">
                Informasi Kontak
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                Tim kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami 
                melalui berbagai channel komunikasi yang tersedia.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              {contactInfo.map((contact, index) => (
                <ContactInfoCard key={index} contact={contact} index={index} />
              ))}
            </div>

            {/* Business Hours */}
            <div className={`transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="p-6 border backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    <div className="absolute w-12 h-12 opacity-50 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl blur-md" />
                    <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    Jam Operasional
                  </h4>
                </div>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Senin - Jumat</span>
                    <span className="text-primary-300">09:00 - 18:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span className="text-primary-300">09:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span className="text-gray-500">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative p-8 border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border-white/20 rounded-3xl">
              {/* Form glow */}
              <div className="absolute opacity-50 -inset-2 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
              
              <div className="relative">
                <h3 className="mb-6 text-2xl font-bold text-center text-white">
                  <MessageSquare className="inline-block w-8 h-8 mr-3 text-primary-300" />
                  Kirim Pesan
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <AnimatedInput
                      label="Nama Lengkap *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    
                    <AnimatedInput
                      label="Email *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <AnimatedInput
                    label="Nama Perusahaan"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />

                  <AnimatedTextarea
                    label="Pesan *"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 group rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Button background */}
                    <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:from-primary-400 group-hover:to-cyan-400" />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                    
                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                <div className="p-4 mt-6 border rounded-xl bg-primary-500/10 border-primary-400/30">
                  <p className="text-sm text-center text-primary-200">
                    <strong>Response Time:</strong> Kami akan merespon dalam 24 jam kerja
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className={`mt-20 transform transition-all duration-700 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative p-8 text-center border shadow-2xl backdrop-blur-xl bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 rounded-3xl">
            {/* CTA glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-3xl blur-xl opacity-60" />
            
            <div className="relative">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Konsultasi Gratis untuk Project Anda
              </h3>
              <p className="max-w-2xl mx-auto mb-6 text-lg text-primary-200 opacity-90">
                Dapatkan konsultasi gratis dari tim ahli kami. Kami siap membantu 
                menganalisis kebutuhan dan memberikan solusi terbaik untuk bisnis Anda.
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a 
                  href="tel:+6281519420311"
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 border group bg-white/10 border-white/30 rounded-xl backdrop-blur-sm hover:bg-white/20 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Telepon Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
                
                <a 
                  href="mailto:sales.project@99aeropower.com"
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 border group bg-white/10 border-white/30 rounded-xl backdrop-blur-sm hover:bg-white/20 hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Kami
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 pt-6 mt-8 border-t border-white/10">
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Free Consultation
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  24/7 Support
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Quick Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact