"use client"
import { DustBinIcon, EditIcon } from "@/icons/icons"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

// ✅ Use inline styles for dynamic sizing
function Spinner({ size = 24 }) {
    return (
        <div
            style={{ width: size, height: size }}
            className="border-4 border-t-transparent border-pink-500 rounded-full animate-spin"
        ></div>
    )
}

export default function TodoListCont() {
    const { push } = useRouter()
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    const handleAddClick = async() => {
        push(`/add`)
    }

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this todo?")
        if (!confirmDelete) return

        try {
            setDeletingId(id)
            const res = await fetch(`/api/todolist/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            if (!res.ok) throw new Error("Failed to delete todo")

            toast.success("Todo deleted successfully")
            setTodos((prev) => prev.filter((t) => t.id !== id))
        } catch (error) {
            console.error("Delete failed:", error)
            toast.error("Failed to delete todo")
        } finally {
            setDeletingId(null)
        }
    }

    const handleEditClick = (id) => {
        push(`/edit/${id}`)
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("/api/todolist/getAllTodos")
                const todos = await res.json()
                setTodos(todos)
            } catch (err) {
                console.error("Error fetching todos:", err)
                toast.error("Failed to load todos")
            } finally {
                setIsLoading(false)
            }
        }

        fetchTodos()
    }, [])

    return (
        <section className="flex flex-col items-center justify-center px-4 py-6 rounded overflow-hidden">
            <section className="bg-orange-300 backdrop-blur-lg p-3 lg:p-6 rounded-xl shadow-xl w-full max-w-lg">
                <div className="flex items-center justify-between py-4 w-full">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center w-full space-y-3">
                            <h1 className="text-xl font-semibold text-white">
                                Loading Todos...
                            </h1>
                            <Spinner size={100} /> {/* ✅ Big spinner works now */}
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-semibold text-white">TODO LIST</h1>
                            <button
                                onClick={handleAddClick}
                                className="px-5 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Add +
                            </button>
                        </>
                    )}
                </div>

                <ul className="border-b-7 border-pink-600/70 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
                    {todos.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center p-4">
                            <h1 className="text-xl font-semibold text-pink-500">
                                No todos found
                            </h1>
                        </div>
                    )}

                    {todos.map((todo, index) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center p-4 text-black hover:bg-white/50 hover:text-[#85009D] border-b-2 border-white/20 rounded transition-all duration-300"
                        >
                            <span>
                                <h1 className="font-semibold text-pink-500">
                                    {index + 1}. {todo.title}
                                </h1>
                                <p className="text-sm text-orange-500">{todo.description}</p>
                            </span>

                            <span className="flex flex-col items-center cursor-pointer">
                                {deletingId === todo.id ? (
                                    <Spinner size={25} />
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <span className="text-xs text-center mt-2">
                Full Working Todo List App, CRUD operations with Next.js
            </span>
        </section>
    )
}
