import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/reserver",
        destination: "/book",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/excursions",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/book",
        permanent: true,
      },
      {
        source: "/entreprises",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/cruise-port-guide",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/cruise-port-guide",
        permanent: true,
      },
      {
        source: "/stats",
        destination: "/",
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
