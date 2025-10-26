import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteTodo(id: number) {
  try {
    const todo = await prisma.todo.delete({
      where: { id },
    });
    return todo;
  } catch (error) {
    console.error('DB Delete Error:', error);
    throw error;
  }
}
