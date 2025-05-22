import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, Calendar, User, Tag, Sparkles, Filter, Eye } from 'lucide-react'

// Enhanced particle system for portfolio
const PortfolioParticles = () => {
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
    const particleCount = 100

    // Initialize particles with portfolio theme
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 80 + 180, // Blue to cyan spectrum
        pulse: Math.random() * Math.PI * 2,
        type: Math.random() > 0.7 ? 'star' : 'circle' // Mix of shapes
      })
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 2000
          particle.vx -= dx * force
          particle.vy -= dy * force
          particle.opacity = Math.min(0.8, particle.opacity + 0.1)
        } else {
          particle.opacity = Math.max(0.1, particle.opacity - 0.01)
        }
        
        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity * (0.8 + 0.2 * Math.sin(particle.pulse))
        
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        gradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        
        if (particle.type === 'star') {
          // Draw star shape
          const spikes = 4
          const outerRadius = particle.size
          const innerRadius = particle.size * 0.4
          
          ctx.beginPath()
          for (let j = 0; j < spikes * 2; j++) {
            const angle = (j * Math.PI) / spikes + particle.pulse * 0.5
            const radius = j % 2 === 0 ? outerRadius : innerRadius
            const x = particle.x + Math.cos(angle) * radius
            const y = particle.y + Math.sin(angle) * radius
            
            if (j === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
        } else {
          // Draw circle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fill()
          
          // Core
          ctx.fillStyle = `hsl(${particle.hue}, 90%, 80%)`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
        
        ctx.restore()
        
        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dist = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2)
          
          if (dist < 150) {
            ctx.save()
            ctx.globalAlpha = ((150 - dist) / 150) * 0.2
            
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y)
            lineGradient.addColorStop(0, `hsl(${particle.hue}, 70%, 60%)`)
            lineGradient.addColorStop(1, `hsl(${other.hue}, 70%, 60%)`)
            
            ctx.strokeStyle = lineGradient
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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  )
}

// Portfolio item card
const PortfolioCard = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150 + 300)
    return () => clearTimeout(timer)
  }, [index])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x / 25}deg) 
      rotateX(${-y / 25}deg) 
      translateZ(${isHovered ? 30 : 0}px)
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
        className="relative transition-all duration-500 group transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Enhanced glow effect */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-primary-500/30 via-cyan-500/20 to-primary-500/30 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Main card */}
        <div className="relative overflow-hidden border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border-white/20 rounded-3xl">
          {/* Project Image with overlay */}
          <div className="relative h-64 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 z-10`}></div>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                <p className="text-lg opacity-90">{item.year}</p>
              </div>
            </div>
            <div className="absolute z-30 top-4 right-4">
              <button className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110">
                <ExternalLink className="w-6 h-6" />
              </button>
            </div>
            
            {/* Holographic overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary-400/20 via-transparent to-cyan-400/20 opacity-0 transition-opacity duration-500 z-10 ${isHovered ? 'opacity-100' : ''}`} />
          </div>

          {/* Project Info */}
          <div className="relative p-8">
            {/* Title and meta */}
            <div className="mb-4">
              <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-primary-200">
                {item.title}
              </h3>
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {item.client}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.year}
                </div>
              </div>
            </div>

            <p className="mb-6 leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-white">
              {item.description}
            </p>

            {/* Technologies/Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full bg-primary-500/20 text-primary-300 border-primary-400/30"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <button className="justify-center w-full px-6 py-3 font-semibold text-white transition-all duration-300 group/btn bg-gradient-to-r from-primary-500/80 to-cyan-500/80 rounded-xl hover:from-primary-400 hover:to-cyan-400 hover:scale-105 hover:shadow-lg">
              <span className="flex items-center justify-center">
                <Eye className="w-5 h-5 mr-2" />
                Lihat Detail Project
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </span>
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          <div className="absolute w-16 h-16 rounded-full bottom-4 right-4 bg-gradient-to-br from-cyan-500/10 to-primary-500/10 blur-xl" />
        </div>
      </div>
    </div>
  )
}

// Client logo component
const ClientCard = ({ client, index }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100 + 800)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div 
      className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="relative p-6 text-center transition-all duration-300 border group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-2xl hover:scale-105 hover:border-primary-400/50">
        {/* Glow effect */}
        <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl blur group-hover:opacity-100" />
        
        <div className="relative">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 transition-colors duration-300 bg-gradient-to-br from-primary-100/20 to-primary-200/20 rounded-2xl group-hover:from-primary-200/30 group-hover:to-primary-300/30">
            <span className="text-lg font-bold transition-colors duration-300 text-primary-400 group-hover:text-primary-300">
              {client.logo}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-white">
            {client.name}
          </p>
        </div>
      </div>
    </div>
  )
}

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const portfolioItems = [
    {
      id: 1,
      title: 'WMS (Warehouse Management System)',
      client: 'PT. Dharma Bandar Mandiri',
      year: '2020',
      category: 'web',
      tags: ['Web Application', 'Dashboard', 'Analytics', 'Real-time'],
      description: 'Sistem manajemen gudang terintegrasi dengan fitur tracking real-time, analytics mendalam, dan management tools untuk optimasi operasional warehouse modern.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'LBJ Attendance Pro',
      client: 'Pemerintahan Kabupaten Labuan Bajo',
      year: '2022',
      category: 'mobile',
      tags: ['Mobile App', 'Government', 'Attendance', 'GPS'],
      description: 'Aplikasi absensi online untuk pegawai pemerintahan dengan fitur GPS tracking, face recognition, dan comprehensive reporting system.',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'E-Commerce Buildozzer',
      client: 'PT Graha Bilar Bangunan',
      year: '2021',
      category: 'web',
      tags: ['E-commerce', 'Online Store', 'Payment Gateway', 'Inventory'],
      description: 'Platform e-commerce lengkap untuk penjualan alat tukang, cat & perlengkapan material bangunan dengan sistem pembayaran terintegrasi dan management inventory.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      title: 'E-Cargo System',
      client: 'PT. Dharma Bandar Mandiri Cargo',
      year: '2023',
      category: 'system',
      tags: ['Web & Mobile', 'Logistics', 'Tracking', 'Analytics'],
      description: 'Sistem cargo terintegrasi untuk tracking pengiriman real-time, management customer, dan business analytics untuk logistics di seluruh Indonesia.',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const categories = [
    { id: 'all', label: 'Semua Project' },
    { id: 'web', label: 'Web Application' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'system', label: 'Custom System' }
  ]

  const clients = [
    { name: 'DBM Cargo & Logistics', logo: 'DBM' },
    { name: 'Kabupaten Manggarai Barat', logo: 'KMB' },
    { name: 'DBM Warehouse', logo: 'DBW' },
    { name: 'Buildozzer', logo: 'BDZ' },
    { name: 'Graha Bilar', logo: 'GBB' },
    { name: 'Tech Innovate', logo: 'TIN' },
    { name: 'Digital Solutions', logo: 'DSL' },
    { name: 'Future Labs', logo: 'FTL' }
  ]

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <PortfolioParticles />
        
        {/* Glowing orbs */}
        <div className="absolute rounded-full top-20 right-10 w-96 h-96 bg-gradient-to-r from-primary-500/15 to-cyan-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-primary-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/5 to-cyan-500/8 rounded-full blur-3xl" />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 188, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 188, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className={`mb-16 text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-primary-500/20 to-cyan-500/20 border-primary-300/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-primary-300" />
            <span className="font-medium text-primary-200">Portfolio Kami</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="text-white">Portfolio </span>
            <span className="text-transparent bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-400 bg-clip-text">
              Kami
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300">
            Beberapa project yang telah kami kerjakan dengan berbagai klien dari berbagai industri
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-primary-300'
              }`}
            >
              {/* Background for active state */}
              {activeCategory === category.id && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500" />
              )}
              
              {/* Background for hover state */}
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 group-hover:opacity-100" />
              
              {/* Text */}
              <span className="relative z-10 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8 mb-20 md:grid-cols-2 lg:grid-cols-2">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Clients Section */}
        <div className={`transform transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative p-8 border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-3xl">
            {/* Header */}
            <h3 className="mb-4 text-2xl font-bold text-center text-white md:text-3xl">
              Klien <span className="text-transparent bg-gradient-to-r from-primary-300 to-cyan-300 bg-clip-text">Kami</span>
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-center text-gray-400">
              Dipercaya oleh berbagai perusahaan dan institusi untuk mengembangkan solusi digital mereka
            </p>
            
            {/* Clients Grid */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {clients.map((client, index) => (
                <ClientCard key={index} client={client} index={index} />
              ))}
            </div>
            
            {/* Decorative borders */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
            <div className="absolute bottom-0 right-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio