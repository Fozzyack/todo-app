import { getBackendUrl } from "@/lib/BackendURL";
import { getAspNetCoreCookie } from "@/lib/GetCookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signOut = async () => {
    "use server";

    const identityCookie = await getAspNetCoreCookie();

    if (identityCookie) {
        try {
            const response = await fetch(
                `${getBackendUrl()}/logout?useCookies=true&useSessionCookies=true`,
                {
                    method: "POST",
                    headers: {
                        Cookie: `${identityCookie.name}=${identityCookie.value}`,
                    },
                },
            );

            if (!response.ok) {
                const payload = await response.json().catch(() => ({}));
                console.error("Failed to sign out", payload);
            }
        } catch (error) {
            console.error("Failed to sign out", error);
        }

        const cookieStore = await cookies();
        cookieStore.delete(identityCookie.name);
    }

    redirect("/login");
};
const LogoutButton = () => {
    return (
        <button
            onClick={signOut}
            className="inline-flex items-center gap-2 border-4 border-accent-orange bg-accent-orange px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-navy shadow-brutal-orange-sm transition hover:-translate-y-0.5 hover:shadow-brutal-orange-lg hover:cursor-pointer"
        >
            Sign out
        </button>
    );
};

export default LogoutButton;
