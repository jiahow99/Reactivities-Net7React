/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dmlkpaodl/**',
        },
        {
          protocol: 'https',
          hostname: 'imgs.search.brave.com',
          port: '',
        },
      ],
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true
    },
}

module.exports = nextConfig
