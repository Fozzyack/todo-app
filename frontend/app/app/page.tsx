import Card from "@/components/Card";
import LogoutButton from "@/components/LogoutButton";

const DashboardPage = () => {
    return (
        <main className="min-h-screen bg-navy text-slate-100">
            <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-8">
                <Card className="flex flex-col gap-6 border-accent-blue bg-navy-dark/80 shadow-brutal-blue-lg sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-orange">
                            Dashboard
                        </p>
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
                <div className="grid md:grid-cols-12 gap-4">
                    <Card className="flex md:col-span-7 flex-col gap-6 border-accent-blue bg-navy-dark/80 shadow-brutal-blue-lg sm:flex-row sm:items-center sm:justify-between mt-10">
                        <div>
                            <h2>Current Todos</h2>
                        </div>
                    </Card>
                    <Card className="flex md:col-span-5 flex-col gap-6 border-accent-blue bg-navy-dark/80 shadow-brutal-blue-lg sm:flex-row sm:items-center sm:justify-between mt-10">
                        <div>
                            <h2>Current Todos</h2>
                        </div>
                    </Card>
                    
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
