import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
