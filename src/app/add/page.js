"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Add() {
  const router = useRouter(); // Router for navigation after submit

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new todo
      const res = await fetch("/api/todolist/add", { // No dynamic `id` required
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as the request body
      });

      if (!res.ok) throw new Error("Failed to submit todo");
      toast.success("Todo added successfully");

    } catch (error) {
      console.error("Form submission to API failed:", error);
      toast.error("Error adding todo");
    } finally {
      // Navigate to the main page after submitting
      router.push("/");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center p-4 rounded overflow-hidden">
      <section className="bg-purple-500 p-4">
        <div className="flex items-center justify-between md:min-w-md p-4 rounded mb-5">
          <h1 className="text-2xl font-semibold text-white">Add New Todo</h1>
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
              className="col-start-2 px-3 py-2 bg-yellow-300 text-black active:shadow rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
