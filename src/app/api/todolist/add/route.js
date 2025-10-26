// import { createTodo } from "@/repo/todolist/createTodo";
import { createTodo } from "@/repo/prismTodo/createTodo";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Data Received by 'add' API : ", body);
    await createTodo(body);
    
    return new NextResponse(JSON.stringify({ message: "Success" }), { status: 200 });
  }
  catch (error) {
    console.log("Error in API file", error);
  }
}