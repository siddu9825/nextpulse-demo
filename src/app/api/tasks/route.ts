import { NextRequest, NextResponse } from "next/server";
import { INITIAL_TASKS, Task } from "@/lib/data";

let tasks: Task[] = [...INITIAL_TASKS];

export async function GET() {
  return NextResponse.json({
    data: tasks,
    total: tasks.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Task 'title' is required" },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: body.title,
      description: body.description || "",
      priority: body.priority || "medium",
      status: "todo",
      createdAt: new Date().toISOString().split("T")[0],
      tag: body.tag || "General",
    };

    tasks.unshift(newTask);

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, priority } = body;

    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (status) tasks[taskIndex].status = status;
    if (priority) tasks[taskIndex].priority = priority;

    return NextResponse.json({ task: tasks[taskIndex] });
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 400 });
  }
}
