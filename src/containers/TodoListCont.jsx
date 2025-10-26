"use client";
import { DustBinIcon, EditIcon } from "@/icons/icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TodoListCont() {
    const { push } = useRouter();
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);


    const handleAddClick = async () => {
        push(`/add`);
    };

    const handleDeleteClick = async (id) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
        if (!confirmDelete) return; // exit if user cancels

        try {
            setIsDeleting(true);
            const res = await fetch(`/api/todolist/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Failed to delete todo");
            toast.success("Todo deleted successfully");
            setIsDeleting(false);
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete todo");
            setIsDeleting(false);
        }
    };


    const handleEditClick = (id) => {
        push(`/edit/${id}`); // Use actual todo id here
    };


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("/api/todolist/getAllTodos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const todos = await res.json();
                setTodos(todos);
                setIsLoading(false); // Data is fetched, loading is complete
            } catch (err) {
                console.error("Error fetching todos:", err);
                setIsLoading(false); // Handle error and stop loading
            }
        };

        fetchTodos();
    }, [isDeleting, isLoading, push]);


    // Show loading state
    if (isDeleting || isLoading) {
        return (
            <section className="flex flex-col items-center justify-center p-4 rounded overflow-hidden h-screen">
                <section className="bg-cyan-400 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md">
                    <div className="flex items-center justify-center p-4">
                        <h1 className="text-xl font-semibold text-pink-500">
                            {isDeleting ? "Deleting..." : "Loading Todos..."}
                        </h1>
                    </div>
                </section>
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center px-4 py-6 rounded overflow-hidden">
            <section className="bg-orange-300 backdrop-blur-lg p-3 lg:p-6 rounded-xl shadow-xl w-full max-w-lg">
                <div className="flex items-center justify-between md:min-w-md py-4 rounded">
                    <h1 className="text-2xl font-semibold text-white">TODO LIST</h1>
                    <button
                        onClick={handleAddClick}
                        className="px-5 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Add +
                    </button>
                </div>

                <ul className="border-b-7 border-pink-600/70 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
                    {todos.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-4">
                            <h1 className="text-xl font-semibold text-pink-500">
                                No todos found
                            </h1>
                        </div>
                    )}
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between p-4 md:min-w-md px-4 py-3 text-black hover:bg-white/50 hover:text-[#85009D] border-b-2 border-white/20 rounded transition-all duration-300"
                        >
                            <span>
                                <h1 className="font-semibold text-pink-500">{todo.id}. {todo.title}</h1>
                                <p className="text-sm text-orange-500">{todo.description}</p>
                            </span>
                            <span className="flex flex-col cursor-pointer">
                                <div
                                    onClick={() => handleDeleteClick(todo.id)}
                                    className="hover:text-red-600 transition-all duration-300"
                                >
                                    <DustBinIcon />
                                </div>
                                <div
                                    onClick={() => handleEditClick(todo.id)}
                                    className="hover:text-green-600 transition-all duration-300"
                                >
                                    <EditIcon />
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
            <span className="text-xs text-center mt-2">
                Full Working Todo List App, CRUD operations with Next.js
            </span>
        </section>
    );
}
