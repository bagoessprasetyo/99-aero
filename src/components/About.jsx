import React, { useState, useEffect, useRef } from 'react'
import { Target, Eye, Quote, TrendingUp, Award, Users, Zap, Shield, Code2, Sparkles } from 'lucide-react'

// Animated particles background
const ParticleBackground = () => {
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
    const particleCount = 50

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 180
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const distance = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (100 - distance) / 100 * 0.1
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  )
}

// Glowing stats component
const GlowingStat = ({ value, label, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Animate the number
      const numericValue = parseInt(value.replace(/\D/g, ''))
      let current = 0
      const increment = numericValue / 50
      const counter = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setAnimatedValue(numericValue)
          clearInterval(counter)
        } else {
          setAnimatedValue(Math.floor(current))
        }
      }, 30)
    }, delay * 200)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute transition-opacity duration-500 opacity-0 -inset-2 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:opacity-100" />
        
        {/* Main card */}
        <div className="relative p-6 border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-2xl">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4">
            <div className="p-2 bg-primary-500/20 rounded-xl">
              <Icon className="w-8 h-8 text-primary-300" />
            </div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold">
              <span className="text-transparent bg-gradient-to-r from-primary-300 to-cyan-300 bg-clip-text">
                {animatedValue}{value.includes('+') ? '+' : ''}
              </span>
            </div>
            <div className="font-medium text-white/70">{label}</div>
          </div>
          
          {/* Top border accent */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
        </div>
      </div>
    </div>
  )
}

// Vision/Mission card component
const VisionMissionCard = ({ icon: Icon, title, content, isQuote = false, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 200)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="relative h-full group">
        {/* Glow effect */}
        <div className="absolute transition-opacity duration-500 opacity-0 -inset-2 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:opacity-100" />
        
        {/* Main card */}
        <div className="relative h-full p-8 border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-3xl">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center mr-4 shadow-lg w-14 h-14 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl">
              <Icon className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          
          {/* Content */}
          <div className="relative">
            {isQuote && (
              <Quote className="absolute w-8 h-8 text-primary-200/30 -top-2 -left-2" />
            )}
            <p className={`text-lg leading-relaxed text-gray-300 ${isQuote ? 'pl-6' : ''}`}>
              {content}
            </p>
          </div>
          
          {isQuote && (
            <div className="p-4 mt-6 border rounded-xl bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-400/30">
              <p className="font-semibold text-center text-primary-200">
                "Kreatif, Inovatif dan Inspiratif"
              </p>
            </div>
          )}
          
          {/* Decorative elements */}
          <div className="absolute w-16 h-16 rounded-full top-4 right-4 bg-gradient-to-br from-primary-500/10 to-cyan-500/10 blur-xl" />
          <div className="absolute w-8 h-8 rounded-full bottom-4 left-4 bg-gradient-to-br from-cyan-500/20 to-primary-500/20 blur-sm" />
          
          {/* Border accents */}
          <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <ParticleBackground />
        
        {/* Glowing orbs */}
        <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-500/20 to-cyan-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-primary-500/20 blur-3xl" />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-cyan-500/5 blur-3xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0, 188, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className={`mb-16 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary-300" />
            <span className="font-medium text-primary-200">Tentang Perusahaan</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="text-white">Tentang </span>
            <span className="text-transparent bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-400 bg-clip-text">
              Perusahaan
            </span>
          </h2>
          
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
            99 Aero Power adalah perusahaan yang bergerak di dalam bidang teknologi digital, 
            yang menyediakan jasa pembuatan dan pengembang aplikasi, alias software development.
          </p>
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left Column - Description & Stats */}
          <div className="space-y-8">
            {/* Description */}
            <div className={`space-y-6 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative p-8 border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-3xl">
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  Sebuah software house akan membantu kebutuhan para pebisnis dalam mengembangkan 
                  software maupun aplikasi lainnya. Kini, kehadiran Software house menjadi semakin 
                  penting dan semakin dibutuhkan bagi banyak perusahaan, karena akan membuat semuanya 
                  menjadi semakin praktis serta lebih mudah.
                </p>
                
                <p className="text-lg leading-relaxed text-gray-300">
                  Segera otomatiskan aktivitas pekerjaan Anda dengan menggunakan aplikasi. 
                  Mari diskusikan permasalahan Anda dan dapatkan solusi serta penawaran terbaik dari kami.
                </p>
                
                {/* Decorative gradient line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
              </div>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 gap-6">
              <GlowingStat value="5" label="Tahun Pengalaman" icon={Award} delay={1} />
              <GlowingStat value="50" label="Project Selesai" icon={TrendingUp} delay={1.5} />
            </div>
          </div>

          {/* Right Column - Vision & Mission */}
          <div className="space-y-8">
            {/* Vision */}
            <VisionMissionCard
              icon={Eye}
              title="Visi"
              content="99 Aero Power Menjadi Perusahaan Berbasis IT yang dapat memberikan solusi terbaik untuk semua kalangan"
              isQuote={true}
              delay={2}
            />

            {/* Mission */}
            <VisionMissionCard
              icon={Target}
              title="Misi"
              content="Kami Berkomitmen untuk memberikan pelayan terbaik dan dapat memberikan solusi untuk permasalahan IT. Terdapat berbagai layanan yang dapat kami sediakan untuk anda. Kami memberikan layanan dalam pembuatan (Website Development, Mobile App Development, Ecommerce, Company Profile, UI UX Design)."
              delay={2.5}
            />
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-20 text-center transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative max-w-4xl p-8 mx-auto border shadow-2xl backdrop-blur-xl bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 rounded-3xl">
            {/* Glow effect */}
            <div className="absolute opacity-50 -inset-2 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-3xl blur-xl" />
            
            <div className="relative">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Siap Memulai Transformasi Digital?
              </h3>
              <p className="mb-6 text-lg text-primary-200 opacity-90">
                Mari berdiskusi tentang bagaimana kami dapat membantu mengembangkan solusi teknologi untuk bisnis Anda
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a 
                  href="#contact" 
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-white transition-all duration-300 group rounded-xl hover:scale-105"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:from-primary-400 group-hover:to-cyan-400" />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Konsultasi Gratis
                  </span>
                </a>
                
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300 border border-white/30 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  Lihat Layanan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About