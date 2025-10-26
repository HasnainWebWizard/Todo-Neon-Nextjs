// src/repo/todos/createTodo.js
import { db } from "@/lib/config/db";

export async function createTodo(body) {
  try {
    const { title, description } = body;
    const [result] = await db.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description]
    );
    return result;
  } catch (error) {
    console.error("DB Insert Error:", error);
    throw error;
  }
}
