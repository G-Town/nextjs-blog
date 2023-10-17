/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"]
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      // https://webpack.js.org/configuration/other-options/#ignorewarnings
      {
        module: /node-fetch/,
        message: /.*Can't resolve 'encoding'.*/,
      }
    ]

    return config
  }
}

module.exports = nextConfig
