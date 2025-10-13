<template>
    <div id="app" class="font-inter">
      <!-- Navigation -->
      <nav class="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 transition-all duration-300" :class="{'py-3': scrolled, 'py-5': !scrolled}">
        <div class="container mx-auto px-6 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Illchamus</span>
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center space-x-8">
            <a href="#home" class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#about" class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
              About
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#programs" class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
              Programs
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#impact" class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
              Impact
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#gallery" class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
              Stories
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
              Contact
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          </div>
          
          <!-- CTA & Mobile Menu Button -->
          <div class="flex items-center space-x-4">
            <button class="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
              Support Our Work
            </button>
            <button @click="toggleMobileMenu" class="lg:hidden text-gray-700 focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="lg:hidden bg-white/95 backdrop-blur-md py-6 px-6 border-t border-gray-100">
          <div class="flex flex-col space-y-5">
            <a href="#home" class="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100" @click="mobileMenuOpen = false">Home</a>
            <a href="#about" class="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100" @click="mobileMenuOpen = false">About</a>
            <a href="#programs" class="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100" @click="mobileMenuOpen = false">Programs</a>
            <a href="#impact" class="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100" @click="mobileMenuOpen = false">Impact</a>
            <a href="#gallery" class="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100" @click="mobileMenuOpen = false">Stories</a>
            <a href="#contact" class="text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100" @click="mobileMenuOpen = false">Contact</a>
            <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 mt-4">
              Support Our Work
            </button>
          </div>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <section id="home" class="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div class="container mx-auto px-6 relative z-10">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="lg:w-1/2 mb-12 lg:mb-0" data-aos="fade-right">
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
                <span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Empowering Communities Since 2010
              </div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Building a Brighter Future for the 
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Illchamus</span>
              </h1>
              <p class="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                We're dedicated to sustainable development, education, and economic empowerment for the Illchamus people of Kenya. Join us in creating lasting change.
              </p>
              <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Involved Today
                </button>
                <button class="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Watch Our Story
                </button>
              </div>
            </div>
            <div class="lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
              <div class="relative">
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                       alt="Illchamus Community" 
                       class="w-full h-64 md:h-96 object-cover">
                </div>
                
                <!-- Floating Stats Cards -->
                <div class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100" data-aos="fade-up" data-aos-delay="400">
                  <div class="flex items-center space-x-4">
                    <div class="bg-blue-100 p-3 rounded-lg">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-2xl font-bold text-gray-900">5,000+</p>
                      <p class="text-gray-600 text-sm">Lives Impacted</p>
                    </div>
                  </div>
                </div>
                
                <div class="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100" data-aos="fade-up" data-aos-delay="600">
                  <div class="flex items-center space-x-4">
                    <div class="bg-purple-100 p-3 rounded-lg">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-2xl font-bold text-gray-900">350+</p>
                      <p class="text-gray-600 text-sm">Students Supported</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- About Section -->
      <section id="about" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              About Our Mission
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Creating Sustainable Change</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">We believe in empowering the Illchamus community through education, healthcare, and economic opportunities that create lasting impact.</p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-4">
                  <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 h-48 flex flex-col justify-center">
                    <div class="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Safe Communities</h3>
                    <p class="text-gray-600 text-sm">Creating secure environments for families to thrive</p>
                  </div>
                  <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 h-48 flex flex-col justify-center">
                    <div class="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Economic Growth</h3>
                    <p class="text-gray-600 text-sm">Supporting sustainable livelihoods and businesses</p>
                  </div>
                </div>
                <div class="space-y-4 mt-8">
                  <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 h-48 flex flex-col justify-center">
                    <div class="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Quality Education</h3>
                    <p class="text-gray-600 text-sm">Ensuring access to learning opportunities for all</p>
                  </div>
                  <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 h-48 flex flex-col justify-center">
                    <div class="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Healthcare Access</h3>
                    <p class="text-gray-600 text-sm">Providing essential medical services to families</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div data-aos="fade-left" data-aos-delay="200">
              <div class="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
                <h3 class="text-2xl font-bold mb-6">Our Vision for 2030</h3>
                <p class="text-gray-300 mb-6 leading-relaxed">
                  By 2030, we envision an Illchamus community where every child has access to quality education, every family has sustainable economic opportunities, and cultural heritage is preserved while embracing innovation.
                </p>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>100% primary school enrollment</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Reduced maternal mortality by 60%</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Sustainable income for 80% of households</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Preservation of cultural heritage sites</span>
                  </div>
                </div>
                <button class="mt-8 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-colors">
                  Join Our Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Programs Section -->
      <section id="programs" class="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-600 text-sm font-medium mb-4 shadow-sm">
              Our Focus Areas
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Strategic Programs</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">Targeted initiatives designed to address the most critical needs of the Illchamus community.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Program 1 -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
              <div class="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                     alt="Education Program" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <div class="p-8">
                <div class="flex items-center mb-4">
                  <div class="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900">Education Excellence</h3>
                </div>
                <p class="text-gray-600 mb-6">Scholarships, school infrastructure, and teacher training to ensure quality education for Illchamus children.</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">250+ students supported annually</span>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Learn more
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Program 2 -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
              <div class="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                     alt="Healthcare Program" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <div class="p-8">
                <div class="flex items-center mb-4">
                  <div class="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900">Community Health</h3>
                </div>
                <p class="text-gray-600 mb-6">Mobile clinics, maternal care, and health education to improve wellbeing across Illchamus communities.</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">12,000+ patients served</span>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Learn more
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Program 3 -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
              <div class="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcG93ZXJtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                     alt="Empowerment Program" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <div class="p-8">
                <div class="flex items-center mb-4">
                  <div class="bg-green-100 p-3 rounded-lg mr-4">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900">Economic Empowerment</h3>
                </div>
                <p class="text-gray-600 mb-6">Skills training, micro-loans, and agricultural support to create sustainable livelihoods for families.</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">800+ entrepreneurs supported</span>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    Learn more
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Impact Section -->
      <section id="impact" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Measuring Success
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">Tangible results that demonstrate our commitment to the Illchamus community.</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div class="text-center" data-aos="fade-up" data-aos-delay="100">
              <div class="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-2 impact-number">5,000</p>
              <p class="text-gray-600">Lives Impacted</p>
            </div>
            
            <div class="text-center" data-aos="fade-up" data-aos-delay="200">
              <div class="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-2 impact-number">350</p>
              <p class="text-gray-600">Students Supported</p>
            </div>
            
            <div class="text-center" data-aos="fade-up" data-aos-delay="300">
              <div class="bg-gradient-to-br from-green-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-2 impact-number">12</p>
              <p class="text-gray-600">Communities Reached</p>
            </div>
            
            <div class="text-center" data-aos="fade-up" data-aos-delay="400">
              <div class="bg-gradient-to-br from-orange-100 to-red-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900 mb-2 impact-number">250</p>
              <p class="text-gray-600">Thousand $ Deployed</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white" data-aos="fade-up">
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="md:w-2/3 mb-8 md:mb-0">
                <h3 class="text-2xl md:text-3xl font-bold mb-4">Be Part of Our Story</h3>
                <p class="mb-6 text-blue-100">Your support enables us to expand our reach and create more opportunities for the Illchamus community. Join us in building a brighter future.</p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button class="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition-colors shadow-lg">
                    Donate Now
                  </button>
                  <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-medium transition-colors">
                    Volunteer
                  </button>
                </div>
              </div>
              <div class="md:w-1/3 flex justify-center">
                <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div class="text-center">
                    <p class="text-4xl font-bold mb-2">98%</p>
                    <p class="text-blue-100">Funds directly to programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Gallery/Stories Section -->
      <section id="gallery" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-600 text-sm font-medium mb-4 shadow-sm">
              Community Stories
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Voices of Change</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">Real stories from the Illchamus community showcasing the impact of our work.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
              <div class="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWZyaWNhbiUyMGNoaWxkcmVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                     alt="Children in school" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-medium">Education</p>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-gray-900 mb-3">Amina's Journey to School</h3>
                <p class="text-gray-600 text-sm mb-4">How our scholarship program enabled Amina to become the first in her family to attend secondary school.</p>
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  Read full story
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group" data-aos="fade-up" data-aos-delay="200">
              <div class="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbW11bml0eSUyMGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                     alt="Community health" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-medium">Healthcare</p>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-gray-900 mb-3">Mobile Clinic Saves Lives</h3>
                <p class="text-gray-600 text-sm mb-4">Our mobile health unit provides essential care to remote Illchamus villages, transforming community health outcomes.</p>
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  Read full story
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group" data-aos="fade-up" data-aos-delay="300">
              <div class="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFmcmljYW4lMjBmYXJtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                     alt="Agricultural training" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-medium">Agriculture</p>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-gray-900 mb-3">From Subsistence to Success</h3>
                <p class="text-gray-600 text-sm mb-4">How our agricultural training program helped James transform his small farm into a thriving business.</p>
                <a href="#" class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  Read full story
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-12" data-aos="fade-up">
            <button class="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-medium transition-colors">
              View All Stories
            </button>
          </div>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section id="contact" class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-lg">Ready to make a difference? Reach out to learn more about our work or explore partnership opportunities.</p>
          </div>
          
          <div class="flex flex-col lg:flex-row gap-12">
            <div class="lg:w-2/5" data-aos="fade-right">
              <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div class="space-y-6">
                  <div class="flex items-start">
                    <div class="bg-white p-3 rounded-xl shadow-sm mr-4">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-1">Our Location</h4>
                      <p class="text-gray-600">Baringo County, Kenya</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="bg-white p-3 rounded-xl shadow-sm mr-4">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-1">Phone Number</h4>
                      <p class="text-gray-600">+254 712 345 678</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="bg-white p-3 rounded-xl shadow-sm mr-4">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-1">Email Address</h4>
                      <p class="text-gray-600">info@illchamus.org</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-200">
                  <h4 class="font-semibold text-gray-900 mb-4">Follow Our Journey</h4>
                  <div class="flex space-x-4">
                    <a href="#" class="bg-white p-3 rounded-xl shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                      </svg>
                    </a>
                    <a href="#" class="bg-white p-3 rounded-xl shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"></path>
                      </svg>
                    </a>
                    <a href="#" class="bg-white p-3 rounded-xl shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="lg:w-3/5" data-aos="fade-left" data-aos-delay="200">
              <form class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label for="name" class="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input type="text" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Your name">
                  </div>
                  
                  <div>
                    <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Your email">
                  </div>
                </div>
                
                <div class="mb-6">
                  <label for="subject" class="block text-gray-700 font-medium mb-2">Subject</label>
                  <input type="text" id="subject" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="Subject of your message">
                </div>
                
                <div class="mb-6">
                  <label for="message" class="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea id="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="submit" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-center mb-8">
            <div class="mb-6 md:mb-0">
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <span class="text-xl font-bold">Illchamus Community</span>
              </div>
              <p class="text-gray-400 max-w-md text-sm">Empowering the Illchamus community through sustainable development, education, and economic opportunities.</p>
            </div>
            
            <div class="flex space-x-6">
              <a href="#home" class="text-gray-400 hover:text-white transition-colors text-sm">Home</a>
              <a href="#about" class="text-gray-400 hover:text-white transition-colors text-sm">About</a>
              <a href="#programs" class="text-gray-400 hover:text-white transition-colors text-sm">Programs</a>
              <a href="#contact" class="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
          
          <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm mb-4 md:mb-0">© 2023 Illchamus Community Development Organization. All rights reserved.</p>
            <div class="flex space-x-6">
              <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        scrolled: false,
        mobileMenuOpen: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      
      // Initialize AOS
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100
        });
      }
      
      // Initialize GSAP animations
      this.initGSAP();
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 50;
      },
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
      },
      initGSAP() {
        // GSAP animations for hero section
        if (typeof gsap !== 'undefined') {
          gsap.from('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
          });
          
          // ScrollTrigger animations for impact numbers
          gsap.utils.toArray('.impact-number').forEach(number => {
            gsap.from(number, {
              scrollTrigger: {
                trigger: number,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              },
              innerText: 0,
              duration: 2,
              snap: { innerText: 1 },
              stagger: 1
            });
          });
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  body {
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #1d4ed8, #6d28d9);
  }
  
  /* Animation for blob elements */
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  </style>