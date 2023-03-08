/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  }
}

module.exports = () => {
  return {
    ...nextConfig,
    env: {
      GPT_API_KEY: process.env.GPT_API_KEY
    }
  }
}
