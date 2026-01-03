import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedEnv: true,
    globalNotFound: true,
  },
};

export default nextConfig;
