import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTodo(id: number) {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    return todo;
  } catch (error) {
    console.error('DB Fetch Error:', error);
    throw error;
  }
}
