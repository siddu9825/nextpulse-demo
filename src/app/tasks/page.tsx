import { getTasksServer } from "@/app/actions/tasks";
import { TaskBoard } from "@/components/TaskBoard";
import { CheckSquare, Sparkles } from "lucide-react";

export const metadata = {
  title: "Tasks & Server Actions — NextPulse Next.js Showcase",
  description: "Interactive task management using Next.js 14 Server Actions, optimistic UI, and cache revalidation.",
};

export default async function TasksPage() {
  const initialTasks = await getTasksServer();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Next.js Server Actions (&apos;use server&apos;)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-7 h-7 text-emerald-600" /> Interactive Task Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Create, update, and manage tasks using Next.js Server Actions without writing any REST API endpoints. Mutates data directly with automatic cache revalidation.
          </p>
        </div>
      </div>

      <TaskBoard initialTasks={initialTasks} />
    </div>
  );
}
