"use client";

import { useState } from "react";
import AddTodoPanel from "./AddTodoPanel";
import TodoList from "./TodoList";
import CompletedSection from "./CompletedSection";
import { RefreshTokenContext } from "@/lib/RefreshTokenContext";

const TodoManager = () => {
    const [refreshToken, setRefreshToken] = useState(0);

    const handleRefresh = () => setRefreshToken((prev) => prev + 1);

    return (
        <RefreshTokenContext.Provider value={{ refreshToken, handleRefresh }}>
            <AddTodoPanel />
            <TodoList />
            <CompletedSection />
        </RefreshTokenContext.Provider>
    );
};

export default TodoManager;
