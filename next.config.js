/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://voucherify-examples-next.herokuapp.com/"
  }
}

module.exports = nextConfig
