import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "media.istockphoto.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPayload(nextConfig);
