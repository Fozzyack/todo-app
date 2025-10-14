import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/Todos/:path*",
                destination: "http://backend:8080/Todos/:path*",
            },
            {
                source: "/manage/:path*",
                destination: "http://backend:8080/manage/:path*",
            },
            {
                source: "/logout",
                destination: "http://backend:8080/logout",
            },
        ];
    },
};

export default nextConfig;
