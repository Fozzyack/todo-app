"use client";

import { getBackendUrl } from "@/lib/BackendURL";
import { useEffect, useState } from "react";
import Card from "./Card";
import TodoItem from "./TodoItem";
import { useRefreshTokenContext } from "@/lib/RefreshTokenContext";

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { refreshToken } = useRefreshTokenContext();
    const todosPerPage = 4;

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

    const uncompletedTodos = todos.filter(
        (todo) => !todo.completed && !todo.cancelled
    );
    const totalPages = Math.ceil(uncompletedTodos.length / todosPerPage);
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = uncompletedTodos.slice(
        indexOfFirstTodo,
        indexOfLastTodo
    );
    return (
        <Card className="col-span-1 md:col-span-7 md:order-first flex flex-col gap-7 border-secondary bg-background-dark/85 shadow-brutal-secondary-lg">
            <div className="flex items-center justify-startr gap-4 mb-4">
                <div className="h-3 w-12 bg-primary shadow-brutal-primary" />
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
                    Todos
                </p>
            </div>
            <div className="flex items-center gap-4 justify-between">
                <h3 className="font-mono text-secondary uppercase tracking-[0.3em] mb-0">
                    [TASKS::ACTIVE]
                </h3>
                <span className="font-mono text-xs text-border px-3 py-1 border-2 border-border">
                    {currentTodos.length}
                </span>
            </div>
            <hr className="my-4 mborder-t-2 border-border-dark" />
            <div className="flex flex-col gap-4">
                {uncompletedTodos.length === 0 ? (
                    <div className="text-center py-12 text-border font-mono">
                        <p className="text-sm uppercase tracking-[0.2em]">
                            [NO_TASKS_FOUND]
                        </p>
                    </div>
                ) : (
                    currentTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                )}
            </div>
            {uncompletedTodos.length > 0 && (
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

export default TodoList;
