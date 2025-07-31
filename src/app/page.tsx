'use client';

import { useState, useEffect } from "react";
import { Task } from '@/types';
import { taskApi } from "@/lib/api";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import EmptyState from "@/components/EmptyState";
import CreateTaskButton from "@/components/CreateTaskButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed } : task
      ));

      await taskApi.updateTask(id, { completed });
    } catch (err) {
      console.error('Error updating task:', err);

      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !completed } : task
      ));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id ));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-[#f2F2F2]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#1A1A1A] flex flex-col">
      <Header />

      <div className="flex-1 px-[352px] pt-[54px] pb-[64px]">
        <div className="mb-[64px]">
          <CreateTaskButton onClick={() => router.push('/create')} />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400">
            {error}
          </div>
        )}

        <div className="flex-1">
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-[12px]">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </div>
           )}
        </div>
      </div>
    </div>
  );
}
