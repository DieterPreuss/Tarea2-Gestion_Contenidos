/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: [
      'images.unsplash.com',
      's3.amazonaws.com',
      'https://tarea2-gc-wordpress.dieterpreuss.repl.co'
    ],
  }
}

module.exports = nextConfig
