import { getBackendUrl } from "@/lib/BackendURL";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const POST = async () => {
    const cookieStore = await cookies();
    const identityCookie = cookieStore.get(".AspNetCore.Identity.Application");

    if (!identityCookie) {
        const response = NextResponse.json({ message: "Signed out" });
        response.cookies.delete(".AspNetCore.Identity.Application");
        return response;
    }

    try {
        const backendResponse = await fetch(
            `${getBackendUrl()}/logout?useCookies=true&useSessionCookies=true`,
            {
                method: "POST",
                headers: {
                    Cookie: `${identityCookie.name}=${identityCookie.value}`,
                },
            },
        );

        if (!backendResponse.ok) {
            const payload = await backendResponse.json().catch(() => ({}));
            const message = payload.message ?? payload.title ?? "Failed to sign out";
            return NextResponse.json({ message }, { status: backendResponse.status });
        }

        const response = NextResponse.json({ message: "Signed out" });

        response.cookies.set({
            name: identityCookie.name,
            value: "",
            path: "/",
            expires: new Date(0),
        });

        const backendSetCookie = backendResponse.headers.get("set-cookie");
        if (backendSetCookie) {
            response.headers.set("set-cookie", backendSetCookie);
        }

        return response;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to sign out";
        return NextResponse.json({ message }, { status: 500 });
    }
};

export { POST };
