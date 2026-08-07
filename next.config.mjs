const nextConfig = {
  // 1. Konfigurasi Image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "cdn.jsdelivr.net",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
    ],
  },

  // 2. Konfigurasi Rewrites
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination:
          // "https://cdn.jsdelivr.net/gh/Percobaanta/eroapi@main/:path*",
          "https://raw.githubusercontent.com/Percobaanta/eroapi/main/:path*",
      },
    ];
  },

  reactCompiler: true,
};

export default nextConfig;
