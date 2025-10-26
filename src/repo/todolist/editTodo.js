import { db } from "@/lib/config/db";
export async function editTodo(body, id) {
    try {
        const { title, description } = body;
        const [result] = await db.query(
            "UPDATE todos SET title = ?, description = ? WHERE id = ?",
            [title, description, id]
        );
        return result;
    } catch (error) {
        console.error("DB Insert Error:", error);
        throw error;
    }
}