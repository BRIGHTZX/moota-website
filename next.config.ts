import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "lh3.googleusercontent.com",
            "gravatar.com",
        ],
    },
    env: {
        KINDLE_DOMAIN: process.env.KINDLE_DOMAIN,
    },
};

export default nextConfig;
