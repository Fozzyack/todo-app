import Card from "@/components/Card";
import LogoutButton from "@/components/LogoutButton";
import TodoManager from "@/components/TodoManager";

const DashboardPage = () => {
    return (
        <main className="dashboard-background relative min-h-screen overflow-hidden text-slate-100">
            <div className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center opacity-70">
                <div className="h-64 w-[42rem] rounded-full bg-secondary/30 blur-[140px]" />
            </div>
            <div className="pointer-events-none absolute -bottom-16 -left-20 hidden h-72 w-72 rounded-full bg-primary/20 blur-[120px] sm:block" />
            <div className="pointer-events-none absolute -bottom-24 right-12 h-80 w-80 rounded-full bg-tertiary/20 blur-[140px]" />
            <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-8 relative z-10">
                <Card className="flex flex-col gap-6 border-secondary bg-background-dark/80 shadow-brutal-secondary-lg sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <div className="h-3 w-12 bg-primary shadow-brutal-primary" />
                            <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
                                Dashboard
                            </p>
                        </div>
                        <h1 className="text-white sm:text-4xl">
                            ToDoList Command Center
                        </h1>
                        <p className="text-sm text-slate-400">
                            Manage your session and continue where you left off
                            across the platform.
                        </p>
                    </div>
                    <LogoutButton />
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-10">
                    <TodoManager />
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
