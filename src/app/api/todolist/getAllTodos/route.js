// import { getAllTodos } from "@/repo/todolist/getAllTodos";
import { getAllTodos } from "@/repo/prismTodo/getAllTodos";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos);
  } catch (error) {
    console.error("GET /api/todolist error:", error);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}