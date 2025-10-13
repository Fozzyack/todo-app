import { createContext, useContext } from "react";

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined
);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("Trying to Use Context outside of Toast Provider");
    }
    return context;
};
