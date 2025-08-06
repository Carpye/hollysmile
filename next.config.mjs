/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dehjtwqjlvvbxcwvmvhr.supabase.co",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig
