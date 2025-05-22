import React, { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: 'Tentang Kami' },
    { href: '#services', label: 'Layanan' },
    { href: '#advantages', label: 'Keunggulan' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Kontak' },
  ]

  return (
    <>
      {/* Floating Header */}
      <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? 'w-[95%] max-w-6xl' : 'w-[90%] max-w-5xl'
      }`}>
        <div className={`relative backdrop-blur-2xl bg-white/80 border border-white/20 shadow-2xl transition-all duration-500 ${
          isOpen ? 'rounded-3xl' : 'rounded-full'
        } ${isScrolled ? 'shadow-lg bg-white/90' : 'shadow-xl'}`}>
          
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
          
          {/* Main Header Content */}
          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="z-10 flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full opacity-75 bg-gradient-to-br from-primary-400 to-primary-600 blur-md animate-pulse" />
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg gradient-bg">
                    <Globe className="text-white w-7 h-7" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">
                    99 AERO
                  </h1>
                  <p className="-mt-1 text-sm font-medium text-primary-600">
                    POWER
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="items-center hidden space-x-8 lg:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 font-medium text-gray-700 transition-all duration-300 group hover:text-primary-600"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 transition-all duration-300 transform scale-95 rounded-full opacity-0 bg-gradient-to-r from-primary-50 to-primary-100 group-hover:opacity-100 group-hover:scale-100" />
                  </a>
                ))}
              </nav>

              {/* CTA Button (Desktop) */}
              <div className="items-center hidden space-x-4 lg:flex">
                <a 
                  href="#contact"
                  className="relative px-6 py-3 overflow-hidden font-semibold text-white rounded-full group"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700" />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                  <span className="relative z-10">Hubungi Kami</span>
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 transition-all duration-300 rounded-full lg:hidden bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute left-0 top-1 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-3' : ''
                  }`} />
                  <span className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`} />
                  <span className={`absolute left-0 top-5 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-3' : ''
                  }`} />
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}>
              <div className="pt-6 border-t border-gray-200/50">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative px-4 py-3 font-medium text-gray-700 transition-all duration-300 group rounded-2xl hover:text-primary-600"
                    >
                      <div className="absolute inset-0 transition-all duration-300 transform scale-95 opacity-0 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl group-hover:opacity-100 group-hover:scale-100" />
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  ))}
                </nav>
                
                {/* Mobile CTA */}
                <div className="pt-6 mt-6 border-t border-gray-200/50">
                  <a 
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-6 py-3 font-semibold text-center text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl hover:from-primary-600 hover:to-primary-700 hover:scale-105"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute w-1/2 h-1 transform -translate-x-1/2 -bottom-1 left-1/2 bg-gradient-to-r from-transparent via-primary-300/50 to-transparent blur-sm" />
        </div>
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="h-24" />
    </>
  )
}

export default Header