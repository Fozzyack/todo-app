"use client";
import AddTodoPanel from "@/components/AddTodoPanel";
import { useState } from "react";

const MobileAddTodoTrigger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                className="md:hidden inline-flex w-full items-center justify-center gap-2 border-4 border-primary bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.3em] text-background-dark shadow-brutal-primary transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:bg-primary/90 focus:-translate-y-1 focus:-translate-x-1 focus:outline-none"
                onClick={handleOpen}
                type="button"
            >
                Add Todo
            </button>
            {isOpen && (
                <div
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/90 px-4 py-10"
                    onClick={handleClose}
                    role="dialog"
                >
                    <div
                        className="relative w-full max-w-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <AddTodoPanel
                            className="mt-0"
                            showOnMobile
                            handleClose={handleClose}
                        />
                        <button
                            aria-label="Close add todo form"
                            className="absolute -top-4 -right-0 border-4 border-secondary bg-background px-3 py-2 font-mono text-xs uppercase tracking-[0.3em] text-secondary shadow-brutal-secondary-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 focus:-translate-y-1 focus:-translate-x-1 focus:outline-none"
                            onClick={handleClose}
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileAddTodoTrigger;
