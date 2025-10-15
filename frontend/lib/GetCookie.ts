import { cookies } from "next/headers";
import { isDevelopment } from "./Development";

export const getAspNetCoreCookie = async () => {
    const cookieStore = await cookies();
    let cookie = cookieStore.get("Todo0xApp");
    if (isDevelopment()) {
        cookie = cookieStore.get("Todo0xAppDevelopment");
    }
    if (!cookie) {
        throw new Error("Could not get AspNetCore Cookie");
    }
    return cookie;
};
