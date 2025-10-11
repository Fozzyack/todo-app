export const features = [
    {
        id: "cmd-queue",
        title: "$ CMD_QUEUE",
        description: "Blast through tasks with quick-add shortcuts and batch actions that feel like scripting.",
        shortcut: "^+ENTER",
    },
    {
        id: "themes",
        title: "$ THEME_SWITCH",
        description: "Toggle neon palettes, brutal shadows, and ambient glow to fit your current hyper-focus mode.",
        shortcut: "SHIFT+T"
    },
    {
        id: "sync",
        title: "$ OFFLINE_SYNC",
        description: "Task data persists locally first with zero latency, then syncs when you reconnect.",
        shortcut: "^+S",
    },
    {
        id: "signals",
        title: "$ METRICS_DASH",
        description: "Review completion streaks, flow-time, and habit signals in a single brutalist dashboard.",
        shortcut: "^+M",
    },
];

export const workflow = [
    {
        step: "01",
        title: "$ INIT_STACK",
        copy: "Queue tasks from the CLI-style composer or pipe them in via API webhooks.",
    },
    {
        step: "02",
        title: "$ FILTER_NOISE",
        copy: "Focus mode auto-hides the backlog and surfaces only what matters for the current sprint.",
    },
    {
        step: "03",
        title: "$ DEPLOY_WIN",
        copy: "Track velocity with real-time badges, then roll up analytics into your weekly review.",
    },
];

export const terminalMock = `┌─[fozzyack@todolist]─[~]
└─$ ./run_focus.sh

[████████████████████] 100%
[✓] WORKSPACE_LOADED
[✓] SYNCED 12 TASKS
[!] NEXT >> "Draft product spec"

┌─[fozzyack@todolist]─[~]
└─$ _`;
