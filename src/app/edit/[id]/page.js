"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTodo() {
    const { push } = useRouter();
    const params = useParams();     // ✅ get URL params
    const id = Number(params.id);   // ✅ convert to number
    const [formData, setFormData] = useState({ title: "", description: "" });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await fetch(`/api/todolist/${id}`);
                if (!res.ok) throw new Error("Failed to fetch todo");
                const todo = await res.json();
                setFormData({ title: todo.title, description: todo.description });
            } catch (error) {
                console.error("Error loading todo:", error);
            }
        };
        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/todolist/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Failed to submit todo");
            alert("Todo updated successfully");
            push("/");
        } catch (error) {
            console.error("Form submission to API failed:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="flex flex-col items-center justify-center p-4 rounded overflow-hidden">
            <section className="bg-cyan-500 rounded shadow p-4">
                <div className="flex items-center justify-between md:min-w-md p-4 rounded mb-5">
                    <h1 className="text-2xl font-semibold">
                        Edit List # <span className="text-white">{id}</span>
                    </h1>
                </div>
                <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                    <input
                        placeholder="Title here"
                        type="text"
                        className="p-3 mb-2 rounded bg-white text-black"
                        name="title"
                        value={formData.title}
                        required
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Description here"
                        type="text"
                        className="p-3 mb-2 rounded bg-white text-black"
                        name="description"
                        value={formData.description}
                        required
                        onChange={handleChange}
                    />
                    <div className="flex justify-end col-span-2">
                        <button
                            type="submit"
                            className="col-start-2 px-3 py-2 cursor-pointer bg-yellow-300 text-black active:shadow rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}
