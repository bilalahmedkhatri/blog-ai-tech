/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('http://localhost:8000/media/**'),
      new URL('https://bilalahmed.dev/static/media/**'),
      // new URL('https://images.unsplash.com/**'),
      {
        protocol: 'https',
        hostname: 'www.dukebasketballreport.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.theguardian.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.people.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '8000',
      //   pathname: '/**',
      // },
    ]
  },
};

export default nextConfig;
