import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllTodos() {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    console.error('DB Fetch Error:', error);
    throw error;
  }
}
