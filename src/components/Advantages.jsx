import React, { useState, useEffect, useRef } from 'react'
import { Shield, Zap, Users, Clock, Award, TrendingUp, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react'

// Enhanced particle system for advantages
const AdvantageParticles = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

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

    // Initialize particles with enhanced properties
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 80
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 60 + 180, // Blue to cyan
          pulse: Math.random() * Math.PI * 2,
          connectionRadius: Math.random() * 30 + 80
        })
      }
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    // Enhanced animation with mouse interaction
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.03
        
        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }
        
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 120) {
          const force = (120 - distance) / 2000
          particle.vx -= dx * force
          particle.vy -= dy * force
          particle.opacity = Math.min(1, particle.opacity + 0.05)
        } else {
          particle.opacity = Math.max(0.2, particle.opacity - 0.01)
        }
        
        // Draw particle with enhanced effects
        ctx.save()
        ctx.globalAlpha = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse))
        
        // Particle glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Core particle
        ctx.fillStyle = `hsl(${particle.hue}, 90%, 80%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Enhanced connections
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dist = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (dist < particle.connectionRadius) {
            ctx.save()
            ctx.globalAlpha = ((particle.connectionRadius - dist) / particle.connectionRadius) * 0.3
            
            // Gradient line
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y)
            lineGradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
            lineGradient.addColorStop(1, `hsl(${other.hue}, 70%, 60%)`)
            
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 2
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
    
    initParticles()
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  )
}

// Advantage card component with enhanced styling
const AdvantageCard = ({ advantage, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150 + 400)
    return () => clearTimeout(timer)
  }, [index])

  // Enhanced card interaction
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x / 20}deg) 
      rotateX(${-y / 20}deg) 
      translateZ(${isHovered ? 20 : 0}px)
    `
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    }
    setIsHovered(false)
  }

  return (
    <div 
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <div
        ref={cardRef}
        className="relative h-full transition-all duration-500 group transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Enhanced glow effect */}
        <div className={`absolute -inset-3 bg-gradient-to-r from-primary-500/30 via-cyan-500/20 to-primary-500/30 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Main card */}
        <div className="relative h-full p-8 overflow-hidden border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border-white/20 rounded-3xl">
          {/* Holographic shimmer */}
          <div className={`absolute inset-0 bg-gradient-to-br from-primary-400/20 via-transparent to-cyan-400/20 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
          
          {/* Animated background orbs */}
          <div className="absolute w-16 h-16 rounded-full top-4 right-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 blur-xl animate-pulse" />
          <div className="absolute w-12 h-12 rounded-full bottom-4 left-4 bg-gradient-to-br from-cyan-500/30 to-primary-500/30 blur-lg" />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon container with enhanced effects */}
            <div className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl blur-md opacity-60 animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full shadow-xl bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl">
                <advantage.icon className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="mb-4 text-xl font-bold text-white transition-colors duration-300 group-hover:text-primary-200">
              {advantage.title}
            </h3>
            
            {/* Description */}
            <p className="mb-6 leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-white">
              {advantage.description}
            </p>
            
            {/* Benefits list */}
            <div className="mb-6 space-y-2">
              {advantage.benefits?.map((benefit, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-300 transition-colors duration-300 group-hover:text-primary-200">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  {benefit}
                </div>
              ))}
            </div>
            
            {/* Learn more link */}
            <button className="inline-flex items-center font-medium transition-colors duration-300 text-primary-300 hover:text-primary-200 group-hover:translate-x-2">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Decorative borders */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>
      </div>
    </div>
  )
}

// Stats counter component
const StatCounter = ({ value, label, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      const targetValue = parseInt(value.replace(/\D/g, ''))
      let current = 0
      const increment = targetValue / 60
      
      const counter = setInterval(() => {
        current += increment
        if (current >= targetValue) {
          setCount(targetValue)
          clearInterval(counter)
        } else {
          setCount(Math.floor(current))
        }
      }, 30)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className={`text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="relative group">
        <div className="absolute transition-opacity duration-500 opacity-0 -inset-2 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:opacity-100" />
        
        <div className="relative p-6 border backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-2xl">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-xl">
            <Icon className="w-6 h-6 text-primary-300" />
          </div>
          
          <div className="mb-2 text-3xl font-bold">
            <span className="text-transparent bg-gradient-to-r from-primary-300 to-cyan-300 bg-clip-text">
              {count}{value.includes('%') ? '%' : '+'}
            </span>
          </div>
          
          <div className="font-medium text-white/70">{label}</div>
        </div>
      </div>
    </div>
  )
}

const Advantages = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const advantages = [
    {
      icon: Zap,
      title: 'Teknologi Terdepan',
      description: 'Menggunakan teknologi terbaru dan framework modern untuk mengembangkan solusi yang inovatif dan efisien.',
      benefits: ['Latest Tech Stack', 'AI Integration', 'Cloud Native']
    },
    {
      icon: Shield,
      title: 'Keamanan Terjamin',
      description: 'Sistem keamanan enterprise-grade dengan enkripsi end-to-end untuk melindungi data dan informasi sensitif.',
      benefits: ['End-to-End Encryption', 'Compliance Ready', 'Regular Security Audits']
    },
    {
      icon: Users,
      title: 'Tim Ahli Berpengalaman',
      description: 'Didukung oleh tim profesional dengan pengalaman bertahun-tahun dalam pengembangan software dan sistem digital.',
      benefits: ['5+ Years Experience', 'Certified Developers', '24/7 Support']
    },
    {
      icon: Clock,
      title: 'Pengembangan Cepat',
      description: 'Metodologi agile dan tools modern memungkinkan pengembangan yang cepat tanpa mengorbankan kualitas.',
      benefits: ['Agile Methodology', 'Fast Delivery', 'Quality Assured']
    },
    {
      icon: Award,
      title: 'Kualitas Premium',
      description: 'Komitmen terhadap standar kualitas tinggi dengan testing menyeluruh dan best practices industry.',
      benefits: ['Quality Testing', 'Code Review', 'Performance Optimized']
    },
    {
      icon: TrendingUp,
      title: 'Solusi Scalable',
      description: 'Arsitektur yang dapat berkembang seiring pertumbuhan bisnis Anda dengan performa yang tetap optimal.',
      benefits: ['Auto Scaling', 'Load Balancing', 'Future Proof']
    }
  ]

  const stats = [
    { value: '99', label: 'Client Satisfaction', icon: Star },
    { value: '50', label: 'Projects Completed', icon: Award },
    { value: '24/7', label: 'Support Available', icon: Clock },
    { value: '100', label: 'Success Rate', icon: TrendingUp }
  ]

  return (
    <section id="advantages" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <AdvantageParticles />
        
        {/* Glowing orbs */}
        <div className="absolute rounded-full top-10 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/15 to-cyan-500/5 blur-3xl" />
        <div className="absolute rounded-full bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-primary-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/5 to-cyan-500/8 rounded-full blur-3xl" />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 188, 212, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 188, 212, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(0, 188, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 20px 20px'
        }} />
      </div>

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className={`mb-20 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary-300" />
            <span className="font-medium text-primary-200">Keunggulan Kami</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="text-white">Mengapa Memilih </span>
            <span className="text-transparent bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-400 bg-clip-text">
              Kami?
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300">
            Keunggulan kompetitif yang membuat kami menjadi pilihan terbaik untuk 
            transformasi digital bisnis Anda
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6 mb-20 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCounter key={index} {...stat} delay={(index + 1) * 200} />
          ))}
        </div>

        {/* Advantages Grid */}
        <div className="grid gap-8 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} advantage={advantage} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative max-w-4xl p-8 mx-auto border shadow-2xl backdrop-blur-xl bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 rounded-3xl">
            {/* Enhanced glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/40 to-cyan-500/40 rounded-3xl blur-xl opacity-60" />
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 mr-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-2xl">
                  <Star className="w-10 h-10 text-primary-300" />
                </div>
                <h3 className="text-3xl font-bold text-white md:text-4xl">
                  Bergabunglah dengan Klien Terpuaskan
                </h3>
              </div>
              
              <p className="max-w-2xl mx-auto mb-8 text-lg text-primary-200 opacity-90">
                Ribuan klien telah mempercayai kami untuk mentransformasi bisnis mereka. 
                Saatnya giliran Anda merasakan keunggulan layanan kami.
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a 
                  href="#contact" 
                  className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 group rounded-2xl hover:scale-105"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:from-primary-400 group-hover:to-cyan-400" />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center">
                    Mulai Sekarang
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 border border-white/30 rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Lihat Testimoni
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 pt-6 mt-8 border-t border-white/10">
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Konsultasi Gratis
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Garansi Kualitas
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Support 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantages