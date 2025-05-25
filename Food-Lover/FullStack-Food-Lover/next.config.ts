import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "baworntatt-nextjs-food-lover.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
  },
};

export default nextConfig;
