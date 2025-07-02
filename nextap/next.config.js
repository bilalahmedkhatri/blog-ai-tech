/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'tech_blog',
  images: {
    remotePatterns: [
      new URL('http://localhost:3000/**'),
      new URL('http://localhost:8000/media/**'),
      new URL('https://bilalahmed.dev/static/media/**'),
    ]
  },
};

export default nextConfig;
