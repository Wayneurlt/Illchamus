<template>
  <section id="impact" class="py-24 bg-gradient-to-br from-white to-orange-50/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20">
        <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
          Our Impact in <span class="gradient-text">Numbers</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Through our dedicated efforts, we have made a meaningful difference in the lives of our community members.
        </p>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div class="text-center slide-up bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div class="text-7xl md:text-8xl font-bold gradient-text mb-6">
            500+
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Families Supported
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Direct assistance and support provided to community families
          </p>
        </div>
        
        <div class="text-center slide-up bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div class="text-7xl md:text-8xl font-bold gradient-text mb-6">
            10+
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Years of Service
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Dedicated years serving the Illchamus community
          </p>
        </div>
        
        <div class="text-center slide-up bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div class="text-7xl md:text-8xl font-bold gradient-text mb-6">
            20+
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Local Projects Completed
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Community development initiatives successfully implemented
          </p>
        </div>
      </div>
      
      <!-- Image Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="relative overflow-hidden rounded-2xl shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Community gathering"
            class="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-red-900/20 to-transparent"></div>
          <div class="absolute bottom-6 left-6 text-white">
            <h3 class="text-2xl font-bold mb-2">Community Unity</h3>
            <p class="text-white/90">Bringing people together for a common cause</p>
          </div>
        </div>
        
        <div class="relative overflow-hidden rounded-2xl shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="People in Kenya"
            class="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-red-900/20 to-transparent"></div>
          <div class="absolute bottom-6 left-6 text-white">
            <h3 class="text-2xl font-bold mb-2">Empowered Lives</h3>
            <p class="text-white/90">Creating opportunities for growth and development</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed for this component
</script>

<style scoped>
.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
