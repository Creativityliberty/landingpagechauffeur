import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/reserver",
        destination: "/#booking",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#excursions",
        permanent: true,
      },
      {
        source: "/destinations/vtc-etretat",
        destination: "/excursions/etretat",
        permanent: true,
      },
      {
        source: "/destinations/vtc-honfleur",
        destination: "/excursions/honfleur",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
