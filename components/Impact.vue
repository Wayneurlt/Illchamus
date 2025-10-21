<template>
  <section id="impact" class="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our <span class="gradient-text">Impact</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Through dedicated efforts and community partnerships, we've made significant progress in improving lives across Baringo County.
        </p>
      </div>
      
      <!-- Impact Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div 
          v-for="(stat, index) in impactStats"
          :key="stat.id"
          class="text-center group cursor-pointer"
          @click="openStatModal(stat)"
        >
          <div class="bg-gradient-to-br from-red-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon :name="stat.icon" class="h-10 w-10 text-red-600" />
          </div>
          <div class="mb-2">
            <span class="text-4xl md:text-5xl font-bold text-gray-900">{{ animatedValue(stat.value) }}</span>
            <span v-if="stat.suffix" class="text-2xl text-gray-600">{{ stat.suffix }}</span>
          </div>
          <p class="text-gray-600 font-medium">{{ stat.label }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ stat.description }}</p>
        </div>
      </div>
      
      <!-- Impact Stories -->
      <div class="mb-16">
        <h3 class="text-3xl font-bold text-gray-900 text-center mb-12">Impact Stories</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="story in impactStories"
            :key="story.id"
            class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            @click="openStoryModal(story)"
          >
            <div class="relative mb-4">
              <img 
                :src="story.image" 
                :alt="story.title"
                class="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                  {{ story.category }}
                </span>
              </div>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">{{ story.title }}</h4>
            <p class="text-gray-600 leading-relaxed mb-4">{{ story.excerpt }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:user" class="h-4 w-4 text-gray-500" />
                <span class="text-sm text-gray-600">{{ story.author }}</span>
              </div>
              <button class="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors duration-200">
                Read More →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-red-600 via-orange-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-2/3 mb-8 md:mb-0">
            <h3 class="text-3xl md:text-4xl font-bold mb-4">Join Us in Making a Difference</h3>
            <p class="text-xl text-white/90 mb-6">
              Your support can help us expand our programs and reach more members of the Illchamus community. 
              Together, we can create lasting change.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink 
                to="/donate" 
                class="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Donate Now
              </NuxtLink>
              <NuxtLink 
                to="/contact" 
                class="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Involved
              </NuxtLink>
            </div>
          </div>
          <div class="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbW11bml0eSUyMHN1cHBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
              alt="Community Support" 
              class="rounded-xl shadow-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stat Modal -->
    <div
      v-if="selectedStat"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      @click="closeStatModal"
    >
      <div 
        class="bg-white rounded-2xl max-w-2xl w-full p-8"
        @click.stop
      >
        <div class="text-center mb-6">
          <div class="bg-gradient-to-br from-red-100 to-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon :name="selectedStat.icon" class="h-12 w-12 text-red-600" />
          </div>
          <h3 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedStat.label }}</h3>
          <p class="text-4xl font-bold text-red-600 mb-4">{{ selectedStat.value }}{{ selectedStat.suffix }}</p>
        </div>
        <p class="text-gray-600 text-center mb-6">{{ selectedStat.fullDescription }}</p>
        <div class="flex justify-center">
          <button 
            @click="closeStatModal"
            class="bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    
    <!-- Story Modal -->
    <div
      v-if="selectedStory"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      @click="closeStoryModal"
    >
      <div 
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="relative">
          <img 
            :src="selectedStory.image" 
            :alt="selectedStory.title"
            class="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            @click="closeStoryModal"
            class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <Icon name="heroicons:x-mark" class="h-6 w-6" />
          </button>
        </div>
        
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-3xl font-bold text-gray-900">{{ selectedStory.title }}</h3>
            <span class="px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold">
              {{ selectedStory.category }}
            </span>
          </div>
          
          <div class="flex items-center space-x-4 mb-6">
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:user" class="h-5 w-5 text-gray-500" />
              <span class="text-gray-600">{{ selectedStory.author }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:calendar" class="h-5 w-5 text-gray-500" />
              <span class="text-gray-600">{{ selectedStory.date }}</span>
            </div>
          </div>
          
          <div class="prose max-w-none">
            <p class="text-lg text-gray-600 leading-relaxed">{{ selectedStory.content }}</p>
          </div>
          
          <div class="flex justify-center mt-8">
            <button 
              @click="closeStoryModal"
              class="bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive state
const selectedStat = ref(null)
const selectedStory = ref(null)
const animationValues = ref({})

// Impact statistics
const impactStats = ref([
  {
    id: 1,
    value: 5000,
    suffix: '+',
    label: 'Lives Impacted',
    icon: 'heroicons:users',
    description: 'Community members reached',
    fullDescription: 'We have directly impacted over 5,000 lives through our various programs, providing education, healthcare, and economic opportunities to families across Baringo County.'
  },
  {
    id: 2,
    value: 350,
    suffix: '+',
    label: 'Students Supported',
    icon: 'heroicons:academic-cap',
    description: 'Educational assistance provided',
    fullDescription: 'Our education programs have supported over 350 students with scholarships, school supplies, and mentorship programs, helping them achieve their academic goals.'
  },
  {
    id: 3,
    value: 12,
    label: 'Communities Reached',
    icon: 'heroicons:building-office',
    description: 'Villages and settlements served',
    fullDescription: 'We have extended our services to 12 different communities across Baringo County, ensuring that our impact reaches the most remote areas.'
  },
  {
    id: 4,
    value: 250,
    suffix: 'K+',
    label: 'Funds Deployed',
    icon: 'heroicons:currency-dollar',
    description: 'USD invested in community development',
    fullDescription: 'Over $250,000 has been invested in community development projects, including infrastructure, education, healthcare, and economic empowerment programs.'
  }
])

// Impact stories
const impactStories = ref([
  {
    id: 1,
    title: 'Sarah\'s Journey to Leadership',
    category: 'Education',
    author: 'Sarah Mwangi',
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    excerpt: 'From a shy student to a confident community leader, Sarah\'s transformation through our mentorship program.',
    content: 'Sarah joined our Youth Mentorship Program as a quiet 16-year-old with big dreams but little confidence. Through our comprehensive mentorship program, she developed leadership skills, public speaking abilities, and community engagement experience. Today, Sarah leads a youth group of 30 members and has organized three successful community clean-up campaigns. Her story represents the transformative power of mentorship and the potential that exists in every young person in our community.'
  },
  {
    id: 2,
    title: 'Mobile Clinic Saves Lives',
    category: 'Health',
    author: 'Dr. James Kiprotich',
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    excerpt: 'How our mobile health clinic brought essential medical care to remote communities.',
    content: 'Our mobile health clinic has been a game-changer for remote communities in Baringo County. In just one month, we provided medical care to over 200 patients who otherwise would have had to travel 50+ kilometers to reach the nearest health facility. The clinic offers general consultations, maternal health services, and health education. This initiative has significantly improved health outcomes and reduced the burden on families who previously had to choose between healthcare and other essential needs.'
  },
  {
    id: 3,
    title: 'Cultural Festival Unites Community',
    category: 'Culture',
    author: 'Elder John Kipchoge',
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    excerpt: 'The annual cultural festival brought together 800+ community members to celebrate Illchamus heritage.',
    content: 'Our annual Cultural Heritage Festival has become the highlight of the year for our community. This year\'s festival attracted over 800 participants from across Baringo County and beyond. The three-day event featured traditional music performances, dance competitions, art exhibitions, and storytelling sessions. The festival not only preserves our cultural heritage but also creates economic opportunities for local artisans and performers. It\'s a beautiful example of how culture can be both preserved and used as a tool for community development and economic empowerment.'
  }
])

// Computed properties
const animatedValue = (value) => {
  const key = value.toString()
  return animationValues.value[key] || 0
}

// Methods
const openStatModal = (stat) => {
  selectedStat.value = stat
  document.body.style.overflow = 'hidden'
}

const closeStatModal = () => {
  selectedStat.value = null
  document.body.style.overflow = ''
}

const openStoryModal = (story) => {
  selectedStory.value = story
  document.body.style.overflow = 'hidden'
}

const closeStoryModal = () => {
  selectedStory.value = null
  document.body.style.overflow = ''
}

// Animation function
const animateValue = (key, start, end, duration) => {
  const startTime = performance.now()
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    const current = Math.floor(start + (end - start) * progress)
    animationValues.value[key] = current
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    if (selectedStat.value) {
      closeStatModal()
    } else if (selectedStory.value) {
      closeStoryModal()
    }
  }
}

// Lifecycle
onMounted(() => {
  // Animate statistics on mount
  impactStats.value.forEach((stat, index) => {
    setTimeout(() => {
      animateValue(stat.value.toString(), 0, stat.value, 2000)
    }, index * 200)
  })
  
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>