import React, { useState, useEffect, useRef } from 'react'
import { Globe, Phone, Mail, MapPin, ArrowUp, Facebook, Instagram, Linkedin, Twitter, Sparkles, Zap, Code, Cpu } from 'lucide-react'

// Enhanced particle system for footer
const FooterParticles = () => {
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
    const particleCount = 80

    // Initialize particles with footer theme
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 40 + 180, // Blue to cyan
        pulse: Math.random() * Math.PI * 2,
        life: Math.random() * 100
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02
        particle.life += 0.5
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Fade and regenerate
        if (particle.life > 100) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = 0
          particle.hue = Math.random() * 40 + 180
        }
        
        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse))
        
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Core
        ctx.fillStyle = `hsl(${particle.hue}, 80%, 70%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (distance < 80) {
            ctx.save()
            ctx.globalAlpha = ((80 - distance) / 80) * 0.1
            ctx.strokeStyle = `hsl(${particle.hue}, 70%, 60%)`
            ctx.lineWidth = 0.5
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  )
}

// Floating decorative icons
const FloatingIcon = ({ icon: Icon, delay, position }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={`absolute ${position} transition-all duration-1000 ${isVisible ? 'opacity-20 animate-float' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s`, animationDuration: '6s' }}
    >
      <Icon className="w-16 h-16 text-primary-300" />
    </div>
  )
}

// Social media link component
const SocialLink = ({ icon: Icon, href, delay }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 200)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <a
        href={href}
        className="flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-full group bg-white/5 border-white/20 hover:bg-primary-500/20 hover:border-primary-400/50 hover:scale-110"
      >
        <Icon className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-primary-300" />
      </a>
    </div>
  )
}

// Footer link component
const FooterLink = ({ href, children, delay }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 100)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
      <a
        href={href}
        className="inline-flex items-center text-sm text-gray-400 transition-colors duration-300 group hover:text-primary-300"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-400 transition-all duration-300 group-hover:w-full" />
        </span>
      </a>
    </div>
  )
}

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const services = [
    'Website Development',
    'Mobile App Development', 
    'E-commerce Solutions',
    'Custom Software',
    'UI/UX Design',
    'System Integration'
  ]

  const quickLinks = [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Layanan', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Kontak', href: '#contact' }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Twitter, href: '#' }
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <FooterParticles />
        
        {/* Glowing orbs */}
        <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-gradient-to-r from-primary-500/20 to-cyan-500/10 blur-3xl" />
        <div className="absolute w-48 h-48 rounded-full bottom-10 right-10 bg-gradient-to-r from-cyan-500/15 to-primary-500/20 blur-3xl" />
        
        {/* Floating decorative icons */}
        <FloatingIcon icon={Sparkles} delay={1} position="top-20 left-20" />
        <FloatingIcon icon={Zap} delay={2} position="top-32 right-32" />
        <FloatingIcon icon={Code} delay={3} position="bottom-40 left-40" />
        <FloatingIcon icon={Cpu} delay={4} position="bottom-32 right-20" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(0, 188, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-60" />

      {/* Main Footer Content */}
      <div className="relative z-10 py-16 section-container">
        <div className={`grid gap-8 lg:grid-cols-4 md:grid-cols-2 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full opacity-75 bg-gradient-to-br from-primary-400 to-primary-600 blur-md animate-pulse" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-xl gradient-bg">
                  <Globe className="text-white w-7 h-7" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white via-primary-200 to-cyan-300 bg-clip-text">
                  99 AERO POWER
                </h3>
                <p className="text-sm font-medium text-primary-300">PT. Iklima Sukses Mandiri</p>
              </div>
            </div>
            
            <p className="max-w-md leading-relaxed text-gray-300">
              Software house terpercaya yang mengkhususkan diri dalam teknologi digital, 
              menyediakan solusi IT terbaik untuk kemajuan bisnis Anda dengan 
              pendekatan kreatif, inovatif, dan inspiratif.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 group">
                <div className="p-2 transition-colors duration-300 rounded-lg bg-primary-500/20 group-hover:bg-primary-500/30">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <a href="tel:+6281519420311" className="transition-colors hover:text-primary-300">
                  +62 815 194 20311
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 group">
                <div className="p-2 transition-colors duration-300 rounded-lg bg-primary-500/20 group-hover:bg-primary-500/30">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <a href="mailto:sales.project@99aeropower.com" className="transition-colors hover:text-primary-300">
                  sales.project@99aeropower.com
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <div className="p-2 rounded-lg bg-primary-500/20">
                  <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                </div>
                <span className="text-sm">
                  Jl. Jendral Sudirman, KAV 26<br />
                  Karet Setia Budi, Sona Topas Tower 5A Floor<br />
                  Jakarta, Indonesia
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <SocialLink key={index} icon={social.icon} href={social.href} delay={index + 5} />
              ))}
            </div>
          </div>

          {/* Services */}
          <div className={`space-y-6 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="relative inline-block text-lg font-semibold text-white">
              Layanan Kami
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary-400 to-transparent" />
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <FooterLink href="#services" delay={index + 10}>
                    {service}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Business Hours */}
          <div className={`space-y-8 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="relative inline-block text-lg font-semibold text-white">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary-400 to-transparent" />
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <FooterLink href={link.href} delay={index + 15}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-primary-300">Jam Operasional</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Sen - Jum</span>
                  <span className="text-primary-300">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="text-primary-300">09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span className="text-gray-500">Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-white/10">
        <div className={`py-6 section-container transform transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                &copy; 2024 99 Aero Power - PT. Iklima Sukses Mandiri. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Built with <span className="text-red-400">❤️</span> for digital transformation
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-xs text-gray-400 transition-colors hover:text-primary-300">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-400 transition-colors hover:text-primary-300">
                Terms of Service
              </a>
              
              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="relative flex items-center justify-center w-12 h-12 overflow-hidden transition-all duration-300 rounded-full group hover:scale-110"
                aria-label="Back to top"
              >
                <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:from-primary-400 group-hover:to-cyan-400" />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                <ArrowUp className="relative z-10 w-5 h-5 text-white transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 w-3/4 h-px transform -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-primary-300/50 to-transparent blur-sm" />
    </footer>
  )
}

export default Footer