import React from 'react'
import { Globe, Smartphone, Settings, ArrowRight } from 'lucide-react'

const Services = () => {
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
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">
            Layanan <span className="gradient-text">Kami</span>
          </h2>
          <p className="section-subtitle">
            Bekerja dengan Kreatif untuk Perkembangan Bisnis Anda
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 transition-all duration-300 card group hover:scale-105"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="mb-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 gradient-bg rounded-2xl group-hover:scale-110">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>

              <div className="mb-6 space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 rounded-full bg-primary-500"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button className="flex items-center justify-center w-full font-medium transition-colors duration-200 text-primary-600 hover:text-primary-700 group-hover:translate-x-1">
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl p-8 mx-auto text-white card bg-gradient-to-r from-primary-500 to-primary-600">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              Siap Memulai Project Anda?
            </h3>
            <p className="mb-6 text-lg opacity-90">
              Mari diskusikan kebutuhan bisnis Anda dan dapatkan solusi terbaik dari tim ahli kami
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 font-semibold transition-colors duration-200 bg-white rounded-lg text-primary-600 hover:bg-gray-100"
            >
              Konsultasi Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services