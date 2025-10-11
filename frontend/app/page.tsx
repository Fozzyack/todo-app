"use client";

import Link from "next/link";

import Card from "@/components/Card";
import { features, workflow, terminalMock } from "@/constants/landing";

export default function Home() {
    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-navy">
            {/* Ambient Glow Background */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <div className="absolute inset-0 bg-navy" />
                <div className="absolute -top-32 right-1/3 h-[420px] w-[420px] bg-accent-blue/10 blur-3xl" />
                <div className="absolute bottom-0 left-12 h-64 w-64 bg-accent-orange/10 blur-3xl" />
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-16 sm:px-8">
                <header className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 border-4 border-accent-blue bg-navy px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent-blue shadow-brutal-blue">
                            [SYSTEM::READY]
                        </div>
                        <h1 className="font-mono text-5xl font-black uppercase leading-tight tracking-tight text-white sm:text-6xl">
                            <span className="inline-block border-4 border-white bg-navy px-3 py-2 shadow-brutal-orange-lg">
                                TODO.EXE
                            </span>
                            <div className="mt-4 text-3xl text-accent-orange sm:text-4xl">
                                &gt; SHIP_FASTER
                            </div>
                        </h1>
                        <div className="border-l-4 border-accent-blue bg-navy/80 pl-4 font-mono text-base leading-relaxed text-slate-300">
                            <span className="text-accent-blue">&gt;&gt;</span> TERMINAL-NATIVE TODO WORKSPACE FOR BUILDERS<br />
                            <span className="text-accent-blue">&gt;&gt;</span> COMPOSE TASKS WITH HOTKEYS<br />
                            <span className="text-accent-blue">&gt;&gt;</span> AUTOMATE ROUTINES • TRACK VELOCITY<br />
                            <span className="text-accent-blue">&gt;&gt;</span> WRAPPED IN NEO-BRUTAL VISUALS
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="/app"
                                className="group inline-flex items-center gap-3 border-4 border-navy bg-accent-orange px-8 py-4 font-mono text-sm font-black uppercase tracking-wider text-navy shadow-brutal-blue transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal-blue-lg"
                            >
                                [ENTER]
                                <span className="text-orange-600">&gt;&gt;</span>
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex items-center gap-2 border-4 border-border-slate bg-navy px-6 py-4 font-mono text-sm font-bold uppercase text-slate-300 shadow-brutal-slate transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal-slate-lg"
                            >
                                [VIEW_CMDS]
                                <span aria-hidden="true">&gt;</span>
                            </Link>
                        </div>
                    </div>

                    <Card className="border-4 border-accent-blue bg-navy shadow-brutal-blue-lg backdrop-blur">
                        <div className="flex items-center justify-between border-b-2 border-accent-blue/30 pb-3 font-mono text-xs uppercase text-accent-blue">
                            <span>[TERMINAL::ACTIVE]</span>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 border-2 border-emerald-400 bg-emerald-400" />
                                <span className="h-3 w-3 border-2 border-yellow-400 bg-yellow-400" />
                                <span className="h-3 w-3 border-2 border-rose-500 bg-rose-500" />
                            </div>
                        </div>
                        <pre className="mt-4 overflow-hidden border-4 border-slate-700 bg-navy-dark p-6 font-mono text-sm leading-7 text-blue-300 shadow-brutal-slate">
                            {terminalMock}
                        </pre>
                    </Card>
                </header>

                <section id="features" className="space-y-10">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div className="max-w-xl space-y-3">
                            <h2 className="border-l-4 border-accent-orange pl-4 font-mono text-3xl font-black uppercase text-white">
                                [FEATURES::MAX_OUTPUT]
                            </h2>
                            <p className="border-l-4 border-slate-600 pl-4 font-mono text-sm text-slate-400">
                                &gt; KEYBOARD-FIRST • TACTILE • FLOW-STATE TUNED
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 border-4 border-accent-blue bg-navy px-4 py-3 font-mono text-xs text-accent-blue shadow-brutal-blue-sm">
                            <span className="font-bold">[TIP]</span>
                            Press <kbd className="border-2 border-accent-blue bg-navy px-2 py-1">?</kbd> for CMD_PALETTE
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {features.map((feature) => (
                            <Card
                                key={feature.id}
                                className="group border-4 border-slate-700 bg-navy shadow-brutal-slate transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:border-accent-orange hover:shadow-brutal-orange-lg"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <h3 className="font-mono text-lg font-bold uppercase text-accent-orange">{feature.title}</h3>
                                        <p className="font-mono text-sm leading-6 text-slate-400">{feature.description}</p>
                                    </div>
                                    <span className="border-2 border-slate-600 bg-navy px-3 py-2 font-mono text-xs font-bold text-slate-400 group-hover:border-accent-orange group-hover:text-accent-orange">
                                        {feature.shortcut}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="border-4 border-slate-700 bg-navy shadow-brutal-slate-lg">
                        <div className="space-y-6">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-blue">[WORKFLOW::EXEC]</span>
                            <h2 className="font-mono text-3xl font-black uppercase text-white">
                                TERMINAL INSTINCTS<br />
                                <span className="text-accent-orange">MEET GUIDED FLOW</span>
                            </h2>
                            <p className="border-l-4 border-slate-600 pl-4 font-mono text-sm text-slate-400">
                                &gt; EACH INTERACTION FEELS LIKE A SHELL COMMAND<br />
                                &gt; NO FLUFF • JUST PRAGMATIC BLOCKS<br />
                                &gt; HEAVY SHADOWS • INSTANT FEEDBACK
                            </p>
                            <div className="space-y-4">
                                {workflow.map((entry) => (
                                    <div key={entry.step} className="flex gap-4 border-l-4 border-accent-orange bg-navy/60 p-4">
                                        <span className="inline-flex h-10 w-10 flex-none items-center justify-center border-4 border-accent-orange bg-navy font-mono text-base font-black text-accent-orange shadow-brutal-orange">
                                            {entry.step}
                                        </span>
                                        <div className="space-y-1">
                                             <h3 className="font-mono font-bold uppercase text-white">{entry.title}</h3>
                                            <p className="font-mono text-sm text-slate-400">{entry.copy}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="flex flex-col justify-between border-4 border-accent-blue bg-navy shadow-brutal-blue-lg">
                        <div className="space-y-4">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-blue">[STATUS::LIVE]</span>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-4 border-accent-orange/30 bg-navy-dark px-4 py-3 font-mono shadow-brutal-slate-sm">
                                    <span className="text-sm uppercase text-slate-400">VELOCITY_TODAY</span>
                                    <span className="font-black text-accent-orange">+18%</span>
                                </div>
                                <div className="flex items-center justify-between border-4 border-accent-blue/30 bg-navy-dark px-4 py-3 font-mono shadow-brutal-slate-sm">
                                    <span className="text-sm uppercase text-slate-400">FOCUS_STREAK</span>
                                    <span className="font-black text-accent-blue">7_DAYS</span>
                                </div>
                                <div className="flex items-center justify-between border-4 border-accent-purple/30 bg-navy-dark px-4 py-3 font-mono shadow-brutal-slate-sm">
                                    <span className="text-sm uppercase text-slate-400">AUTO_RUNS</span>
                                    <span className="font-black text-accent-purple">36</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="border-l-4 border-accent-blue bg-navy-dark pl-4 font-mono text-sm text-slate-400">
                                &gt; CLI_SYNC • GIT_HOOKS • REST_API<br />
                                &gt; ATOMIC • TRACKABLE • RETRO_READY
                            </div>
                            <a
                                href="mailto:hello@todobrutal.dev"
                                className="inline-flex w-full items-center justify-between border-4 border-navy bg-accent-blue px-5 py-4 font-mono text-sm font-black uppercase text-navy shadow-brutal-blue transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal-blue-lg"
                            >
                                [REQUEST_ACCESS]
                                <span aria-hidden="true">&gt;&gt;</span>
                            </a>
                        </div>
                    </Card>
                </section>

                <footer className="border-4 border-slate-700 bg-navy px-6 py-5 font-mono shadow-brutal-slate">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                        <span className="uppercase">
                            [©_{new Date().getFullYear()}_TODO.EXE] • CRAFTED_FOR_TERMINAL_LOVERS
                        </span>
                        <div className="flex items-center gap-6 uppercase">
                            <Link href="/privacy" className="transition-colors hover:text-accent-orange">
                                [PRIVACY]
                            </Link>
                            <Link href="/terms" className="transition-colors hover:text-accent-orange">
                                [TERMS]
                            </Link>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-accent-orange"
                            >
                                [GITHUB]
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
