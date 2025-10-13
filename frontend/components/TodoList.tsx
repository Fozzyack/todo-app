"use client";

import { getBackendUrl } from "@/lib/BackendURL";
import { useEffect, useState } from "react";
import Card from "./Card";
import TodoItem from "./TodoItem";

const TodoList = ({ refreshToken }: { refreshToken: number }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

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
    }, [refreshToken]);

    const uncompletedTodos = todos.filter((todo) => !todo.completed);
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
                {uncompletedTodos.length === 0 ? (
                    <div className="text-center py-12 text-border font-mono">
                        <p className="text-sm uppercase tracking-[0.2em]">
                            [NO_TASKS_FOUND]
                        </p>
                    </div>
                ) : (
                    uncompletedTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onComplete={fetchTodos}
                        />
                    ))
                )}
            </div>
        </Card>
    );
};

export default TodoList;
