import { NextResponse } from "next/server";
import { editTodo } from "@/repo/prismTodo/editTodo";
import { deleteTodo } from "@/repo/prismTodo/deleteTodo";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {  // destructure params directly
  try {
    const id = Number(params.id);
    const { title, description } = await req.json();

    const todo = await prisma.todo.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id); // convert string to number
    const response = await deleteTodo(id);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("DB Delete Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
