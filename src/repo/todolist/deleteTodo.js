
import { db } from "@/lib/config/db";

export default function deleteTodo(id) {
    return db.query("DELETE FROM todos WHERE id = ?", [id]);
}