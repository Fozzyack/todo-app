enum Priority {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
}

type Todo = {
    id: string;
    name: string;
    priority: Priority;
    description: string;
    dueDate: string;
    completed: boolean;
    cancelled: boolean;
};

type RefreshTokenContextType = {
    refreshToken: number;
    handleRefresh: () => void;
};

type ToastContextType = {
    showToast: (message: string) => void;
};

