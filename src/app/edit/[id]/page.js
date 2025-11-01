"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function EditTodo() {
    const { push } = useRouter();
    const params = useParams();
    const id = Number(params.id);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchTodo = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/todolist/${id}`);
                if (!res.ok) throw new Error("Failed to fetch todo");
                const todo = await res.json();
                setFormData({ title: todo.title, description: todo.description });
            } catch (error) {
                console.error("Error loading todo:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`/api/todolist/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Failed to submit todo");
            toast.success("Todo updated successfully");
            push("/");
        } catch (error) {
            console.error("Form submission to API failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="flex flex-col items-center justify-center p-4 rounded overflow-hidden">
            {/* Match Add page style */}
            <section className="bg-purple-500 p-4 rounded shadow-lg">
                <div className="flex items-center justify-between md:min-w-md p-4 rounded mb-5">
                    <h1 className="text-2xl font-semibold text-white">
                        Edit Todo #<span>{id}</span>
                    </h1>
                </div>

                {isLoading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                        <input
                            placeholder="Title here"
                            type="text"
                            className="p-3 mb-2 rounded bg-white text-black"
                            name="title"
                            value={formData.title} // pre-filled
                            required
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Description here"
                            type="text"
                            className="p-3 mb-2 rounded bg-white text-black"
                            name="description"
                            value={formData.description} // pre-filled
                            required
                            onChange={handleChange}
                        />
                        <div className="flex justify-end col-span-2">
                            <button
                                type="submit"
                                className="col-start-2 px-3 py-2 bg-yellow-300 text-black active:shadow rounded"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : "Submit"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </section>
    );
}
