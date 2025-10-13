import Card from "@/components/Card";
import AddTodoPanel from "@/components/AddTodoPanel";
import LogoutButton from "@/components/LogoutButton";
import MobileAddTodoTrigger from "@/components/MobileAddTodoTrigger";
import TodoManager from "@/components/TodoManager";

const DashboardPage = () => {
    return (
        <main className="min-h-screen bg-background text-slate-100">
            <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-8">
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
                <div className="mt-8 md:hidden">
                    <MobileAddTodoTrigger />
                </div>
                <div className="grid md:grid-cols-12 gap-4">
                    <TodoManager />
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
