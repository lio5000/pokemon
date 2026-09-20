/** @type {import('next').NextPage} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pokeapi.co",
      },
    ],
  },
};

export default nextConfig;
