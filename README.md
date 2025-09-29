# Illchamus Community CBO Website

A modern, responsive website for the Illchamus Community CBO in Kenya, built with Nuxt 3, Vue 3, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with beautiful layouts for all devices
- **Modern UI**: Clean, vibrant design with gradient colors and smooth animations
- **Community-Focused**: Highlights indigenous culture, mission, and impact
- **Interactive Components**: Smooth scrolling, hover effects, and form handling
- **Performance Optimized**: Fast loading with optimized images and code

## Tech Stack

- **Framework**: Nuxt 3
- **Frontend**: Vue 3 with Composition API
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Heroicons via Nuxt Icon
- **Images**: Unsplash placeholders for community-focused imagery

## Project Structure

```
├── components/
│   ├── Navbar.vue      # Transparent navigation with sticky behavior
│   ├── Hero.vue        # Full-screen hero with background image
│   ├── Features.vue    # Mission and feature cards
│   ├── Impact.vue      # Statistics and impact showcase
│   ├── Programs.vue    # Program cards with descriptions
│   ├── Gallery.vue     # Masonry-style image gallery
│   ├── Contact.vue     # Contact form and information
│   └── Footer.vue      # Footer with links and social media
├── pages/
│   └── index.vue       # Main page with all components
├── assets/css/
│   └── main.css        # Custom styles and animations
└── nuxt.config.ts      # Nuxt configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Design Guidelines

- **Colors**: Purple (#6b21a8), Blue (#1d4ed8), Red (#dc2626)
- **Typography**: Clean, modern fonts with good readability
- **Animations**: Smooth fade-in and slide-up effects
- **Responsive**: Mobile-first design with breakpoints for all devices

## Components Overview

### Navbar
- Transparent overlay on hero section
- Sticky behavior on scroll
- Mobile-responsive hamburger menu
- Smooth navigation links

### Hero
- Full-screen background image from Unsplash
- Gradient overlay for text readability
- Call-to-action buttons
- Scroll indicator

### Features
- Four feature cards with icons
- Hover effects and animations
- Cultural preservation focus

### Impact
- Statistics display with large numbers
- Image grid showcasing community
- Visual impact representation

### Programs
- Grid of program cards
- Images and descriptions
- Hover effects for interactivity

### Gallery
- Masonry-style layout
- Community and cultural images
- Hover overlays with descriptions

### Contact
- Contact form with validation
- Contact information display
- Map placeholder integration

### Footer
- Social media links
- Quick navigation
- Contact information
- Copyright and legal links

## Customization

The website is designed to be easily customizable:

- Update colors in the CSS custom properties
- Modify content in component templates
- Replace Unsplash images with actual photos
- Update contact information and social links

## Deployment

The project is ready for deployment on platforms like:
- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

Build the project:
```bash
npm run build
```

## License

This project is created for the Illchamus Community CBO. All rights reserved.