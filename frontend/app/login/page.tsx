"use client";

import Link from "next/link";

import Card from "@/components/Card";
import { useState } from "react";

const terminalBanner = [
    "+-------------------------------------+",
    "| AUTH NODE :: LOGIN SEQUENCE ONLINE |",
    "+-------------------------------------+",
].join("\n");

const heroStats = [
    { label: "SESSION", value: "ID-907A", accent: "text-secondary" },
    { label: "ENV", value: "LIVE OPS", accent: "text-primary" },
    { label: "STATUS", value: "READY", accent: "text-tertiary" },
];

const highlightBlocks = [
    {
        tag: "[FOCUS_MODE]",
        detail: "Keyboard-first, distraction-free command center.",
    },
    {
        tag: "[AUTO_LOGS]",
        detail: "Ops audit trails sync automatically across crew.",
    },
    {
        tag: "[CREW_SYNC]",
        detail: "Invite teammates and share pipelines instantly.",
    },
];

const securityChecklist = [
    { label: "AUTH CHANNEL", value: "TLS/4096" },
    { label: "LAST SYNC", value: "42S AGO" },
    { label: "OPS CONTACT", value: "CTRL-ALT-DELTA" },
];

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Login failed");
            }

            window.location.href = "/app";
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="relative isolate min-h-dvh overflow-hidden bg-background text-slate-200">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <div className="absolute inset-0 bg-background" />
                <div className="absolute -top-32 left-1/3 h-[420px] w-[420px] bg-secondary/20 blur-3xl" />
                <div className="absolute bottom-[-120px] right-[15%] h-80 w-80 bg-tertiary/20 blur-3xl" />
                <div className="absolute bottom-[-60px] left-6 h-64 w-64 bg-primary/20 blur-3xl" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent opacity-40" />
            </div>

            <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center px-6 py-12 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <section className="space-y-8 text-center lg:text-left">
                        <div className="space-y-5">
                            <span className="inline-flex items-center gap-2 border-4 border-secondary bg-background px-5 py-2 font-mono text-xs uppercase tracking-[0.45em] text-secondary shadow-brutal-secondary">
                                [LOGIN::PORTAL]
                            </span>
                            <h1 className="font-mono font-black uppercase text-white sm:text-5xl">
                                Authenticate To Access Command Deck
                            </h1>
                            <p className="mx-auto max-w-xl border-l-4 border-secondary bg-background/60 pl-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-400 lg:mx-0 lg:text-sm">
                                SUBMIT VERIFIED HANDLE AND PASSPHRASE. SECURITY
                                FIREWALL IS LIVE AND MIRRORING TRAFFIC.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {heroStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="border-4 border-border bg-background-dark px-4 py-3 font-mono text-xs uppercase text-slate-400 shadow-brutal-muted-sm"
                                >
                                    <span
                                        className={item.accent}
                                    >{`[${item.label}]`}</span>
                                    <div className="mt-1 text-lg font-black text-white">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                            {highlightBlocks.map((item) => (
                                <div
                                    key={item.tag}
                                    className="border-4 border-border bg-background/80 px-4 py-3 font-mono text-[0.65rem] uppercase leading-snug text-slate-300 shadow-brutal-muted-sm sm:text-xs"
                                >
                                    <div className="text-secondary">
                                        {item.tag}
                                    </div>
                                    <p className="mt-1 text-slate-400">
                                        {item.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Card className="border-secondary bg-background-dark/85 shadow-brutal-secondary-lg">
                        <div className="flex flex-col gap-6 font-mono text-xs uppercase">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-4 border-border bg-background px-5 py-3 text-secondary shadow-brutal-muted-sm">
                                <span>[AUTH_CONSOLE]</span>
                                <span className="text-slate-400">
                                    SECURE SOCKET OPEN
                                </span>
                            </div>

                            <pre className="overflow-hidden border-4 border-border bg-background-dark p-5 text-sm leading-6 text-secondary shadow-brutal-muted">
                                {terminalBanner}
                            </pre>

                            <form
                                onSubmit={handleLogin}
                                className="grid gap-5 text-sm"
                            >
                                {error && (
                                    <div className="border-4 border-rose-500 bg-rose-500/10 px-4 py-3 font-mono text-xs uppercase text-rose-400 shadow-brutal-muted-sm">
                                        <span className="font-black">
                                            [ERROR]{" "}
                                        </span>
                                        {error}
                                    </div>
                                )}

                                <label className="grid gap-2 text-xs tracking-[0.3em] text-slate-400">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailInput}
                                        placeholder="enter handle"
                                        className="border-4 border-border bg-background px-4 py-3 text-base uppercase text-secondary shadow-brutal-muted-sm transition-all placeholder:text-slate-600 focus:border-secondary focus:text-secondary focus:outline-none focus:shadow-brutal-secondary-sm"
                                        required
                                    />
                                </label>
                                <label className="grid gap-2 text-xs tracking-[0.3em] text-slate-400">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePasswordInput}
                                        placeholder="enter passphrase"
                                        className="border-4 border-border bg-background px-4 py-3 text-base uppercase text-secondary shadow-brutal-muted-sm transition-all placeholder:text-slate-600 focus:border-secondary focus:text-secondary focus:outline-none focus:shadow-brutal-secondary-sm"
                                        required
                                    />
                                </label>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-3 border-4 border-background bg-primary px-6 py-3 font-black uppercase tracking-[0.35em] text-background shadow-brutal-secondary transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-secondary-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                                >
                                    {loading
                                        ? "Authenticating..."
                                        : "Initiate Access"}
                                    <span className="text-orange-900">
                                        &gt;&gt;
                                    </span>
                                </button>
                            </form>

                            <div className="flex flex-wrap items-center justify-between gap-3 border-4 border-border bg-background px-4 py-3 shadow-brutal-muted-sm">
                                {securityChecklist.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-col gap-1 text-[0.65rem] uppercase text-slate-400 sm:text-xs"
                                    >
                                        <span className="text-slate-500">
                                            {item.label}
                                        </span>
                                        <span className="font-black text-white">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/sign-in"
                                className="inline-flex w-max items-center gap-2 border-4 border-border bg-background px-4 py-2 font-black text-secondary shadow-brutal-muted-sm transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:text-primary"
                            >
                                Need clearance? Request Access
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
}
