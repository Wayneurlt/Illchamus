import type { BlogPost } from '~/data/blog-posts'
import { blogPosts } from '~/data/blog-posts'

export function useBlogPosts() {
  const posts = blogPosts

  function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug)
  }

  function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
    return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit)
  }

  return { posts, getPostBySlug, getRelatedPosts }
}
