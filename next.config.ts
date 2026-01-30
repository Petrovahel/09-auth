import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: ['ac.goit.global'],
  },
};

export default nextConfig;
