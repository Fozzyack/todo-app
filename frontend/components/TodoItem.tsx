"use client";

import { getBackendUrl } from "@/lib/BackendURL";
import { useState } from "react";
import Card from "./Card";
import { useRefreshTokenContext } from "@/lib/RefreshTokenContext";

type TodoItemProps = {
    todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
    const [loading, setLoading] = useState(false);
    const { handleRefresh } = useRefreshTokenContext();

    const handleComplete = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${getBackendUrl()}/Todos/complete/${todo.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ completed: true }),
                }
            );
            handleRefresh();
            if (!res.ok) {
                throw new Error(`Failed to complete todo: ${res.status}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${getBackendUrl()}/Todos/cancel/${todo.id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ cancelled: true }),
                }
            );
            if (!res.ok) {
                throw new Error(`Failed to cancel todo: ${res.status}`);
            }
            handleRefresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex items-center justify-between gap-4 border-border-dark hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
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
                    {new Date(todo.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>
            <div className="flex flex-col items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={handleComplete}
                    disabled={loading}
                    className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border-4 border-tertiary bg-tertiary/10 text-tertiary shadow-brutal-muted-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                    {loading ? "[...]" : "[DONE]"}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="font-mono text-[0.6em] font-bold uppercase tracking-[0.2em] text-red-500  hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                    {loading ? "" : "[CANCEL]"}
                </button>
            </div>
        </Card>
    );
};

export default TodoItem;
