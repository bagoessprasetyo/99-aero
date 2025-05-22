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
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 gradient-bg">
              <Globe className="w-6 h-6 text-white md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                99 AERO
              </h1>
              <p className="text-xs font-medium md:text-sm text-primary-600">
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
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-primary-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 transition-colors rounded-lg lg:hidden hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="py-4 bg-white border-t border-gray-200 lg:hidden animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 transition-colors duration-200 rounded-lg hover:text-primary-600 hover:bg-primary-50"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header