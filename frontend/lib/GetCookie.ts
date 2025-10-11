import { cookies } from "next/headers";

export const getAspNetCoreCookie = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(".AspNetCore.Identity.Application");
    if (!cookie) {
        throw new Error("Could not get AspNetCore Cookie");
    }
    return cookie;
};
