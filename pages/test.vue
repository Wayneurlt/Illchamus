<template>
  <div id="app" class="font-poppins">
    <!-- Navigation -->
    <nav class="fixed w-full bg-white shadow-md z-50 transition-all duration-300" :class="{'py-2': scrolled, 'py-4': !scrolled}">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
          <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Illchamus Logo" class="h-12 w-12 rounded-full object-cover mr-3">
          <span class="text-xl font-bold text-green-700">Illchamus Community</span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8">
          <a href="#home" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</a>
          <a href="#about" class="text-gray-700 hover:text-green-600 font-medium transition-colors">About</a>
          <a href="#programs" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Programs</a>
          <a href="#impact" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Impact</a>
          <a href="#gallery" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Gallery</a>
          <a href="#contact" class="text-gray-700 hover:text-green-600 font-medium transition-colors">Contact</a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-gray-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <!-- Donate Button -->
        <button class="hidden md:block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
          Donate Now
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white py-4 px-4 shadow-lg">
        <div class="flex flex-col space-y-4">
          <a href="#home" class="text-gray-700 hover:text-green-600 font-medium" @click="mobileMenuOpen = false">Home</a>
          <a href="#about" class="text-gray-700 hover:text-green-600 font-medium" @click="mobileMenuOpen = false">About</a>
          <a href="#programs" class="text-gray-700 hover:text-green-600 font-medium" @click="mobileMenuOpen = false">Programs</a>
          <a href="#impact" class="text-gray-700 hover:text-green-600 font-medium" @click="mobileMenuOpen = false">Impact</a>
          <a href="#gallery" class="text-gray-700 hover:text-green-600 font-medium" @click="mobileMenuOpen = false">Gallery</a>
          <a href="#contact" class="text-gray-700 hover:text-green-600 font-medium" @click="mobileMenuOpen = false">Contact</a>
          <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium w-full">
            Donate Now
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-green-50 to-blue-50 relative overflow-hidden">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Empowering the <span class="text-green-600">Illchamus</span> Community
          </h1>
          <p class="text-lg text-gray-600 mb-8 max-w-lg">
            We are dedicated to sustainable development, education, healthcare, and economic empowerment for the Illchamus people of Kenya.
          </p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg">
              Get Involved
            </button>
            <button class="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-full font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div class="md:w-1/2" data-aos="fade-left">
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                 alt="Illchamus Community" 
                 class="rounded-2xl shadow-2xl w-full h-64 md:h-96 object-cover">
            <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div class="flex items-center">
                <div class="bg-green-100 p-3 rounded-full mr-4">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-800">5,000+</p>
                  <p class="text-gray-600">Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Our Organization</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">The Illchamus Community Development Organization is committed to uplifting the Illchamus people through sustainable initiatives in education, healthcare, and economic development.</p>
        </div>
        
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFmcmljYW4lMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                 alt="Illchamus Community" 
                 class="rounded-2xl shadow-lg w-full h-64 md:h-96 object-cover">
          </div>
          <div class="md:w-1/2 md:pl-12" data-aos="fade-left">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Our Mission & Vision</h3>
            <p class="text-gray-600 mb-6">We envision a self-reliant, educated, and healthy Illchamus community that preserves its cultural heritage while embracing sustainable development.</p>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">Education Access</h4>
                  <p class="text-gray-600">Providing scholarships and building educational infrastructure for Illchamus youth.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">Healthcare Initiatives</h4>
                  <p class="text-gray-600">Improving access to healthcare services and promoting community health education.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-green-100 p-2 rounded-full mr-4 mt-1">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">Economic Empowerment</h4>
                  <p class="text-gray-600">Supporting sustainable livelihoods through skills training and micro-finance programs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Programs Section -->
    <section id="programs" class="py-16 bg-green-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Programs</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">We implement targeted programs to address the most pressing needs of the Illchamus community.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Program 1 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="100">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                 alt="Education Program" 
                 class="w-full h-48 object-cover">
            <div class="p-6">
              <div class="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Education for All</h3>
              <p class="text-gray-600 mb-4">Scholarships, school supplies, and infrastructure development to ensure every Illchamus child has access to quality education.</p>
              <a href="#" class="text-green-600 font-medium flex items-center">
                Learn More
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Program 2 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="200">
            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                 alt="Healthcare Program" 
                 class="w-full h-48 object-cover">
            <div class="p-6">
              <div class="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Community Health</h3>
              <p class="text-gray-600 mb-4">Mobile clinics, health education, and maternal care programs to improve health outcomes in the Illchamus community.</p>
              <a href="#" class="text-green-600 font-medium flex items-center">
                Learn More
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Program 3 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="300">
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcG93ZXJtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                 alt="Empowerment Program" 
                 class="w-full h-48 object-cover">
            <div class="p-6">
              <div class="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Economic Empowerment</h3>
              <p class="text-gray-600 mb-4">Skills training, micro-loans, and agricultural support to create sustainable livelihoods for Illchamus families.</p>
              <a href="#" class="text-green-600 font-medium flex items-center">
                Learn More
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section id="impact" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Through dedicated efforts and community partnerships, we've made significant progress in improving lives.</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div class="text-center" data-aos="fade-up" data-aos-delay="100">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mb-2">5,000+</p>
            <p class="text-gray-600">Lives Impacted</p>
          </div>
          
          <div class="text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mb-2">350+</p>
            <p class="text-gray-600">Students Supported</p>
          </div>
          
          <div class="text-center" data-aos="fade-up" data-aos-delay="300">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mb-2">12</p>
            <p class="text-gray-600">Communities Reached</p>
          </div>
          
          <div class="text-center" data-aos="fade-up" data-aos-delay="400">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <p class="text-3xl font-bold text-gray-800 mb-2">$250K+</p>
            <p class="text-gray-600">Funds Deployed</p>
          </div>
        </div>
        
        <div class="bg-green-600 rounded-2xl p-8 md:p-12 text-white" data-aos="fade-up">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-2/3 mb-8 md:mb-0">
              <h3 class="text-2xl md:text-3xl font-bold mb-4">Join Us in Making a Difference</h3>
              <p class="mb-6">Your support can help us expand our programs and reach more members of the Illchamus community. Together, we can create lasting change.</p>
              <button class="bg-white text-green-600 hover:bg-green-100 px-8 py-3 rounded-full font-medium transition-colors shadow-lg">
                Donate Now
              </button>
            </div>
            <div class="md:w-1/3">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbW11bml0eSUyMHN1cHBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                   alt="Community Support" 
                   class="rounded-xl shadow-lg w-full h-48 object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="py-16 bg-green-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Impact in Pictures</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Visual stories of transformation and hope from the Illchamus community.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWZyaWNhbiUyMGNoaWxkcmVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                 alt="Children in school" 
                 class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
          </div>
          
          <div class="rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbW11bml0eSUyMGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                 alt="Community health" 
                 class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
          </div>
          
          <div class="rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFmcmljYW4lMjBmYXJtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                 alt="Agricultural training" 
                 class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
          </div>
          
          <div class="rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="400">
            <img src="https://images.unsplash.com/photo-1516627145497-ae69578cfc06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFmcmljYW4lMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                 alt="Women empowerment" 
                 class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
          </div>
          
          <div class="rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="500">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFmcmljYW4lMjB2aWxsYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
                 alt="Community development" 
                 class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
          </div>
          
          <div class="rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="600">
            <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBmYW1pbGllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                 alt="Happy families" 
                 class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Reach out to learn more about our work or how you can get involved.</p>
        </div>
        
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
            <div class="bg-green-50 rounded-2xl p-8 h-full">
              <h3 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="bg-green-100 p-3 rounded-full mr-4">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Address</h4>
                    <p class="text-gray-600">Baringo County, Kenya</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="bg-green-100 p-3 rounded-full mr-4">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p class="text-gray-600">+254 712 345 678</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="bg-green-100 p-3 rounded-full mr-4">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Email</h4>
                    <p class="text-gray-600">info@illchamus.org</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-8">
                <h4 class="font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div class="flex space-x-4">
                  <a href="#" class="bg-green-100 text-green-600 hover:bg-green-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                  </a>
                  <a href="#" class="bg-green-100 text-green-600 hover:bg-green-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"></path>
                    </svg>
                  </a>
                  <a href="#" class="bg-green-100 text-green-600 hover:bg-green-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="md:w-1/2 md:pl-12" data-aos="fade-left">
            <form class="bg-white rounded-2xl shadow-lg p-8">
              <div class="mb-6">
                <label for="name" class="block text-gray-700 font-medium mb-2">Full Name</label>
                <input type="text" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Your name">
              </div>
              
              <div class="mb-6">
                <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
                <input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Your email">
              </div>
              
              <div class="mb-6">
                <label for="subject" class="block text-gray-700 font-medium mb-2">Subject</label>
                <input type="text" id="subject" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Subject">
              </div>
              
              <div class="mb-6">
                <label for="message" class="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Your message"></textarea>
              </div>
              
              <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-8 md:mb-0">
            <div class="flex items-center mb-4">
              <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Illchamus Logo" class="h-10 w-10 rounded-full object-cover mr-3">
              <span class="text-xl font-bold">Illchamus Community</span>
            </div>
            <p class="text-gray-400 max-w-md">Empowering the Illchamus community through education, healthcare, and sustainable development initiatives.</p>
          </div>
          
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Programs</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 mb-4 md:mb-0">© 2023 Illchamus Community Development Organization. All rights reserved.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
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
  background: #16a34a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #15803d;
}
</style>