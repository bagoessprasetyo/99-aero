import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Code, Smartphone, Globe, Zap, Shield, Cpu, Layers, Play, Star } from 'lucide-react'

// Particle animation component
const ParticleField = () => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = 80
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 200, // Blue to cyan range
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 1000
          particle.vx -= dx * force
          particle.vy -= dy * force
        }

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dist = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (dist < 120) {
            ctx.save()
            ctx.globalAlpha = (120 - dist) / 120 * 0.2
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

      requestAnimationFrame(animate)
    }

    // Mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    initParticles()
    animate()
    
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}

// Floating feature icons
const FloatingFeature = ({ icon: Icon, title, description, delay }) => {
  return (
    <div 
      className="absolute p-4 transition-all duration-500 border shadow-2xl cursor-pointer backdrop-blur-xl bg-white/10 border-white/20 rounded-2xl animate-float group hover:scale-110"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-500/20 rounded-xl">
          <Icon className="w-5 h-5 text-primary-300" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-xs text-white/70">{description}</p>
        </div>
      </div>
      <div className="absolute transition-opacity duration-500 opacity-0 -inset-1 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl blur group-hover:opacity-100 -z-10" />
    </div>
  )
}

// Glowing orb component
const GlowingOrb = ({ size, color, delay, position }) => {
  return (
    <div
      className={`absolute ${position} rounded-full animate-float opacity-60`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color}40 0%, ${color}20 50%, transparent 100%)`,
        filter: 'blur(1px)',
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    />
  )
}

const Hero = () => {
  const [currentText, setCurrentText] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const heroTexts = [
    'Kreatif, Inovatif dan Inspiratif',
    'Solusi Digital Masa Depan',
    'Teknologi Terdepan'
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Particle field */}
        <ParticleField />
        
        {/* Glowing orbs */}
        <GlowingOrb size="300px" color="#00bcd4" delay={0} position="top-20 left-10" />
        <GlowingOrb size="200px" color="#0099ff" delay={1} position="top-40 right-20" />
        <GlowingOrb size="250px" color="#00ffff" delay={2} position="bottom-20 left-1/4" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 188, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 188, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Central light beam */}
        <div className="absolute top-0 w-1 h-full transform -translate-x-1/2 left-1/2 bg-gradient-to-b from-transparent via-primary-300/50 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="section-container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Column - Content */}
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 border rounded-full bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 backdrop-blur-sm">
                <div className="w-2 h-2 mr-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary-200">Software House Terpercaya</span>
                <Zap className="w-4 h-4 ml-2 text-primary-300" />
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                  <span className="text-white">99 AERO</span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-400 bg-clip-text animate-pulse">
                    POWER
                  </span>
                </h1>
                
                <div className="h-16 overflow-hidden">
                  <div 
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${currentText * 100}%)` }}
                  >
                    {heroTexts.map((text, index) => (
                      <p key={index} className="flex items-center h-16 text-xl font-light md:text-2xl text-primary-200">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
                Mewujudkan transformasi digital dengan teknologi terdepan. 
                Kami menghadirkan solusi inovatif yang mengintegrasikan AI, cloud computing, 
                dan pengalaman pengguna yang luar biasa.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <a 
                  href="#contact" 
                  className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 group rounded-2xl hover:scale-105"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-cyan-500 group-hover:from-primary-400 group-hover:to-cyan-400" />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center">
                    Mulai Project
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                
                <a 
                  href="#portfolio" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 border group border-white/30 rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Lihat Demo
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                {[
                  { value: '50+', label: 'Projects', icon: Star },
                  { value: '5+', label: 'Years', icon: Shield },
                  { value: '20+', label: 'Clients', icon: Layers }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 mr-2 text-primary-300" />
                      <div className="text-2xl font-bold text-white transition-colors md:text-3xl group-hover:text-primary-300">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative flex items-center justify-center">
              {/* Floating features */}
              <FloatingFeature 
                icon={Globe} 
                title="Web Development" 
                description="Modern & Responsive"
                delay={0}
                style={{ top: '10%', left: '0%' }}
              />
              <FloatingFeature 
                icon={Smartphone} 
                title="Mobile Apps" 
                description="iOS & Android"
                delay={0.5}
                style={{ top: '20%', right: '0%' }}
              />
              <FloatingFeature 
                icon={Cpu} 
                title="AI Integration" 
                description="Smart Solutions"  
                delay={1}
                style={{ bottom: '30%', left: '10%' }}
              />
              <FloatingFeature 
                icon={Shield} 
                title="Secure Systems" 
                description="Enterprise Grade"
                delay={1.5}
                style={{ bottom: '10%', right: '10%' }}
              />

              {/* Central holographic card */}
              <div className="relative mx-auto w-80 h-96">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-cyan-500/30 rounded-3xl blur-xl" />
                
                {/* Main card */}
                <div className="relative w-full h-full p-8 border shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-white/20 to-white/5 border-white/30 rounded-3xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-xl">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Digital Solutions</h3>
                        <p className="text-sm text-primary-200">PT. Iklima Sukses Mandiri</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                  </div>

                  {/* Services grid */}
                  <div className="mb-6 space-y-4">
                    {[
                      { icon: Globe, name: 'Website Development', progress: 95 },
                      { icon: Smartphone, name: 'Mobile Apps', progress: 90 },
                      { icon: Layers, name: 'Custom Systems', progress: 88 }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center p-3 space-x-3 rounded-xl bg-white/10 backdrop-blur-sm">
                        <div className="p-2 rounded-lg bg-primary-500/20">
                          <service.icon className="w-4 h-4 text-primary-300" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-sm font-medium text-white">{service.name}</div>
                          <div className="w-full bg-white/20 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-primary-400 to-cyan-400 h-1.5 rounded-full transition-all duration-1000 delay-1000"
                              style={{ width: isVisible ? `${service.progress}%` : '0%' }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-primary-200">{service.progress}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom section */}
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rotating border */}
                <div className="absolute inset-0 opacity-50 rounded-3xl bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500 animate-spin" style={{ 
                  background: 'conic-gradient(from 0deg, #00bcd4, #00ffff, #0099ff, #00bcd4)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'subtract',
                  padding: '2px',
                  animationDuration: '8s'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  )
}

export default Hero