/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonical host: send www.offgriddiet.com → offgriddiet.com (308)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.offgriddiet.com" }],
        destination: "https://offgriddiet.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
