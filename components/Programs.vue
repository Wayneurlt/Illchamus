<template>
  <section id="programs" class="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our <span class="gradient-text">Programs</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          We offer a variety of programs designed to support and empower our community members across different areas of need.
        </p>
        
        <!-- Program Categories Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="category in programCategories"
            :key="category.id"
            @click="setActiveCategory(category.id)"
            class="px-6 py-3 rounded-full font-semibold transition-all duration-300"
            :class="activeCategory === category.id 
              ? 'bg-red-600 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-700 border border-gray-300 hover:border-red-300 hover:text-red-600'"
          >
            <Icon :name="category.icon" class="h-5 w-5 mr-2 inline" />
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <!-- Programs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(program, index) in filteredPrograms"
          :key="program.id"
          class="group card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-red-300 transition-all duration-300"
          @click="openProgramModal(program)"
        >
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="program.image" 
              :alt="program.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                {{ program.category }}
              </span>
            </div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <h3 class="text-xl font-bold mb-1">{{ program.title }}</h3>
              <p class="text-sm text-white/90">{{ program.shortDescription }}</p>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:users" class="h-4 w-4 text-red-600" />
                <span class="text-sm text-gray-600">{{ program.participants }}+ participants</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:calendar" class="h-4 w-4 text-red-600" />
                <span class="text-sm text-gray-600">{{ program.duration }}</span>
          </div>
        </div>
        
            <p class="text-gray-600 leading-relaxed mb-4">
              {{ program.description }}
            </p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:star" class="h-4 w-4 text-yellow-500" />
                  <span class="text-sm font-medium text-gray-700">{{ program.rating }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:heart" class="h-4 w-4 text-red-500" />
                  <span class="text-sm text-gray-600">{{ program.impact }}</span>
                </div>
              </div>
              <button class="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors duration-200">
                Learn More →
              </button>
            </div>
          </div>
          </div>
        </div>
        
      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <div class="bg-gradient-to-r from-red-600 via-orange-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 class="text-3xl md:text-4xl font-bold mb-4">Ready to Get Involved?</h3>
          <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join our programs and be part of the positive change in our community. Every contribution makes a difference.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/contact" 
              class="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Join a Program
            </NuxtLink>
            <NuxtLink 
              to="/donate" 
              class="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Support Our Work
            </NuxtLink>
          </div>
        </div>
          </div>
        </div>
        
    <!-- Program Modal -->
    <div
      v-if="selectedProgram"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      @click="closeProgramModal"
    >
      <div 
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="relative">
          <img 
            :src="selectedProgram.image" 
            :alt="selectedProgram.title"
            class="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            @click="closeProgramModal"
            class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <Icon name="heroicons:x-mark" class="h-6 w-6" />
          </button>
        </div>
        
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-3xl font-bold text-gray-900">{{ selectedProgram.title }}</h3>
            <span class="px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold">
              {{ selectedProgram.category }}
            </span>
          </div>
          
          <p class="text-lg text-gray-600 mb-8">{{ selectedProgram.fullDescription }}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gray-50 rounded-xl p-6">
              <Icon name="heroicons:users" class="h-8 w-8 text-red-600 mb-3" />
              <h4 class="font-semibold text-gray-900 mb-2">Participants</h4>
              <p class="text-2xl font-bold text-red-600">{{ selectedProgram.participants }}+</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-6">
              <Icon name="heroicons:calendar" class="h-8 w-8 text-red-600 mb-3" />
              <h4 class="font-semibold text-gray-900 mb-2">Duration</h4>
              <p class="text-2xl font-bold text-red-600">{{ selectedProgram.duration }}</p>
          </div>
            <div class="bg-gray-50 rounded-xl p-6">
              <Icon name="heroicons:heart" class="h-8 w-8 text-red-600 mb-3" />
              <h4 class="font-semibold text-gray-900 mb-2">Impact</h4>
              <p class="text-2xl font-bold text-red-600">{{ selectedProgram.impact }}</p>
        </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink 
              to="/contact" 
              class="flex-1 bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-semibold text-center transition-colors duration-200"
            >
              Join This Program
            </NuxtLink>
            <button 
              @click="closeProgramModal"
              class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const activeCategory = ref('all')
const selectedProgram = ref(null)

// Program categories
const programCategories = ref([
  { id: 'all', name: 'All Programs', icon: 'heroicons:squares-2x2' },
  { id: 'education', name: 'Education', icon: 'heroicons:academic-cap' },
  { id: 'health', name: 'Health', icon: 'heroicons:heart' },
  { id: 'culture', name: 'Culture', icon: 'heroicons:musical-note' },
  { id: 'economic', name: 'Economic', icon: 'heroicons:currency-dollar' },
  { id: 'environment', name: 'Environment', icon: 'heroicons:globe-alt' },
  { id: 'women', name: 'Women', icon: 'heroicons:user-group' }
])

// Programs data
const programs = ref([
  {
    id: 1,
    title: 'Youth Mentorship Program',
    category: 'Education',
    categoryId: 'education',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    shortDescription: 'Building tomorrow\'s leaders',
    description: 'Guiding the next generation with mentorship and training programs that build leadership skills and character.',
    fullDescription: 'Our Youth Mentorship Program pairs experienced community members with young people aged 15-25 to provide guidance, support, and skill development. Through regular meetings, workshops, and hands-on projects, we help youth develop leadership skills, career readiness, and community engagement.',
    participants: 150,
    duration: '6 months',
    rating: '4.9',
    impact: '95% success rate'
  },
  {
    id: 2,
    title: 'Community Health Initiative',
    category: 'Health',
    categoryId: 'health',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    shortDescription: 'Healthcare for all',
    description: 'Improving access to healthcare for families through mobile clinics and health education programs.',
    fullDescription: 'Our Community Health Initiative brings essential healthcare services directly to remote areas. We operate mobile clinics, provide health education workshops, and connect families with medical resources. Our focus includes maternal health, child nutrition, and disease prevention.',
    participants: 500,
    duration: 'Ongoing',
    rating: '4.8',
    impact: '2,000+ lives improved'
  },
  {
    id: 3,
    title: 'Cultural Heritage Festival',
    category: 'Culture',
    categoryId: 'culture',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    shortDescription: 'Celebrating our traditions',
    description: 'Celebrating Illchamus traditions through music, dance, and art that bring our community together.',
    fullDescription: 'Our annual Cultural Heritage Festival is a vibrant celebration of Illchamus traditions, featuring traditional music, dance performances, art exhibitions, and storytelling. The festival brings together community members of all ages to preserve and share our rich cultural heritage.',
    participants: 800,
    duration: '3 days',
    rating: '4.9',
    impact: 'Community unity'
  },
  {
    id: 4,
    title: 'Economic Empowerment',
    category: 'Economic',
    categoryId: 'economic',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80',
    shortDescription: 'Building sustainable livelihoods',
    description: 'Supporting local businesses and entrepreneurs with training, resources, and micro-financing opportunities.',
    fullDescription: 'Our Economic Empowerment program provides comprehensive support for local entrepreneurs and small business owners. We offer business training, access to micro-financing, market connections, and ongoing mentorship to help community members build sustainable livelihoods.',
    participants: 200,
    duration: '12 months',
    rating: '4.7',
    impact: '150+ businesses started'
  },
  {
    id: 5,
    title: 'Lake Baringo Conservation',
    category: 'Environment',
    categoryId: 'environment',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    shortDescription: 'Protecting our environment',
    description: 'Protecting Lake Baringo and surrounding ecosystems through conservation education and sustainable practices.',
    fullDescription: 'Our environmental conservation program focuses on protecting Lake Baringo and its surrounding ecosystems. We conduct regular clean-up activities, educate the community about sustainable practices, and work with local authorities to implement conservation measures.',
    participants: 300,
    duration: 'Ongoing',
    rating: '4.8',
    impact: 'Ecosystem preservation'
  },
  {
    id: 6,
    title: 'Women\'s Leadership Program',
    category: 'Women',
    categoryId: 'women',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    shortDescription: 'Empowering women leaders',
    description: 'Providing skills training, leadership development, and economic opportunities for women in our community.',
    fullDescription: 'Our Women\'s Leadership Program empowers women through comprehensive training in leadership skills, entrepreneurship, and community engagement. We provide mentorship, networking opportunities, and support for women to take on leadership roles in their communities.',
    participants: 120,
    duration: '9 months',
    rating: '4.9',
    impact: '85% leadership roles'
  }
])

// Computed properties
const filteredPrograms = computed(() => {
  if (activeCategory.value === 'all') {
    return programs.value
  }
  return programs.value.filter(program => program.categoryId === activeCategory.value)
})

// Methods
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const openProgramModal = (program) => {
  selectedProgram.value = program
  document.body.style.overflow = 'hidden'
}

const closeProgramModal = () => {
  selectedProgram.value = null
  document.body.style.overflow = ''
}

// Keyboard navigation for modal
const handleKeydown = (event) => {
  if (event.key === 'Escape' && selectedProgram.value) {
    closeProgramModal()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
