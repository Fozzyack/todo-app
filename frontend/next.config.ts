import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_INTERNAL_URL || "http://backend:8080";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/Todos/:path*",
                destination: `${backendUrl}/Todos/:path*`,
            },
            {
                source: "/manage/:path*",
                destination: `${backendUrl}/manage/:path*`,
            },
            {
                source: "/logout",
                destination: `${backendUrl}/logout`,
            },
        ];
    },
};

export default nextConfig;
