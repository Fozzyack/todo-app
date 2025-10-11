const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getBackendUrl = () => {
    if (!backendURL) {
        throw new Error("No Backend_URL specified in environment variables");
    }
    return backendURL;
};
