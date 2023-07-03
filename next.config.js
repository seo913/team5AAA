/** @type {import('next').NextConfig} */
require("dotenv").config({ path: ".env.local" });

const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqua-hushed-falcon-648.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
};
