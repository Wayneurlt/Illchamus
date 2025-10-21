<template>
  <div>
    <Navbar />

    <section class="pt-32 pb-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Blog & Updates</h1>
        <p class="mt-4 text-gray-600 max-w-3xl">Stories and updates from our community work.</p>
      </div>
    </section>

    <!-- Posts grid -->
    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="(post, i) in posts" :key="i" class="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div class="aspect-video bg-gray-50">
              <img :src="post.image" alt="Post cover" class="w-full h-full object-cover" />
            </div>
            <div class="p-5">
              <p class="text-xs text-gray-500">{{ post.date }}</p>
              <h3 class="mt-1 font-semibold text-gray-900">{{ post.title }}</h3>
              <p class="mt-2 text-sm text-gray-600">{{ post.excerpt }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span v-if="post.tag" class="px-2 py-1 text-xs rounded-full text-white btn-maasai">{{ post.tag }}</span>
                <NuxtLink :to="`/blog/${post.slug}`" class="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-800">Read more <Icon name="heroicons:arrow-right-20-solid" class="ml-1 h-4 w-4" /></NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({ title: 'Blog • Illchamus Community CBO' })
const posts = [
  { slug: 'first-charity-visit', date: 'Nov 2023', title: `First Charity Visit to Israel Faith Children's Home`, excerpt: 'We connected with children, provided essentials, and strengthened our commitment to lasting impact.', image: 'https://images.unsplash.com/photo-1560251180-1b0b3f0b1e5a?q=80&w=2070&auto=format&fit=crop', tag: 'Events' },
  { slug: 'scholarship-drive-launch', date: 'Jan 2024', title: 'Scholarship Drive Launch', excerpt: 'Launching scholarships and mentorship to empower learners for long-term success.', image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1974&auto=format&fit=crop', tag: 'Education' },
  { slug: 'community-wellness-program', date: 'Mar 2024', title: 'Community Wellness Program', excerpt: 'Integrating mental health support into schools and community groups.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1974&auto=format&fit=crop', tag: 'Wellness' },
  { slug: 'computer-literacy-bootcamp', date: 'Jun 2024', title: 'Computer Literacy Bootcamp', excerpt: 'Digital skilling for youth to prepare for modern careers.', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1975&auto=format&fit=crop', tag: 'Skills' },
  { slug: 'cultural-heritage-day', date: 'Sep 2024', title: 'Cultural Heritage Day', excerpt: 'Celebrating Illchamus traditions with music, art, and storytelling.', image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1974&auto=format&fit=crop', tag: 'Culture' },
  { slug: 'holiday-food-drive', date: 'Dec 2024', title: 'Holiday Food Drive', excerpt: 'Providing essential supplies to families across Baringo County.', image: 'https://images.unsplash.com/photo-1573495804683-641191e042ea?q=80&w=1974&auto=format&fit=crop', tag: 'Relief' }
]
</script>


