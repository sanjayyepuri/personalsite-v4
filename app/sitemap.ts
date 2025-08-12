import { getBlogPosts } from 'app/blog/utils'

export const basePath = process.env.NEXT_PUBLIC_PAGES_BASE_PATH || ''

export const baseUrl = basePath 
  ? `https://sanjay.engineering${basePath}`
  : 'https://sanjay.engineering'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
