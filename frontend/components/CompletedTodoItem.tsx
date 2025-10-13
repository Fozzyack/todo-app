"use client";

import { getBackendUrl } from "@/lib/BackendURL";
import { useState } from "react";
import Card from "./Card";
import { useRefreshTokenContext } from "@/lib/RefreshTokenContext";
import { useToastContext } from "@/lib/ToastContext";
import { playDeleteSound } from "@/lib/playDeleteSound";

type CompletedTodoItemProps = {
    todo: Todo;
};

const CompletedTodoItem = ({ todo }: CompletedTodoItemProps) => {
    const [loading, setLoading] = useState(false);
    const { handleRefresh } = useRefreshTokenContext();
    const { showToast } = useToastContext();

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${getBackendUrl()}/Todos/${todo.id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error(`Failed to delete todo: ${res.status}`);
            }
            playDeleteSound();
            showToast("[TASK_DELETED]");
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
                    onClick={handleDelete}
                    disabled={loading}
                    className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border-4 border-red-500 bg-red-500/10 text-red-500 shadow-brutal-muted-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                    {loading ? "[...]" : "[DELETE]"}
                </button>
            </div>
        </Card>
    );
};

export default CompletedTodoItem;
