type Todo = {
    id: string;
    name: string;
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
