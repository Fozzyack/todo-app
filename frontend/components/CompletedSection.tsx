"use client";

import { getBackendUrl } from "@/lib/BackendURL";
import { useEffect, useState } from "react";
import Card from "./Card";
import CompletedTodoItem from "./CompletedTodoItem";
import { useRefreshTokenContext } from "@/lib/RefreshTokenContext";

const CompletedSection = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [activeTab, setActiveTab] = useState<"completed" | "cancelled">(
        "completed"
    );
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 4;
    const { refreshToken } = useRefreshTokenContext();

    const fetchTodos = () => {
        fetch(`${getBackendUrl()}/Todos`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchTodos();
        setCurrentPage(1);
    }, [refreshToken]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const filteredTodos = todos.filter((todo) =>
        activeTab === "completed" ? todo.completed : todo.cancelled
    );

    const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
        <Card className="md:col-span-12 flex flex-col gap-7 border-tertiary bg-background-dark/85 shadow-brutal-tertiary-lg">
            <div className="flex items-center gap-4 border-b-4 border-border-dark pb-4">
                <button
                    type="button"
                    onClick={() => setActiveTab("completed")}
                    className={`font-mono text-sm uppercase tracking-[0.3em] px-6 py-3 border-4 transition-all duration-200 ${
                        activeTab === "completed"
                            ? "border-tertiary bg-tertiary/20 text-tertiary shadow-brutal-muted-sm -translate-x-1 -translate-y-1"
                            : "border-border bg-background text-border hover:-translate-x-1 hover:-translate-y-1"
                    }`}
                >
                    [COMPLETED]
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("cancelled")}
                    className={`font-mono text-sm uppercase tracking-[0.3em] px-6 py-3 border-4 transition-all duration-200 ${
                        activeTab === "cancelled"
                            ? "border-tertiary bg-tertiary/20 text-tertiary shadow-brutal-muted-sm -translate-x-1 -translate-y-1"
                            : "border-border bg-background text-border hover:-translate-x-1 hover:-translate-y-1"
                    }`}
                >
                    [CANCELLED]
                </button>
                <span className="ml-auto font-mono text-xs text-border px-3 py-1 border-2 border-border">
                    {filteredTodos.length}
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {filteredTodos.length === 0 ? (
                    <div className="text-center py-12 text-border font-mono">
                        <p className="text-sm uppercase tracking-[0.2em]">
                            [NO_{activeTab.toUpperCase()}_TASKS]
                        </p>
                    </div>
                ) : (
                    currentTodos.map((todo) => (
                        <CompletedTodoItem
                            key={todo.id}
                            todo={todo}
                        />
                    ))
                )}
            </div>

            {filteredTodos.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t-2 border-border-dark mt-6">
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border-4 border-border bg-background shadow-brutal-muted-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                    >
                        [PREV]
                    </button>
                    <span className="font-mono text-sm text-border uppercase tracking-[0.15em]">
                        PAGE {currentPage} / {totalPages || 1}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={
                            currentPage === totalPages || totalPages === 0
                        }
                        className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border-4 border-border bg-background shadow-brutal-muted-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                    >
                        [NEXT]
                    </button>
                </div>
            )}
        </Card>
    );
};

export default CompletedSection;
