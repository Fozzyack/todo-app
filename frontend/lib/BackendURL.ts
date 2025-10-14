export const getBackendUrl = () => {
    if (typeof window === "undefined") {
        return process.env.BACKEND_INTERNAL_URL || "http://backend:8080";
    }
    return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5141";
};
