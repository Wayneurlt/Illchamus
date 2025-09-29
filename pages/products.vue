<template>
  <div>
    <Navbar />

    <section class="pt-28 pb-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
        <p class="mt-4 text-gray-600 max-w-3xl">Explore community-crafted products that support our programs.</p>
      </div>
    </section>

    <!-- Product grid -->
    <section class="pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(product, i) in products" :key="i" class="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div class="aspect-video bg-gray-50">
              <img :src="product.image" alt="Product" class="w-full h-full object-cover" />
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
              <p class="mt-2 text-sm text-gray-600">{{ product.description }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="font-semibold text-purple-700">KES {{ product.price }}</span>
                <div class="flex items-center gap-2">
                  <span v-if="product.badge" class="px-2 py-1 text-xs rounded-full text-white btn-maasai">{{ product.badge }}</span>
                  <NuxtLink to="/donate" class="px-3 py-2 rounded-lg text-sm font-semibold text-white btn-maasai transition-colors">Support</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({ title: 'Products • Illchamus Community CBO' })
const products = [
  { name: 'Beaded Necklace', price: 1500, image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=2069&auto=format&fit=crop', description: 'Traditional Maasai beadwork made by local artisans.', badge: 'New' },
  { name: 'Shuka Cloth', price: 2500, image: 'https://images.unsplash.com/photo-1617038260896-e4b96f9a1731?q=80&w=1974&auto=format&fit=crop', description: 'Iconic Maasai blanket in vibrant colors.', badge: 'Popular' },
  { name: 'Leather Sandals', price: 2000, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop', description: 'Handcrafted durable sandals supporting families.' },
  { name: 'Beaded Bracelet', price: 800, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1975&auto=format&fit=crop', description: 'Colorful bracelet symbolizing culture and unity.', badge: 'Best Value' },
  { name: 'Gourd Decor', price: 1800, image: 'https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=1975&auto=format&fit=crop', description: 'Decorative gourd crafted by community members.' },
  { name: 'Beaded Earrings', price: 900, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop', description: 'Elegant earrings with traditional patterns.' },
  { name: 'Shield Wall Art', price: 3200, image: 'https://images.unsplash.com/photo-1616486886892-1f22d3b1f1b9?q=80&w=1974&auto=format&fit=crop', description: 'Decor inspired by Maasai shields.', badge: 'Limited' },
  { name: 'Beaded Belt', price: 2200, image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=2069&auto=format&fit=crop', description: 'Handmade belt with traditional patterns.' },
  { name: 'Calabash Bowl', price: 2600, image: 'https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=1975&auto=format&fit=crop', description: 'Calabash vessel finished for modern homes.' }
]
</script>


