const development_mode = process.env.NEXT_PUBLIC_DEVELOPMENT;

export const isDevelopment = (): boolean => {
    if (!development_mode) {
        throw new Error(
            "Development Mode not set. Please set NEXT_PUBLIC_DEVELOPMENT environment variable"
        );
    }
    if (development_mode === "1") {
        return true;
    }
    return false;
};
