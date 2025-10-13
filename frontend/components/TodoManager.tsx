"use client";

import { Fragment, useEffect, useState } from "react";
import AddTodoPanel from "./AddTodoPanel";
import TodoList from "./TodoList";
import { getBackendUrl } from "@/lib/BackendURL";


const TodoManager = () => {

    const [refreshToken, setRefreshToken] = useState(0);

    const handleRefresh = () =>  setRefreshToken(prev => prev + 1);
    
    return (
        <>
            <AddTodoPanel handleRefresh={handleRefresh}/>
            <TodoList refreshToken={refreshToken}/>
        </>
    )
};

export default TodoManager;
