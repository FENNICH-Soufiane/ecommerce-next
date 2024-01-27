/** @type {import('next').NextConfig} */
const nextConfig = {
  // serverActions: {
  //   bodySizeLimit: "5mb", // Set desired value here
  // },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
