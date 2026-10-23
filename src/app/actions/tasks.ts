"use server";

import { revalidatePath } from "next/cache";
import { INITIAL_TASKS, Task } from "@/lib/data";

// Simulated server-side storage
let inMemoryTasks: Task[] = [...INITIAL_TASKS];

export async function getTasksServer(): Promise<Task[]> {
  // Simulate database latency
  await new Promise((res) => setTimeout(res, 60));
  return inMemoryTasks;
}

export async function addTaskServer(formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const priority = (formData.get("priority") as "low" | "medium" | "high") || "medium";
  const tag = (formData.get("tag") as string) || "General";

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  const newTask: Task = {
    id: `task-${Date.now()}`,
    title: title.trim(),
    description: description.trim(),
    priority,
    status: "todo",
    createdAt: new Date().toISOString().split("T")[0],
    tag: tag.trim(),
  };

  inMemoryTasks.unshift(newTask);

  revalidatePath("/tasks");
  return { success: true, task: newTask };
}

export async function updateTaskStatusServer(id: string, status: "todo" | "in-progress" | "completed") {
  const task = inMemoryTasks.find((t) => t.id === id);
  if (!task) {
    return { error: "Task not found" };
  }

  task.status = status;
  revalidatePath("/tasks");
  return { success: true, task };
}

export async function deleteTaskServer(id: string) {
  inMemoryTasks = inMemoryTasks.filter((t) => t.id !== id);
  revalidatePath("/tasks");
  return { success: true };
}
