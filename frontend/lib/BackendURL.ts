export const getBackendUrl = () => {
    if (typeof window === "undefined") {
        return process.env.BACKEND_INTERNAL_URL || "http://backend:8080";
    }
    return "";
};
