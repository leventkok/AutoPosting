import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/login',
          destination: '/auth/login',
        },
        {
          source: '/register',
          destination: '/auth/register',
        },
      ],
    }
  },
  allowedDevOrigins: ['192.168.1.108', 'localhost', '127.0.0.1'],
};

export default nextConfig;
