import React from 'react'
import { ArrowRight, Code, Smartphone, Globe } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-16 overflow-hidden md:pt-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-20 h-20 rounded-full top-20 left-10 bg-primary-200 opacity-20 animate-float"></div>
        <div className="absolute w-16 h-16 rounded-full top-40 right-20 bg-primary-300 opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-12 h-12 rounded-full opacity-25 bottom-40 left-20 bg-primary-400 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative py-20 section-container md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary-100 text-primary-700">
                <Globe className="w-4 h-4 mr-2" />
                Software House Terpercaya
              </div>
              
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                99 AERO{' '}
                <span className="gradient-text">POWER</span>
              </h1>
              
              <p className="text-xl font-light text-gray-600 md:text-2xl">
                PT. Iklima Sukses Mandiri
              </p>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Sejalan dengan perkembangan teknologi digital yang makin hari semakin pesat, 
              nampaknya peran dari sebuah software house di dalam berbisnis pun menjadi semakin vital, 
              apalagi demi kemajuan bisnis tersebut.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="btn-primary">
                Hubungi Kami
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a href="#portfolio" className="btn-secondary">
                Lihat Portfolio
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold md:text-3xl text-primary-600">50+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold md:text-3xl text-primary-600">5+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold md:text-3xl text-primary-600">20+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              {/* Main card */}
              <div className="max-w-md p-8 mx-auto card">
                <div className="space-y-6">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto gradient-bg rounded-xl">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      Kreatif, Inovatif dan Inspiratif
                    </h3>
                    <p className="text-gray-600">
                      Menghadirkan solusi teknologi terdepan untuk kemajuan bisnis Anda
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100">
                        <Globe className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-gray-700">Website Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100">
                        <Smartphone className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-gray-700">Mobile App Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100">
                        <Code className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-gray-700">Custom Software</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute w-20 h-20 rounded-full -top-4 -right-4 bg-primary-500 opacity-10 animate-float"></div>
              <div className="absolute w-16 h-16 rounded-full -bottom-4 -left-4 bg-primary-600 opacity-10 animate-float" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero