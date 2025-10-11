import { getBackendUrl } from "@/lib/BackendURL";
import { NextResponse } from "next/server";

const POST = async (request: Request) => {
    const { email, password } = await request.json();
    try {
        const res = await fetch(
            `${getBackendUrl()}/login?useCookies=true&useSessionCookies=true`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            },
        );
        if (!res.ok) {
            const err = await res.json();

            // Handle ASP.NET Core Identity validation errors
            if (err.errors) {
                // Extract all error messages from the validation problem details
                const errorMessages = Object.values(err.errors)
                    .flat()
                    .join(". ");
                return NextResponse.json(
                    { message: errorMessages },
                    { status: res.status },
                );
            }

            return NextResponse.json(
                { message: err.message || err.title || "Login failed" },
                { status: res.status },
            );
        }
        const cookie = res.headers.get("set-cookie");
        if (!cookie) {
            return NextResponse.json(
                { message: "Could not get set-cookie" },
                { status: res.status },
            );
        }
        return NextResponse.json(
            { msg: "success" },
            { headers: { "set-cookie": cookie } },
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: error.message || "An unexpected error occurred" },
            { status: 500 },
        );
    }
};

export { POST };
