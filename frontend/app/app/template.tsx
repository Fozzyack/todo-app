import { getBackendUrl } from "@/lib/BackendURL";
import { getAspNetCoreCookie } from "@/lib/GetCookie";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AppLayout = async ({ children }: { children: ReactNode }) => {
    try {
        const cookie = await getAspNetCoreCookie();
        const res = await fetch(`${getBackendUrl()}/manage/info`, {
            method: "GET",
            headers: {
                Cookie: `${cookie.name}=${cookie.value}`,
            },
        });
        if (!res.ok) {
            throw new Error(
                `Could not Log In | Status: ${res.status.toString()}`,
            );
        }
    } catch (error) {
        console.log(error);
        redirect("/login");
    }

    return <div>{children}</div>;
};

export default AppLayout;
