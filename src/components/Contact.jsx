import React, { useState } from 'react'
import { Phone, Mail, MapPin, Send, Globe, Clock } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' })
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
    <section id="contact" className="py-20 bg-white">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">
            Hubungi <span className="gradient-text">Kami</span>
          </h2>
          <p className="section-subtitle">
            Siap membantu mewujudkan ide dan kebutuhan digital bisnis Anda. Mari diskusikan project Anda bersama kami.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Informasi Kontak
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                Tim kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami 
                melalui berbagai channel komunikasi yang tersedia.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              {contactInfo.map((contact, index) => (
                <div key={index} className="p-6 transition-all duration-300 card group hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 gradient-bg rounded-xl group-hover:scale-110">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 font-semibold text-gray-900">
                        {contact.title}
                      </h4>
                      {contact.link !== '#' ? (
                        <a 
                          href={contact.link}
                          className="text-gray-600 whitespace-pre-line transition-colors duration-200 hover:text-primary-600"
                        >
                          {contact.info}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">
                          {contact.info}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="p-6 card">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 mr-4 gradient-bg rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Jam Operasional
                </h4>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>09:00 - 18:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>09:00 - 15:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 card">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Kirim Pesan
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Nama perusahaan (opsional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ceritakan tentang project atau kebutuhan Anda..."
                />
              </div>

              <button
                type="submit"
                className="justify-center w-full py-4 text-lg btn-primary"
              >
                Kirim Pesan
                <Send className="w-5 h-5 ml-2" />
              </button>
            </form>

            <div className="p-4 mt-6 rounded-lg bg-primary-50">
              <p className="text-sm text-center text-primary-700">
                <strong>Response Time:</strong> Kami akan merespon dalam 24 jam kerja
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-20">
          <div className="p-8 text-center text-white card bg-gradient-to-r from-primary-500 to-primary-600">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              Konsultasi Gratis untuk Project Anda
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
              Dapatkan konsultasi gratis dari tim ahli kami. Kami siap membantu 
              menganalisis kebutuhan dan memberikan solusi terbaik untuk bisnis Anda.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a 
                href="tel:+6281519420311"
                className="inline-flex items-center px-8 py-3 font-semibold transition-colors duration-200 bg-white rounded-lg text-primary-600 hover:bg-gray-100"
              >
                <Phone className="w-5 h-5 mr-2" />
                Telepon Sekarang
              </a>
              <a 
                href="mailto:sales.project@99aeropower.com"
                className="inline-flex items-center px-8 py-3 font-semibold text-white transition-colors duration-200 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact