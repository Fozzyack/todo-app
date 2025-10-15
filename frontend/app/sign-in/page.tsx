"use client";

import Link from "next/link";

import Card from "@/components/Card";
import { useState } from "react";

const noticeBlock = [
    "+--------------------------------------+",
    "| ACCESS REGISTRY :: NEW CREW REQUEST |",
    "+--------------------------------------+",
].join("\n");

const heroStats = [
    { label: "MODE", value: "BETA INVITE", accent: "text-tertiary" },
    { label: "SLOTS", value: "12 REMAIN", accent: "text-secondary" },
    { label: "SYNC", value: "UNDER 2S", accent: "text-primary" },
];

const requestHighlights = [
    {
        tag: "[METRICS_SYNC]",
        detail: "Crew dashboards mirror velocity in real time.",
    },
    {
        tag: "[ROUTINE_LIBRARY]",
        detail: "Clone automation recipes from the ops exchange.",
    },
    {
        tag: "[CROSS-DEVICE]",
        detail: "Resume terminal sessions without losing history.",
    },
];

const approvalSteps = [
    { label: "Submit credentials", status: "INSTANT" },
    { label: "Ops review", status: "AUTOMATED" },
    { label: "Deck unlock", status: "SECONDS" },
];

export default function SignInPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(""); // Clear error on input change
    };
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError(""); // Clear error on input change
    };
    const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`/api/sign-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Registration failed");
            }

            window.location.href = "/login";
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
            <div className="hidden md:block absolute inset-0 -z-10" aria-hidden="true">
                <div className="absolute inset-0 bg-background" />
                <div className="absolute -top-36 right-1/3 h-[420px] w-[420px] bg-tertiary/20 blur-3xl" />
                <div className="absolute bottom-[-120px] left-[18%] h-80 w-80 bg-secondary/20 blur-3xl" />
                <div className="absolute bottom-10 right-[-12%] h-72 w-72 bg-primary/15 blur-3xl" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-tertiary/40 to-transparent opacity-40" />
            </div>

            <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center px-4 md:px-6 py-8 md:py-12 sm:px-8">
                <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <section className="space-y-6 md:space-y-8 text-center lg:text-left">
                        <div className="space-y-3 md:space-y-5">
                            <span className="inline-flex items-center gap-2 border-4 border-tertiary bg-background px-3 md:px-5 py-2 font-mono text-[0.6rem] md:text-xs uppercase tracking-[0.35em] md:tracking-[0.45em] text-tertiary shadow-brutal-secondary">
                                [SIGNUP::ACCESS_REQUEST]
                            </span>
                            <h1 className="font-mono text-2xl md:text-3xl font-black uppercase text-white sm:text-5xl leading-tight">
                                Request Crew Credentials
                            </h1>
                            <p className="mx-auto max-w-xl border-l-4 border-tertiary bg-background/60 pl-3 md:pl-4 py-2 font-mono text-[0.6rem] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 lg:mx-0 lg:text-sm">
                                REGISTER YOUR CALLSIGN AND PASSCODE. OPS WILL
                                SYNC YOUR ACCESS INSTANTLY.
                            </p>
                        </div>

                        <div className="hidden md:grid gap-4 sm:grid-cols-3">
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

                        <div className="hidden md:flex flex-wrap justify-center gap-3 lg:justify-start">
                            {requestHighlights.map((item) => (
                                <div
                                    key={item.tag}
                                    className="border-4 border-border bg-background/80 px-4 py-3 font-mono text-[0.65rem] uppercase leading-snug text-slate-300 shadow-brutal-muted-sm sm:text-xs"
                                >
                                    <div className="text-tertiary">
                                        {item.tag}
                                    </div>
                                    <p className="mt-1 text-slate-400">
                                        {item.detail}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Card className="border-tertiary/40 bg-background/75 shadow-brutal-secondary hidden lg:block">
                            <span className="font-mono text-xs uppercase text-tertiary">
                                [INVITE_WINDOW]
                            </span>
                        </Card>
                    </section>

                    <Card className="border-tertiary bg-background-dark/85 shadow-brutal-secondary-lg">
                        <div className="flex flex-col gap-4 md:gap-6 font-mono text-xs uppercase">
                            <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3 border-4 border-border bg-background px-3 md:px-5 py-2 md:py-3 text-[0.65rem] md:text-xs text-tertiary shadow-brutal-muted-sm">
                                <span>[REGISTRATION_CONSOLE]</span>
                                <span className="text-slate-400 text-[0.6rem] md:text-xs">
                                    SECURE CHANNEL READY
                                </span>
                            </div>

                            <pre className="overflow-x-auto border-4 border-border bg-background-dark p-3 md:p-5 text-[0.65rem] md:text-sm leading-5 md:leading-6 text-tertiary shadow-brutal-muted">
                                {noticeBlock}
                            </pre>

                            <form
                                onSubmit={handleCreateAccount}
                                className="grid gap-4 md:gap-5 text-sm"
                            >
                                {error && (
                                    <div className="border-4 border-rose-500 bg-rose-500/10 px-3 md:px-4 py-2 md:py-3 font-mono text-[0.65rem] md:text-xs uppercase text-rose-400 shadow-brutal-muted-sm">
                                        <span className="font-black">
                                            [ERROR]{" "}
                                        </span>
                                        {error}
                                    </div>
                                )}

                                <label className="grid gap-2 text-[0.65rem] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChangeEmail}
                                        placeholder="ops contact"
                                        className="border-4 border-border bg-background px-3 md:px-4 py-2 md:py-3 text-sm md:text-base uppercase text-tertiary shadow-brutal-muted-sm transition-all placeholder:text-slate-600 focus:border-tertiary focus:text-tertiary focus:outline-none focus:shadow-brutal-secondary-sm"
                                    />
                                </label>
                                <label className="grid gap-2 text-[0.65rem] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChangePassword}
                                        placeholder="set passphrase"
                                        className="border-4 border-border bg-background px-3 md:px-4 py-2 md:py-3 text-sm md:text-base uppercase text-tertiary shadow-brutal-muted-sm transition-all placeholder:text-slate-600 focus:border-tertiary focus:text-tertiary focus:outline-none focus:shadow-brutal-secondary-sm"
                                        required
                                    />
                                </label>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-2 md:gap-3 border-4 border-background bg-secondary px-4 md:px-6 py-3 text-xs md:text-sm font-black uppercase tracking-[0.25em] md:tracking-[0.35em] text-background shadow-brutal-secondary transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-secondary-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                                >
                                    {loading
                                        ? "Processing..."
                                        : "Submit Request"}
                                    <span className="text-blue-900">
                                        &gt;&gt;
                                    </span>
                                </button>
                            </form>

                            <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3 border-4 border-border bg-background px-3 md:px-4 py-2 md:py-3 shadow-brutal-muted-sm">
                                {approvalSteps.map((step) => (
                                    <div
                                        key={step.label}
                                        className="flex flex-col gap-1 text-[0.6rem] md:text-[0.65rem] uppercase text-slate-400 sm:text-xs"
                                    >
                                        <span className="text-slate-500">
                                            {step.label}
                                        </span>
                                        <span className="font-black text-white text-[0.65rem] md:text-sm">
                                            {step.status}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/login"
                                className="inline-flex w-full md:w-max items-center justify-center gap-2 border-4 border-border bg-background px-4 py-2 md:py-2 text-[0.7rem] md:text-xs font-black text-tertiary shadow-brutal-muted-sm transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:text-primary"
                            >
                                Back to Login Portal
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
}
