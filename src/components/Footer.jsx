import React from 'react'
import { Globe, Phone, Mail, MapPin, ArrowUp, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
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

  return (
    <footer className="text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Main Footer Content */}
      <div className="py-16 section-container">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full gradient-bg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">99 AERO POWER</h3>
                <p className="text-sm text-primary-300">PT. Iklima Sukses Mandiri</p>
              </div>
            </div>
            
            <p className="max-w-md leading-relaxed text-gray-300">
              Software house terpercaya yang mengkhususkan diri dalam teknologi digital, 
              menyediakan solusi IT terbaik untuk kemajuan bisnis Anda dengan 
              pendekatan kreatif, inovatif, dan inspiratif.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-primary-400" />
                <a href="tel:+6281519420311" className="transition-colors hover:text-primary-300">
                  +62 815 194 20311
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:sales.project@99aeropower.com" className="transition-colors hover:text-primary-300">
                  sales.project@99aeropower.com
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Jl. Jendral Sudirman, KAV 26<br />
                  Karet Setia Budi, Sona Topas Tower 5A Floor<br />
                  Jakarta, Indonesia
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-700 rounded-full hover:bg-primary-500"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Layanan Kami</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-gray-300 transition-colors cursor-pointer hover:text-primary-300">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-primary-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Business Hours */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-primary-300">Jam Operasional</h5>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Sen - Jum</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="py-6 section-container">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                &copy; 2024 99 Aero Power - PT. Iklima Sukses Mandiri. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Built with ❤️ for digital transformation
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
                className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full bg-primary-500 hover:bg-primary-600 hover:scale-110"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer