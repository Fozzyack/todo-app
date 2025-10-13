"use client";

import { useState } from "react";
import AddTodoPanel from "./AddTodoPanel";
import TodoList from "./TodoList";
import CompletedSection from "./CompletedSection";
import MobileAddTodoTrigger from "./MobileAddTodoTrigger";
import Toast from "./Toast";
import { RefreshTokenContext } from "@/lib/RefreshTokenContext";
import { ToastContext } from "@/lib/ToastContext";

const TodoManager = () => {
    const [refreshToken, setRefreshToken] = useState(0);
    const [toast, setToast] = useState<string | null>(null);

    const handleRefresh = () => setRefreshToken((prev) => prev + 1);
    const showToast = (message: string) => setToast(message);
    const hideToast = () => setToast(null);

    return (
        <RefreshTokenContext.Provider value={{ refreshToken, handleRefresh }}>
            <ToastContext.Provider value={{ showToast }}>
                <MobileAddTodoTrigger />
                <AddTodoPanel />
                <TodoList />
                <CompletedSection />
                {toast && <Toast message={toast} onClose={hideToast} />}
            </ToastContext.Provider>
        </RefreshTokenContext.Provider>
    );
};

export default TodoManager;
