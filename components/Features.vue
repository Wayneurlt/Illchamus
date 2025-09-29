<template>
  <section id="about" class="py-24 bg-gradient-to-br from-orange-50/40 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20">
        <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
          Our <span class="gradient-text">Mission</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          We are dedicated to preserving our cultural heritage while empowering our community through education, support, and sustainable development.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Cultural Preservation -->
        <div class="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300">
          <div class="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg btn-maasai">
            <Icon name="heroicons:book-open" class="h-10 w-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Cultural Preservation
          </h3>
          <p class="text-gray-600 text-center leading-relaxed">
            Safeguarding the traditions, stories, and practices of the Illchamus people.
          </p>
        </div>
        
        <!-- Education Programs -->
        <div class="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300">
          <div class="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg btn-maasai">
            <Icon name="heroicons:academic-cap" class="h-10 w-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Education Programs
          </h3>
          <p class="text-gray-600 text-center leading-relaxed">
            Providing learning opportunities for children and youth in our community.
          </p>
        </div>
        
        <!-- Women Empowerment -->
        <div class="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300">
          <div class="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg btn-maasai">
            <Icon name="heroicons:heart" class="h-10 w-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Women Empowerment
          </h3>
          <p class="text-gray-600 text-center leading-relaxed">
            Supporting women with skills, leadership, and economic independence.
          </p>
        </div>
        
        <!-- Environmental Stewardship -->
        <div class="card-hover bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300">
          <div class="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg btn-maasai">
            <Icon name="heroicons:leaf" class="h-10 w-10 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Environmental Stewardship
          </h3>
          <p class="text-gray-600 text-center leading-relaxed">
            Protecting Lake Baringo and our natural environment.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed for this component
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #6b21a8, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(135deg, #6b21a8, #1d4ed8);
}

.gradient-bg-red {
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}
</style>
