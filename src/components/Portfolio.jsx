import React, { useState } from 'react'
import { ExternalLink, Calendar, User, Tag } from 'lucide-react'

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const portfolioItems = [
    {
      id: 1,
      title: 'WMS (Warehouse Management System)',
      client: 'PT. Dharma Bandar Mandiri',
      year: '2020',
      category: 'web',
      tags: ['Web Application', 'Dashboard', 'Analytics'],
      description: 'Sistem manajemen gudang terintegrasi dengan fitur tracking, analytics, dan management tools untuk optimasi operasional warehouse.',
      image: '/api/placeholder/600/400',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'LBJ Attendance Pro',
      client: 'Pemerintahan Kabupaten Labuan Bajo',
      year: '2022',
      category: 'mobile',
      tags: ['Mobile App', 'Government', 'Attendance'],
      description: 'Aplikasi absensi online untuk pegawai pemerintahan dengan fitur GPS tracking, face recognition, dan reporting system.',
      image: '/api/placeholder/600/400',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'E-Commerce Buildozzer',
      client: 'PT Graha Bilar Bangunan',
      year: '2021',
      category: 'web',
      tags: ['E-commerce', 'Online Store', 'Payment Gateway'],
      description: 'Platform e-commerce untuk penjualan alat tukang, cat & perlengkapan material bangunan dengan sistem pembayaran terintegrasi.',
      image: '/api/placeholder/600/400',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      title: 'E-Cargo System',
      client: 'PT. Dharma Bandar Mandiri Cargo',
      year: '2023',
      category: 'system',
      tags: ['Web & Mobile', 'Logistics', 'Tracking'],
      description: 'Sistem cargo terintegrasi untuk tracking pengiriman, management customer, dan analytics bisnis logistics di seluruh Indonesia.',
      image: '/api/placeholder/600/400',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const categories = [
    { id: 'all', label: 'Semua Project' },
    { id: 'web', label: 'Web Application' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'system', label: 'Custom System' }
  ]

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">
            Portfolio <span className="gradient-text">Kami</span>
          </h2>
          <p className="section-subtitle">
            Beberapa project yang telah kami kerjakan dengan berbagai klien dari berbagai industri
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="overflow-hidden card group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                    <p className="text-lg opacity-90">{item.year}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="flex items-center justify-center w-10 h-10 text-white transition-colors duration-200 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <div className="flex items-center mb-3 space-x-4 text-sm text-gray-600">
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

                <p className="mb-4 leading-relaxed text-gray-600">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="justify-center w-full btn-primary group-hover:shadow-xl">
                  Lihat Detail Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clients Section */}
        <div className="mt-20">
          <h3 className="mb-12 text-2xl font-bold text-center">
            Klien <span className="gradient-text">Kami</span>
          </h3>
          
          <div className="grid items-center grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { name: 'DBM Cargo & Logistics', logo: 'DBM' },
              { name: 'Kabupaten Manggarai Barat', logo: 'KMB' },
              { name: 'DBM Warehouse', logo: 'DBM' },
              { name: 'Buildozzer', logo: 'BDZ' }
            ].map((client, index) => (
              <div 
                key={index}
                className="p-6 text-center transition-all duration-300 card group hover:scale-105"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 transition-all duration-300 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl group-hover:from-primary-100 group-hover:to-primary-200">
                  <span className="text-lg font-bold text-gray-600 group-hover:text-primary-600">
                    {client.logo}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio