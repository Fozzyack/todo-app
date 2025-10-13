"use client";

import { getBackendUrl } from "@/lib/BackendURL";
import { useEffect, useState } from "react";
import Card from "./Card";

const TodoList = ({ refreshToken }: { refreshToken: number }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        fetch(`${getBackendUrl()}/Todos`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((error) => console.log(error));
    }, [refreshToken]);
    const uncompletedTodos = todos.filter((todo) => !todo.isCompleted);
    console.log(todos);
    return (
        <Card className="sm:flex md:block md:col-span-7 md:order-first flex flex-col gap-7 border-secondary bg-background-dark/85 shadow-brutal-secondary-lg mt-10">
            <div className="flex items-center gap-4 justify-between">
                <h3 className="font-mono text-secondary uppercase tracking-[0.3em] mb-0">
                    [TASKS::ACTIVE]
                </h3>
                <span className="font-mono text-xs text-border px-3 py-1 border-2 border-border">
                    {todos.length}
                </span>
            </div>
            <hr className="my-4 mborder-t-2 border-border-dark" />
            <div className="flex flex-col gap-4">
                {todos.length === 0 ? (
                    <div className="text-center py-12 text-border font-mono">
                        <p className="text-sm uppercase tracking-[0.2em]">
                            [NO_TASKS_FOUND]
                        </p>
                    </div>
                ) : (
                    uncompletedTodos.map((todo) => (
                        <Card
                            key={todo.id}
                            className="flex items-center justify-between border-border-dark hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex-1">
                                <p className="font-mono text-xs text-border mb-1 uppercase tracking-[0.2em]">
                                    [ID::{todo.id.substring(0, 8)}]
                                </p>
                                <h4 className="text-lg font-semibold text-white mb-0">
                                    {todo.name}
                                </h4>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-xs text-border uppercase tracking-[0.1em]">
                                    DUE
                                </p>
                                <p className="font-mono text-sm text-secondary">
                                    {new Date(todo.dueDate).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        },
                                    )}
                                </p>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </Card>
    );
};

export default TodoList;
