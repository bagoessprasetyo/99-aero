import React, { useState, useEffect, useRef } from 'react'
import { Globe, Smartphone, Settings, ArrowRight, Zap, Star, CheckCircle, Sparkles } from 'lucide-react'

// Animated background particles
const ServiceParticles = () => {
  const canvasRef = useRef(null)

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
    const particleCount = 60

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 180, // Blue to cyan
        pulse: Math.random() * Math.PI * 2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Draw particle with pulse effect
        ctx.save()
        ctx.globalAlpha = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse))
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = (120 - distance) / 120 * 0.15
            ctx.strokeStyle = `hsl(${particle.hue}, 70%, 60%)`
            ctx.lineWidth = 1
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
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    />
  )
}

// Service card component
const ServiceCard = ({ service, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200 + 500)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div 
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full group">
        {/* Glow effect */}
        <div className={`absolute -inset-2 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-3xl blur-xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
        
        {/* Main card */}
        <div className="relative h-full p-8 overflow-hidden border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-3xl">
          {/* Holographic overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br from-primary-400/10 via-cyan-400/5 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
          
          {/* Header */}
          <div className="relative z-10 mb-6 text-center">
            <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
              <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl blur-md" />
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl">
                <service.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-primary-200">
              {service.title}
            </h3>
            
            <p className="leading-relaxed text-gray-300">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 mb-6 space-y-3">
            {service.features.map((feature, featureIndex) => (
              <div 
                key={featureIndex} 
                className="flex items-center text-sm text-gray-300 transition-colors duration-300 group-hover:text-white"
              >
                <div className="w-2 h-2 mr-3 rounded-full bg-gradient-to-r from-primary-400 to-cyan-400 animate-pulse" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative z-10 pt-6 border-t border-white/10">
            <button className="flex items-center justify-center w-full font-medium text-white transition-all duration-300 group-hover:text-primary-200 hover:translate-x-1">
              Pelajari Lebih Lanjut
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          <div className="absolute w-16 h-16 rounded-full bottom-4 right-4 bg-gradient-to-br from-cyan-500/10 to-primary-500/10 blur-xl" />
          <div className="absolute w-8 h-8 rounded-full top-4 left-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 blur-sm" />
        </div>
      </div>
    </div>
  )
}

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      icon: Globe,
      title: 'Pengembangan Website',
      description: 'Layanan Website Design dan Development yang dilengkapi dengan proses analisa, perencanaan hingga implementasi platform digital untuk bisnis.',
      features: ['Responsive Design', 'SEO Optimized', 'Custom CMS', 'E-commerce Integration']
    },
    {
      icon: Smartphone,
      title: 'Pengembangan Aplikasi Selular',
      description: 'Layanan Mobile App Development (Android dan iOS) yang dilengkapi dengan proses analisa, perencanaan hingga implementasi platform digital untuk bisnis.',
      features: ['Native & Hybrid Apps', 'Cross-platform', 'App Store Deployment', 'Maintenance Support']
    },
    {
      icon: Settings,
      title: 'Pengembangan Sistem Digital',
      description: 'Kembangkan software sesuai proses bisnis unik & spesifik perusahaan anda. Anda akan mendapatkan software yang 100% adaptif yang menjawab kebutuhan digitalisasi proses bisnis.',
      features: ['Custom Software', 'API Integration', 'Database Design', 'Cloud Solutions']
    }
  ]

  return (
    <section id="services" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <ServiceParticles />
        
        {/* Glowing orbs */}
        <div className="absolute rounded-full top-20 right-10 w-80 h-80 bg-gradient-to-r from-primary-500/15 to-cyan-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-primary-500/15 blur-3xl" />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-cyan-500/8 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(0, 188, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className={`mb-16 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary-300" />
            <span className="font-medium text-primary-200">Layanan Kami</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="text-white">Layanan </span>
            <span className="text-transparent bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-400 bg-clip-text">
              Kami
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300">
            Bekerja dengan Kreatif untuk Perkembangan Bisnis Anda
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative max-w-4xl p-8 mx-auto border shadow-2xl backdrop-blur-xl bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 rounded-3xl">
            {/* Main glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-3xl blur-xl opacity-60" />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 mr-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-xl">
                  <Zap className="w-8 h-8 text-primary-300" />
                </div>
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  Siap Memulai Project Anda?
                </h3>
              </div>
              
              <p className="max-w-2xl mx-auto mb-6 text-lg text-primary-200 opacity-90">
                Mari diskusikan kebutuhan bisnis Anda dan dapatkan solusi terbaik dari tim ahli kami. 
                Konsultasi gratis untuk semua layanan.
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a 
                  href="#contact" 
                  className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 group rounded-2xl hover:scale-105"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:from-primary-400 group-hover:to-cyan-400" />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center">
                    Konsultasi Gratis
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                
                <a 
                  href="#portfolio" 
                  className="inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 border border-white/30 rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Lihat Portfolio
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
                  Quality Guarantee
                </div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
            <div className="absolute bottom-0 right-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services