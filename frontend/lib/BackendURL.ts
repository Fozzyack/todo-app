import { isDevelopment } from "./Development";

export const getBackendUrl = (): string => {

    if (isDevelopment()) {
        if (!process.env.NEXT_PUBLIC_BACKEND_URL_DEVELOPMENT) {
            throw new Error(
                "Development URL not set. Please set NEXT_PUBLIC_BACKEND_URL_DEVELOPMENT environment variable"
            );
        }
        return process.env.NEXT_PUBLIC_BACKEND_URL_DEVELOPMENT;
    }
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
        throw new Error(
            "Development URL not set. Please set NEXT_PUBLIC_BACKEND_URL environment variable"
        );
    }

    return process.env.NEXT_PUBLIC_BACKEND_URL;
};
