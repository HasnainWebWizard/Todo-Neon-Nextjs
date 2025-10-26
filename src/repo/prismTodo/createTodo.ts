import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TodoInput {
  title: string;
  description?: string;
}

export async function createTodo(body: TodoInput) {
  try {
    const { title, description } = body;
    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
      },
    });
    return todo;
  } catch (error) {
    console.error('DB Insert Error:', error);
    throw error;
  }
}
