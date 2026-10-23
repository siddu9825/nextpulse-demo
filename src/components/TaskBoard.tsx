"use client";

import { useState, useTransition } from "react";
import { Task } from "@/lib/data";
import { addTaskServer, updateTaskStatusServer, deleteTaskServer } from "@/app/actions/tasks";
import {
  CheckCircle2,
  Clock,
  Circle,
  Plus,
  Trash2,
  Tag,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

interface TaskBoardProps {
  initialTasks: Task[];
}

export function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "completed">("all");
  const [isPending, startTransition] = useTransition();

  // New task form state
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPriority, setFormPriority] = useState<"low" | "medium" | "high">("medium");
  const [formTag, setFormTag] = useState("Feature");
  const [errorMsg, setErrorMsg] = useState("");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const handleStatusChange = (id: string, newStatus: "todo" | "in-progress" | "completed") => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );

    startTransition(async () => {
      await updateTaskStatusServer(id, newStatus);
    });
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    startTransition(async () => {
      await deleteTaskServer(id);
    });
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setErrorMsg("Please provide a task title");
      return;
    }

    setErrorMsg("");
    const formData = new FormData();
    formData.append("title", formTitle);
    formData.append("description", formDesc);
    formData.append("priority", formPriority);
    formData.append("tag", formTag);

    // Optimistic item
    const tempTask: Task = {
      id: `task-temp-${Date.now()}`,
      title: formTitle,
      description: formDesc,
      priority: formPriority,
      status: "todo",
      createdAt: new Date().toISOString().split("T")[0],
      tag: formTag,
    };

    setTasks((prev) => [tempTask, ...prev]);
    setShowModal(false);
    setFormTitle("");
    setFormDesc("");

    startTransition(async () => {
      const res = await addTaskServer(formData);
      if (res?.task) {
        setTasks((prev) =>
          prev.map((t) => (t.id === tempTask.id ? res.task : t))
        );
      }
    });
  };

  const getPriorityBadge = (p: Task["priority"]) => {
    switch (p) {
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining Server Actions */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Powered by Next.js Server Actions (&apos;use server&apos;)
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Mutations invoke server-side functions directly from React without creating custom API routes, with automatic Next.js cache revalidation via <code className="bg-indigo-100/70 px-1 py-0.5 rounded text-indigo-800">revalidatePath()</code>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isPending && (
            <span className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Syncing with Server...
            </span>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          {(["all", "todo", "in-progress", "completed"] as const).map((tab) => {
            const count = tasks.filter((t) => (tab === "all" ? true : t.status === tab)).length;
            const labels = {
              all: "All Tasks",
              todo: "To Do",
              "in-progress": "In Progress",
              completed: "Done",
            };

            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  filter === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {labels[tab]}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filter === tab ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Total: {tasks.length} items
        </span>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">No tasks in this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => {
                    const nextStatus =
                      task.status === "completed"
                        ? "todo"
                        : task.status === "todo"
                        ? "in-progress"
                        : "completed";
                    handleStatusChange(task.id, nextStatus);
                  }}
                  title="Click to toggle status"
                  className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                  ) : task.status === "in-progress" ? (
                    <Clock className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4
                      className={`text-sm font-semibold ${
                        task.status === "completed"
                          ? "line-through text-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </h4>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${getPriorityBadge(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {task.tag}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                      {task.description}
                    </p>
                  )}
                  <div className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-3">
                    <span>Created: {task.createdAt}</span>
                    <span className="font-mono">ID: {task.id}</span>
                  </div>
                </div>
              </div>

              {/* Status Selector & Actions */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task.id, e.target.value as any)
                  }
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDelete(task.id)}
                  title="Delete task"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Create New Task</h3>
            <p className="text-xs text-slate-500 mb-4">
              This task will be sent directly via Next.js Server Action.
            </p>

            {errorMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Implement middleware authentication"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Details, requirements, or architecture notes..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    placeholder="e.g. Performance"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm"
                >
                  Add Task (Server Action)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
