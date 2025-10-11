"use client";
import Card from "@/components/Card";
import { getBackendUrl } from "@/lib/BackendURL";
import { useState } from "react";

const AddTodoPanel = () => {
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
            const res = await fetch(`${getBackendUrl()}/`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    name: formDetails.name,
                    description: formDetails.description,
                    date: formDetails.date,
                }),
            });
            if (!res.ok) {
                throw new Error(
                    `There was an Error Uploading | Status : ${res.status} | Text: ${res.text()}`,
                );
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="md:col-span-5 flex flex-col gap-7 border-accent-blue bg-navy-dark/85 shadow-brutal-blue-lg mt-10">
            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="h-3 w-12 bg-accent-orange shadow-brutal-orange" />
                        <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent-orange">
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
                <form className="space-y-5">
                    <div className="space-y-2">
                        <label
                            className="inline-flex items-center gap-3 border-4 border-accent-blue bg-accent-blue/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent-blue shadow-brutal-blue-sm"
                            htmlFor="todo-name"
                        >
                            Name
                        </label>
                        <input
                            className="w-full border-4 border-border-slate bg-navy px-4 py-3 text-sm font-semibold text-slate-100 placeholder:text-slate-500 shadow-brutal-slate-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-slate focus:-translate-y-1 focus:-translate-x-1 focus:border-accent-blue focus:outline-none focus:shadow-brutal-blue-sm"
                            id="todo-name"
                            name="name"
                            placeholder="e.g. Draft release notes"
                            onChange={handleFormChange}
                            type="text"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="inline-flex items-center gap-3 border-4 border-accent-blue bg-accent-blue/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent-blue shadow-brutal-blue-sm"
                            htmlFor="todo-description"
                        >
                            Description
                        </label>
                        <textarea
                            className="h-32 w-full resize-none border-4 border-border-slate bg-navy px-4 py-3 text-sm font-semibold text-slate-100 placeholder:text-slate-500 shadow-brutal-slate-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-slate focus:-translate-y-1 focus:-translate-x-1 focus:border-accent-blue focus:outline-none focus:shadow-brutal-blue-sm"
                            id="todo-description"
                            name="description"
                            onChange={handleFormChange}
                            placeholder="Give a quick overview so future you knows what to do."
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="inline-flex items-center gap-3 border-4 border-accent-blue bg-accent-blue/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent-blue shadow-brutal-blue-sm"
                            htmlFor="todo-due"
                        >
                            Due
                        </label>
                        <input
                            className="w-full border-4 border-border-slate bg-navy px-4 py-3 text-sm font-semibold text-slate-100 placeholder:text-slate-500 shadow-brutal-slate-sm transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal-slate focus:-translate-y-1 focus:-translate-x-1 focus:border-accent-blue focus:outline-none focus:shadow-brutal-blue-sm"
                            id="todo-due"
                            onChange={handleFormChange}
                            name="date"
                            placeholder="Choose a date"
                            type="date"
                        />
                    </div>
                    <button
                        className="inline-flex w-full items-center justify-center gap-2 border-4 border-accent-orange bg-accent-orange px-5 py-3 text-sm font-black uppercase tracking-[0.3em] text-navy-dark shadow-brutal-orange transition-transform duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:bg-accent-orange/90 focus:-translate-y-1 focus:-translate-x-1 focus:outline-none"
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
