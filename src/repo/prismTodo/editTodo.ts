import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TodoUpdateInput {
  title: string;
  description?: string;
}

export async function editTodo(id: number, body: TodoUpdateInput) {
  try {
    const { title, description } = body;
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
      },
    });
    return todo;
  } catch (error) {
    console.error('DB Update Error:', error);
    throw error;
  }
}
