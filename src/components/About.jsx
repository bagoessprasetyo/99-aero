import React from 'react'
import { Target, Eye, Quote } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">
            Tentang <span className="gradient-text">Perusahaan</span>
          </h2>
          <p className="section-subtitle">
            99 Aero Power adalah perusahaan yang bergerak di dalam bidang teknologi digital, 
            yang menyediakan jasa pembuatan dan pengembang aplikasi, alias software development.
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Column - Description */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Sebuah software house akan membantu kebutuhan para pebisnis dalam mengembangkan 
                software maupun aplikasi lainnya. Kini, kehadiran Software house menjadi semakin 
                penting dan semakin dibutuhkan bagi banyak perusahaan, karena akan membuat semuanya 
                menjadi semakin praktis serta lebih mudah.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Segera otomatiskan aktivitas pekerjaan Anda dengan menggunakan aplikasi. 
                Mari diskusikan permasalahan Anda dan dapatkan solusi serta penawaran terbaik dari kami.
              </p>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 text-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <div className="mb-2 text-3xl font-bold text-primary-600">5+</div>
                <div className="font-medium text-gray-700">Tahun Pengalaman</div>
              </div>
              <div className="p-6 text-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <div className="mb-2 text-3xl font-bold text-primary-600">50+</div>
                <div className="font-medium text-gray-700">Project Selesai</div>
              </div>
            </div>
          </div>

          {/* Right Column - Vision & Mission */}
          <div className="space-y-8">
            {/* Vision */}
            <div className="p-8 card">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 mr-4 gradient-bg rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
              </div>
              
              <div className="relative">
                <Quote className="absolute w-8 h-8 text-primary-200 -top-2 -left-2" />
                <p className="pl-6 text-lg leading-relaxed text-gray-700">
                  99 Aero Power Menjadi Perusahaan Berbasis IT yang dapat memberikan 
                  solusi terbaik untuk semua kalangan
                </p>
              </div>
              
              <div className="p-4 mt-6 rounded-lg bg-primary-50">
                <p className="font-medium text-center text-primary-700">
                  "Kreatif, Inovatif dan Inspiratif"
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="p-8 card">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 mr-4 gradient-bg rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Kami Berkomitmen untuk memberikan pelayan terbaik dan dapat memberikan 
                solusi untuk permasalahan IT. Terdapat berbagai layanan yang dapat kami 
                sediakan untuk anda. Kami membrikan layanan dalam pembuatan (Website Development, 
                Mobile App Development, Ecommerce, Company Profile, UI UX Design).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About