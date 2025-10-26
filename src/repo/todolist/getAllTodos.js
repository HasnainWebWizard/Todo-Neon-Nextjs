
import { db } from "@/lib/config/db";

export async function getAllTodos() {
  const [rows] = await db.query("SELECT id, title, description FROM todos");
  return rows;

}
