<template>
  <div class="relative min-h-screen flex flex-col bg-paper">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] btn btn-sun">Skip to content</a>
    <Navbar />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
