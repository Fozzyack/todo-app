"use client";

import { useEffect } from "react";

type ToastProps = {
    message: string;
    onClose: () => void;
    duration?: number;
};

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed top-8 right-8 z-50 animate-slide-in">
            <div className="border-4 border-tertiary bg-tertiary/20 px-6 py-4 shadow-brutal-tertiary-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-tertiary">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Toast;
