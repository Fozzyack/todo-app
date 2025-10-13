"use client";

import { useState } from "react";
import AddTodoPanel from "./AddTodoPanel";
import TodoList from "./TodoList";


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
