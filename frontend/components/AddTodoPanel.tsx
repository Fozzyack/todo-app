"use client";
import Card from "@/components/Card";
import { getBackendUrl } from "@/lib/BackendURL";
import { useState } from "react";

const AddTodoPanel = () => {
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        description: "",
        date: "",
    });

    const handleFormChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setFormDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${getBackendUrl()}/Todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: formDetails.name,
                    description: formDetails.description,
                    date: new Date(formDetails.date).toUTCString(),
                }),
            });
            if (!res.ok) {
                console.log(await res.text());
                throw new Error(
                    `There was an Error Uploading | Status : ${res.status}`,
                );
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <Card className="md:col-span-5 flex flex-col gap-7 border-secondary bg-background-dark/85 shadow-brutal-secondary-lg mt-10">
                <div className="flex flex-col items-center justify-center">
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-yellow-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    Loading ...
                </div>
            </Card>
        );
    }

    return (
        <Card className="md:col-span-5 flex flex-col gap-7 border-secondary bg-background-dark/85 shadow-brutal-secondary-lg mt-10">
            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="h-3 w-12 bg-primary shadow-brutal-primary" />
                        <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
                            Create
                        </p>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                        Add Todo
                    </h3>
                    <p className="text-sm text-slate-400">
                        Capture the task details below so you can keep tabs on
                        what is next.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label
                            className="inline-flex items-center gap-3 border-4 border-secondary bg-secondary/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-secondary shadow-brutal-secondary-sm"
                            htmlFor="todo-name"
                        >
                            Name
                        </label>
                        <input
                            className="w-full border-4 border-border bg-background px-4 py-3 text-sm font-semibold text-slate-100 placeholder:text-slate-500 shadow-brutal-muted-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-muted focus:-translate-y-1 focus:-translate-x-1 focus:border-secondary focus:outline-none focus:shadow-brutal-secondary-sm"
                            id="todo-name"
                            name="name"
                            placeholder="e.g. Draft release notes"
                            onChange={handleFormChange}
                            type="text"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="inline-flex items-center gap-3 border-4 border-secondary bg-secondary/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-secondary shadow-brutal-secondary-sm"
                            htmlFor="todo-description"
                        >
                            Description
                        </label>
                        <textarea
                            className="h-32 w-full resize-none border-4 border-border bg-background px-4 py-3 text-sm font-semibold text-slate-100 placeholder:text-slate-500 shadow-brutal-muted-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-muted focus:-translate-y-1 focus:-translate-x-1 focus:border-secondary focus:outline-none focus:shadow-brutal-secondary-sm"
                            id="todo-description"
                            name="description"
                            onChange={handleFormChange}
                            placeholder="Give a quick overview so future you knows what to do."
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="inline-flex items-center gap-3 border-4 border-secondary bg-secondary/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-secondary shadow-brutal-secondary-sm"
                            htmlFor="todo-due"
                        >
                            Due
                        </label>
                        <input
                            className="w-full border-4 border-border bg-background px-4 py-3 text-sm font-semibold text-slate-100 placeholder:text-slate-500 shadow-brutal-muted-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-muted focus:-translate-y-1 focus:-translate-x-1 focus:border-secondary focus:outline-none focus:shadow-brutal-secondary-sm"
                            id="todo-due"
                            onChange={handleFormChange}
                            name="date"
                            placeholder="Choose a date"
                            type="date"
                        />
                    </div>
                    <button
                        className="inline-flex w-full items-center justify-center gap-2 border-4 border-primary bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.3em] text-background-dark shadow-brutal-primary transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:bg-primary/90 focus:-translate-y-1 focus:-translate-x-1 focus:outline-none"
                        type="submit"
                    >
                        Add Todo
                    </button>
                </form>
            </div>
        </Card>
    );
};

export default AddTodoPanel;
